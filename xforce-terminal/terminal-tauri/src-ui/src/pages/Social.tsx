import React, { useState, useRef } from 'react';
import { invoke } from '@tauri-apps/api/core';

export function Social() {
    const [messages, setMessages] = useState<{ sender: string, text: string, file?: { name: string, type: string, hash?: string } }[]>([]);
    const [input, setInput] = useState('');
    const [peerId, setPeerId] = useState('');
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [nodeInfo, setNodeInfo] = useState<string>('Initializing P2P...');
    const fileInputRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const initNode = async () => {
            try {
                const info = await invoke<string>('start_social_node');
                setNodeInfo(info);
            } catch (err) {
                setNodeInfo('Failed to start P2P node');
                console.error(err);
            }
        };
        initNode();
    }, []);

    const sendMessage = async () => {
        if (!input.trim() && !attachedFile) return;

        const messageText = input;
        const currentFile = attachedFile;

        setMessages(prev => [...prev, {
            sender: 'You',
            text: messageText,
            file: currentFile ? { name: currentFile.name, type: currentFile.type } : undefined
        }]);

        setInput('');
        setAttachedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';

        try {
            const chatUrl = `/chat/${peerId || 'public'}`;
            if (currentFile) {
                // Note: In production, use @tauri-apps/plugin-dialog to get real path
                const res = await invoke<string>('share_file_p2p', {
                    chatUrl,
                    filePath: currentFile.name
                });
                console.log(res);
            }
            if (messageText.trim()) {
                await invoke('send_p2p_message', {
                    chatUrl,
                    message: messageText
                });
            }
        } catch (error) {
            console.error("Failed to send:", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachedFile(e.target.files[0]);
        }
    };

    const connectPeer = async () => {
        try {
            const res = await invoke<string>('connect_peer', { peerPubkey: peerId });
            console.log(res);
            setMessages(prev => [...prev, { sender: 'System', text: `Directly connected/subscribed to: ${peerId}` }]);
        } catch (error) {
            console.error("Connection failed:", error);
            setMessages(prev => [...prev, { sender: 'System', text: `Connection failed: ${error}` }]);
        }
    };

    return (
        <div className="panel flex-1 flex flex-col h-full" style={{ padding: '20px' }}>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-accent)' }}>Social-Fi P2P</h2>
                <p className="text-sm opacity-70">Connect directly with peers using Iroh QUIC/HTTP3.</p>
                <div className="text-[10px] opacity-50 mt-1 font-mono">{nodeInfo}</div>
            </div>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={peerId}
                    onChange={(e) => setPeerId(e.target.value)}
                    placeholder="Enter Peer ID to connect..."
                    className="flex-1 bg-surface p-2 rounded border border-[var(--border-color)]"
                />
                <button onClick={connectPeer} className="bg-[var(--primary-color)] text-white px-4 py-2 rounded font-bold">
                    Connect
                </button>
            </div>

            <div className="flex-1 flex flex-col border border-[var(--border-color)] rounded bg-surface overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {messages.length === 0 ? (
                        <div className="text-center opacity-50 mt-10">No messages yet. Start a conversation or share a strategy.</div>
                    ) : messages.map((msg, idx) => (
                        <div key={idx} className={`p-2 rounded max-w-[80%] flex flex-col ${msg.sender === 'You' ? 'bg-[var(--primary-color)] text-white self-end ml-auto' : 'bg-[var(--bg-color)]'}`}>
                            <div className="text-xs opacity-70 mb-1">{msg.sender}</div>
                            {msg.text && <div>{msg.text}</div>}
                            {msg.file && (
                                <div className="mt-2 p-2 bg-black bg-opacity-20 rounded flex items-center gap-2 text-sm border border-white border-opacity-10">
                                    <span className="text-xl">📄</span>
                                    <div className="flex-1 truncate">
                                        <div className="font-bold truncate">{msg.file.name}</div>
                                        <div className="text-xs opacity-70 cursor-pointer hover:underline">Click to save</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="px-2 pt-2 border-t border-[var(--border-color)]">
                    {attachedFile && (
                        <div className="flex items-center gap-2 p-2 bg-surface rounded mb-2 text-sm border border-[var(--primary-color)]">
                            <span>📎 {attachedFile.name}</span>
                            <button
                                onClick={() => setAttachedFile(null)}
                                className="ml-auto text-red-500 hover:text-red-400 font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                    <div className="flex gap-2 pb-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-2 rounded bg-[var(--bg-color)] hover:bg-surface text-xl"
                            title="Attach File or Strategy"
                        >
                            📎
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type a message or share a strategy..."
                            className="flex-1 bg-[var(--bg-color)] p-2 rounded"
                        />
                        <button onClick={sendMessage} className="px-4 py-2 rounded bg-[var(--text-accent)] text-black font-bold">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
