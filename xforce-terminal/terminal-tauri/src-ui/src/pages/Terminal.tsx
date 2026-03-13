import { NewsPanel } from '../components/NewsPanel';

export function Terminal() {
  return (
    <div className="h-full flex flex-row gap-4">
      {/* Left: News Area */}
      <div className="flex-1 min-w-0">
        <NewsPanel />
      </div>
    </div>
  );
}
