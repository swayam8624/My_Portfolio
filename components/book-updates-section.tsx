'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Calendar, TrendingUp, Users, MessageSquare, Star, Edit3, Target } from 'lucide-react'
import Image from 'next/image'

interface BookProject {
  id: string
  title: string
  subtitle: string
  description: string
  cover_image: string
  progress: number
  target_pages: number
  current_pages: number
  chapters_completed: number
  total_chapters: number
  status: 'planning' | 'writing' | 'editing' | 'review' | 'published'
  genre: string
  target_audience: string
  expected_completion: string
  last_update: string
  recent_milestone: string
  preview_available: boolean
  subscribers: number
  updates_count: number
}

interface BookUpdate {
  id: string
  book_id: string
  title: string
  content: string
  date: string
  type: 'milestone' | 'progress' | 'insight' | 'challenge'
  pages_added?: number
  chapter_completed?: string
}

export function BookUpdatesSection() {
  const [selectedBook, setSelectedBook] = useState<string>('all')

  const bookProjects: BookProject[] = [
    {
      id: '1',
      title: 'The Cognitive AI Codex',
      subtitle: 'Building Brain-Computer Interfaces for the Next Generation',
      description: 'A comprehensive guide to developing cognitive AI systems that interface with human neural patterns, covering everything from EEG signal processing to practical BCI applications.',
      cover_image: '/book-cognitive-ai.png',
      progress: 67,
      target_pages: 350,
      current_pages: 234,
      chapters_completed: 8,
      total_chapters: 12,
      status: 'writing',
      genre: 'Technical/AI',
      target_audience: 'AI Researchers, Neuroscientists, Engineers',
      expected_completion: '2024-08-15',
      last_update: '2024-03-10',
      recent_milestone: 'Completed Chapter 8: "Real-time EEG Processing Pipelines"',
      preview_available: true,
      subscribers: 1247,
      updates_count: 23
    },
    {
      id: '2',
      title: 'Quantum Algorithms for Classical Minds',
      subtitle: 'Making Quantum Computing Accessible Without the Physics PhD',
      description: 'Demystifying quantum computing for software engineers and AI practitioners, with practical examples and real-world applications that work on today\'s quantum hardware.',
      cover_image: '/book-quantum-algorithms.png',
      progress: 34,
      target_pages: 280,
      current_pages: 95,
      chapters_completed: 4,
      total_chapters: 10,
      status: 'writing',
      genre: 'Technical/Quantum',
      target_audience: 'Software Engineers, AI Practitioners',
      expected_completion: '2024-12-20',
      last_update: '2024-03-08',
      recent_milestone: 'Finished quantum error correction chapter with practical examples',
      preview_available: false,
      subscribers: 892,
      updates_count: 15
    },
    {
      id: '3',
      title: 'The Multi-Agent Manifesto',
      subtitle: 'Orchestrating AI Systems That Actually Work in Production',
      description: 'Battle-tested strategies for building, deploying, and scaling multi-agent AI systems, with real case studies from production environments.',
      cover_image: '/book-multi-agent.png',
      progress: 89,
      target_pages: 220,
      current_pages: 196,
      chapters_completed: 9,
      total_chapters: 10,
      status: 'editing',
      genre: 'Technical/Engineering',
      target_audience: 'ML Engineers, System Architects',
      expected_completion: '2024-05-30',
      last_update: '2024-03-12',
      recent_milestone: 'Completed final chapter, now in technical review phase',
      preview_available: true,
      subscribers: 2156,
      updates_count: 31
    }
  ]

  const recentUpdates: BookUpdate[] = [
    {
      id: '1',
      book_id: '1',
      title: 'Major Breakthrough in Chapter 9: Real-time Neural Decoding',
      content: 'Just cracked a particularly challenging section on real-time neural signal decoding. The key insight was treating EEG signals as time-series data with attention mechanisms rather than traditional signal processing approaches. This chapter now includes a complete implementation that achieves 94% accuracy on the BCI Competition IV dataset. The code examples are production-ready and include proper error handling for noisy EEG environments.',
      date: '2024-03-12',
      type: 'milestone',
      pages_added: 18,
      chapter_completed: 'Chapter 9: Real-time Neural Decoding'
    },
    {
      id: '2',
      book_id: '3',
      title: 'Technical Review Feedback Integration Complete',
      content: 'Incorporated feedback from three industry experts who reviewed the multi-agent systems book. Major revisions to the deployment chapter based on real-world scaling challenges they\'ve encountered. Added a new section on monitoring and debugging distributed agent systems - something that\'s often overlooked but critical for production success.',
      date: '2024-03-10',
      type: 'progress',
      pages_added: 12
    },
    {
      id: '3',
      book_id: '2',
      title: 'Quantum Error Correction: From Theory to Practice',
      content: 'Finally finished the quantum error correction chapter! This was the most challenging section so far because I wanted to bridge the gap between theoretical QEC and what you can actually implement on current NISQ devices. Included practical examples using Qiskit and Cirq, plus a reality check on when QEC is worth the overhead (spoiler: not as often as you\'d think).',
      date: '2024-03-08',
      type: 'milestone',
      pages_added: 22,
      chapter_completed: 'Chapter 5: Practical Quantum Error Correction'
    },
    {
      id: '4',
      book_id: '1',
      title: 'Reader Feedback Goldmine: BCI Ethics Chapter',
      content: 'The preview readers have been incredibly insightful about the ethics chapter. Several neuroscientists pointed out important considerations around consent and data privacy in BCI research that I hadn\'t fully addressed. Adding a new section on "Ethical Frameworks for Cognitive AI" based on their feedback. This is exactly why I love sharing work-in-progress!',
      date: '2024-03-05',
      type: 'insight'
    },
    {
      id: '5',
      book_id: '3',
      title: 'Production War Stories: When Agents Go Rogue',
      content: 'Added a fascinating case study about a multi-agent system that started optimizing for the wrong objective function in production. The agents were technically working perfectly - they just decided that "minimize response time" meant "respond with empty strings." Sometimes the most interesting lessons come from spectacular failures!',
      date: '2024-03-03',
      type: 'insight',
      pages_added: 8
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'border-gray-500/50 text-gray-400 bg-gray-500/10'
      case 'writing': return 'border-blue-500/50 text-blue-400 bg-blue-500/10'
      case 'editing': return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
      case 'review': return 'border-purple-500/50 text-purple-400 bg-purple-500/10'
      case 'published': return 'border-green-500/50 text-green-400 bg-green-500/10'
      default: return 'border-gray-500/50 text-gray-400 bg-gray-500/10'
    }
  }

  const getUpdateTypeIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Target className="h-4 w-4 text-green-400" />
      case 'progress': return <TrendingUp className="h-4 w-4 text-blue-400" />
      case 'insight': return <Star className="h-4 w-4 text-yellow-400" />
      case 'challenge': return <MessageSquare className="h-4 w-4 text-red-400" />
      default: return <Edit3 className="h-4 w-4 text-gray-400" />
    }
  }

  const filteredUpdates = selectedBook === 'all' 
    ? recentUpdates 
    : recentUpdates.filter(update => update.book_id === selectedBook)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Literary Spellcrafting 📚✨
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow the journey of transforming complex AI research into accessible knowledge. 
            Real-time updates from the writing trenches, complete with victories, challenges, and insights.
          </p>
        </div>

        {/* Book Projects Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {bookProjects.map((book) => (
            <Card 
              key={book.id}
              className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <CardHeader className="pb-4">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={book.cover_image || `/placeholder.svg?height=160&width=120&query=${book.title} book cover`}
                    alt={book.title}
                    width={120}
                    height={160}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className={`${getStatusColor(book.status)} border capitalize`}>
                      {book.status}
                    </Badge>
                  </div>
                </div>

                <CardTitle className="text-lg text-white mb-2 line-clamp-2">
                  {book.title}
                </CardTitle>
                <p className="text-sm text-gray-400 mb-3">{book.subtitle}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-blue-400 font-semibold">{book.progress}%</span>
                  </div>
                  <Progress value={book.progress} className="h-2 bg-gray-800" />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{book.current_pages}/{book.target_pages} pages</span>
                    <span>{book.chapters_completed}/{book.total_chapters} chapters</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{book.subscribers} followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{book.updates_count} updates</span>
                  </div>
                </div>

                {/* Recent Milestone */}
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Latest Milestone</p>
                      <p className="text-sm text-gray-300">{book.recent_milestone}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {book.preview_available && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:border-blue-500/50 hover:text-blue-400"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  )}
                  <Button 
                    size="sm"
                    onClick={() => setSelectedBook(book.id)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                  >
                    Follow Updates
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Updates */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Recent Writing Updates</h3>
            <div className="flex gap-2">
              <Button
                variant={selectedBook === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBook('all')}
                className={selectedBook === 'all' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-0' 
                  : 'border-gray-600/50 text-gray-300 hover:bg-gray-800/50'
                }
              >
                All Books
              </Button>
              {bookProjects.map(book => (
                <Button
                  key={book.id}
                  variant={selectedBook === book.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedBook(book.id)}
                  className={selectedBook === book.id 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-0' 
                    : 'border-gray-600/50 text-gray-300 hover:bg-gray-800/50'
                  }
                >
                  {book.title.split(':')[0]}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredUpdates.map((update) => {
              const book = bookProjects.find(b => b.id === update.book_id)
              return (
                <Card 
                  key={update.id}
                  className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getUpdateTypeIcon(update.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-1">
                              {update.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(update.date).toLocaleDateString()}
                              </div>
                              {book && (
                                <Badge variant="outline" className="text-xs border-gray-600/50 text-gray-400">
                                  {book.title.split(':')[0]}
                                </Badge>
                              )}
                              {update.pages_added && (
                                <span className="text-green-400">+{update.pages_added} pages</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-4">
                          {update.content}
                        </p>
                        
                        {update.chapter_completed && (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-green-400">
                              <Target className="h-4 w-4" />
                              <span className="font-medium">Chapter Completed: {update.chapter_completed}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Subscribe CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">
                Never Miss a Writing Update
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Get notified when new chapters are completed, insights are shared, 
                and books are ready for preview. Join the community of readers following the journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg border-0">
                  Subscribe to Updates
                </Button>
                <Button 
                  variant="outline"
                  className="px-8 py-3 border-2 border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  Browse All Books
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
