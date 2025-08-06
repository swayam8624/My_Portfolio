"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X, MapPin, Calendar, Code, Briefcase } from 'lucide-react'
import Image from "next/image"

export default function SwayamPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Update active section based on scroll position
      const sections = ["home", "about", "experience", "projects", "skills", "contact"]
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
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-white font-bold text-xl">Swayam</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Experience", id: "experience" },
                { name: "Projects", id: "projects" },
                { name: "Skills", id: "skills" },
                { name: "Contact", id: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors ${
                    activeSection === item.id 
                      ? "text-white border-b-2 border-white" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900/95 backdrop-blur-md rounded-lg mb-4 p-4">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Experience", id: "experience" },
                { name: "Projects", id: "projects" },
                { name: "Skills", id: "skills" },
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
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div 
            className="mb-8"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 p-1">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-gray-700">
                <Image
                  src="/swayam-profile.png"
                  alt="Swayam Profile"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">Swayam</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Full Stack Developer & Software Engineer passionate about building scalable applications and innovative solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-600 text-white hover:bg-gray-800 transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
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
              href="mailto:swayam@example.com" 
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6">
                I'm a passionate software developer with expertise in full-stack development, 
                specializing in modern web technologies and scalable application architecture. 
                I love solving complex problems and turning ideas into reality through clean, efficient code.
              </p>
              
              <p className="text-lg text-gray-300 mb-6">
                With a strong foundation in both frontend and backend technologies, I enjoy working 
                on projects that challenge me to learn and grow. I'm always exploring new technologies 
                and contributing to the open-source community.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-gray-300">India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-400" size={16} />
                  <span className="text-gray-300">Available for work</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {["JavaScript", "TypeScript", "React", "Node.js", "Python", "MongoDB"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-gray-800 text-gray-200 border-gray-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Code className="text-gray-400" size={20} />
                    <span className="text-gray-300">Clean Code Advocate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="text-gray-400" size={20} />
                    <span className="text-gray-300">Problem Solver</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="text-gray-400" size={20} />
                    <span className="text-gray-300">Open Source Contributor</span>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Experience</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Full Stack Developer",
                company: "Tech Startup",
                period: "2023 - Present",
                description: "Developed and maintained web applications using React, Node.js, and MongoDB. Implemented CI/CD pipelines and improved application performance by 40%.",
                technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"]
              },
              {
                title: "Frontend Developer",
                company: "Digital Agency",
                period: "2022 - 2023",
                description: "Created responsive web applications and collaborated with design teams to implement pixel-perfect UI components. Optimized applications for maximum speed and scalability.",
                technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
              },
              {
                title: "Software Developer Intern",
                company: "Software Company",
                period: "2021 - 2022",
                description: "Assisted in developing internal tools and learned industry best practices. Contributed to code reviews and participated in agile development processes.",
                technologies: ["JavaScript", "Python", "Git", "SQL"]
              }
            ].map((job, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                      <p className="text-gray-400">{job.company}</p>
                    </div>
                    <span className="text-gray-500 text-sm mt-2 md:mt-0">{job.period}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-gray-700 text-gray-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description: "Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management",
                image: "/ecommerce-project.png",
                tech: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
                github: "https://github.com/swayam8624/ecommerce-platform",
                live: "#"
              },
              {
                title: "Task Management System",
                description: "Collaborative project management tool with real-time updates, team collaboration, and progress tracking",
                image: "/task-management-project.png",
                tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
                github: "https://github.com/swayam8624/task-manager",
                live: "#"
              },
              {
                title: "Weather Dashboard",
                description: "Real-time weather application with location-based forecasts, interactive maps, and weather alerts",
                image: "/weather-dashboard.png",
                tech: ["React", "OpenWeather API", "Chart.js", "Tailwind"],
                github: "https://github.com/swayam8624/weather-app",
                live: "#"
              },
              {
                title: "Social Media Analytics",
                description: "Analytics dashboard for social media metrics with data visualization and automated reporting",
                image: "/analytics-dashboard.png",
                tech: ["Python", "Django", "D3.js", "PostgreSQL"],
                github: "https://github.com/swayam8624/social-analytics",
                live: "#"
              },
              {
                title: "Chat Application",
                description: "Real-time messaging application with group chats, file sharing, and end-to-end encryption",
                image: "/chat-application.png",
                tech: ["React", "Socket.io", "Node.js", "MongoDB"],
                github: "https://github.com/swayam8624/chat-app",
                live: "#"
              },
              {
                title: "Portfolio Website",
                description: "Personal portfolio website with modern design, smooth animations, and responsive layout",
                image: "/portfolio-website.png",
                tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
                github: "https://github.com/swayam8624/portfolio",
                live: "#"
              }
            ].map((project, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-gray-700 text-gray-300 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="bg-white text-black hover:bg-gray-200" asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Skills & Technologies</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Frontend",
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML/CSS"]
              },
              {
                category: "Backend",
                skills: ["Node.js", "Python", "Express", "Django", "REST APIs", "GraphQL"]
              },
              {
                category: "Database",
                skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Prisma"]
              },
              {
                category: "Tools & Others",
                skills: ["Git", "Docker", "AWS", "Vercel", "Linux", "CI/CD"]
              }
            ].map((category, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">{category.category}</h3>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-gray-300">{skill}</span>
                        <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-gray-400 to-white rounded-full transition-all duration-1000"
                            style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-12">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: Mail, 
                title: "Email", 
                value: "swayam@example.com", 
                href: "mailto:swayam@example.com" 
              },
              { 
                icon: Linkedin, 
                title: "LinkedIn", 
                value: "/in/swayamsdomain", 
                href: "https://www.linkedin.com/in/swayamsdomain/" 
              },
              { 
                icon: Github, 
                title: "GitHub", 
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
                <contact.icon className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">{contact.title}</h3>
                <p className="text-gray-400">{contact.value}</p>
              </a>
            ))}
          </div>
          
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 transition-all duration-300">
            <Mail className="mr-2" size={20} />
            Send Message
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © 2024 Swayam. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}
