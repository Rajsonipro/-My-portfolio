import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, X, MessageCircle, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolioData.js';

const AIAssistant = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: `Hi there! 👋 I'm Raj's AI assistant. Chat casually or ask about skills/projects/education! Try "hi" or "projects?"` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const processQuery = (query) => {
    const q = query.toLowerCase().trim();
    let response = '';

// Greetings
    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      response = `Hi there! 👋 I'm Raj's AI assistant. Ask me about skills, projects, education, or just chat! Try "how are you?" or "tell me about projects".`;
    }
    // Small talk
    else if (q.includes('how are you') || q.includes('how r u') || q.includes('howdy')) {
      response = `I'm doing great, thanks for asking! 😊 What would you like to know about Raj's portfolio?`;
    }
    // Thanks
    else if (q.includes('thank') || q.includes('thanks')) {
      response = `You're welcome! Happy to help. 😄 Is there anything else about Raj's work?`;
    }
    // Bye
    else if (q.includes('bye') || q.includes('goodbye') || q.includes('see ya')) {
      response = `Bye! Have a great day! 👋 Feel free to come back anytime for portfolio info.`;
    }
    // Personal
    else if (q.includes('name') || q.includes('who are') || q.includes('introduce')) {
      response = `${portfolioData.personal.name}, ${portfolioData.personal.role}. ${portfolioData.personal.bio}`;
    }
    // Contact
    else if (q.includes('email') || q.includes('contact') || q.includes('reach')) {
      response = `Email: ${portfolioData.personal.email}\nGitHub: ${portfolioData.social.github}\nLinkedIn: ${portfolioData.social.linkedin}`;
    }
    // Skills
    else if (q.includes('skill') || q.includes('tech') || q.includes('technology')) {
      response = 'My top skills:\n' + portfolioData.skills.map(s => `- ${s.name} (${s.level}%)`).join('\n');
    }
    // Tech stack
    else if (q.includes('stack') || q.includes('tools')) {
      response = `Tech stack: ${portfolioData.techStack.join(', ')}`;
    }
    // Projects
    else if (q.includes('project') || q.includes('built') || q.includes('work')) {
      response = 'Featured projects:\n' + portfolioData.projects.map(p => `• ${p.title}: ${p.description}`).join('\n');
    }
    // Education
    else if (q.includes('education') || q.includes('college') || q.includes('degree')) {
      response = 'Education:\n' + portfolioData.education.map(e => `• ${e.degree} at ${e.institution} (${e.period})`).join('\n');
    }
    // Experience
    else if (q.includes('experience') || q.includes('intern') || q.includes('job')) {
      response = 'Experience:\n' + portfolioData.experience.map(exp => `• ${exp.title} at ${exp.org} (${exp.period})`).join('\n');
    }
    // Stats
    else if (q.includes('stats') || q.includes('number') || q.includes('how many')) {
      response = `Stats: ${portfolioData.stats.projects} projects, ${portfolioData.stats.yearsCoding} years coding, ${portfolioData.stats.certifications} certifications.`;
    }
    // Help
    else if (q.includes('help') || q.includes('what can you') || q.includes('/help')) {
      response = 'I can help with: skills, projects, education, experience, contact, tech stack. Examples: "projects?", "skills?", "email?"';
    }
    // Help
    else if (q.includes('help') || q.includes('/help')) {
      response = 'I can help with greetings, small talk, or portfolio: skills, projects, education, experience, contact, tech stack. Examples: "hi", "how are you", "projects?", "email?"';
    }
    // Default
    else {
      response = `Hmm, "${query}"? Not sure, but ask about Raj\'s skills/projects/education or say hi/thanks/bye! 😊`;
    }

    return response;
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const aiResponse = processQuery(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'ai', content: `Chat cleared! Ask anything about Raj's portfolio.` }]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 glass p-4 rounded-2xl border border-white/10 hover:border-[var(--neon-cyan)]/40 hover:bg-white/5 shadow-2xl glow-cyan"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)' }}
      >
        <MessageCircle size={24} className="text-[var(--neon-cyan)]" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-6 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col border border-white/10 shadow-2xl backdrop-blur-xl"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)' }}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center">
                    <Sparkles size={16} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[var(--text-primary)]">Raj's AI Assistant</h3>
                    <p className="text-xs text-[var(--text-secondary)]">Ask about portfolio</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={clearChat} className="p-2 hover:bg-white/5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] transition-all">
                    Clear
                  </button>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] transition-all"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' 
                      ? 'bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-black font-medium' 
                      : 'glass border border-white/10 bg-[rgba(255,255,255,0.03)]'
                    }`}>
                      <div className="font-body text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="glass border border-white/10 p-4 rounded-2xl max-w-[85%]">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-bounce [animation-delay:0.1s]" />
                        <div className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-bounce [animation-delay:0.3s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/10">
                <div className="glass rounded-2xl p-3 border border-white/5 flex items-center gap-3 max-h-14 overflow-hidden">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${isTyping ? 'text-[var(--neon-cyan)]' : 'text-[var(--text-secondary)]'}`}>
                    {isTyping ? <Bot size={12} /> : <User size={12} />}
                  </div>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question..."
                    className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm"
                    disabled={isTyping}
                    onFocus={() => inputRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  />
                  <motion.button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] disabled:opacity-50 transition-colors"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;

