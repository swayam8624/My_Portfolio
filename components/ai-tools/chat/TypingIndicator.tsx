
import React from "react"

interface TypingIndicatorProps {
  color?: string // Optional color override
  className?: string
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  color = "bg-gray-400",
  className = "",
}) => {
  return (
    <div className={`flex space-x-1 items-center ${className}`}>
      <div className={`w-2 h-2 rounded-full ${color} animate-bounce`} />
      <div
        className={`w-2 h-2 rounded-full ${color} animate-bounce`}
        style={{ animationDelay: "0.1s" }}
      />
      <div
        className={`w-2 h-2 rounded-full ${color} animate-bounce`}
        style={{ animationDelay: "0.2s" }}
      />
    </div>
  )
}
