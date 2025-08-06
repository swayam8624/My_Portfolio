'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  project?: string
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      role: 'Principal Research Scientist',
      company: 'Microsoft Research',
      avatar: '/testimonial-1.png',
      content: "Swayam's work on cognitive AI is genuinely groundbreaking. His Memory Retrieval Cue framework bridges neuroscience and AI in ways I haven't seen before. The 27% improvement in recall prediction isn't just a number - it represents a fundamental advance in brain-computer interfaces.",
      rating: 5,
      project: 'Memory Retrieval Cue'
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      role: 'Senior ML Engineer',
      company: 'OpenAI',
      avatar: '/testimonial-2.png',
      content: "NanoQuant is exactly the kind of practical AI research we need more of. Compressing an 8GB model to 0.8GB while maintaining 98.2% accuracy? That's not just impressive engineering - it's democratizing access to powerful AI. Swayam understands both the theory and the real-world constraints.",
      rating: 5,
      project: 'NanoQuant'
    },
    {
      id: '3',
      name: 'Prof. Michael Thompson',
      role: 'Director of AI Lab',
      company: 'Stanford University',
      avatar: '/testimonial-3.png',
      content: "I've reviewed hundreds of research papers, but Swayam's approach to multi-agent systems stands out. His CrewAI implementation that reduced manual intervention by 60% shows a deep understanding of both reinforcement learning and practical deployment. This is the future of autonomous systems.",
      rating: 5,
      project: 'Multi-Agent Systems'
    },
    {
      id: '4',
      name: 'Emma Watson',
      role: 'VP of Engineering',
      company: 'Anthropic',
      avatar: '/testimonial-4.png',
      content: "Working with Swayam on our content orchestration project was eye-opening. His ability to architect end-to-end AI pipelines while maintaining code quality and scalability is rare. He doesn't just build AI systems - he builds AI systems that actually work in production.",
      rating: 5,
      project: 'Content Orchestration'
    },
    {
      id: '5',
      name: 'Dr. James Liu',
      role: 'Quantum Computing Researcher',
      company: 'IBM Research',
      avatar: '/testimonial-5.png',
      content: "Swayam's quantum-classical hybrid approaches are pragmatic and innovative. While others get lost in quantum hype, he focuses on extracting real computational advantages from noisy intermediate-scale quantum devices. His work bridges the gap between quantum theory and practical applications.",
      rating: 5,
      project: 'Quantum Computing'
    },
    {
      id: '6',
      name: 'Lisa Park',
      role: 'Head of AI Ethics',
      company: 'DeepMind',
      avatar: '/testimonial-6.png',
      content: "What impresses me most about Swayam is his holistic approach to AI development. He doesn't just optimize for performance - he considers ethical implications, deployment challenges, and long-term sustainability. His research on cognitive AI includes thoughtful discussions about human-AI collaboration.",
      rating: 5,
      project: 'Cognitive AI Research'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Fellow Wizards Say 🧙‍♂️
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Testimonials from researchers, engineers, and industry leaders who've experienced 
            the magic of collaborative AI development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-500/20" />
                  <p className="text-gray-300 leading-relaxed text-sm pl-6">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <Image
                          src={testimonial.avatar || `/placeholder.svg?height=48&width=48&query=${testimonial.name}`}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                    <p className="text-blue-400 text-xs font-medium">{testimonial.company}</p>
                  </div>
                </div>

                {/* Project Badge */}
                {testimonial.project && (
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <Badge variant="outline" className="text-xs border-gray-600/50 text-gray-400">
                      Project: {testimonial.project}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Create Something Magical Together?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join the growing community of researchers and engineers who've experienced 
              the power of collaborative AI development with Swayam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                Start a Collaboration
              </button>
              <button className="px-8 py-3 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
                View More Testimonials
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
