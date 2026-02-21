import { Layers, Cloud, Rocket } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-6 py-3 z-50 shrink-0">
      {/* Left: Brand + Navigation */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
            <Layers size={22} />
          </div>
          <h1 className="text-lg font-bold tracking-tight">
            Infralith <span className="text-primary">Architect</span>
          </h1>
        </div>

        <div className="h-6 w-px bg-border-light mx-2" />

        <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-surface-alt transition-colors cursor-pointer">
            <Cloud size={16} />
            <span>us-east-1-prod</span>
          </div>
          <span className="text-border-light">/</span>
          <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-surface-alt transition-colors cursor-pointer">
            <span>namespaces</span>
            <span className="text-[10px] bg-surface-alt px-1.5 py-0.5 rounded text-muted">
              6
            </span>
          </div>
        </nav>
      </div>

      {/* Right: Status + Actions */}
      <div className="flex items-center gap-4">
        <ClusterStatus />
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer">
          <span>Deploy Infrastructure</span>
          <Rocket size={14} />
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-alt border border-border flex items-center justify-center text-xs font-bold text-muted">
          U
        </div>
      </div>
    </header>
  );
}

function ClusterStatus() {
  return (
    <div className="flex items-center gap-2 text-xs font-mono bg-success/10 text-success px-3 py-1.5 rounded-full border border-success/20">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>
      CLUSTER HEALTHY
    </div>
  );
}
