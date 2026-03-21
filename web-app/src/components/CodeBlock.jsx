import { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Import Prism languages
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-python';

// Import a Prism theme (tomorrow night matches dark theme)
import 'prismjs/themes/prism-tomorrow.css';

export default function CodeBlock({ title, code, language = 'rust', explanation }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Map our language names to Prism's
  const prismLanguage = language === 'python' ? 'python' : 'rust';
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-red-400 font-heading">{title}</h3>
        <button
          onClick={handleCopy}
          className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white px-3 py-1 rounded transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      {explanation && (
        <p className="text-gray-400 mb-4 font-sans text-sm leading-relaxed">{explanation}</p>
      )}
      
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        {/* Code header with language indicator */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-500 uppercase font-semibold">{language}</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        {/* Code content with Prism highlighting */}
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed !bg-gray-900 !m-0">
          <code ref={codeRef} className={`language-${prismLanguage}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
