'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Zap } from 'lucide-react'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content_preview: string
  published_at: string
  read_time: number
  category: string
  tags: string[]
  cover_image: string
  views: number
  likes: number
}

export function BlogPostsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts: BlogPost[] = [
    // Sample post objects... (omitted here for brevity, same as original)
  ]

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))]

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Research': return <BookOpen className="h-4 w-4" />
      case 'Engineering': return <Zap className="h-4 w-4" />
      case 'Opinion': return <TrendingUp className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Research': return 'border-blue-500/50 text-blue-400 bg-blue-500/10'
      case 'Engineering': return 'border-purple-500/50 text-purple-400 bg-purple-500/10'
      case 'Opinion': return 'border-green-500/50 text-green-400 bg-green-500/10'
      default: return 'border-gray-500/50 text-gray-400 bg-gray-500/10'
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Neural Network Musings 🧠
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Deep dives into AI research, engineering insights, and the occasional rant about 
            why most AI projects fail (with solutions, of course)
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`capitalize transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0'
                    : 'border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500/50'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Card
              key={post.id}
              className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.cover_image || `/placeholder.svg?height=200&width=400&query=${post.title}`}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(post.category)} border`}>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </div>
                  </Badge>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-3 text-xs text-gray-300">
                  <span className="flex items-center gap-1">👁️ {post.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1">❤️ {post.likes}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.read_time} min read
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-gray-600/50 text-gray-400 hover:border-blue-500/50 hover:text-blue-400 transition-colors duration-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs border-gray-600/50 text-gray-400">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-gray-300 hover:text-white hover:bg-gray-800/50 group/btn transition-all duration-300"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Load More Neural Musings
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
