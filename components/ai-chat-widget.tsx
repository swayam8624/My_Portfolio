'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, X, Send, Zap, Heart } from 'lucide-react'
import { ChatMessage } from '@/lib/types'

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hey there! I'm Swayam's AI twin 🧙‍♂️ Ask me anything about his research, projects, or why he thinks quantum computing is basically magic with extra steps.",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'calm' | 'brutal'>('calm')
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

    try {
      // Simulate AI response with personality
      const responses = {
        calm: [
          "That's a fascinating question! Based on Swayam's work, I'd say...",
          "Great question! From what I know about his research...",
          "Interesting perspective! Let me share what I know...",
        ],
        brutal: [
          "Alright, buckle up buttercup, here's the real deal...",
          "Oh, you want the unfiltered truth? Here we go...",
          "Time for some brutal honesty - no sugar coating...",
        ]
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      const responsePrefix = responses[mode][Math.floor(Math.random() * responses[mode].length)]
      const aiResponse: ChatMessage = {
        role: 'assistant',
        content: `${responsePrefix} ${generateContextualResponse(input)}`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateContextualResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('research') || lowerQuery.includes('publication')) {
      return "Swayam's research focuses on cognitive AI and memory enhancement systems. His published work on 'Memory Retrieval Cue' explores EEG-based brain-computer interfaces - basically, he's trying to give humans a save/load feature like in video games! 🎮"
    }
    
    if (lowerQuery.includes('project') || lowerQuery.includes('code')) {
      return "His projects range from NanoQuant (compressing LLMs like a digital Marie Kondo) to multi-agent systems that probably argue with each other in Python. Check out his GitHub - it's like a treasure trove of 'how did he even think of this?' moments."
    }
    
    if (lowerQuery.includes('ai') || lowerQuery.includes('machine learning')) {
      return "He's deep into the AI rabbit hole - CrewAI, LangChain, PyTorch, the whole shebang. Think of him as someone who speaks fluent 'neural network' and probably dreams in tensors. His specialty is making AI systems that actually work in the real world, not just in Jupyter notebooks."
    }
    
    if (lowerQuery.includes('quantum')) {
      return "Ah, quantum computing! Swayam sees it as 'magic with extra steps' - which is honestly the most accurate description I've heard. He's working on quantum-classical hybrid systems, basically trying to make Schrödinger's cat useful for actual computation."
    }
    
    return "That's an interesting question! While I don't have specific information about that in my knowledge base, I can tell you that Swayam approaches problems with a unique blend of rigorous research methodology and creative problem-solving. He's the kind of person who'd probably find a way to make it both technically sound and surprisingly elegant."
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-900 border-gray-700 shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-700">
        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
          🧙‍♂️ Mirror Me
          <Badge variant="outline" className="text-xs border-gray-600">
            AI Twin
          </Badge>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMode(mode === 'calm' ? 'brutal' : 'calm')}
            className={`text-xs ${mode === 'calm' ? 'text-green-400' : 'text-red-400'}`}
          >
            {mode === 'calm' ? <Heart className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
            {mode === 'calm' ? 'Calm' : 'Brutal'}
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
      
      <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-100 border border-gray-700'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-sm text-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Swayam..."
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
