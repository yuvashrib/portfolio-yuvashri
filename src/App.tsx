import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Briefcase, 
  Code, 
  Database, 
  Cpu, 
  BarChart3, 
  Cloud,
  FileText,
  Trophy,
  Activity,
  Brain,
  HeartPulse,
  Server
} from 'lucide-react';
import { FaMedium } from 'react-icons/fa6';
import { portfolioData } from './data';

export default function App() {
  const [activeSkillCategory, setActiveSkillCategory] = useState("Programming & Databases");
  const [projectIndex, setProjectIndex] = useState(0);

  // Combine and sort timeline items
  const timelineItems = [
    ...portfolioData.experience.map(exp => ({ ...exp, type: 'work' })),
    ...portfolioData.education.map(edu => ({ ...edu, type: 'education' }))
  ].sort((a, b) => {
    // Simple sort by period (extracting year)
    const yearA = parseInt(a.period.split(' ').pop() || '0');
    const yearB = parseInt(b.period.split(' ').pop() || '0');
    return yearB - yearA;
  });

  const nextProject = () => {
    setProjectIndex((prev) => (prev + 1) % portfolioData.projects.length);
  };

  const prevProject = () => {
    setProjectIndex((prev) => (prev - 1 + portfolioData.projects.length) % portfolioData.projects.length);
  };

  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes('brain')) return <Brain className="text-brand-primary" size={32} />;
    if (title.toLowerCase().includes('covid') || title.toLowerCase().includes('ecg')) return <HeartPulse className="text-brand-primary" size={32} />;
    if (title.toLowerCase().includes('warehouse') || title.toLowerCase().includes('cloud')) return <Server className="text-brand-primary" size={32} />;
    return <Code className="text-brand-primary" size={32} />;
  };

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-neutral/80 backdrop-blur-md border-b border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-bold tracking-tight text-brand-dark">YB.</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-brand-dark/60">
            <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
            <a href="#timeline" className="hover:text-brand-primary transition-colors">Timeline</a>
            <a href="#skills" className="hover:text-brand-primary transition-colors">Skills</a>
            <a href="#projects" className="hover:text-brand-primary transition-colors">Projects</a>
            <a href="#certifications" className="hover:text-brand-primary transition-colors">Certifications</a>
          </div>
          <div className="flex gap-4">
            <a href={portfolioData.profile.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors text-brand-dark">
              <Github size={20} />
            </a>
            <a href={portfolioData.profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors text-brand-dark">
              <Linkedin size={20} />
            </a>
            {portfolioData.profile.medium && (
              <a href={portfolioData.profile.medium} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors text-brand-dark">
                <FaMedium size={20} />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-brand-primary shadow-2xl mx-auto">
              <img 
                src={portfolioData.profile.photo} 
                alt={portfolioData.profile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-brand-dark">
              {portfolioData.profile.name}
            </h1>
            <p className="text-2xl font-display italic text-brand-primary mb-8">
              {portfolioData.profile.headline}
            </p>
            <p className="text-lg text-brand-dark/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              {portfolioData.profile.description}
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href={`mailto:${portfolioData.profile.email}`}
                className="bg-brand-primary text-white px-10 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-brand-accent transition-all hover:scale-105 shadow-lg shadow-brand-primary/20"
              >
                <Mail size={18} /> Contact Me
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unified Timeline Section */}
      <section id="timeline" className="py-24 bg-brand-neutral border-y border-brand-dark/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Journey</h2>
            <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-brand-dark/10 -translate-x-1/2"></div>

            <div className="space-y-16">
              {timelineItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot/Logo Placeholder */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-12 h-12 bg-white border-2 border-brand-primary rounded-full -translate-x-1/2 flex items-center justify-center z-10 shadow-sm overflow-hidden p-1">
                    {item.logo ? (
                      <img src={item.logo} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      'company' in item ? <Briefcase size={20} className="text-brand-primary" /> : <BookOpen size={20} className="text-brand-primary" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-dark/5 hover:shadow-md transition-shadow">
                      <span className="text-xs font-mono text-brand-primary font-bold mb-2 block">{item.period}</span>
                      <h4 className="text-xl font-bold mb-1">{'role' in item ? item.role : item.degree}</h4>
                      <p className="text-brand-accent font-display italic mb-4">{'company' in item ? item.company : item.institution}</p>
                      {'highlights' in item && (
                        <ul className="text-sm text-brand-dark/60 space-y-2">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-brand-primary"></span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                      {'grade' in item && (
                        <p className="text-sm font-medium text-brand-dark/60">{item.grade}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Skills & Expertise</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {Object.keys(portfolioData.skills).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveSkillCategory(category)}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                    activeSkillCategory === category 
                    ? 'bg-brand-primary text-white shadow-xl scale-105' 
                    : 'bg-white text-brand-dark/60 hover:bg-brand-dark/5 border border-brand-dark/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {portfolioData.skills[activeSkillCategory as keyof typeof portfolioData.skills].map((skill, idx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-brand-dark/5 shadow-sm hover:border-brand-primary/30 transition-colors flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                  <span className="font-medium text-brand-dark/80">{skill}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3D Placard Carousel Projects */}
      <section id="projects" className="py-24 bg-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-neutral">Featured Projects</h2>
           
          </div>

          <div className="relative flex items-center justify-center h-[500px]">
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-20 z-30 pointer-events-none">
              <button onClick={prevProject} className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors pointer-events-auto">
                <ChevronLeft size={32} />
              </button>
              <button onClick={nextProject} className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors pointer-events-auto">
                <ChevronRight size={32} />
              </button>
            </div>

            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
              {portfolioData.projects.map((project, idx) => {
                const offset = (idx - projectIndex + portfolioData.projects.length) % portfolioData.projects.length;
                const isCenter = offset === 0;
                const isLeft = offset === portfolioData.projects.length - 1;
                const isRight = offset === 1;

                if (!isCenter && !isLeft && !isRight) return null;

                return (
                  <motion.div
                    key={idx}
                    initial={false}
                    animate={{
                      x: isCenter ? 0 : isLeft ? -300 : 300,
                      scale: isCenter ? 1 : 0.8,
                      opacity: isCenter ? 1 : 0.4,
                      zIndex: isCenter ? 20 : 10,
                      rotateY: isLeft ? 45 : isRight ? -45 : 0
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="absolute w-[300px] md:w-[450px] bg-brand-neutral text-brand-dark rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <div className="aspect-video bg-brand-dark/5 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                        referrerPolicy="no-referrer"
                      />
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        {getProjectIcon(project.title)}
                        <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest">{project.date}</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                      <p className="text-brand-dark/60 text-sm mb-6 line-clamp-2">{project.description}</p>
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all"
                      >
                        Explore Project <ExternalLink size={16} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Awards (Vertical Stack) */}
      <section id="certifications" className="py-24 px-6 bg-brand-neutral">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Certifications */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-brand-primary text-white rounded-2xl shadow-lg shadow-brand-primary/20">
                <Award size={28} />
              </div>
              <h2 className="text-4xl font-bold">Certifications</h2>
            </div>
            <div className="bg-white rounded-3xl border border-brand-dark/5 shadow-sm overflow-hidden">
              <div className="h-[450px] overflow-y-auto p-8 custom-scrollbar">
                <div className="grid gap-4">
                  {portfolioData.certifications.map((cert, idx) => (
                    <a 
                      key={idx}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-5 rounded-2xl hover:bg-brand-dark/5 transition-all border border-transparent hover:border-brand-primary/10 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                          <FileText size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{cert.name}</h4>
                          <p className="text-xs text-brand-dark/40 font-medium">{cert.authority} • {cert.date}</p>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-brand-dark/20 group-hover:text-brand-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Awards & Activities */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-brand-dark text-white rounded-2xl shadow-lg">
                <Trophy size={28} />
              </div>
              <h2 className="text-4xl font-bold">Awards & Activities</h2>
            </div>
            <div className="grid gap-6">
              {portfolioData.activities.map((activity, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 bg-white rounded-3xl border border-brand-dark/5 shadow-sm hover:shadow-md transition-all flex gap-6 items-start"
                >
                  <div className="p-4 bg-brand-primary/5 rounded-2xl text-brand-primary shrink-0 w-16 h-16 flex items-center justify-center overflow-hidden">
                    {activity.logo ? (
                      <img src={activity.logo} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      activity.title.toLowerCase().includes('award') ? <Trophy size={24} /> : <Activity size={24} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold">{activity.title}</h4>
                      {activity.date !== 'N/A' && (
                        <span className="text-xs font-mono font-bold text-brand-primary px-3 py-1 bg-brand-primary/5 rounded-full">{activity.date}</span>
                      )}
                    </div>
                    <p className="text-brand-dark/60 leading-relaxed">{activity.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <span className="font-display text-3xl font-bold tracking-tight text-brand-primary">YB.</span>
            <p className="text-white/40 text-sm mt-4 max-w-xs">Data Analyst specializing in fraud detection and business intelligence.</p>
          </div>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
            <a href={portfolioData.profile.linkedin}  target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
            <a href={portfolioData.profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">GitHub</a>
            {portfolioData.profile.medium && (
              <a href={portfolioData.profile.medium} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Medium</a>
            )}
            <a href={`mailto:${portfolioData.profile.email}`} className="hover:text-brand-primary transition-colors">Email</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-white/20 text-xs">
          © 2026 Yuvashri Bhanuprakash. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
