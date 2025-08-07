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
    {
      id: '1',
      title: 'The Future of Neural Architecture Search: Beyond Differentiable Methods',
      excerpt: 'Exploring next-generation approaches to automated neural network design, including evolutionary strategies and reinforcement learning-based search methods.',
      content_preview: 'Neural Architecture Search has revolutionized how we design deep learning models, but we\'re just scratching the surface. In this deep dive, I explore emerging techniques that go beyond gradient-based optimization...',
      published_at: '2024-03-15',
      read_time: 12,
      category: 'Research',
      tags: ['Neural Architecture Search', 'AutoML', 'Deep Learning', 'Optimization'],
      cover_image: '/blog-nas-future.png',
      views: 2847,
      likes: 156
    },
    {
      id: '2',
      title: 'Building Production-Ready Multi-Agent Systems with CrewAI',
      excerpt: 'A comprehensive guide to architecting, deploying, and scaling multi-agent AI systems that actually work in production environments.',
      content_preview: 'Multi-agent systems sound cool in theory, but building them for production is a different beast entirely. After deploying several systems that reduced manual intervention by 60%+, here\'s what I\'ve learned...',
      published_at: '2024-03-08',
      read_time: 15,
      category: 'Engineering',
      tags: ['Multi-Agent Systems', 'CrewAI', 'Production AI', 'System Architecture'],
      cover_image: '/blog-multi-agent.png',
      views: 3421,
      likes: 203
    },
    {
      id: '3',
      title: 'Quantum Computing Meets Classical AI: Hybrid Approaches That Actually Work',
      excerpt: 'Cutting through the quantum hype to explore practical quantum-classical hybrid algorithms that deliver real computational advantages today.',
      content_preview: 'Quantum computing is often oversold and underdelivered, but there are genuine opportunities for quantum advantage in specific AI applications. Let me show you what actually works...',
      published_at: '2024-02-28',
      read_time: 18,
      category: 'Research',
      tags: ['Quantum Computing', 'Hybrid Algorithms', 'NISQ', 'Quantum ML'],
      cover_image: '/blog-quantum-ai.png',
      views: 1923,
      likes: 127
    },
    {
      id: '4',
      title: 'Memory Enhancement Through EEG: From Research to Real Applications',
      excerpt: 'How brain-computer interfaces and deep learning are converging to create practical memory augmentation systems.',
      content_preview: 'My research on Memory Retrieval Cue started as an academic curiosity but has evolved into something with real-world implications. Here\'s the journey from EEG signals to deployable cognitive AI...',
      published_at: '2024-02-20',
      read_time: 14,
      category: 'Research',
      tags: ['Brain-Computer Interface', 'EEG', 'Cognitive AI', 'Memory Enhancement'],
      cover_image: '/blog-memory-eeg.png',
      views: 2156,
      likes: 189
    },
    {
      id: '5',
      title: 'The Art of Model Compression: Lessons from NanoQuant',
      excerpt: 'Deep dive into the techniques, trade-offs, and practical considerations for compressing large language models without losing performance.',
      content_preview: 'Compressing an 8GB model to 0.8GB while maintaining 98.2% accuracy isn\'t magic - it\'s careful engineering. Here\'s everything I learned building NanoQuant...',
      published_at: '2024-02-12',
      read_time: 16,
      category: 'Engineering',
      tags: ['Model Compression', 'LoRA', 'Quantization', 'Edge AI'],
      cover_image: '/blog-model-compression.png',
      views: 4102,
      likes: 267
    },
    {
      id: '6',
      title: 'Why Most AI Projects Fail (And How to Build Ones That Don\'t)',
      excerpt: 'Brutal lessons from the trenches of AI development: the gap between research papers and production systems.',
      content_preview: 'After working on dozens of AI projects, I\'ve seen the same patterns of failure over and over. Here\'s my unfiltered take on what separates successful AI systems from expensive experiments...',
      published_at: '2024-02-05',
      read_time: 11,
      category: 'Opinion',
      tags: ['AI Strategy', 'Production AI', 'Project Management', 'Lessons Learned'],
      cover_image: '/blog-ai-failures.png',
      views: 5234,
      likes: 312
    }
  ]

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))]
  
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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
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
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 group overflow-hidden"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.cover_image || `/placeholder.svg?height=200&width=400&query=${post.title}`}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(post.category)} border`}>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </div>
                  </Badge>
                </div>

                {/* Stats */}
                <div className="absolute bottom-4 right-4 flex items-center gap-3 text-xs text-gray-300">
                  <span className="flex items-center gap-1">
                    👁️ {post.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    ❤️ {post.likes}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Meta Info */}
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

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
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

                {/* Read More Button */}
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

        {/* Load More */}
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
