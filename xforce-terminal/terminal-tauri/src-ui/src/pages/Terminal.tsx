import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { PriceTable } from '../components/PriceTable';
import { Chart } from '../components/Chart';
import { SwapPanel } from '../components/SwapPanel';

export function Terminal() {
  return (
    <div className="h-full flex flex-col gap-4">
      {/* Top Row: Prices and Chart */}
      <PanelGroup direction="horizontal" className="flex-1">
        <Panel defaultSize={30} minSize={20} maxSize={50}>
          <PriceTable />
        </Panel>
        <PanelResizeHandle className="w-1 hover:w-1 hover:bg-terminal-accent transition-colors mx-1" />
        <Panel defaultSize={70}>
          <Chart />
        </Panel>
      </PanelGroup>

      {/* Bottom Row: Swap Panel */}
      <div className="h-64">
        <SwapPanel />
      </div>
    </div>
  );
}
