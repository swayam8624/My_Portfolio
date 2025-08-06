import { Loader2 } from 'lucide-react'

interface GeneratingSpinnerProps {
  color?: 'blue' | 'yellow' | 'purple' | 'gray' | 'white'
  size?: number
  label?: string
}

export function GeneratingSpinner({
  color = 'gray',
  size = 16,
  label = 'Generating...',
}: GeneratingSpinnerProps) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-500',
    yellow: 'text-yellow-400',
    purple: 'text-purple-500',
    gray: 'text-gray-400',
    white: 'text-white',
  }

  return (
    <div className="ml-auto flex items-center gap-2" aria-busy="true" aria-label={label}>
      <Loader2
        className={`animate-spin ${colorMap[color] ?? 'text-gray-400'}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    </div>
  )
}
