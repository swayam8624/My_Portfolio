import React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant'
    content: string
    timestamp?: Date
  }
  tone?: 'calm' | 'brutal'
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  tone = "calm"
}) => {
  const { role, content, timestamp } = message
  const isUser = role === "user"

  const messageStyle = cn(
    "max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap",
    isUser
      ? "bg-blue-600 text-white self-end"
      : "bg-gray-800 text-gray-100 border border-gray-700 self-start",
    tone === "brutal" && !isUser && "border-red-500"
  )

  const fallback = isUser ? "U" : "AI"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className="flex items-end gap-2">
        {!isUser && (
          <Avatar className="h-6 w-6">
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        )}
        <div className={messageStyle}>
          <div>{content}</div>
          {timestamp && (
            <div className="mt-1 text-xs text-gray-400 text-right">
              {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
