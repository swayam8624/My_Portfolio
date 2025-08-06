'use client'

import { useState } from 'react'
import { BookOpen, Lightbulb, Brain } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { GeneratingSpinner } from '@/components/ai-tools/shared/GeneratingSpinner'
import { SummaryDisplay } from './SummaryDisplay'
import { Eli5Display } from './Eli5Display'
import { InteractiveQuiz } from './InteractiveQuiz'
import type { QuizCard } from '@/lib/types'

interface BlogAssistantProps {
  blogPostContent: string
}

export function BlogAssistant({ blogPostContent }: BlogAssistantProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'eli5' | 'quiz' | ''>('')
  const [isLoading, setIsLoading] = useState<Record<'summary' | 'eli5' | 'quiz', boolean>>({
    summary: false,
    eli5: false,
    quiz: false,
  })
  const [summary, setSummary] = useState<string | null>(null)
  const [eli5, setEli5] = useState<string | null>(null)
  const [quizCards, setQuizCards] = useState<QuizCard[]>([])

  const generateAIContent = async (type: 'summary' | 'eli5' | 'quiz') => {
    setIsLoading(prev => ({ ...prev, [type]: true }))
    setActiveTab(type)

    try {
      const res = await fetch('/api/ai/blog-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogPostContent, toolType: type }),
      })

      if (!res.ok) throw new Error('AI generation failed.')

      const data = await res.json()

      if (type === 'summary') setSummary(data.output)
      else if (type === 'eli5') setEli5(data.output)
      else if (type === 'quiz') setQuizCards(data.output as QuizCard[])
    } catch (error) {
      console.error(`Failed to generate ${type}:`, error)
    } finally {
      setIsLoading(prev => ({ ...prev, [type]: false }))
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-700 mt-8">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-400" />
          AI Blog Tools
          <Badge variant="outline" className="text-xs border-gray-600">
            Powered by Ollama
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
              {isLoading.summary && <GeneratingSpinner color="blue" />}
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
              {isLoading.eli5 && <GeneratingSpinner color="yellow" />}
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
              {isLoading.quiz && <GeneratingSpinner color="purple" />}
            </div>
            <span className="text-xs text-gray-400 text-left">
              Test your understanding
            </span>
          </Button>
        </div>

        {activeTab && (
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'summary' | 'eli5' | 'quiz')}>
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

            <TabsContent value="summary" className="mt-4" aria-live="polite">
              {summary && <SummaryDisplay text={summary} />}
            </TabsContent>

            <TabsContent value="eli5" className="mt-4" aria-live="polite">
              {eli5 && <Eli5Display text={eli5} />}
            </TabsContent>

            <TabsContent value="quiz" className="mt-4">
              <InteractiveQuiz quizCards={quizCards} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
