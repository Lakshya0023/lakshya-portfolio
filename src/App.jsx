import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronRight, Code2, Command, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, MousePointer2, MoveUpRight, Play, Send, Shield, Sparkles, Terminal, Trophy, X } from 'lucide-react'
import World from './World.jsx'
import { ProjectVisual } from './ProjectVisuals.jsx'
import { personal, projects, projectFilters, highlights, skillGroups } from './data.js'

const easing = [0.22, 1, 0.36, 1]

function Reveal({ children, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={className}
    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, delay, ease: easing }}
  >{children}</motion.div>
}

function Logo({ onClick }) {
  return <a className="brand" href="#home" onClick={onClick} aria-label="Lakshya Gupta, home">
    <span className="brand-mark">L<span>.</span></span>
    <span className="brand-name">LAKSHYA<span>GUPTA</span><small>CREATIVE DEVELOPER</small></span>
  </a>
}

function Navbar({ onExplore }) {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30)
    update(); window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <header className={'nav ' + (scrolled ? 'nav-scrolled' : '')}>
    <div className="nav-inner container">
      <Logo onClick={() => setMenu(false)}/>
      <nav className={'nav-links ' + (menu ? 'is-open' : '')} aria-label="Main navigation">
        {[['About', '#about'], ['Projects', '#projects'], ['Skills', '#skills'], ['Achievements', '#achievements']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)}>{label}</a>)}
        <a className="mobile-contact" href="#contact" onClick={() => setMenu(false)}>Get in touch ↗</a>
      </nav>
      <div className="nav-actions"><button className="nav-world" onClick={() => { setMenu(false); onExplore() }}><span className="pulse-dot"/> Explore 3D world <ArrowUpRight size={15}/></button><button className="menu-toggle" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={22}/> : <Menu size={22}/>}</button></div>
    </div>
  </header>
}

function MiniLabel({ children, light = false }) {
  return <span className={'mini-label ' + (light ? 'light' : '')}><span className="label-square"/>{children}</span>
}

function SectionIntro({ number, overline, title, detail }) {
  return <Reveal className="section-intro"><div className="section-intro-top"><MiniLabel>{number} / {overline}</MiniLabel><span className="section-intro-cross">✳</span></div><div className="section-title-row"><h2>{title}</h2>{detail && <p>{detail}</p>}</div></Reveal>
}

function ExplorePad() {
  const press = (key, down) => window.dispatchEvent(new CustomEvent('portfolio-control', {detail:{key, down}}))
  const PadButton = ({ direction, icon }) => <button aria-label={'Move '+direction} onPointerDown={event => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); press(direction, true) }} onPointerUp={()=>press(direction, false)} onPointerCancel={()=>press(direction, false)} onLostPointerCapture={()=>press(direction, false)}>{icon}</button>
  return <div className="explore-pad"><div><PadButton direction="w" icon="↑"/></div><div><PadButton direction="a" icon="←"/><PadButton direction="s" icon="↓"/><PadButton direction="d" icon="→"/></div></div>
}

class WorldErrorBoundary extends React.Component {
  constructor(props) {super(props); this.state={hasError:false}}
  static getDerivedStateFromError() {return {hasError:true}}
  render() {return this.state.hasError ? <div className="world-fallback"><span>✳</span><strong>YOUR WORLD IS LOADING</strong><p>3D requires a browser with WebGL enabled. You can still explore every project below.</p><a href="#projects" onClick={this.props.onFallback}>View projects <ArrowRight size={16}/></a></div> : this.props.children}
}

function Hero({ exploring, onExplore, onCloseExplore, onProject }) {
  return <section id="home" className="hero">
    <div className="hero-grid-overlay" aria-hidden="true" />
    <div className="hero-orbit hero-orbit-a" aria-hidden="true"/><div className="hero-orbit hero-orbit-b" aria-hidden="true"/>
    <div className="hero-layout container">
      <div className="hero-copy">
        <Reveal><div className="status-pill"><span className="pulse-dot"/> AVAILABLE FOR INTERNSHIPS <span className="status-star">✳</span> 2026–27</div></Reveal>
        <Reveal delay={0.08}><p className="hero-overline">HELLO WORLD <span>↗</span> I'M LAKSHYA GUPTA</p></Reveal>
        <Reveal delay={0.15}><h1>BUILDING<br/><span className="text-outline">WHAT'S</span><br/><span className="future-word">NEXT<span className="hero-asterisk">✳</span></span></h1></Reveal>
        <Reveal delay={0.24}><p className="hero-description">A developer who loves turning complex problems into <em>intelligent, useful experiences.</em> From AI agents to cybersecurity and full-stack systems.</p></Reveal>
        <Reveal delay={0.31}><div className="hero-ctas"><button className="btn btn-lime" onClick={onExplore}><Play size={15} fill="currentColor"/> ENTER MY WORLD <ArrowUpRight size={16}/></button><a className="btn btn-dark" href="#projects">SEE MY WORK <ArrowDownRight size={18}/></a></div></Reveal>
        <Reveal delay={0.36}><div className="hero-social"><span>FIND ME ON</span><a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a><a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a><a href={`mailto:${personal.email}`} aria-label="Email"><Mail size={18}/></a><span className="hero-social-rule"/></div></Reveal>
      </div>
      <div className="hero-visual-copy"><div className="hero-visual-note"><span>EXPLORE THE UNEXPECTED</span><span>↘</span></div></div>
    </div>
    <div className={'world-shell ' + (exploring ? 'world-shell-expanded' : '')}>
      <div className="world-sky"/><div className="world-sun"/><div className="world-vignette"/>
      <WorldErrorBoundary onFallback={onCloseExplore}><World explore={exploring} onProject={onProject}/></WorldErrorBoundary>
      {!exploring && <div className="world-preview-label"><span className="preview-live"><i/> LIVE 3D EXPERIENCE</span><span>THE BUILDER'S UNIVERSE <ArrowUpRight size={14}/></span></div>}
      {exploring && <div className="world-hud">
        <div className="world-hud-top"><div className="world-hud-logo"><span className="hud-diamond">✳</span><strong>THE BUILDER'S UNIVERSE</strong><small>INTERACTIVE EXPERIENCE · V1.0</small></div><button className="world-close" onClick={onCloseExplore}><X size={17}/> EXIT WORLD <span>ESC</span></button></div>
        <div className="world-hud-bottom"><div className="hud-controls"><strong>W A S D</strong><span>OR ARROW KEYS TO MOVE</span><small>Explore the landmarks · select a project ↗</small></div><ExplorePad/><div className="hud-chapters"><span>YOUR DESTINATIONS</span>{projects.map((p,i)=><button key={p.id} onClick={()=>onProject(p.id)}><span>0{i+1}</span>{p.title}<ArrowUpRight size={13}/></button>)}</div></div>
      </div>}
    </div>
    <div className="hero-bottom container"><div className="hero-bottom-left"><span className="vertical-line"/> SCROLL TO DISCOVER <ArrowDown size={16}/></div><div className="hero-bottom-right">CURRENTLY AT <strong>VIT VELLORE, INDIA</strong> <span>✳</span> EST. 2025</div></div>
  </section>
}

function Ticker() {
  const list = ['SOLVING REAL PROBLEMS', 'BUILDING WITH PURPOSE', 'THINKING IN SYSTEMS', 'ALWAYS CURIOUS']
  return <div className="ticker" aria-label="Solving real problems, building with purpose, thinking in systems, always curious"><div className="ticker-track">{[...list,...list].map((text,i)=><span key={i}>{text}<i>✳</i></span>)}</div></div>
}

function About() {
  return <section id="about" className="about section-pad container"><SectionIntro number="01" overline="THE PERSON BEHIND THE CODE" title={<>More than <span className="serif-accent">just</span> code.</>} detail="A little context before the commits."/>
    <div className="about-layout">
      <Reveal className="about-feature"><div className="about-feature-graphic"><div className="about-sun"/><div className="about-spark a">✳</div><div className="about-spark b">✦</div><div className="about-big-type">LG<span>®</span></div><div className="about-graphic-footer"><span>CREATING MY OWN PATH.</span><span>2025 — ∞</span></div></div><div className="about-photo-caption"><span><i/> BUILDER / LEARNER / PROBLEM SOLVER</span><span>VLR, IN <MapPin size={12}/></span></div></Reveal>
      <Reveal className="about-copy" delay={0.1}><MiniLabel>WHO I AM</MiniLabel><h3>Curiosity is my<br/>favorite <em>superpower.</em></h3><p>I'm <strong>Lakshya</strong>, a B.Tech Computer Science student specializing in <strong>Cybersecurity at VIT Vellore.</strong></p><p>I enjoy building at the intersection of <strong>software engineering, AI, cloud infrastructure, and security.</strong> I learn best by shipping real projects, breaking things, figuring out why—and making them better.</p><p>Whether it's predicting failures in a power grid or helping Kubernetes recover from incidents, I like problems that actually matter.</p>
        <div className="about-facts"><div><span>EDUCATION</span><strong>B.Tech CSE · Cybersecurity</strong></div><div><span>BASED IN</span><strong>Vellore, Tamil Nadu</strong></div><div><span>GRADUATING</span><strong>2029</strong></div></div>
        <a className="text-link" href={personal.resume} download><Download size={18}/> DOWNLOAD MY RESUME <ArrowUpRight size={17}/></a>
      </Reveal>
    </div>
  </section>
}

function ProjectCard({ project, index }) {
  return <Reveal className={'project-card project-'+project.id} delay={index%2 * 0.08}><article id={'project-'+project.id}>
    <div className="project-illustration"><ProjectVisual id={project.id}/><span className="project-category">{project.category}</span><span className="project-index">{project.number} / {String(projects.length).padStart(2, '0')}</span></div>
    <div className="project-info"><div className="project-eyebrow"><span className="small-dot" style={{background:project.accent}}/>{project.eyebrow}</div><h3>{project.title}</h3><p className="project-tagline">{project.tagline}</p><p className="project-description">{project.description}</p><div className="project-stack">{project.stack.map(tech=><span key={tech}>{tech}</span>)}</div><div className="project-actions"><span className="project-stat"><span>✳</span> {project.stat}</span><div className="project-links">{project.live&&<a href={project.live} target="_blank" rel="noreferrer" aria-label={`View ${project.title} live demo`} title="Live demo"><ExternalLink size={19}/></a>}{project.github?<a href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source on GitHub`} title="View source on GitHub"><Github size={19}/></a>:<span className="not-public">REPO COMING SOON</span>}</div></div></div>
  </article></Reveal>
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const visibleProjects = activeFilter === 'all' ? projects : projects.filter(project => project.filter === activeFilter)
  return <section id="projects" className="projects section-pad"><div className="container">
    <SectionIntro number="02" overline="SELECTED WORK" title={<>Proof of <span className="serif-accent">building.</span></>} detail="Real systems, prototypes, and hackathon builds — from AI and cloud to secure software."/>
    <div className="projects-intro"><span>PROJECT LIBRARY <span className="project-counter">({String(projects.length).padStart(2, '0')})</span></span><span>2026 EDITION <ArrowDownRight size={15}/></span></div>
    <div className="project-filter-bar" aria-label="Filter projects by field">
      <div className="project-filters">{projectFilters.map(filter => <button key={filter.id} className={'project-filter ' + (activeFilter === filter.id ? 'is-active' : '')} aria-pressed={activeFilter === filter.id} onClick={()=>setActiveFilter(filter.id)}>{filter.label}<span>{String(filter.id === 'all' ? projects.length : projects.filter(p=>p.filter===filter.id).length).padStart(2, '0')}</span></button>)}</div>
      <span className="filter-count" aria-live="polite">SHOWING {String(visibleProjects.length).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span>
    </div>
    <div className="project-grid" aria-live="polite">{visibleProjects.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</div>
    <Reveal className="projects-end"><p>FROM EXPERIMENTS TO SYSTEMS — ALWAYS BUILDING WHAT'S NEXT.</p><a href={personal.github} target="_blank" rel="noreferrer">EXPLORE MY GITHUB REPOSITORIES <ArrowUpRight size={18}/></a></Reveal>
    <div className="repo-note"><span className="repo-note-spark">✳</span><p><strong>A NOTE ABOUT THE ARCHIVE:</strong> Each featured project has a GitHub source link. The GitHub profile README and the empty <a href="https://github.com/Lakshya0023/DATABASE_PROJECT" target="_blank" rel="noreferrer">DATABASE_PROJECT ↗</a> repository aren't listed as separate finished projects.</p></div>
  </div></section>
}

function Skills() {
  return <section id="skills" className="skills section-pad container"><SectionIntro number="03" overline="THE TOOLKIT" title={<>Built to <span className="serif-accent">build.</span></>} detail="A toolkit that keeps growing with every new problem."/>
    <div className="skills-layout"><Reveal className="skills-left"><span className="skills-main-icon"><Code2 size={31}/></span><h3>Always learning.<br/><em>Always shipping.</em></h3><p>Strong foundations, a curious mindset, and tools chosen to solve the problem—not just follow the trend.</p><div className="terminal-quote"><span><i/><i/><i/></span><code><span>$</span> whoami<br/><b>developer · problem solver · lifelong learner</b><br/><span>$</span> <span className="cursor">▋</span></code></div></Reveal><div className="skills-list">{skillGroups.map((skill,i)=><Reveal key={skill.name} delay={i*.06}><div className="skill-row"><div className="skill-row-title"><span>{skill.number}</span><h4>{skill.name}</h4><ChevronRight size={17}/></div><div className="skill-chips">{skill.items.map(item=><span key={item}>{item}</span>)}</div></div></Reveal>)}</div></div>
  </section>
}

function Achievements() {
  return <section id="achievements" className="achievements section-pad"><div className="container"><SectionIntro number="04" overline="MILESTONES & MOMENTS" title={<>Made to <span className="serif-accent">compete.</span></>} detail="Good ideas get better when you put them to the test."/><div className="achievement-grid">{highlights.map((item,i)=><Reveal key={item.title} delay={i*.06} className="achievement-item"><div className="achievement-top"><Trophy size={20}/><span>0{i+1} / 04</span></div><div className="achievement-rank">{item.rank}<small>{item.suffix}</small></div><div className="achievement-bottom"><strong>{item.title}</strong><span>{item.description}</span></div></Reveal>)}</div><Reveal className="journey-band"><div className="journey-icon"><Sparkles size={21}/></div><div><span>CURRENT CHAPTER</span><h3>McKinsey Forward <em>· Forward Learner</em></h3><p>Developing structured problem-solving, communication, and analytical thinking through guided learning.</p></div><span className="journey-date">SEP 2026 — PRESENT</span></Reveal></div></section>
}

function Contact() {
  const [copied,setCopied] = useState(false)
  const copyEmail = async () => {try {await navigator.clipboard.writeText(personal.email);setCopied(true);setTimeout(()=>setCopied(false),1800)} catch {window.location.href=`mailto:${personal.email}`}}
  return <section id="contact" className="contact section-pad"><div className="container"><Reveal><div className="contact-top"><MiniLabel light>05 / LET'S CONNECT</MiniLabel><span>HAVE AN IDEA? AN OPPORTUNITY? LET'S TALK.</span></div><h2>LET'S MAKE<br/><span>SOMETHING</span><br/><em>MATTER.</em><span className="contact-star">✳</span></h2><div className="contact-bottom"><div><p>Currently open to software development, AI, cloud, and cybersecurity internship opportunities—and great conversations.</p><button className="copy-email" onClick={copyEmail}>{copied ? <Check size={17}/> : <Mail size={17}/>} {copied ? 'EMAIL COPIED!' : personal.email}<span>{copied ? '✓' : 'COPY ↗'}</span></button></div><a className="contact-circle" href={`mailto:${personal.email}`} aria-label="Email Lakshya"><ArrowUpRight size={45}/></a></div></Reveal></div></section>
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><a href="#home" className="footer-brand">LG<span>✳</span></a><p>CREATING THE FUTURE,<br/>ONE COMMIT AT A TIME.</p><div className="footer-links"><a href={personal.github} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={14}/></a><a href={personal.linkedin} target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={14}/></a><a href={personal.resume} download>RESUME <ArrowUpRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} LAKSHYA GUPTA. MADE WITH CURIOSITY.</span><span>DESIGNED & BUILT BY ME <span>✳</span> IN INDIA</span><a href="#home">BACK TO TOP ↑</a></div></div></footer>
}

export default function App() {
  const [exploring, setExploring] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30, restDelta:0.001 })
  useEffect(() => {
    document.body.style.overflow = exploring ? 'hidden' : ''
    const close = (e) => { if(e.key === 'Escape') setExploring(false) }
    window.addEventListener('keydown',close)
    return () => {document.body.style.overflow='';window.removeEventListener('keydown',close)}
  }, [exploring])
  const openProject = (id) => {setExploring(false);setTimeout(() => document.getElementById('project-'+id)?.scrollIntoView({behavior:'smooth',block:'center'}), 120)}
  return <>
    <motion.div className="scroll-progress" style={{ scaleX }} />
    <a className="skip-link" href="#projects">Skip to projects</a>
    <Navbar onExplore={()=>setExploring(true)}/>
    <main><Hero exploring={exploring} onExplore={()=>setExploring(true)} onCloseExplore={()=>setExploring(false)} onProject={openProject}/><Ticker/><About/><Projects/><Skills/><Achievements/><Contact/></main>
    <Footer/>
  </>
}
