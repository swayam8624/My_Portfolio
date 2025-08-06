'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Sparkles, Zap } from 'lucide-react'
import { Project, Skill } from '@/lib/types'

interface SmartProjectFiltersProps {
  projects: Project[]
  skills: Skill[]
  onFilteredProjects: (projects: Project[]) => void
}

export function SmartProjectFilters({ projects, skills, onFilteredProjects }: SmartProjectFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedEffort, setSelectedEffort] = useState('all')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isSemanticSearch, setIsSemanticSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const projectTypes = [...new Set(projects.map(p => p.project_type))]
  const effortLevels = [...new Set(projects.map(p => p.effort_level))]

  useEffect(() => {
    filterProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedType, selectedEffort, selectedSkills, isSemanticSearch])

  const filterProjects = async () => {
    let filtered = [...projects]

    // Filter by metadata
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.project_type.toLowerCase() === selectedType.toLowerCase())
    }

    if (selectedEffort !== 'all') {
      filtered = filtered.filter(p => p.effort_level.toLowerCase() === selectedEffort.toLowerCase())
    }

    // Filter by selected skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(p =>
        selectedSkills.some(skill =>
          p.title.toLowerCase().includes(skill.toLowerCase()) ||
          p.description_long.toLowerCase().includes(skill.toLowerCase())
        )
      )
    }

    // Apply search (basic or semantic)
    if (searchQuery.trim()) {
      if (isSemanticSearch) {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 800)) // simulate delay

        filtered = filtered
          .filter(p =>
            semanticMatch(searchQuery, p.title) ||
            semanticMatch(searchQuery, p.description_short) ||
            semanticMatch(searchQuery, p.description_long)
          )
          .sort((a, b) => calculateSemanticScore(searchQuery, b) - calculateSemanticScore(searchQuery, a))

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

  const semanticMatch = (query: string, text: string) => {
    const q = query.toLowerCase()
    const t = text.toLowerCase()
    const synonyms: Record<string, string[]> = {
      ai: ['artificial', 'intelligence', 'neural', 'ml'],
      web: ['react', 'next', 'frontend', 'backend'],
      research: ['paper', 'publication', 'study'],
      experimental: ['proof', 'concept', 'prototype', 'novel'],
    }

    return q.split(' ').some(word => {
      const related = synonyms[word] ?? [word]
      return related.some(s => t.includes(s))
    })
  }

  const calculateSemanticScore = (query: string, p: Project): number => {
    const text = `${p.title} ${p.description_long}`.toLowerCase()
    return query
      .toLowerCase()
      .split(' ')
      .reduce((score, word) => score + (text.includes(word) ? 1 : 0), 0)
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
      <CardContent className="p-6 space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1 text-white font-medium">
            <Search className="h-5 w-5 text-gray-400" />
            Search Projects
          </div>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={
                  isSemanticSearch
                    ? 'Try: "experimental AI using PyTorch"'
                    : 'Search title or description...'
                }
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-10"
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <Button
              variant={isSemanticSearch ? 'default' : 'outline'}
              onClick={() => setIsSemanticSearch(prev => !prev)}
              className={
                isSemanticSearch
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'border-gray-600 text-gray-300 hover:bg-gray-800'
              }
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Search
            </Button>
          </div>

          {isSemanticSearch && (
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Semantic search enabled
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Type */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Project Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All</SelectItem>
                {projectTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Effort */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Effort Level</label>
            <Select value={selectedEffort} onValueChange={setSelectedEffort}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All</SelectItem>
                {effortLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Skills</label>
            <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
              {skills.slice(0, 10).map(skill => (
                <Badge
                  key={skill.id}
                  onClick={() =>
                    setSelectedSkills(prev =>
                      prev.includes(skill.name)
                        ? prev.filter(s => s !== skill.name)
                        : [...prev, skill.name]
                    )
                  }
                  variant={selectedSkills.includes(skill.name) ? 'default' : 'outline'}
                  className={`cursor-pointer text-xs ${
                    selectedSkills.includes(skill.name)
                      ? 'bg-blue-600 text-white'
                      : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Active filters */}
        {(searchQuery || selectedType !== 'all' || selectedEffort !== 'all' || selectedSkills.length > 0) && (
          <div className="flex items-center justify-between border-t border-gray-700 pt-4">
            <div className="text-sm text-gray-400 flex items-center gap-2">
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
      </CardContent>
    </Card>
  )
}
