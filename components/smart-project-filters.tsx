'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Sparkles, Code, Zap } from 'lucide-react'
import { Project, Skill } from '@/lib/types'

interface SmartProjectFiltersProps {
  projects: Project[]
  skills: Skill[]
  onFilteredProjects: (projects: Project[]) => void
}

export function SmartProjectFilters({ projects, skills, onFilteredProjects }: SmartProjectFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedEffort, setSelectedEffort] = useState<string>('all')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isSemanticSearch, setIsSemanticSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const projectTypes = [...new Set(projects.map(p => p.project_type))]
  const effortLevels = [...new Set(projects.map(p => p.effort_level))]

  useEffect(() => {
    filterProjects()
  }, [searchQuery, selectedType, selectedEffort, selectedSkills, isSemanticSearch])

  const filterProjects = async () => {
    let filtered = [...projects] // Create a copy to avoid mutations

    // Metadata filtering - fix the logic
    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(p => p.project_type === selectedType)
    }

    if (selectedEffort && selectedEffort !== 'all') {
      filtered = filtered.filter(p => p.effort_level === selectedEffort)
    }

    // Skill filtering
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(p => 
        selectedSkills.some(skill => 
          p.description_long.toLowerCase().includes(skill.toLowerCase()) ||
          p.title.toLowerCase().includes(skill.toLowerCase())
        )
      )
    }

    // Search filtering - apply after metadata filters
    if (searchQuery.trim()) {
      if (isSemanticSearch) {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        filtered = filtered.filter(p => 
          semanticMatch(searchQuery, p.description_long) ||
          semanticMatch(searchQuery, p.title) ||
          semanticMatch(searchQuery, p.description_short)
        ).sort((a, b) => {
          const scoreA = calculateSemanticScore(searchQuery, a)
          const scoreB = calculateSemanticScore(searchQuery, b)
          return scoreB - scoreA
        })
        
        setIsLoading(false)
      } else {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(query) ||
          p.description_short.toLowerCase().includes(query) ||
          p.description_long.toLowerCase().includes(query) ||
          p.project_type.toLowerCase().includes(query) ||
          p.effort_level.toLowerCase().includes(query)
        )
      }
    }

    onFilteredProjects(filtered)
  }

  const semanticMatch = (query: string, text: string): boolean => {
    // Simulate semantic matching logic
    const queryWords = query.toLowerCase().split(' ')
    const textWords = text.toLowerCase().split(' ')
    
    // Check for conceptual matches (simplified)
    const conceptMap: Record<string, string[]> = {
      'ai': ['artificial', 'intelligence', 'machine', 'learning', 'neural', 'model'],
      'web': ['frontend', 'backend', 'react', 'next', 'javascript', 'typescript'],
      'research': ['paper', 'publication', 'study', 'analysis', 'experiment'],
      'experimental': ['prototype', 'proof', 'concept', 'novel', 'innovative']
    }
    
    return queryWords.some(qWord => {
      const concepts = conceptMap[qWord] || [qWord]
      return concepts.some(concept => textWords.includes(concept))
    })
  }

  const calculateSemanticScore = (query: string, project: Project): number => {
    // Simulate semantic similarity scoring
    const queryWords = query.toLowerCase().split(' ')
    const projectText = (project.title + ' ' + project.description_long).toLowerCase()
    
    let score = 0
    queryWords.forEach(word => {
      if (projectText.includes(word)) score += 1
      // Bonus for title matches
      if (project.title.toLowerCase().includes(word)) score += 0.5
    })
    
    return score
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedEffort('all')
    setSelectedSkills([])
    setIsSemanticSearch(false)
  }

  return (
    <Card className="bg-gray-900 border-gray-700 mb-8">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Search Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-5 w-5 text-gray-400" />
              <span className="text-white font-medium">Search Projects</span>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder={isSemanticSearch ? "Try: 'experimental AI projects using Python'" : "Search by title or description..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-12"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              <Button
                variant={isSemanticSearch ? "default" : "outline"}
                onClick={() => setIsSemanticSearch(!isSemanticSearch)}
                className={`${
                  isSemanticSearch 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Search
              </Button>
            </div>
            
            {isSemanticSearch && (
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Semantic search enabled - try natural language queries!
              </div>
            )}
          </div>

          {/* Metadata Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Project Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All types</SelectItem>
                  {projectTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Effort Level</label>
              <Select value={selectedEffort} onValueChange={setSelectedEffort}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All levels</SelectItem>
                  {effortLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Skills</label>
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                {skills.slice(0, 10).map(skill => (
                  <Badge
                    key={skill.id}
                    variant={selectedSkills.includes(skill.name) ? "default" : "outline"}
                    className={`cursor-pointer text-xs ${
                      selectedSkills.includes(skill.name)
                        ? 'bg-blue-600 text-white'
                        : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => {
                      setSelectedSkills(prev =>
                        prev.includes(skill.name)
                          ? prev.filter(s => s !== skill.name)
                          : [...prev, skill.name]
                      )
                    }}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters & Clear */}
          {(searchQuery || (selectedType && selectedType !== 'all') || (selectedEffort && selectedEffort !== 'all') || selectedSkills.length > 0) && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Filter className="h-4 w-4" />
                Active filters applied
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
