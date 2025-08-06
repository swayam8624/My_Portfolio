'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ModelCardData } from '@/lib/types'
import { Cpu, Database, Zap, BarChart3 } from 'lucide-react'

interface ModelCardDisplayProps {
  modelCard: ModelCardData
}

export function ModelCardDisplay({ modelCard }: ModelCardDisplayProps) {
  return (
    <Card className="bg-gray-900 border-gray-700 mt-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Cpu className="h-5 w-5 text-blue-400" />
          Model Card
          <Badge variant="outline" className="text-xs border-gray-600">
            Technical Specs
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Architecture */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Architecture</span>
          </div>
          <p className="text-white bg-gray-800 p-3 rounded-lg border border-gray-700">
            {modelCard.architecture}
          </p>
        </div>

        {/* Dataset */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Training Dataset</span>
          </div>
          <p className="text-white bg-gray-800 p-3 rounded-lg border border-gray-700">
            {modelCard.dataset}
          </p>
        </div>

        {/* Prompt Methods */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Prompt Engineering</span>
          </div>
          <p className="text-white bg-gray-800 p-3 rounded-lg border border-gray-700">
            {modelCard.prompt_methods}
          </p>
        </div>

        {/* Evaluation Metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Performance Metrics</span>
          </div>
          
          <div className="grid gap-4">
            {modelCard.evaluation_metrics.map((metric, index) => {
              const numericValue = parseFloat(metric.value)
              const isPercentage = metric.value.includes('%') || numericValue <= 1
              const displayValue = isPercentage 
                ? (numericValue <= 1 ? numericValue * 100 : numericValue)
                : numericValue
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{metric.metric}</span>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {metric.value}
                    </Badge>
                  </div>
                  
                  {isPercentage && (
                    <Progress 
                      value={displayValue} 
                      className="h-2 bg-gray-800"
                    />
                  )}
                  
                  {!isPercentage && (
                    <div className="bg-gray-800 p-2 rounded text-center">
                      <span className="text-2xl font-bold text-white">{metric.value}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
