import { Layers } from 'lucide-react';
import { ChatInput } from '@/components/chat';
import { useAppStore, generateId } from '@/store/app.store';

const SUGGESTIONS = [
  'Deploy a 3-replica web frontend with a LoadBalancer',
  'Create a Redis cluster with persistent storage',
  'Set up an Nginx Ingress controller with TLS',
  'Scale my API service to 5 replicas',
];

export function ChatPage() {
  const addMessage = useAppStore((s) => s.addMessage);

  function handleSend(content: string) {
    addMessage({
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background px-4">
      {/* Logo & Title */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="bg-primary p-3 rounded-2xl text-primary-foreground">
          <Layers size={36} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Infralith <span className="text-primary">Architect</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-md text-center">
          Describe your infrastructure and let AI design your Kubernetes manifests visually.
        </p>
      </div>

      {/* Chat Input */}
      <div className="w-full max-w-2xl">
        <ChatInput
          onSubmit={handleSend}
          placeholder="Describe your infrastructure..."
          autoFocus
          className="mb-6"
        />

        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {SUGGESTIONS.map((text) => (
            <button
              key={text}
              onClick={() => handleSend(text)}
              className="text-xs px-3 py-1.5 bg-surface-alt border border-border text-muted rounded-full hover:bg-primary-muted hover:border-primary/30 hover:text-primary transition-all cursor-pointer"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-[10px] text-muted-foreground">
        Infralith v0.1.0 — AI-powered infrastructure design
      </p>
    </div>
  );
}
