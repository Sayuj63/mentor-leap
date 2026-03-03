"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi, I am Mree - Ai. How can I help you?" },
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        // Dummy reply
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Thank you for reaching out! I'm currently in training, but I'll be fully ready to assist you soon. How else can I help you with MentorLeap?",
                },
            ]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[9999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-40px)] bg-cream border border-cream-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ height: "500px" }}
                    >
                        {/* Header */}
                        <div className="bg-navy p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
                                    <Sparkles size={16} className="text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-cream font-cormorant font-500 text-lg leading-none">Mree - Ai</h3>
                                    <span className="text-gold/60 text-[10px] uppercase font-dm tracking-widest">Powered by MentorLeap</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-cream/50 hover:text-cream transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold scrollbar-track-cream"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl font-dm text-sm leading-relaxed ${msg.role === "user"
                                                ? "bg-navy text-cream rounded-tr-none"
                                                : "bg-white text-text-primary border border-cream-border rounded-tl-none"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-cream-border bg-white">
                            <div className="flex items-center gap-2 bg-cream rounded-full px-4 py-2 border border-cream-border transition-focus-within focus-within:border-gold/50">
                                <input
                                    type="text"
                                    placeholder="Ask Mree anything..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm font-dm py-1 placeholder:text-text-muted/50"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    className="text-gold hover:text-gold-light transition-colors cursor-pointer"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-navy text-gold shadow-xl flex items-center justify-center border border-gold/30 cursor-pointer relative group"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageSquare size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Glow effect */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-gold/20 blur-md group-hover:bg-gold/30 transition-colors animate-pulse" />
                )}
            </motion.button>
        </div>
    );
}
