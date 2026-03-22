import { useState } from 'react';
import { useTerminalStore } from '../stores/terminalStore';

export function Login() {
  const { isLightMode, setIsLightMode, setIsAuthenticated } = useTerminalStore();
  const [showForm, setShowForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!showForm) {
        setShowForm(true);
      } else {
        handleSubmit(e as any);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    const payload = isSignup
      ? { username, email, password }
      : { email_or_username: username || email, password };

    try {
      const resp = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Success
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col font-sans relative overflow-hidden focus:outline-none ${isLightMode ? 'bg-white text-black' : 'bg-black text-[#a0a0a0]'}`}
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      {/* Top Header Controls */}
      <div className="flex w-full mt-1 px-1 gap-1 font-mono h-8">
        {/* Light/Dark Toggle */}
        <div className="ml-auto text-xs flex items-center gap-2 pr-4">
          <label className="flex items-center cursor-pointer gap-2">
            <span className={`${isLightMode ? 'text-black' : 'text-gray-400'}`}>Light Mode</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isLightMode} onChange={toggleLightMode} />
              <div className={`block w-8 h-4 rounded-full ${isLightMode ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-2 h-2 rounded-full transition-transform ${isLightMode ? 'transform translate-x-4' : ''}`}></div>
            </div>
          </label>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl w-full">

          {/* Left Column: Branding / Forms */}
          <div className="flex flex-col justify-center">

            <h1 className={`text-6xl font-bold tracking-tight mb-0 ${isLightMode ? 'text-black' : 'text-white'}`}>
              XFTerminal
            </h1>
            <h2 className={`text-2xl font-bold tracking-widest uppercase mb-12 ${isLightMode ? 'text-black' : 'text-white'}`}>
              ANYWHERE
            </h2>

            {!showForm ? (
              <div className="flex items-center gap-4 mt-4">
                <div
                  className={`text-lg cursor-pointer ${isLightMode ? 'text-blue-600 hover:text-blue-800' : 'text-[#00d4ff] hover:text-white'} transition-colors inline-block`}
                  onClick={() => setShowForm(true)}
                >
                  &lt;Enter&gt; or &lt;GO&gt; to begin
                </div>
                <span className={isLightMode ? 'text-gray-400' : 'text-gray-600'}>|</span>
                <button
                  type="button"
                  className={`text-sm px-3 py-1 border transition-colors font-mono ${isLightMode
                      ? 'border-gray-400 text-gray-500 hover:border-black hover:text-black'
                      : 'border-gray-700 text-gray-500 hover:border-gray-400 hover:text-gray-300'
                    }`}
                  onClick={() => setIsAuthenticated(true)}
                >
                  bypass login
                </button>
              </div>
            ) : (
              <div className="w-full max-w-sm mt-4 p-0">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  {isSignup ? (
                    <>
                      <label className={`text-lg ${isLightMode ? 'text-black' : 'text-white'}`}>Username</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-2 py-1 w-full outline-none border-none bg-white text-black font-mono"
                        required
                      />
                      <label className={`text-lg mt-2 ${isLightMode ? 'text-black' : 'text-white'}`}>Email address</label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-2 py-1 w-full outline-none border-none bg-white text-black font-mono"
                        required
                      />
                    </>
                  ) : (
                    <>
                      <label className={`text-lg ${isLightMode ? 'text-black' : 'text-white'}`}>Login Name</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-2 py-1 w-full outline-none border-none bg-white text-black font-mono"
                        required
                      />
                    </>
                  )}

                  <label className={`text-lg mt-2 ${isLightMode ? 'text-black' : 'text-white'}`}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-2 py-1 w-full outline-none border-none bg-white text-black font-mono"
                    required
                  />

                  {error && <div className="text-red-500 text-xs mt-1">{error}</div>}

                  <div className="mt-6 flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-32 py-1 font-bold transition-colors ${loading ? 'opacity-50' : ''} bg-[#4a4a4a] text-[#d0d0d0] hover:bg-[#5a5a5a] text-lg`}
                    >
                      {loading ? '...' : 'Login'}
                    </button>

                    <div className="text-xs">
                      <span className={`${isLightMode ? 'text-gray-600' : 'text-[#6b7280]'}`}>
                        {isSignup ? 'Already have an account?' : 'Need an account?'}
                      </span>
                      <button
                        type="button"
                        className={`ml-2 underline hover:text-blue-500 ${isLightMode ? 'text-black' : 'text-white'}`}
                        onClick={() => {
                          setIsSignup(!isSignup);
                          setError('');
                        }}
                      >
                        {isSignup ? 'Login' : 'Sign Up'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Static Language Options (Bloomberg mimic) */}
          <div className="flex flex-col justify-center text-sm md:text-base font-mono">
            <p className="mb-6">
              Select Language for Analytics and<br />Communication Functions:
            </p>

            <div className="grid grid-cols-3 gap-y-4 gap-x-2 mb-12">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 ${isLightMode ? 'bg-black' : 'bg-white'} inline-block`} style={{ clipPath: 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)' }}></span>
                <span className={isLightMode ? 'text-black font-bold' : 'text-white font-bold'}>English</span>
              </div>
              <div className="text-[#f59e0b]">Español</div>
              <div className="text-[#f59e0b]">한국어</div>
              <div className="text-[#f59e0b]">日本語</div>
              <div className="text-[#f59e0b]">Português</div>
              <div className="text-[#f59e0b]">简体中文</div>
              <div className="text-[#f59e0b]">Français</div>
              <div className="text-[#f59e0b]">Italiano</div>
              <div className="text-[#f59e0b]">Русский</div>
              <div className="text-[#f59e0b]">Deutsch</div>
              <div className="text-[#f59e0b]">繁體中文</div>
            </div>

            <p className={`mt-4 ${isLightMode ? 'text-black' : 'text-white'}`}>
              To customize your News language experience<br />
              type LANG &lt;GO&gt; after login.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Area removed as requested */}
    </div>
  );
}
