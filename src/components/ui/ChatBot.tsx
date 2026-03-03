"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi, I am Mree · AI. How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((p) => [...p, { role: "user", content: input }]);
        setInput("");
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setMessages((p) => [
                ...p,
                {
                    role: "assistant",
                    content:
                        "Thank you for reaching out! I'm currently in training, but I'll be fully ready to assist you soon. How else can I help you with MentorLeap?",
                },
            ]);
        }, 1200);
    };

    return (
        <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 9999 }}>
            {/* ── Chat window ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 280, damping: 24 }}
                        style={{
                            position: "absolute",
                            bottom: 72,
                            right: 0,
                            width: 350,
                            maxWidth: "calc(100vw - 40px)",
                            height: 500,
                            backgroundColor: "var(--color-cream)",
                            border: "1px solid var(--color-cream-border)",
                            borderRadius: 20,
                            boxShadow: "0 24px 64px rgba(13,27,62,0.18)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            backgroundColor: "var(--color-navy)",
                            padding: "16px 18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexShrink: 0,
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{
                                    width: 34, height: 34, borderRadius: "50%",
                                    backgroundColor: "rgba(201,168,76,0.15)",
                                    border: "1px solid rgba(201,168,76,0.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <Sparkles size={15} style={{ color: "var(--color-gold)" }} />
                                </div>
                                <div>
                                    <h3 style={{
                                        fontFamily: "var(--font-cormorant)", fontWeight: 500,
                                        fontSize: "1.1rem", lineHeight: 1,
                                        color: "var(--color-cream)", margin: 0,
                                    }}>
                                        Mree · AI
                                    </h3>
                                    <span style={{
                                        fontFamily: "var(--font-dm)", fontSize: "0.58rem",
                                        letterSpacing: "0.12em", textTransform: "uppercase",
                                        color: "rgba(201,168,76,0.55)",
                                    }}>
                                        Powered by MentorLeap
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    color: "rgba(250,250,247,0.45)", padding: 4,
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-cream)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(250,250,247,0.45)"; }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                padding: "16px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === "user" ? 8 : -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{
                                        display: "flex",
                                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                    }}
                                >
                                    <div style={{
                                        maxWidth: "85%",
                                        padding: "10px 14px",
                                        borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                                        backgroundColor: msg.role === "user" ? "var(--color-navy)" : "#fff",
                                        color: msg.role === "user" ? "var(--color-cream)" : "var(--color-navy)",
                                        fontFamily: "var(--font-dm)",
                                        fontSize: "0.82rem",
                                        lineHeight: 1.6,
                                        border: msg.role === "assistant" ? "1px solid var(--color-cream-border)" : "none",
                                    }}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {typing && (
                                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                    <div style={{
                                        padding: "10px 16px",
                                        borderRadius: "4px 16px 16px 16px",
                                        backgroundColor: "#fff",
                                        border: "1px solid var(--color-cream-border)",
                                        display: "flex", gap: 4, alignItems: "center",
                                    }}>
                                        {[0, 1, 2].map((d) => (
                                            <motion.span
                                                key={d}
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.15 }}
                                                style={{
                                                    width: 5, height: 5, borderRadius: "50%",
                                                    backgroundColor: "rgba(13,27,62,0.25)",
                                                    display: "block",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div style={{
                            padding: "12px 14px",
                            borderTop: "1px solid var(--color-cream-border)",
                            backgroundColor: "#fff",
                            flexShrink: 0,
                        }}>
                            <div style={{
                                display: "flex", alignItems: "center", gap: 8,
                                backgroundColor: "var(--color-cream)",
                                borderRadius: 999,
                                padding: "8px 8px 8px 16px",
                                border: "1px solid var(--color-cream-border)",
                            }}>
                                <input
                                    type="text"
                                    placeholder="Ask Mree anything..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    style={{
                                        flex: 1, background: "none", border: "none", outline: "none",
                                        fontFamily: "var(--font-dm)", fontSize: "0.82rem",
                                        color: "var(--color-navy)",
                                    }}
                                />
                                <button
                                    onClick={handleSend}
                                    style={{
                                        width: 32, height: 32, borderRadius: "50%",
                                        backgroundColor: input.trim() ? "var(--color-navy)" : "rgba(13,27,62,0.08)",
                                        border: "none", cursor: input.trim() ? "pointer" : "default",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "background-color 0.2s",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Send size={14} style={{ color: input.trim() ? "var(--color-gold)" : "rgba(13,27,62,0.3)" }} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating button ── */}
            <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "relative",
                    width: 52, height: 52,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-navy)",
                    border: "1px solid rgba(201,168,76,0.35)",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(13,27,62,0.25)",
                }}
            >
                {/* Pulse ring */}
                {!isOpen && (
                    <motion.span
                        animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        style={{
                            position: "absolute", inset: 0, borderRadius: "50%",
                            backgroundColor: "var(--color-gold)",
                            pointerEvents: "none",
                        }}
                    />
                )}

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={20} style={{ color: "var(--color-gold)" }} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageSquare size={20} style={{ color: "var(--color-gold)" }} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}