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

  // Replace with fetch from backend or CMS in production
  const bookProjects: BookProject[] = [...] // truncated for brevity
  const recentUpdates: BookUpdate[] = [...] // truncated for brevity

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      planning: 'border-gray-500/50 text-gray-400 bg-gray-500/10',
      writing: 'border-blue-500/50 text-blue-400 bg-blue-500/10',
      editing: 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10',
      review: 'border-purple-500/50 text-purple-400 bg-purple-500/10',
      published: 'border-green-500/50 text-green-400 bg-green-500/10'
    }
    return map[status] || map['planning']
  }

  const getUpdateTypeIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      milestone: <Target className="h-4 w-4 text-green-400" />,
      progress: <TrendingUp className="h-4 w-4 text-blue-400" />,
      insight: <Star className="h-4 w-4 text-yellow-400" />,
      challenge: <MessageSquare className="h-4 w-4 text-red-400" />
    }
    return icons[type] || <Edit3 className="h-4 w-4 text-gray-400" />
  }

  const filteredUpdates = selectedBook === 'all' 
    ? recentUpdates 
    : recentUpdates.filter(update => update.book_id === selectedBook)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Literary Spellcrafting 📚✨</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow the journey of transforming complex AI research into accessible knowledge. 
            Real-time updates from the writing trenches.
          </p>
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {bookProjects.map(book => (
            <Card key={book.id} className="bg-gray-900/80 border-gray-700/50 hover:border-gray-600/50 transition-all hover:scale-105 group">
              <CardHeader className="pb-4">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <Image src={book.cover_image} alt={book.title} width={120} height={160} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <Badge className={`${getStatusColor(book.status)} border capitalize`}>{book.status}</Badge>
                  </div>
                </div>
                <CardTitle className="text-lg text-white mb-2 line-clamp-2">{book.title}</CardTitle>
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

                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Latest Milestone</p>
                      <p className="text-sm text-gray-300">{book.recent_milestone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {book.preview_available && (
                    <Button size="sm" variant="outline" className="flex-1 border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:border-blue-500/50 hover:text-blue-400">
                      <BookOpen className="h-4 w-4 mr-2" /> Preview
                    </Button>
                  )}
                  <Button size="sm" onClick={() => setSelectedBook(book.id)} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 border-0">
                    Follow Updates
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Updates Filter & List */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Recent Writing Updates</h3>
            <div className="flex gap-2">
              <Button onClick={() => setSelectedBook('all')} size="sm" className={selectedBook === 'all' ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-0' : 'border-gray-600/50 text-gray-300 hover:bg-gray-800/50'}>All Books</Button>
              {bookProjects.map(book => (
                <Button key={book.id} onClick={() => setSelectedBook(book.id)} size="sm" className={selectedBook === book.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-0' : 'border-gray-600/50 text-gray-300 hover:bg-gray-800/50'}>
                  {book.title.split(':')[0]}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredUpdates.map(update => {
              const book = bookProjects.find(b => b.id === update.book_id)
              return (
                <Card key={update.id} className="bg-gray-900/80 border-gray-700/50 hover:border-gray-600/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div>{getUpdateTypeIcon(update.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-1">{update.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(update.date).toLocaleDateString()}
                              </div>
                              {book && <Badge variant="outline" className="text-xs border-gray-600/50 text-gray-400">{book.title.split(':')[0]}</Badge>}
                              {update.pages_added && <span className="text-green-400">+{update.pages_added} pages</span>}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">{update.content}</p>
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

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">Never Miss a Writing Update</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Get notified when new chapters are completed and books are ready for preview. Join the journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg border-0 hover:scale-105">
                  Subscribe to Updates
                </Button>
                <Button variant="outline" className="px-8 py-3 border-2 border-gray-600/50 text-gray-300 hover:text-white font-semibold rounded-full hover:scale-105">
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
