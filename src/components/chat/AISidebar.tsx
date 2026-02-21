import { Sparkles, History } from 'lucide-react';
import { useAppStore, generateId } from '@/store/app.store';
import { ChatInput, ChatMessage } from '@/components/chat';
import { useEffect, useRef } from 'react';

const QUICK_ACTIONS = [
  { label: 'Scale Redis', highlight: true },
  { label: 'Add Ingress', highlight: false },
  { label: 'Enable Istio', highlight: false },
];

export function AISidebar() {
  const messages = useAppStore((s) => s.messages);
  const addMessage = useAppStore((s) => s.addMessage);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend(content: string) {
    addMessage({
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    });
  }

  return (
    <aside className="w-80 border-r border-border bg-background flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Sparkles size={14} />
            AI Architect
          </h2>
          <button className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <History size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => handleSend(action.label)}
              className={`text-[10px] px-2 py-1 border rounded-full cursor-pointer transition-all ${
                action.highlight
                  ? 'bg-primary-muted border-primary/20 text-primary hover:bg-primary/20'
                  : 'bg-surface-alt border-border text-muted hover:bg-surface-alt/80'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat History */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
      >
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Start a conversation to design your infrastructure.
          </p>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <ChatInput onSubmit={handleSend} />
      </div>
    </aside>
  );
}
