import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface InsightCardProps {
  icon: LucideIcon
  title: string
  content: string
  tone?: 'neutral' | 'success' | 'warning'
  formatMarkdown?: boolean
}

export function InsightCard({
  icon: Icon,
  title,
  content,
  tone = 'neutral',
  formatMarkdown = false,
}: InsightCardProps) {
  const iconColor =
    tone === 'success' ? 'text-green-400'
    : tone === 'warning' ? 'text-yellow-400'
    : 'text-purple-400'

  const parsedContent = formatMarkdown
    ? content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    : content

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Icon className={cn('h-5 w-5 mt-0.5', iconColor)} />
          <div className="w-full">
            <h4 className="font-medium text-white mb-3">{title}</h4>
            {formatMarkdown ? (
              <div
                className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="text-gray-300 leading-relaxed">{parsedContent}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
