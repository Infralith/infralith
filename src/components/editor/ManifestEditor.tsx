import { useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { Code, Copy, Download, Save, Clock } from 'lucide-react';
import { useAppStore } from '@/store/app.store';

/* Sample YAML manifests keyed by node id */
const MANIFESTS: Record<string, string> = {
  'service-1': `apiVersion: v1
kind: Service
metadata:
  name: frontend-lb
  namespace: default
  labels:
    app: web-frontend
spec:
  selector:
    app: web-frontend
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
# Ready to apply changes`,

  'deployment-1': `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-frontend
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-frontend
  template:
    metadata:
      labels:
        app: web-frontend
    spec:
      containers:
        - name: web-frontend
          image: nginx:1.25
          ports:
            - containerPort: 8080
          resources:
            limits:
              cpu: "500m"
              memory: "128Mi"`,

  'pod-1': `apiVersion: v1
kind: Pod
metadata:
  name: web-frontend-a1b2c
  namespace: default
  labels:
    app: web-frontend
spec:
  containers:
    - name: web-frontend
      image: nginx:1.25
      ports:
        - containerPort: 8080
  restartPolicy: Always`,
};

const NODE_LABELS: Record<string, string> = {
  'service-1': 'frontend-lb',
  'deployment-1': 'web-frontend',
  'pod-1': 'web-frontend-a1b2c',
};

export function ManifestEditor() {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);

  const yaml = useMemo(() => {
    if (selectedNodeId && MANIFESTS[selectedNodeId]) {
      return MANIFESTS[selectedNodeId];
    }
    return '# Select a node on the canvas to view its manifest';
  }, [selectedNodeId]);

  const nodeLabel = selectedNodeId ? NODE_LABELS[selectedNodeId] ?? selectedNodeId : '—';

  function handleCopy() {
    navigator.clipboard.writeText(yaml);
  }

  function handleDownload() {
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nodeLabel}.yaml`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <aside className="w-[450px] border-l border-border bg-surface flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Code size={16} className="text-primary" />
            Manifest Editor
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-tighter mt-1">
            Editing node: <span className="text-muted">{nodeLabel}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-surface-alt rounded transition-all cursor-pointer"
            title="Copy YAML"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-surface-alt rounded transition-all cursor-pointer"
            title="Download YAML"
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language="yaml"
          value={yaml}
          theme="vs-dark"
          options={{
            readOnly: false,
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "'Space Grotesk', monospace",
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: 'none',
            overviewRulerBorder: false,
            scrollbar: {
              verticalScrollbarSize: 4,
            },
          }}
        />
      </div>

      {/* Footer */}
      <div className="p-4 bg-surface border-t border-border">
        <button className="w-full bg-primary-muted hover:bg-primary/25 text-primary border border-primary/40 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
          <Save size={16} />
          Save &amp; Sync Manifest
        </button>
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Clock size={12} />
            Last edited 2m ago
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Live Sync Active
          </div>
        </div>
      </div>
    </aside>
  );
}
