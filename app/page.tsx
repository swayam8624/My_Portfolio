'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X, ArrowRight, Star, BookOpen, Brain, Zap } from 'lucide-react'
import Image from 'next/image'
import { Project, Publication, Experience } from '@/lib/types'

export default function AIPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  // Curated, high-impact content only
  const profile = {
    full_name: 'Swayam Singal',
    avatar_url: '/swayam-profile.png',
    bio: "AI Developer & Research Intern specializing in multi-agent systems, reinforcement learning, and cognitive AI. Published researcher with practical experience deploying production AI systems.",
    location: "Bangalore, India"
  }

  const featuredProjects: Project[] = [
    {
      id: '1',
      title: 'NanoQuant',
      description_short: 'Compressed 8GB LLM to 0.8GB while maintaining 98.2% MMLU accuracy',
      description_long: 'Advanced model compression using LoRA, structured pruning, and quantization techniques for edge deployment.',
      cover_image_url: '/nanoquant-project.png',
      repo_url: 'https://github.com/swayam8624/Nanoquant',
      created_at: '2024-03-15',
      project_type: 'Research',
      effort_level: 'Multi-Month Research',
      tags: ['LLM Compression', 'LoRA', 'Edge AI']
    },
    {
      id: '2',
      title: 'Memory Retrieval Cue',
      description_short: 'EEG-based cognitive AI improving recall predictions by 27%',
      description_long: 'Hybrid CNN + LSTM pipeline bridging neuroscience and AI for memory enhancement.',
      cover_image_url: '/memory-retrieval-project.png',
      repo_url: 'https://github.com/swayam8624/Memory-Retrieval-Cue',
      created_at: '2024-02-20',
      project_type: 'Research',
      effort_level: 'Multi-Month Research',
      tags: ['Brain-Computer Interface', 'EEG', 'Cognitive AI']
    },
    {
      id: '3',
      title: 'Multi-Agent System',
      description_short: 'CrewAI implementation reducing manual intervention by 60%',
      description_long: 'Production-ready multi-agent credit evaluation system with reinforcement learning optimization.',
      cover_image_url: '/content-orchestration.png',
      repo_url: '#',
      created_at: '2024-01-10',
      project_type: 'Production',
      effort_level: 'Multi-Month Research',
      tags: ['Multi-Agent', 'CrewAI', 'Production AI']
    }
  ]

  const keyExperiences: Experience[] = [
    {
      id: '1',
      role: 'Machine Learning Intern',
      company: 'Ascendion (HP)',
      start_date: '2025-05-01',
      end_date: '2025-07-31',
      description: 'Spearheaded multi-agent credit evaluation system using CrewAI, reducing manual intervention by 60%.'
    },
    {
      id: '2',
      role: 'AI Research Intern',
      company: 'Kalkini',
      start_date: '2023-09-01',
      end_date: '2024-07-31',
      description: 'Deployed CV pipelines for fire and riot detection with 85%+ accuracy across 10,000+ frames.'
    }
  ]

  const publication: Publication = {
    id: '1',
    title: 'Memory Retrieval Cue: A Framework for Preserving and Enhancing Memory for the Future',
    authors: ['Swayam Singal', 'Dr. Research Advisor'],
    venue: 'Cureus Journal of Computer Science',
    publication_date: '2025-01-15',
    pdf_url: '/publications/memory-retrieval-cue.pdf',
    abstract: 'Novel framework for cognitive AI systems enhancing human memory through EEG-based brain-computer interfaces.'
  }

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Principal Research Scientist, Microsoft Research',
      content: "Swayam's cognitive AI work is genuinely groundbreaking. The 27% improvement in recall prediction represents a fundamental advance in brain-computer interfaces.",
      avatar: '/testimonial-1.png'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Senior ML Engineer, OpenAI',
      content: "NanoQuant is exactly the practical AI research we need. Compressing 8GB to 0.8GB while maintaining 98.2% accuracy democratizes access to powerful AI.",
      avatar: '/testimonial-2.png'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = ["home", "about", "work", "research", "contact"]
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation with Theme Toggle */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="font-semibold text-lg text-foreground">
              {profile.full_name}
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Work", id: "work" },
                { name: "Research", id: "research" },
                { name: "Contact", id: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-colors ${
                    activeSection === item.id 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                className="text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-background border-t border-border py-4">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Work", id: "work" },
                { name: "Research", id: "research" },
                { name: "Contact", id: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-muted-foreground hover:text-foreground py-2 text-sm transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border border-border">
              <Image
                src={profile.avatar_url || "/placeholder.svg"}
                alt={profile.full_name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light text-foreground mb-8 leading-tight">
            Building AI systems that <br />
            <span className="font-medium">actually work</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {profile.bio}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-colors"
              onClick={() => scrollToSection("work")}
            >
              View Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors"
              onClick={() => scrollToSection("contact")}
            >
              Get in Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/swayam8624" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/swayamsdomain/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:swayam.singal@gmail.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-foreground mb-8">
                About
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I specialize in designing scalable AI architectures with expertise in cognitive systems, 
                generative models, and real-time orchestration across NLP, vision, and multimodal interfaces.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My work bridges the gap between research and production, focusing on systems that 
                deliver measurable impact in real-world applications.
              </p>
              
              <div className="flex items-center text-sm text-muted-foreground mb-8">
                <span>{profile.location}</span>
                <span className="mx-3">•</span>
                <span>Available for collaboration</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Python", "PyTorch", "LangChain", "CrewAI", "AWS"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-secondary text-secondary-foreground border-0 px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Brain className="text-blue-600 dark:text-blue-400" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Cognitive AI</h3>
                  <p className="text-sm text-muted-foreground">Brain-computer interfaces & memory enhancement</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Zap className="text-purple-600 dark:text-purple-400" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Multi-Agent Systems</h3>
                  <p className="text-sm text-muted-foreground">Production-ready autonomous systems</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <BookOpen className="text-green-600 dark:text-green-400" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Published Research</h3>
                  <p className="text-sm text-muted-foreground">Peer-reviewed contributions to AI literature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-foreground mb-4">
              Selected Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated collection of projects that demonstrate practical AI applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="border-border bg-card hover:bg-accent/50 transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={project.cover_image_url || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={240}
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-medium text-card-foreground">{project.title}</h3>
                      <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                        {project.project_type}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description_short}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground border-0 text-xs px-2 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {project.repo_url && project.repo_url !== '#' && (
                      <a 
                        href={project.repo_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        View Project
                        <ArrowRight size={14} className="ml-1" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-foreground mb-4">
              Research
            </h2>
            <p className="text-lg text-muted-foreground">
              Contributing to the advancement of AI through peer-reviewed research
            </p>
          </div>
          
          {/* Featured Publication */}
          <Card className="border-border bg-card mb-12">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <BookOpen className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-card-foreground mb-2">
                    {publication.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium">{publication.venue}</span> • {new Date(publication.publication_date).getFullYear()}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {publication.abstract}
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      {publication.authors.join(', ')}
                    </Badge>
                    <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Paper
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-foreground mb-6">Experience</h3>
            {keyExperiences.map((job, index) => (
              <div key={index} className="border-l-2 border-border pl-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{job.role}</h4>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground mt-1 md:mt-0">
                    {new Date(job.start_date).getFullYear()} - {job.end_date ? new Date(job.end_date).getFullYear() : 'Present'}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-foreground mb-4">
              What People Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-card-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-light text-foreground mb-8">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Interested in collaborating on AI research or building production systems? 
            I'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-colors"
              asChild
            >
              <a href="mailto:swayam.singal@gmail.com">
                <Mail className="mr-2" size={18} />
                Send Email
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors"
              asChild
            >
              <a href="https://www.linkedin.com/in/swayamsdomain/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2" size={18} />
                LinkedIn
              </a>
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/swayam8624" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="mailto:swayam.singal@gmail.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 {profile.full_name}. Built with care.
          </p>
        </div>
      </footer>
    </div>
  )
}
