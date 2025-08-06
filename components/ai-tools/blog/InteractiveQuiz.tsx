'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, ChevronRight } from 'lucide-react'
import type { QuizCard } from '@/lib/types'

interface InteractiveQuizProps {
  quizCards: QuizCard[]
}

export function InteractiveQuiz({ quizCards }: InteractiveQuizProps) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})

  const flipCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const resetAll = () => {
    setFlippedCards({})
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-white">Knowledge Check</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetAll}
          className="text-gray-400 hover:text-white"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Cards
        </Button>
      </div>

      <div className="grid gap-4">
        {quizCards.map((card, index) => (
          <Card
            key={index}
            role="button"
            aria-expanded={!!flippedCards[index]}
            tabIndex={0}
            onClick={() => flipCard(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') flipCard(index)
            }}
            className="bg-gray-800 border-gray-700 cursor-pointer transition-all duration-300 hover:border-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 outline-none"
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
                        <Badge className="text-xs bg-green-600">Answer</Badge>
                      </div>
                      <p className="text-gray-300">{card.a}</p>
                    </div>
                  )}
                </div>
                <ChevronRight
                  className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                    flippedCards[index] ? 'rotate-90' : ''
                  }`}
                  aria-hidden="true"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
