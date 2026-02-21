import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex flex-col gap-1 max-w-[90%]',
        isUser ? '' : 'ml-auto',
      )}
    >
      <div
        className={cn(
          'text-[10px] ml-2',
          isUser ? 'text-muted-foreground' : 'text-primary text-right mr-2',
        )}
      >
        {isUser ? 'User' : 'Infralith AI'}
      </div>
      <div
        className={cn(
          'p-3 rounded-xl text-sm',
          isUser
            ? 'bg-surface-alt rounded-tl-none text-foreground'
            : 'bg-primary-muted border border-primary/20 rounded-tr-none text-foreground',
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
