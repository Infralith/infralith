import { Header } from '@/components/layout';
import { AISidebar } from '@/components/chat';
import { InfraCanvas } from '@/components/canvas';
import { ManifestEditor } from '@/components/editor';

export function ArchitectPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AISidebar />
        <InfraCanvas />
        <ManifestEditor />
      </div>
    </div>
  );
}
