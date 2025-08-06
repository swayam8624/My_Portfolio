'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Principal Research Scientist',
    company: 'Microsoft Research',
    avatar: '/testimonial-1.png',
    content:
      "Swayam's work on cognitive AI is genuinely groundbreaking. His Memory Retrieval Cue framework bridges neuroscience and AI in ways I haven't seen before. The 27% improvement in recall prediction isn't just a number - it represents a fundamental advance in brain-computer interfaces.",
    rating: 5,
    project: 'Memory Retrieval Cue',
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    role: 'Senior ML Engineer',
    company: 'OpenAI',
    avatar: '/testimonial-2.png',
    content:
      "NanoQuant is exactly the kind of practical AI research we need more of. Compressing an 8GB model to 0.8GB while maintaining 98.2% accuracy? That's not just impressive engineering - it's democratizing access to powerful AI.",
    rating: 5,
    project: 'NanoQuant',
  },
  // Add more or fetch via API
]

const animationVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    // Optionally fetch from API later
    setTestimonials(FALLBACK_TESTIMONIALS)
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Fellow Wizards Say 🧙‍♂️
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real voices from collaborators, researchers, and dreamers who witnessed AI magic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Build Something Magical?
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto mb-6">
              Join a growing tribe of engineers, scientists, and creators working alongside Swayam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-md">
                Start a Collaboration
              </button>
              <button className="px-8 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-medium rounded-full transition-all duration-300 hover:scale-105">
                View All Testimonials
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="bg-gray-900/80 border border-gray-700/50 transition-all duration-300 group hover:border-gray-600/50 hover:shadow-lg hover:scale-[1.02]">
      <CardContent className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Quote */}
        <div className="relative mb-5">
          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-400/20" />
          <p className="text-gray-300 text-sm pl-6 italic">
            "{testimonial.content}"
          </p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-white font-semibold">{testimonial.name}</p>
            <p className="text-xs text-gray-400">{testimonial.role}</p>
            <p className="text-xs text-blue-400 font-medium">{testimonial.company}</p>
          </div>
        </div>

        {testimonial.project && (
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <Badge variant="outline" className="text-xs border-gray-600/50 text-gray-400">
              Project: {testimonial.project}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
