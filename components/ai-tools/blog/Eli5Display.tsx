import { Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Eli5DisplayProps {
  text: string
}

export function Eli5Display({ text }: Eli5DisplayProps) {
  return (
    <Card className="bg-gray-800 border-gray-700" aria-label="ELI5 explanation">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="font-medium text-white mb-2">Simple Explanation</h4>
            <p className="text-gray-300 leading-relaxed" aria-live="polite">
              {text}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
