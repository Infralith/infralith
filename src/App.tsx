import { useAppStore } from '@/store/app.store';
import { ChatPage } from '@/pages/ChatPage';
import { ArchitectPage } from '@/pages/ArchitectPage';

function App() {
  const currentView = useAppStore((s) => s.currentView);

  if (currentView === 'architect') {
    return <ArchitectPage />;
  }

  return <ChatPage />;
}

export default App;
