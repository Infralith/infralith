import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ChatMessage, AppView } from '@/types';

interface AppState {
  /* Navigation */
  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  /* Sidebar */
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  /* Chat */
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;

  /* Selected node */
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

let messageCounter = 0;
function generateId(): string {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
}

const MOCK_ASSISTANT_RESPONSES: string[] = [
  "I've drafted a Deployment with 3 replicas and a ClusterIP Service. Review the canvas to your right.",
  'Done! I added a LoadBalancer service for the frontend. The manifest editor shows the YAML on the right.',
  "I've scaled the deployment to 5 replicas and updated the resource limits accordingly.",
  'Ingress controller has been configured with TLS termination. Check the canvas for the new topology.',
];

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      currentView: 'chat',
      setCurrentView: (view) => set({ currentView: view }),

      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      messages: [],
      addMessage: (message) =>
        set((state) => {
          const newMessages = [...state.messages, message];

          // Auto-respond with mock AI when user sends a message
          if (message.role === 'user') {
            const responseIdx = (state.messages.filter((m) => m.role === 'assistant').length) %
              MOCK_ASSISTANT_RESPONSES.length;
            const aiMessage: ChatMessage = {
              id: generateId(),
              role: 'assistant',
              content: MOCK_ASSISTANT_RESPONSES[responseIdx],
              timestamp: Date.now() + 500,
            };
            newMessages.push(aiMessage);

            // Transition to architect view after first exchange
            if (state.currentView === 'chat') {
              return { messages: newMessages, currentView: 'architect' };
            }
          }
          return { messages: newMessages };
        }),
      clearMessages: () => set({ messages: [] }),

      selectedNodeId: null,
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
    }),
    { name: 'app-store' },
  ),
);

export { generateId };
