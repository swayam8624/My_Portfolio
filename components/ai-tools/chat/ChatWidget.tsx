'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Zap, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { ChatInput } from './ChatInput'
import { ChatMessage } from './ChatMessage'
import { TypingIndicator } from './TypingIndicator'
import type { ChatMessage as MessageType } from '@/lib/types'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: 'assistant',
      content: `Hey there! I'm Swayam's AI twin 🧙‍♂️ Ask me anything about his research, projects, or why he thinks quantum computing is basically magic with extra steps.`,
      timestamp: new Date()
    }
  ])
  const [mode, setMode] = useState<'calm' | 'brutal'>('calm')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (input: string) => {
    const userMessage: MessageType = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      const res = await fetch('/api/ai/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, mode }),
      })

      const data = await res.json()

      const aiMessage: MessageType = {
        role: 'assistant',
        content: data.output,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsTyping(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-900 border-gray-700 shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-700">
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
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={scrollRef} />
        </div>
        <ChatInput onSend={handleSend} isDisabled={isTyping} />
      </CardContent>
    </Card>
  )
}
