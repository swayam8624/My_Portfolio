'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X, MapPin, Calendar, BookOpen, Code, Briefcase, Award, Star, GitFork, Play, Brain, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { SmartProjectFilters } from '@/components/smart-project-filters'
import { AIBlogTools } from '@/components/ai-blog-tools'
import { ModelCardDisplay } from '@/components/model-card-display'
import { AIProjectInsights } from '@/components/ai-project-insights'
import { Project, Publication, Experience, BlogPost, Skill } from '@/lib/types'
import { EnhancedAIChat } from '@/components/enhanced-ai-chat'
import { TestimonialsSection } from '@/components/testimonials-section'
import { BlogPostsSection } from '@/components/blog-posts-section'
import { BookUpdatesSection } from '@/components/book-updates-section'

export default function AIPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  // Mock data (in real app, this would come from Supabase)
  const profile = {
    id: '1',
    username: 'swayam8624',
    full_name: 'Swayam Singal',
    avatar_url: '/swayam-profile.png',
    bio_long: "I'm an AI Developer and Research Intern with practical experience deploying multi-agent systems, reinforcement learning pipelines, and advanced automation workflows. I specialize in designing scalable, cloud-ready AI architectures with expertise in cognitive systems, generative models, and real-time orchestration across NLP, vision, and multimodal interfaces. Think of me as someone who speaks fluent 'neural network' and probably dreams in tensors - with a healthy dose of Harry Potter references and quantum physics analogies thrown in for good measure! 🧙‍♂️⚛️",
    bio_short: "AI Developer & Research Intern specializing in multi-agent systems, reinforcement learning, and cognitive AI with published research in memory enhancement"
  }

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'NanoQuant: LLM Compression',
      description_short: 'Compressed LLM from 8GB to 0.8GB while maintaining 98.2% MMLU accuracy',
      description_long: 'Architected a compressed LLM (8GB to 0.8GB) while maintaining 98.2% MMLU accuracy using LoRA, structured pruning, and quantization. Conducted supervised fine-tuning for low-resource device deployment. This project demonstrates advanced model optimization techniques and represents a significant breakthrough in making large language models accessible on edge devices.',
      cover_image_url: '/nanoquant-project.png',
      project_url: '#',
      repo_url: 'https://github.com/swayam8624/Nanoquant',
      created_at: '2024-03-15',
      project_type: 'Research',
      effort_level: 'Multi-Month Research',
      model_card_data: {
        architecture: 'Transformer (Encoder-Decoder) with LoRA adapters',
        dataset: 'The Pile + Custom fine-tuning dataset (50K samples)',
        prompt_methods: 'Instruction Tuning + Few-shot prompting',
        evaluation_metrics: [
          { metric: 'MMLU Accuracy', value: '98.2%' },
          { metric: 'Model Size Reduction', value: '90%' },
          { metric: 'Inference Speed', value: '3.2x faster' },
          { metric: 'Memory Usage', value: '0.8GB' }
        ]
      }
    },
    {
      id: '2',
      title: 'Memory Retrieval Cue: EEG-Based Cognitive AI',
      description_short: 'Hybrid CNN + LSTM pipeline improving recall predictions by 27%',
      description_long: 'Developed a hybrid CNN + LSTM pipeline on unsupervised EEG data, improving recall predictions by 27% vs conventional CNN-only models. Applied attention-based sequence models and RLHF-like memory reward loops. This groundbreaking research bridges neuroscience and AI, creating systems that can enhance human cognitive capabilities.',
      cover_image_url: '/memory-retrieval-project.png',
      project_url: '#',
      repo_url: 'https://github.com/swayam8624/Memory-Retrieval-Cue',
      created_at: '2024-02-20',
      project_type: 'Research',
      effort_level: 'Multi-Month Research',
      demo_iframe_url: 'https://huggingface.co/spaces/swayam8624/memory-retrieval-demo'
    },
    {
      id: '3',
      title: 'Automated Content Orchestration System',
      description_short: 'End-to-end AI-driven content generation with real-time automation',
      description_long: 'Architected an end-to-end orchestration pipeline for AI-driven visual and text content generation, supporting real-time automation with platform-specific formatting and model-to-media flow control. Built using agentic AI principles with LangGraph and LangChain.',
      cover_image_url: '/content-orchestration.png',
      project_url: '#',
      repo_url: '#',
      created_at: '2024-01-10',
      project_type: 'Agentic System',
      effort_level: 'Multi-Month Research'
    }
  ]

  const mockPublications: Publication[] = [
    {
      id: '1',
      title: 'Memory Retrieval Cue: A Framework for Preserving and Enhancing Memory for the Future',
      authors: ['Swayam Singal', 'Dr. Research Advisor'],
      venue: 'Cureus Journal of Computer Science',
      publication_date: '2025-01-15',
      pdf_url: '/publications/memory-retrieval-cue.pdf',
      abstract: 'A comprehensive framework for cognitive AI systems that enhance human memory capabilities through advanced neural architectures and EEG-based brain-computer interfaces. This work presents novel approaches to memory augmentation using deep learning techniques.'
    }
  ]

  const mockExperiences: Experience[] = [
    {
      id: '1',
      role: 'Machine Learning Intern',
      company: 'Ascendion (Client – HP)',
      start_date: '2025-05-01',
      end_date: '2025-07-31',
      description: 'Spearheaded a multi-agent credit evaluation system using CrewAI, integrating reinforcement learning agents to optimize logic and reduce manual intervention by over 60% compared to static rule-based systems.'
    },
    {
      id: '2',
      role: 'AI Research Intern',
      company: 'Kalkini',
      start_date: '2023-09-01',
      end_date: '2024-07-31',
      description: 'Designed and deployed CV pipelines for fire and riot detection on 6 parallel video streams (2 hrs each), validated over 10,000+ frames with 85%+ accuracy.'
    }
  ]

  const mockBlogPost: BlogPost = {
    id: '1',
    title: 'Understanding Neural Architecture Search: A Deep Dive',
    content_markdown: '# Understanding Neural Architecture Search\n\nNeural Architecture Search (NAS) represents one of the most exciting frontiers in automated machine learning...',
    published_at: '2024-03-01',
    slug: 'understanding-neural-architecture-search'
  }

  const mockSkills: Skill[] = [
    { id: '1', name: 'Python', category: 'Programming' },
    { id: '2', name: 'PyTorch', category: 'ML Framework' },
    { id: '3', name: 'LangChain', category: 'AI Framework' },
    { id: '4', name: 'CrewAI', category: 'AI Framework' },
    { id: '5', name: 'Computer Vision', category: 'Specialization' },
    { id: '6', name: 'NLP', category: 'Specialization' },
    { id: '7', name: 'AWS', category: 'Cloud' },
    { id: '8', name: 'Docker', category: 'DevOps' }
  ]

  useEffect(() => {
    setFilteredProjects(mockProjects)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = ["home", "about", "experience", "publications", "projects", "blog", "contact"]
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
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-white font-bold text-xl">
              {profile.full_name}
              <Badge variant="outline" className="ml-2 text-xs border-gray-600">
                AI-Native
              </Badge>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Experience", id: "experience" },
                { name: "Publications", id: "publications" },
                { name: "Projects", id: "projects" },
                { name: "Blog", id: "blog" },
                { name: "Contact", id: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors ${
                    activeSection === item.id 
                      ? "text-white border-b-2 border-blue-500" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-gray-900/95 backdrop-blur-md rounded-lg mb-4 p-4">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Experience", id: "experience" },
                { name: "Publications", id: "publications" },
                { name: "Projects", id: "projects" },
                { name: "Blog", id: "blog" },
                { name: "Contact", id: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div 
            className="mb-8"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-gray-700">
                <Image
                  src={profile.avatar_url || "/placeholder.svg?height=120&width=120&query=AI researcher profile"}
                  alt={`${profile.full_name} Profile`}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{profile.full_name}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {profile.bio_short}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("projects")}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Explore Digital Horcruxes
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50 font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="mr-2 h-5 w-5" />
              Send a Pingspell
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/swayam8624" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/swayamsdomain/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:swayam.singal@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-gray-400" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            About This Digital Wizard 🧙‍♂️
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {profile.bio_long}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-gray-300">Bangalore, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-400" size={16} />
                  <span className="text-gray-300">Available for quantum entanglement</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {["Python", "PyTorch", "LangChain", "CrewAI", "AWS", "Computer Vision"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-gray-800 text-gray-200 border-gray-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Code className="text-blue-400" size={20} />
                    <span className="text-gray-300">AI Research & Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="text-purple-400" size={20} />
                    <span className="text-gray-300">Multi-Agent Systems</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="text-green-400" size={20} />
                    <span className="text-gray-300">Published Researcher</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Brain className="text-yellow-400" size={20} />
                    <span className="text-gray-300">Cognitive AI Specialist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Professional Alchemical Experiments
          </h2>
          
          <div className="space-y-8">
            {mockExperiences.map((job, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                      <p className="text-blue-400 font-medium">{job.company}</p>
                    </div>
                    <span className="text-gray-500 text-sm mt-2 md:mt-0">
                      {new Date(job.start_date).toLocaleDateString()} - {job.end_date ? new Date(job.end_date).toLocaleDateString() : 'Present'}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Scholarly Spellbooks 📚
          </h2>
          
          <div className="space-y-6">
            {mockPublications.map((pub, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <BookOpen className="text-blue-400 mt-1" size={24} />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {pub.title}
                      </h3>
                      <p className="text-gray-400 mb-3">
                        <span className="font-semibold">{pub.venue}</span> • {new Date(pub.publication_date).getFullYear()}
                      </p>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {pub.abstract}
                      </p>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="border-gray-700 text-gray-300">
                          {pub.authors.join(', ')}
                        </Badge>
                        {pub.pdf_url && (
                          <Button variant="outline" size="sm" className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50 font-semibold transition-all duration-300 hover:scale-105">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Read Paper
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Digital Horcruxes & Alchemical Experiments
          </h2>
          
          <SmartProjectFilters 
            projects={mockProjects}
            skills={mockSkills}
            onFilteredProjects={setFilteredProjects}
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={project.cover_image_url || "/placeholder.svg?height=200&width=300&query=AI project"}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.demo_iframe_url && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Play className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                      {project.project_type}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description_short}
                  </p>
                  
                  <div className="flex gap-3 mb-4">
                    {project.repo_url && project.repo_url !== '#' && (
                      <Button size="sm" variant="outline" className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50 font-semibold transition-all duration-300 hover:scale-105" asChild>
                        <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                          <Github size={16} className="mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.project_url && project.project_url !== '#' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                        <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>

                  {project.model_card_data && (
                    <ModelCardDisplay modelCard={project.model_card_data} />
                  )}

                  <AIProjectInsights projectId={project.id} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Neural Network Musings 🧠
          </h2>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{mockBlogPost.title}</CardTitle>
              <p className="text-gray-400">Published on {new Date(mockBlogPost.published_at).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Neural Architecture Search (NAS) represents one of the most exciting frontiers in automated machine learning. 
                In this deep dive, we explore how AI can design better AI architectures, the challenges involved, and the 
                breakthrough techniques that are making this possible. From differentiable search methods to evolutionary 
                approaches, we'll uncover the magic behind self-improving neural networks.
              </p>
              
              <Button className="bg-blue-600 hover:bg-blue-700 mb-6">
                Read Full Post
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>

              <AIBlogTools post={mockBlogPost} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Blog Posts Section */}
      <BlogPostsSection />

      {/* Book Updates Section */}
      <BookUpdatesSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Initiate Quantum Entanglement
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to collaborate on the next breakthrough in AI? Let's create something that would make even Dumbledore proud! 🧙‍♂️
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: Mail, 
                title: "Owl Post", 
                value: "swayam.singal@gmail.com", 
                href: "mailto:swayam.singal@gmail.com" 
              },
              { 
                icon: Linkedin, 
                title: "Professional Network", 
                value: "/in/swayamsdomain", 
                href: "https://www.linkedin.com/in/swayamsdomain/" 
              },
              { 
                icon: Github, 
                title: "Code Repository", 
                value: "@swayam8624", 
                href: "https://github.com/swayam8624" 
              }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <contact.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">{contact.title}</h3>
                <p className="text-gray-400">{contact.value}</p>
              </a>
            ))}
          </div>
          
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Mail className="mr-2" size={20} />
            Transmit Signal
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © 2024 {profile.full_name}. Built with Next.js, Supabase, and a healthy dose of wizardry. 
            <span className="ml-2">🧙‍♂️⚛️</span>
          </p>
        </div>
      </footer>

      {/* Enhanced AI Chat Widget */}
      <EnhancedAIChat />
    </div>
  )
}
