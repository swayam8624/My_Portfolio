'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, X, Send, Zap, Heart, Brain, Sparkles, User, Bot } from 'lucide-react'
import type { ChatMessage } from '@/lib/types'

export function EnhancedAIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hey there, fellow human! 👋 I'm Swayam's AI doppelganger, trained on his research, projects, and probably too many Harry Potter references. Ask me about his work in cognitive AI, multi-agent systems, or why he thinks quantum computing is basically magic with extra math! 🧙‍♂️⚛️",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'calm' | 'brutal'>('calm')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setIsTyping(false)

      const response = generateAdvancedResponse(input, mode)

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

      for (let i = 0; i <= response.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20))
        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1].content = response.slice(0, i)
          return newMessages
        })
      }

    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "Oops! Looks like my neural networks got tangled up. Try asking me something else! 🤖",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const generateAdvancedResponse = (query: string, responseMode: 'calm' | 'brutal'): string => {
    const lowerQuery = query.toLowerCase()

    const responses = {
      research: {
        calm: "Swayam's research is absolutely fascinating!...",
        brutal: "Look, Swayam's research isn't just another academic paper..."
      },
      projects: {
        calm: "His projects are like a masterclass in applied AI!...",
        brutal: "Swayam doesn't mess around with toy projects..."
      },
      ai: {
        calm: "He's deep in the AI trenches!...",
        brutal: "Swayam's AI work is the real deal..."
      },
      quantum: {
        calm: "Ah, quantum computing! Swayam has this great way of explaining it...",
        brutal: "Quantum computing? Yeah, Swayam gets it..."
      }
    }

    let category = 'general'
    if (lowerQuery.includes('research') || lowerQuery.includes('publication') || lowerQuery.includes('paper')) {
      category = 'research'
    } else if (lowerQuery.includes('project') || lowerQuery.includes('code') || lowerQuery.includes('github')) {
      category = 'projects'
    } else if (lowerQuery.includes('ai') || lowerQuery.includes('machine learning') || lowerQuery.includes('neural')) {
      category = 'ai'
    } else if (lowerQuery.includes('quantum')) {
      category = 'quantum'
    }

    if (category !== 'general' && responses[category as keyof typeof responses]) {
      return responses[category as keyof typeof responses][responseMode]
    }

    const generalResponses = {
      calm: [
        "That's a really interesting question!...",
        "Great question! Swayam's work spans so many areas...",
        "I love that you're diving deep!..."
      ],
      brutal: [
        "Look, I don't have specific intel on that topic...",
        "Straight talk? That's outside my knowledge base...",
        "I don't have the specifics on that one..."
      ]
    }

    const responseArray = generalResponses[responseMode]
    return responseArray[Math.floor(Math.random() * responseArray.length)]
  }

  const quickQuestions = [
    "Tell me about his research",
    "What's NanoQuant?",
    "Multi-agent systems?",
    "Quantum computing work?",
    "His AI philosophy?"
  ]

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 shadow-2xl border-2 border-blue-400/20 hover:scale-110"
          size="icon"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[420px] h-[600px] bg-gray-900/95 backdrop-blur-xl border-gray-700/50 shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700/50">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4" /> Mirror Me
            <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400">AI Twin</Badge>
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMode(mode === 'calm' ? 'brutal' : 'calm')}
            className={`text-xs ${mode === 'calm' ? 'text-green-400' : 'text-red-400'}`}
          >
            {mode === 'calm' ? <Heart className="h-3 w-3 mr-1" /> : <Zap className="h-3 w-3 mr-1" />}
            {mode === 'calm' ? 'Zen Mode' : 'Brutal Truth'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-blue-600' : 'bg-purple-500'}`}>
                  {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${message.role === 'user' ? 'bg-blue-700 text-white rounded-br-md' : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-md'}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-gray-800 border border-gray-700 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Swayam..."
              className="flex-1 bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}