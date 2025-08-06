import { BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface SummaryDisplayProps {
  text: string
}

export function SummaryDisplay({ text }: SummaryDisplayProps) {
  return (
    <Card className="bg-gray-800 border-gray-700" aria-label="TL;DR summary">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-blue-400 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="font-medium text-white mb-2">TL;DR Summary</h4>
            <p className="text-gray-300 leading-relaxed" aria-live="polite">
              {text}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
