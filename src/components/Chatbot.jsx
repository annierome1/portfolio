import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaExpand, FaCompress, FaPaperPlane, FaTrash } from "react-icons/fa";
import "../styles/chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
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
            const API_BASE_URL = 'https://chatbotannie-production-65d9.up.railway.app';
            
            // Debug: Log the request details
            console.log("🚀 Making request to:", `${API_BASE_URL}/chat`);
            console.log("📤 Request body:", { message: input, session_id: "session_123" });
            
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, session_id: "session_123" }),
            });
            
            // Debug: Log response details
            console.log("📥 Response status:", response.status);
            console.log("📥 Response headers:", Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ API Error Response:", errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

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
            console.error("❌ Chatbot Error Details:");
            console.error("Error type:", error.constructor.name);
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
            
            // Add user-friendly error message
            const errorMessage = { 
                role: "bot", 
                content: `Sorry, I'm having trouble connecting right now. Error: ${error.message}` 
            };
            setMessages((prev) => [...prev, errorMessage]);
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

    // Test API connectivity
    const testAPI = async () => {
        try {
            console.log("🔍 Testing API connectivity...");
            const response = await fetch("https://chatbotannie-production.up.railway.app", {
                method: "GET",
            });
            console.log("✅ API Health Check Status:", response.status);
            console.log("✅ API Health Check Headers:", Object.fromEntries(response.headers.entries()));
            
            if (response.ok) {
                const text = await response.text();
                console.log("✅ API Response:", text.substring(0, 200) + "...");
            }
        } catch (error) {
            console.error("❌ API Health Check Failed:", error);
        }
    };

    // Test API on component mount
    useEffect(() => {
        testAPI();
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Toggle button as icon, only visible when chat is closed */}
            {!isOpen && (
                <button
                    className="chat-toggle-btn"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chatbot"
                >
                    <FaComments className="chat-icon" />
                    <span className="chat-pulse"></span>
                </button>
            )}

            {/* Chat window, only visible when open */}
            {isOpen && (
                <div className={`chatbot-wrapper ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    <div className="chat-container show-chat">
                        <div className="chat-header">
                            <div className="header-content">
                                <div className="header-info">
                                    <h2>Chat with me</h2>
                                </div>
                                <div className="header-actions">
                                    <button 
                                        className="expand-btn" 
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        aria-label={isExpanded ? "Collapse" : "Expand"}
                                    >
                                        {isExpanded ? <FaCompress /> : <FaExpand />}
                                    </button>
                                    <button className="close-btn" onClick={() => setIsOpen(false)}>
                                        ✖
                                    </button>
                                </div>
                            </div>
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
                        <div className="chat-input">
                            <div className="input-container">
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
                                    className="message-input"
                                />
                                <button className="send-btn" onClick={sendMessage} disabled={!input.trim()}>
                                    <FaPaperPlane />
                                </button>
                            </div>
                            <button className="clear-btn" onClick={clearMessages} title="Clear conversation">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;