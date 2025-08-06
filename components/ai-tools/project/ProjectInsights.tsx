'use client'

import { useState } from 'react'
import { Brain, Lightbulb, TrendingUp, Zap, RefreshCw } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InsightCard } from './InsightCard'
import type { AIProjectInsight } from '@/lib/types'

interface ProjectInsightsProps {
  projectId: string
  insights?: AIProjectInsight
}

export function ProjectInsights({ projectId, insights }: ProjectInsightsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // TEMP: Mock fallback insights (replace with API later)
  const mockInsights: AIProjectInsight = {
    project_id: projectId,
    summary_ai:
      "From a principal AI researcher's perspective, this project demonstrates exceptional technical innovation in neural architecture optimization. The differentiable approach to architecture search represents a significant advancement over traditional discrete methods, with potential applications spanning from edge computing to large-scale distributed systems. The 15% efficiency improvement, while impressive, likely understates the broader implications for automated ML pipeline optimization.",
    improvements_ai:
      "1. **Multi-objective Optimization**: Integrate Pareto-optimal search to balance accuracy, latency, and energy consumption simultaneously.\n2. **Neural ODE Integration**: Leverage continuous-time neural networks for more flexible architecture parameterization.\n3. **Federated Architecture Search**: Extend the approach to distributed settings where architecture search occurs across multiple data silos while preserving privacy.",
    comparison_ai:
      "A large language model like GPT-4 would likely approach this problem through a fundamentally different paradigm — treating architecture design as a code generation task. Instead of gradient-based optimization, it might use iterative refinement through natural language descriptions of architectural components, potentially discovering novel architectures through analogical reasoning rather than mathematical optimization. The LLM approach could excel at incorporating domain knowledge and design principles that are difficult to encode in traditional optimization objectives.",
  }

  const generateInsights = async () => {
    setIsGenerating(true)
    // 🔁 Simulate API call — replace with real route later
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setIsVisible(true)
  }

  const displayInsights = insights || (isVisible ? mockInsights : null)

  if (!displayInsights) {
    return (
      <Card className="bg-gray-900 border-gray-700 mt-6">
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                🧠 How AI Sees This Project
              </h3>
              <p className="text-gray-400 mb-4">
                Get AI-powered insights, improvements, and comparisons for this project
              </p>
            </div>
            <Button
              onClick={generateInsights}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating Insights...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate AI Insights
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-700 mt-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          🧠 How AI Sees This Project
          <Badge variant="outline" className="text-xs border-gray-600">
            GPT-4 Analysis
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-gray-700 flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="improvements"
              className="data-[state=active]:bg-gray-700 flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              What I'd Do Better Now
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-gray-700 flex items-center gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              AI Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-6">
            <InsightCard
              icon={Brain}
              title="AI Research Perspective"
              content={displayInsights.summary_ai}
              tone="neutral"
            />
          </TabsContent>

          <TabsContent value="improvements" className="mt-6">
            <InsightCard
              icon={TrendingUp}
              title="Modern Improvements"
              content={displayInsights.improvements_ai}
              tone="success"
              formatMarkdown
            />
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <InsightCard
              icon={Lightbulb}
              title="LLM Approach Comparison"
              content={displayInsights.comparison_ai}
              tone="warning"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
