import { useState, useEffect } from 'react';
import { useTerminalStore } from '../stores/terminalStore';

const FONT_OPTIONS = [
  { value: 'JetBrains Mono, monospace', label: 'JetBrains Mono' },
  { value: 'Fira Code, monospace', label: 'Fira Code' },
  { value: 'Consolas, monospace', label: 'Consolas' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'system-ui, sans-serif', label: 'System UI' },
];

export function Settings() {
  const [rpcUrl, setRpcUrl] = useState('https://api.devnet.solana.com');
  const { isLightMode, setIsLightMode, customTheme, setCustomTheme, resetTheme } = useTerminalStore();
  const [autoUpdate, setAutoUpdate] = useState(true);

  // Apply custom theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--terminal-bg', customTheme.backgroundColor);
    root.style.setProperty('--terminal-text', customTheme.textColor);
    root.style.setProperty('--terminal-accent', customTheme.accentColor);
    root.style.setProperty('--terminal-panel', customTheme.panelColor);
    root.style.setProperty('--terminal-font', customTheme.fontFamily);
    root.style.setProperty('--terminal-font-size', `${customTheme.fontSize}px`);
  }, [customTheme]);

  const handleColorChange = (key: keyof typeof customTheme, value: string) => {
    setCustomTheme({ ...customTheme, [key]: value });
  };

  const handleFontSizeChange = (delta: number) => {
    const newSize = Math.max(10, Math.min(24, customTheme.fontSize + delta));
    setCustomTheme({ ...customTheme, fontSize: newSize });
  };

  return (
    <div className="h-full p-4 overflow-auto" style={{ fontFamily: customTheme.fontFamily }}>
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter" style={{ color: customTheme.accentColor }}>
        Settings
      </h2>

      <div className="max-w-2xl space-y-6">
        {/* Appearance Presets */}
        <div className="p-4 rounded" style={{ backgroundColor: customTheme.panelColor }}>
          <label className="block text-xs font-bold uppercase mb-3" style={{ color: customTheme.textColor }}>
            Theme Presets
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setIsLightMode(false)}
              className={`px-4 py-2 text-xs font-bold uppercase rounded transition-all ${
                !isLightMode ? 'opacity-100' : 'opacity-50'
              }`}
              style={{
                backgroundColor: !isLightMode ? customTheme.accentColor : 'transparent',
                color: !isLightMode ? customTheme.backgroundColor : customTheme.textColor,
                border: `1px solid ${customTheme.accentColor}`
              }}
            >
              Terminal Dark
            </button>
            <button
              onClick={() => setIsLightMode(true)}
              className={`px-4 py-2 text-xs font-bold uppercase rounded transition-all ${
                isLightMode ? 'opacity-100' : 'opacity-50'
              }`}
              style={{
                backgroundColor: isLightMode ? customTheme.accentColor : 'transparent',
                color: isLightMode ? customTheme.backgroundColor : customTheme.textColor,
                border: `1px solid ${customTheme.accentColor}`
              }}
            >
              Terminal Light
            </button>
          </div>
        </div>

        {/* Custom Colors */}
        <div className="p-4 rounded" style={{ backgroundColor: customTheme.panelColor }}>
          <label className="block text-xs font-bold uppercase mb-3" style={{ color: customTheme.textColor }}>
            Custom Colors
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase mb-1 opacity-70" style={{ color: customTheme.textColor }}>
                Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customTheme.backgroundColor}
                  onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={customTheme.backgroundColor}
                  onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                  className="flex-1 px-2 py-1 text-xs rounded font-mono"
                  style={{ backgroundColor: customTheme.backgroundColor, color: customTheme.textColor, border: `1px solid ${customTheme.accentColor}` }}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase mb-1 opacity-70" style={{ color: customTheme.textColor }}>
                Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customTheme.textColor}
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={customTheme.textColor}
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="flex-1 px-2 py-1 text-xs rounded font-mono"
                  style={{ backgroundColor: customTheme.backgroundColor, color: customTheme.textColor, border: `1px solid ${customTheme.accentColor}` }}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase mb-1 opacity-70" style={{ color: customTheme.textColor }}>
                Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customTheme.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={customTheme.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                  className="flex-1 px-2 py-1 text-xs rounded font-mono"
                  style={{ backgroundColor: customTheme.backgroundColor, color: customTheme.textColor, border: `1px solid ${customTheme.accentColor}` }}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase mb-1 opacity-70" style={{ color: customTheme.textColor }}>
                Panel Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customTheme.panelColor}
                  onChange={(e) => handleColorChange('panelColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={customTheme.panelColor}
                  onChange={(e) => handleColorChange('panelColor', e.target.value)}
                  className="flex-1 px-2 py-1 text-xs rounded font-mono"
                  style={{ backgroundColor: customTheme.backgroundColor, color: customTheme.textColor, border: `1px solid ${customTheme.accentColor}` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Font Settings */}
        <div className="p-4 rounded" style={{ backgroundColor: customTheme.panelColor }}>
          <label className="block text-xs font-bold uppercase mb-3" style={{ color: customTheme.textColor }}>
            Font Settings
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] uppercase mb-1 opacity-70" style={{ color: customTheme.textColor }}>
                Font Family
              </label>
              <select
                value={customTheme.fontFamily}
                onChange={(e) => handleColorChange('fontFamily', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded"
                style={{ backgroundColor: customTheme.backgroundColor, color: customTheme.textColor, border: `1px solid ${customTheme.accentColor}` }}
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font.value} value={font.value} style={{ backgroundColor: customTheme.backgroundColor }}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase mb-1 opacity-70" style={{ color: customTheme.textColor }}>
                Font Size: {customTheme.fontSize}px
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFontSizeChange(-1)}
                  className="px-3 py-1 text-xs rounded"
                  style={{ backgroundColor: customTheme.accentColor, color: customTheme.backgroundColor }}
                >
                  -
                </button>
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={customTheme.fontSize}
                  onChange={(e) => setCustomTheme({ ...customTheme, fontSize: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <button
                  onClick={() => handleFontSizeChange(1)}
                  className="px-3 py-1 text-xs rounded"
                  style={{ backgroundColor: customTheme.accentColor, color: customTheme.backgroundColor }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RPC Configuration */}
        <div className="p-4 rounded" style={{ backgroundColor: customTheme.panelColor }}>
          <label className="block text-xs font-bold uppercase mb-2" style={{ color: customTheme.textColor }}>
            Solana RPC URL
          </label>
          <input
            type="text"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded font-mono"
            style={{ backgroundColor: customTheme.backgroundColor, color: customTheme.textColor, border: `1px solid ${customTheme.accentColor}` }}
          />
          <p className="text-[10px] mt-2 opacity-60" style={{ color: customTheme.textColor }}>
            The RPC endpoint used for blockchain interactions
          </p>
        </div>

        {/* Auto Update */}
        <div className="p-4 rounded flex items-center justify-between" style={{ backgroundColor: customTheme.panelColor }}>
          <div>
            <label className="block text-xs font-bold uppercase" style={{ color: customTheme.textColor }}>
              Auto-update Feed
            </label>
            <p className="text-[10px] opacity-60" style={{ color: customTheme.textColor }}>
              Automatically refresh market data every 5 seconds
            </p>
          </div>
          <button
            onClick={() => setAutoUpdate(!autoUpdate)}
            className="w-12 h-6 rounded transition-colors"
            style={{ backgroundColor: autoUpdate ? customTheme.accentColor : customTheme.backgroundColor, border: `1px solid ${customTheme.accentColor}` }}
          >
            <span
              className="block w-4 h-4 rounded transition-transform"
              style={{
                backgroundColor: autoUpdate ? customTheme.backgroundColor : customTheme.accentColor,
                transform: autoUpdate ? 'translateX(26px)' : 'translateX(4px)'
              }}
            />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={resetTheme}
            className="px-4 py-2 text-xs font-bold uppercase rounded"
            style={{ backgroundColor: customTheme.accentColor, color: customTheme.backgroundColor }}
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
