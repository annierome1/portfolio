import React, { useState, useEffect, useRef } from "react";
import { FaComments } from "react-icons/fa";
import "../styles/chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [streamingResponse, setStreamingResponse] = useState("");
    const eventSourceRef = useRef(null); 
    const chatBoxRef = useRef(null);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { role: "user", content: input };
        setMessages((prev) => {
            const updatedMessages = [...prev, userMessage];
            scrollToBottom();
            return updatedMessages;
        });
        setInput("");
        setStreamingResponse("");
        setIsTyping(true);

        try {
            const API_BASE_URL = "https://chatbotannie-production.up.railway.app"; 
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, session_id: "session_123" }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let botMessage = { role: "bot", content: "" };
            let firstChunk = true;

            setMessages((prev) => {
                const updatedMessages = [...prev, botMessage];
                scrollToBottom();
                return updatedMessages;
            });

            let buffer = "";
            const updateInterval = 100;
            let lastUpdateTime = Date.now();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;
                const now = Date.now();

                if (firstChunk || now - lastUpdateTime > updateInterval) {
                    botMessage.content += buffer;
                    setMessages((prev) => {
                        const updated = [...prev.slice(0, -1), { ...botMessage }];
                        scrollToBottom();
                        return updated;
                    });
                    buffer = "";
                    lastUpdateTime = now;
                    if (firstChunk) {
                        firstChunk = false;
                        setIsTyping(false);
                    }
                }
            }

            if (buffer.length > 0) {
                botMessage.content += buffer;
                setMessages((prev) => {
                    const updated = [...prev.slice(0, -1), { ...botMessage }];
                    scrollToBottom();
                    return updated;
                });
            }

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsTyping(false);
        }

        setInput(""); 
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);  

    const clearMessages = () => {
        setMessages([]); 
        setStreamingResponse(""); 
        setIsTyping(false);
        if (eventSourceRef.current) {
            eventSourceRef.current.close(); 
            eventSourceRef.current = null;
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Toggle button as icon, only visible when chat is closed */}
            {!isOpen && (
                <button
                    className="bg-purple-200 hover:bg-purple-100 text-gray-900 rounded-full shadow-lg p-4 flex items-center justify-center"
                    style={{ width: 60, height: 60 }}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chatbot"
                >
                    <FaComments size={28} />
                </button>
            )}

            {/* Chat window, only visible when open */}
            {isOpen && (
                <div className="chatbot-wrapper" style={{ width: "400px", maxWidth: "90vw" }}>
                    <div className="chat-container show-chat">
                        <div className="chat-header">
                            <h2>Chat with me</h2>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                ✖
                            </button>
                        </div>
                        <div
                            className="chatbox"
                            ref={chatBoxRef}
                            style={{ flex: 1, overflowY: "auto"}}
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={msg.role === "user" ? "user-message" : "bot-message"}
                                >
                                    {msg.content}
                                </div>
                            ))}
                            {streamingResponse && (
                                <div className="bot-message">{streamingResponse}</div>
                            )}
                            {isTyping && (
                                <div className="bot-typing">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div
                            className="chat-input"
                            style={{ display: "flex", padding: "10px", backgroundColor: "#111827" }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e)=> {
                                    if (e.key === "Enter"){
                                        sendMessage();
                                        e.preventDefault();
                                    }
                                }}
                                placeholder="Ask me anything..."
                                style={{ flex: 1, marginRight: "5px" }}
                            />
                            <button className="send" onClick={sendMessage}>
                                Send
                            </button>
                            <button className="clear" onClick={clearMessages}>
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;