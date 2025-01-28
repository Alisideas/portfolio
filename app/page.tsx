"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const projects = [
    {
      title: "Project One",
      description: "A full-stack web application built with Next.js and Supabase",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      link: "#"
    },
    {
      title: "Project Two",
      description: "Mobile-first e-commerce platform with real-time updates",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      tags: ["React Native", "Firebase", "Redux", "Node.js"],
      link: "#"
    },
    {
      title: "Project Three",
      description: "AI-powered data visualization dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      tags: ["Python", "TensorFlow", "D3.js", "Flask"],
      link: "#"
    }
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "SQL", "GraphQL", "AWS", "Docker",
    "Git", "CI/CD", "Agile", "TDD", "System Design"
  ];

  const filteredProjects = selectedTech
    ? projects.filter(project => project.tags.includes(selectedTech))
    : projects;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {['about', 'projects', 'skills', 'contact'].map((section) => (
              <Button
                key={section}
                variant="ghost"
                onClick={() => scrollToSection(section)}
                className="capitalize"
              >
                {section}
              </Button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary pt-16">
        <div className="container px-4 mx-auto text-center">
          <Avatar className="w-32 h-32 mx-auto mb-8">
            <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D03AQEck4w2fCnTAw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1685217875163?e=1743638400&v=beta&t=yvMem2OUdiwc5jcWpZmAmOS6Ku1fGehD2j95nI1F6HI" />
            <AvatarFallback>
              <User className="w-12 h-12" />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">ALIREZA AKBARI</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Full Stack Developer & Software Engineer
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" onClick={() => window.open('https://github.com')}>
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open('https://linkedin.com')}>
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')}>
              <Mail className="mr-2 h-5 w-5" />
              Contact
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate software engineer with 5+ years of experience building scalable web applications
              and distributed systems. I specialize in full-stack development using modern technologies
              and best practices. When I'm not coding, you can find me contributing to open-source
              projects or writing technical blog posts about software development.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-secondary">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          
          {/* Technology filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={selectedTech === null ? "default" : "outline"}
              onClick={() => setSelectedTech(null)}
              className="mb-2"
            >
              All
            </Button>
            {Array.from(new Set(projects.flatMap(p => p.tags))).map((tech) => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                onClick={() => setSelectedTech(tech)}
                className="mb-2"
              >
                {tech}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => window.open(project.link)}>
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-lg py-2 px-4">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="max-w-md mx-auto">
            <ContactForm />
            
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                or find me on social media
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="icon" onClick={() => window.open('https://github.com')}>
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => window.open('https://linkedin.com')}>
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}