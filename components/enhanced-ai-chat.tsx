'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, X, Send, Zap, Heart, Brain, Sparkles, User, Bot } from 'lucide-react'
import { ChatMessage } from '@/lib/types'

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
      // Simulate more realistic typing delay
      await new Promise(resolve => setTimeout(resolve, 800))
      setIsTyping(false)
      
      // Generate contextual response
      const response = generateAdvancedResponse(input, mode)
      
      // Simulate streaming effect
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      
      // Stream the response character by character
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
        calm: "Swayam's research is absolutely fascinating! His work on 'Memory Retrieval Cue' combines EEG-based brain-computer interfaces with deep learning to enhance human memory. Think of it as giving your brain a 'save game' feature - he's literally working on making human memory more like a computer's RAM, but way cooler! 🧠✨",
        brutal: "Look, Swayam's research isn't just another academic paper collecting digital dust. His Memory Retrieval Cue framework is genuinely groundbreaking - he's using CNN+LSTM architectures on EEG data to predict memory recall with 27% better accuracy than existing methods. While others are writing theoretical papers, he's building actual brain-computer interfaces. The man's basically trying to debug human memory like it's code. 🔬"
      },
      projects: {
        calm: "His projects are like a masterclass in applied AI! Take NanoQuant - he compressed an 8GB language model down to 0.8GB while keeping 98.2% accuracy. That's like fitting an entire library into a pocket book without losing any of the good stuff! His multi-agent systems work is equally impressive, especially the CrewAI implementation that reduced manual intervention by 60%. 🚀",
        brutal: "Swayam doesn't mess around with toy projects. NanoQuant? That's serious model optimization - LoRA, structured pruning, quantization, the whole nine yards. Most people talk about efficiency; he actually delivers it. His content orchestration system using LangGraph isn't just another chatbot wrapper - it's a full pipeline for AI-driven media generation. Real engineering, not just API calls. 💪"
      },
      ai: {
        calm: "He's deep in the AI trenches! Swayam specializes in multi-agent systems, cognitive AI, and making neural networks actually useful in the real world. His approach combines rigorous research with practical deployment - he's not just training models, he's building intelligent systems that solve actual problems. Plus, his work bridges neuroscience and AI in really innovative ways! 🤖",
        brutal: "Swayam's AI work is the real deal. While everyone's hyping up ChatGPT wrappers, he's building cognitive architectures that interface with human brains via EEG. His multi-agent systems using CrewAI aren't just orchestrating API calls - they're implementing actual reinforcement learning to optimize decision-making. He understands the math, the implementation, AND the deployment. Rare combo. 🎯"
      },
      quantum: {
        calm: "Ah, quantum computing! Swayam has this great way of explaining it - he calls it 'magic with extra steps' which is honestly the most accurate description ever. He's working on quantum-classical hybrid systems, trying to make Schrödinger's cat useful for actual computation. It's like he's building bridges between the weird quantum world and our classical computers! ⚛️",
        brutal: "Quantum computing? Yeah, Swayam gets it. He's not just throwing around buzzwords like 'quantum supremacy' - he's actually working on hybrid quantum-classical algorithms. The guy understands that current quantum computers are noisy, limited, and overhyped, but he's still finding ways to extract real computational advantages. That's the kind of pragmatic quantum research we need. 🔬"
      }
    }
    
    // Determine response category
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
    
    // General responses
    const generalResponses = {
      calm: [
        "That's a really interesting question! While I don't have specific details about that in my knowledge base, I can tell you that Swayam approaches every problem with a unique blend of rigorous methodology and creative thinking. He's the kind of researcher who'd probably find an elegant solution that nobody else thought of! 🤔",
        "Great question! Swayam's work spans so many areas - from cognitive AI to quantum computing. Even if I don't have the exact answer, I know he'd appreciate the curiosity behind your question. His research philosophy is all about pushing boundaries and asking the right questions! 💭",
        "I love that you're diving deep! While that specific topic might not be in my training data, Swayam's interdisciplinary approach means he's always connecting dots between different fields. His work often surprises people with unexpected insights! ✨"
      ],
      brutal: [
        "Look, I don't have specific intel on that topic, but here's what I know about Swayam's approach: he doesn't do surface-level work. If he's tackling a problem, he's going deep into the fundamentals, understanding the math, and building something that actually works. No hand-waving, no shortcuts. 🎯",
        "Straight talk? That's outside my knowledge base. But knowing Swayam's track record, if he were to approach that problem, he'd probably start by questioning the basic assumptions everyone else takes for granted. The guy has a knack for finding the real bottlenecks. 🔍",
        "I don't have the specifics on that one, but Swayam's methodology is pretty consistent: understand the theory, implement it properly, test it rigorously, and deploy it in the real world. None of this 'it works on my machine' nonsense. 💪"
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
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 shadow-2xl border-2 border-blue-400/20 transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <div className="relative">
            <MessageCircle className="h-7 w-7" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </Button>
        <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with AI Swayam
        </div>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[420px] h-[600px] bg-gray-900/95 backdrop-blur-xl border-gray-700/50 shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <CardTitle className="text-lg font-bold text-white flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              Mirror Me
              <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400">
                AI Twin
              </Badge>
            </div>
            <div className="text-xs text-gray-400 font-normal">Powered by Swayam's knowledge</div>
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMode(mode === 'calm' ? 'brutal' : 'calm')}
            className={`text-xs px-3 py-1 rounded-full transition-all duration-300 ${
              mode === 'calm' 
                ? 'text-green-400 bg-green-500/10 hover:bg-green-500/20' 
                : 'text-red-400 bg-red-500/10 hover:bg-red-500/20'
            }`}
          >
            {mode === 'calm' ? <Heart className="h-3 w-3 mr-1" /> : <Zap className="h-3 w-3 mr-1" />}
            {mode === 'calm' ? 'Zen Mode' : 'Brutal Truth'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-b border-gray-700/50">
            <div className="text-xs text-gray-400 mb-2">Quick questions:</div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(question)}
                  className="text-xs border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                }`}>
                  {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md'
                      : 'bg-gray-800/80 text-gray-100 border border-gray-700/50 rounded-bl-md'
                  }`}
                >
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
                <div className="bg-gray-800/80 border border-gray-700/50 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-gray-700/50 bg-gray-800/30">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Swayam..."
              className="flex-1 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
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
