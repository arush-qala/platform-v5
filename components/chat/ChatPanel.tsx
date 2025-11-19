'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Paperclip, Image as ImageIcon } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'brand'
  timestamp: Date
}

interface ChatPanelProps {
  brandName: string
  isOpen: boolean
  onClose: () => void
}

export function ChatPanel({ brandName, isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! Welcome to ${brandName}. How can we assist you today?`,
      sender: 'brand',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')

    // Simulate brand response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message. A member of our team will respond shortly.',
        sender: 'brand',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-charcoal/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-96 bg-ivory shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-warm-grey flex items-center justify-between bg-sand">
              <div>
                <h3 className="text-xl font-cormorant text-deep-charcoal">
                  {brandName}
                </h3>
                <p className="text-sm text-taupe">Usually responds in a few hours</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center hover:bg-warm-grey rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === 'user'
                        ? 'bg-deep-charcoal text-ivory'
                        : 'bg-sand text-charcoal'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-warm-grey' : 'text-taupe'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 border-t border-warm-grey bg-sand/50">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-ivory hover:bg-warm-grey text-xs text-charcoal rounded-full transition-colors">
                  Request Lookbook
                </button>
                <button className="px-3 py-1.5 bg-ivory hover:bg-warm-grey text-xs text-charcoal rounded-full transition-colors">
                  Pricing Info
                </button>
                <button className="px-3 py-1.5 bg-ivory hover:bg-warm-grey text-xs text-charcoal rounded-full transition-colors">
                  Samples
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t border-warm-grey bg-ivory">
              <div className="flex gap-2 mb-3">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-sand rounded-full transition-colors">
                  <Paperclip className="w-5 h-5 text-taupe" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-sand rounded-full transition-colors">
                  <ImageIcon className="w-5 h-5 text-taupe" />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border-2 border-warm-grey focus:border-gold-accent bg-surface rounded-sm focus:outline-none transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 flex items-center justify-center bg-deep-charcoal hover:bg-charcoal disabled:opacity-30 disabled:cursor-not-allowed text-ivory rounded-sm transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-taupe mt-3 text-center">
                Real-time chat powered by WebSocket connection
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

