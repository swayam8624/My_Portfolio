'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Lightbulb, Brain, ChevronRight, RotateCcw } from 'lucide-react'
import { BlogPost, QuizCard } from '@/lib/types'

interface AIBlogToolsProps {
  post: BlogPost
}

export function AIBlogTools({ post }: AIBlogToolsProps) {
  const [activeTab, setActiveTab] = useState<string>('')
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})

  const generateAIContent = async (type: 'summary' | 'eli5' | 'quiz') => {
    setIsLoading(prev => ({ ...prev, [type]: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(prev => ({ ...prev, [type]: false }))
    setActiveTab(type)
  }

  const flipCard = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }))
  }

  // Mock AI-generated content (in real app, this would come from the database)
  const mockSummary = "This post explores advanced techniques in neural architecture search, focusing on differentiable approaches that can automatically discover optimal network designs. Key findings include a 15% improvement in efficiency over manual designs and novel insights into the relationship between architecture complexity and generalization."

  const mockELI5 = "Imagine you're building with LEGO blocks, but instead of following instructions, you have a smart robot that tries different combinations to build the best castle. That's what this research does with AI - it lets the computer figure out the best way to build itself, like a self-improving LEGO robot!"

  const mockQuizCards: QuizCard[] = [
    {
      q: "What is the main advantage of differentiable neural architecture search?",
      a: "It allows for gradient-based optimization of architecture parameters, making the search process more efficient than discrete methods."
    },
    {
      q: "How much efficiency improvement was achieved over manual designs?",
      a: "The research demonstrated a 15% improvement in efficiency compared to manually designed architectures."
    },
    {
      q: "What relationship was discovered between architecture complexity and generalization?",
      a: "The study found that moderate complexity architectures often generalize better than both overly simple and overly complex designs."
    }
  ]

  return (
    <Card className="bg-gray-900 border-gray-700 mt-8">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-400" />
          AI Blog Tools
          <Badge variant="outline" className="text-xs border-gray-600">
            Powered by GPT-4
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 h-auto p-4 flex flex-col items-start gap-2"
            onClick={() => generateAIContent('summary')}
            disabled={isLoading.summary}
          >
            <div className="flex items-center gap-2 w-full">
              <BookOpen className="h-4 w-4 text-blue-400" />
              <span className="font-medium">Summarize This</span>
              {isLoading.summary && (
                <div className="ml-auto w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
            <span className="text-xs text-gray-400 text-left">
              Get a concise TL;DR summary
            </span>
          </Button>

          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 h-auto p-4 flex flex-col items-start gap-2"
            onClick={() => generateAIContent('eli5')}
            disabled={isLoading.eli5}
          >
            <div className="flex items-center gap-2 w-full">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              <span className="font-medium">Explain Like I'm 5</span>
              {isLoading.eli5 && (
                <div className="ml-auto w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
            <span className="text-xs text-gray-400 text-left">
              Simple analogies & explanations
            </span>
          </Button>

          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 h-auto p-4 flex flex-col items-start gap-2"
            onClick={() => generateAIContent('quiz')}
            disabled={isLoading.quiz}
          >
            <div className="flex items-center gap-2 w-full">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="font-medium">Quiz Cards</span>
              {isLoading.quiz && (
                <div className="ml-auto w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
            <span className="text-xs text-gray-400 text-left">
              Test your understanding
            </span>
          </Button>
        </div>

        {activeTab && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="summary" className="data-[state=active]:bg-gray-700">
                Summary
              </TabsTrigger>
              <TabsTrigger value="eli5" className="data-[state=active]:bg-gray-700">
                ELI5
              </TabsTrigger>
              <TabsTrigger value="quiz" className="data-[state=active]:bg-gray-700">
                Quiz Cards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white mb-2">TL;DR Summary</h4>
                      <p className="text-gray-300 leading-relaxed">{mockSummary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eli5" className="mt-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white mb-2">Simple Explanation</h4>
                      <p className="text-gray-300 leading-relaxed">{mockELI5}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">Knowledge Check</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFlippedCards({})}
                    className="text-gray-400 hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Cards
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {mockQuizCards.map((card, index) => (
                    <Card
                      key={index}
                      className="bg-gray-800 border-gray-700 cursor-pointer transition-all duration-300 hover:border-gray-600"
                      onClick={() => flipCard(index)}
                    >
                      <CardContent className="p-4">
                        <div className="min-h-[80px] flex items-center justify-between">
                          <div className="flex-1">
                            {!flippedCards[index] ? (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs border-gray-600">
                                    Question {index + 1}
                                  </Badge>
                                </div>
                                <p className="text-white font-medium">{card.q}</p>
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className="text-xs bg-green-600">
                                    Answer
                                  </Badge>
                                </div>
                                <p className="text-gray-300">{card.a}</p>
                              </div>
                            )}
                          </div>
                          <ChevronRight 
                            className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                              flippedCards[index] ? 'rotate-90' : ''
                            }`} 
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
