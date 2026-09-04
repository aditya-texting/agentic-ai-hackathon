"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  ChevronDown, Cpu, Network, Database, Shield, Zap, Brain, Search,
  Calendar, MapPin, Users, Award, Code, Globe, ArrowRight, AudioLines,
  Menu, X
} from "lucide-react";

// --- UI Components ---
const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer";
  const variants = {
    primary: "bg-primary text-black hover:bg-white primary-glow",
    secondary: "glass-panel text-white hover:bg-white/10 border border-white/10"
  };
  return (
    <button className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Sections ---

const NavLink = ({ href, children, isActive = false, onClick, className = '' }: any) => {
  return (
    <a 
      href={href} 
      onClick={onClick} 
      className={`relative group text-sm font-medium transition-colors py-2 block ${isActive ? 'text-primary' : 'text-white/70 hover:text-primary'} ${className}`}
    >
      {children}
      {/* Hover Line */}
      {!isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>}
      {/* Active Line */}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>
      )}
    </a>
  );
};

const Header = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        window.history.pushState(null, '', `#${section}`);
      }
    }, 50);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img src="/images.png" alt="Cognee Logo" className="h-14 w-auto object-contain mix-blend-screen" />
          </div>
          <span className="text-white/30 font-light mx-2">X</span>
          <div className="flex items-center gap-2">
            <img src="/nerdsroom.jpg" alt="Nerds Room" className="h-12 w-12 rounded-full object-cover mix-blend-screen" />
          </div>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm">
          <NavLink href="#home" isActive={activeSection === "home"} onClick={(e: any) => handleNavClick(e, "home")}>Home</NavLink>
          <NavLink href="#why-participate" isActive={activeSection === "why-participate"} onClick={(e: any) => handleNavClick(e, "why-participate")}>Why Participate</NavLink>
          <NavLink href="#tracks" isActive={activeSection === "tracks"} onClick={(e: any) => handleNavClick(e, "tracks")}>Tracks</NavLink>
          <NavLink href="#timeline" isActive={activeSection === "timeline"} onClick={(e: any) => handleNavClick(e, "timeline")}>Timeline</NavLink>
          <NavLink href="#faq" isActive={activeSection === "faq"} onClick={(e: any) => handleNavClick(e, "faq")}>FAQ</NavLink>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="primary" 
            className="hidden xl:flex py-2 px-5 text-sm" 
            onClick={() => {
              const el = document.getElementById('tracks');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }}
          >
            Register
          </Button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col items-center py-4 w-full">
              <NavLink className="w-full text-center py-5 text-xl" href="#home" isActive={activeSection === "home"} onClick={(e: any) => handleNavClick(e, "home")}>Home</NavLink>
              <NavLink className="w-full text-center py-5 text-xl" href="#why-participate" isActive={activeSection === "why-participate"} onClick={(e: any) => handleNavClick(e, "why-participate")}>Why Participate</NavLink>
              <NavLink className="w-full text-center py-5 text-xl" href="#tracks" isActive={activeSection === "tracks"} onClick={(e: any) => handleNavClick(e, "tracks")}>Tracks</NavLink>
              <NavLink className="w-full text-center py-5 text-xl" href="#timeline" isActive={activeSection === "timeline"} onClick={(e: any) => handleNavClick(e, "timeline")}>Timeline</NavLink>
              <NavLink className="w-full text-center py-5 text-xl" href="#faq" isActive={activeSection === "faq"} onClick={(e: any) => handleNavClick(e, "faq")}>FAQ</NavLink>
              <Button 
                variant="primary" 
                className="mt-6 px-8 py-4 text-lg w-4/5" 
                onClick={() => { 
                  setIsMobileMenuOpen(false); 
                  setTimeout(() => {
                    const el = document.getElementById('tracks');
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                  }, 50);
                }}
              >
                Register
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const AnimatedTerminal = () => {
  const [lines, setLines] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCmd, setCurrentCmd] = useState("");
  const [playCount, setPlayCount] = useState(0);

  const script = [
    { type: "cmd", text: "$ pip install cognee" },
    { type: "out", text: "" },
    { type: "cmd", text: "$ await cognee.agents()" },
    { type: "out", text: "✓ 3 agents connected · company brain active · knowledge wiki synced" },
    { type: "cmd", text: '$ await cognee.remember("relevant context for agent memory")' },
    { type: "out", text: "-> ontology-guide.md:38 · domain rules ground ambiguous terms\n-> ai-memory-notes.md:112 · graph links facts across sessions\n-> support-notes.md:19 · answer keeps citations attached\n✓ relevant memories stored · citations preserved" },
    { type: "cmd", text: '$ await cognee.recall("Which sources explain how ontologies improve agent memory?")' },
    { type: "out", text: "✓ search 40ms · answer assembled from relevant memories" },
    { type: "cmd", text: '$ await cognee.improve({ feedback: "use citation 2 first" })' },
    { type: "out", text: "✓ feedback stored · recall weights updated for next run" },
  ];

  useEffect(() => {
    let active = true;
    const runScript = async () => {
      setLines([]);
      setCurrentCmd("");
      for (const step of script) {
        if (!active) return;
        if (step.type === "cmd") {
          setIsTyping(true);
          setCurrentCmd("");
          for (let i = 0; i <= step.text.length; i++) {
            if (!active) return;
            setCurrentCmd(step.text.slice(0, i));
            await new Promise(r => setTimeout(r, 30));
          }
          setIsTyping(false);
          setLines(prev => [...prev, { type: "cmd", text: step.text }]);
          setCurrentCmd("");
          await new Promise(r => setTimeout(r, 300));
        } else {
          if (step.text) {
            setLines(prev => [...prev, { type: "out", text: step.text }]);
          }
          await new Promise(r => setTimeout(r, 600));
        }
      }
      
      // Wait 5 seconds, then loop
      await new Promise(r => setTimeout(r, 5000));
      if (active) {
        setPlayCount(c => c + 1);
      }
    };
    runScript();
    return () => { active = false; };
  }, [playCount]);

  return (
    <div className="w-full max-w-2xl rounded-xl overflow-hidden bg-[#13111A] border border-[#2A2438] shadow-2xl font-mono text-[13px] leading-relaxed text-left flex flex-col h-[520px] mb-12 lg:mb-0">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1625] border-b border-[#2A2438] shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="text-white/40 text-xs font-semibold">cognee@localhost:8000</div>
        <div className="text-white/30 text-[10px] tracking-wider uppercase font-bold">Done</div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {lines.map((l, i) => (
          <div key={i} className={l.type === "cmd" ? "text-white font-medium" : "text-[#A78BFA] whitespace-pre-line"}>
            {l.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-white font-medium">
            {currentCmd}<span className="inline-block w-2 h-4 bg-primary/70 animate-pulse ml-1 align-middle"></span>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#1A1625] border-t border-[#2A2438] shrink-0">
        <div className="flex gap-6 text-[10px] sm:text-xs font-bold tracking-widest uppercase hidden sm:flex">
          <div className="flex items-center gap-2"><span className="text-white">3</span><span className="text-white/50">Agents</span></div>
          <div className="flex items-center gap-2"><span className="text-white">1,284</span><span className="text-white/50">Docs</span></div>
          <div className="flex items-center gap-2"><span className="text-white">6,418</span><span className="text-white/50">Entities</span></div>
          <div className="flex items-center gap-2"><span className="text-white">5</span><span className="text-white/50">Citations</span></div>
        </div>
        <div className="flex items-center ml-auto">
          <button 
            onClick={() => setPlayCount(c => c + 1)}
            className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80 text-xs font-bold tracking-wider transition-colors border border-white/10 cursor-pointer"
          >
            REPLAY
          </button>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const blocks = React.useMemo(() => {
    const colors = ["#2a203f", "#33264c", "#1e172e", "#251c38"];
    return Array.from({ length: 40 }).map((_, i) => ({
      left: `${Math.floor(Math.random() * 100)}%`,
      top: `-10%`,
      width: `${[30, 60, 90][Math.floor(Math.random() * 3)]}px`,
      height: `${[30, 60, 90][Math.floor(Math.random() * 3)]}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 25 + 15,
      delay: -(Math.random() * 30) // Negative delay populates the screen instantly
    }));
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-18 overflow-hidden grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070709]/50 to-[#070709] z-0 pointer-events-none"></div>
      
      {/* Falling Background Grid Blocks */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <style>{`
          @keyframes matrix-fall {
            0% { transform: translateY(-10vh); }
            100% { transform: translateY(150vh); }
          }
        `}</style>
        {blocks.map((b, i) => (
          <div 
            key={i} 
            className="absolute mix-blend-screen"
            style={{ 
              left: b.left, 
              top: b.top,
              width: b.width, 
              height: b.height, 
              opacity: b.opacity,
              backgroundColor: b.color,
              animation: `matrix-fall ${b.duration}s linear ${b.delay}s infinite`
            }}
          />
        ))}
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-10">
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left w-full"
        >
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-8"
          >
            First Week of October • Virtual & In-Person
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
            <span className="block text-white/90">Agentic AI</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Hackathon</span>
            <span className="block text-white/90">By Cognee</span>
          </h1>
          
          <p className="text-lg text-white/60 mb-10 max-w-lg">
            Join top developers to build agentic workflows and memory systems using Cognee. Push the boundaries of what AI can remember and do.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto mb-16 md:mb-32">
            <Button variant="primary" className="w-full sm:w-auto text-lg px-8">
              Register Now <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto text-lg px-8" onClick={() => document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' })}>
              View Challenges
            </Button>
          </div>
        </motion.div>
        
        {/* Right Column (Terminal) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center lg:justify-end w-full"
        >
          <AnimatedTerminal />
        </motion.div>
      </div>
    </section>
  );
};

const WhyParticipate = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(0);
  
  const cards = [
    { title: "Networking", desc: "Connect with top developers, AI engineers, and founders in the agentic AI space.", link: "Meet the community →", url: "https://discord.com/invite/m63hxKsp4p" },
    { title: "Learning AI Memory", desc: "Learn how to implement long-term memory for autonomous agents using Cognee.", link: "Explore the docs →", url: "https://github.com/topoteretes/cognee" },
    { title: "Build the Future", desc: "Get hands-on experience building the next generation of LLM applications.", link: "Start building →", url: "https://github.com/topoteretes/cognee" },
    { title: "Huge Prize Pool", desc: "Compete for a share of the $1000+ prize pool and exclusive opportunities.", link: "View prizes →", url: "#" }
  ];

  return (
    <section id="why-participate" className="py-20 md:py-32 bg-[#1C1C1E] text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-4xl"
        >
          <h4 className="text-[#B19DF7] text-sm font-bold tracking-[0.2em] uppercase mb-6">
            WHY PARTICIPATE
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] mb-8 tracking-tight">
            What should be remembered gets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B19DF7] to-[#8061e6]">forgotten</span>,<br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B19DF7] to-[#8061e6]">disconnected</span>, or <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B19DF7] to-[#8061e6]">silently incomplete</span>.
          </h2>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl">
            Your team can't find what the community already knows. Your coding agents relearn the same context every run. Join the brightest minds in AI to push the boundaries of what autonomous agents can do. Start wherever it hurts most.
          </p>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          onMouseLeave={() => setHoveredCard(0)}
        >
          {cards.map((card, i) => {
            const isActive = hoveredCard === i;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onClick={() => {
                  if (card.url && card.url !== "#") {
                    window.open(card.url, '_blank', 'noopener,noreferrer');
                  }
                }}
                className={`relative rounded-2xl border transition-colors duration-500 bg-[#252528] overflow-hidden flex flex-col h-80 cursor-pointer ${
                  isActive ? "border-[#B19DF7]/60" : "border-white/10"
                } active:scale-[0.98]`}
              >
                <div className="p-8 flex-1 z-10">
                  <h3 className={`transition-colors duration-500 text-xl font-medium tracking-tight mb-3 ${
                    isActive ? "text-[#B19DF7]" : "text-white"
                  }`}>
                    {card.title}
                  </h3>
                  <p className={`transition-colors duration-500 text-sm leading-relaxed ${
                    isActive ? "text-white" : "text-white/60"
                  }`}>
                    {card.desc}
                  </p>
                </div>
                <div className="mt-auto px-8 pb-8 z-10">
                  <a href={card.url || "#"} target={card.url && card.url !== "#" ? "_blank" : "_self"} rel={card.url && card.url !== "#" ? "noopener noreferrer" : ""} className={`transition-colors duration-500 text-sm flex items-center gap-1 font-medium ${
                    isActive ? "text-[#B19DF7]" : "text-white/60"
                  }`}>
                    {card.link}
                  </a>
                </div>
                {/* Default White Checkers */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 transition-opacity duration-500 ${
                  isActive ? "opacity-0" : "opacity-[0.03]"
                }`} style={{ backgroundSize: '2rem 2rem', backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)', backgroundPosition: '0 0, 1rem 1rem' }}></div>
                
                {/* Hover Purple Checkers */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 transition-opacity duration-500 ${
                  isActive ? "opacity-30" : "opacity-0"
                }`} style={{ backgroundSize: '2rem 2rem', backgroundImage: 'linear-gradient(45deg, #B19DF7 25%, transparent 25%, transparent 75%, #B19DF7 75%, #B19DF7), linear-gradient(45deg, #B19DF7 25%, transparent 25%, transparent 75%, #B19DF7 75%, #B19DF7)', backgroundPosition: '0 0, 1rem 1rem' }}></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-[#252528]"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15);
    
    return () => clearInterval(interval);
  }, [text]);

  return <>{displayedText}</>;
};

const Tracks = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const challenges = [
    {
      id: "autonomous-agents",
      shortTitle: "AUTONOMOUS AGENTS",
      tag: "TRACK 01",
      title: "Build agents that autonomously research and act using long-term memory.",
      description: "Create an AI agent that can retain context across multiple sessions, allowing it to perform complex, multi-step tasks without needing to be re-prompted.",
      buttons: ["View Track Details"],
      detailsJson: `{
  "track": "Autonomous Agents",
  "difficulty": "Advanced",
  "requirements": [
    "Cognee Memory SDK",
    "OpenAI/Anthropic integration",
    "Persistent state management"
  ],
  "prizes": [
    "1st: $15,000",
    "2nd: $5,000"
  ],
  "timeline": "Oct 1 - Oct 7, 2026"
}`
    },
    {
      id: "personal-knowledge",
      shortTitle: "PERSONAL KNOWLEDGE",
      tag: "TRACK 02",
      title: "Create systems that learn and adapt to an individual user over time.",
      description: "Design a personal assistant that remembers user preferences, past interactions, and unique workflows to provide a highly personalized experience.",
      buttons: ["View Track Details"],
      detailsJson: `{
  "track": "Personal Knowledge",
  "difficulty": "Intermediate",
  "requirements": [
    "Local Knowledge Graph",
    "User authentication",
    "Privacy-first architecture"
  ],
  "prizes": [
    "1st: $10,000",
    "2nd: $2,500"
  ],
  "timeline": "Oct 1 - Oct 7, 2026"
}`
    },
    {
      id: "enterprise-search",
      shortTitle: "ENTERPRISE SEARCH",
      tag: "TRACK 03",
      title: "Develop secure, scalable memory systems for enterprise data silos.",
      description: "Connect scattered enterprise data into a unified, secure knowledge graph that LLMs can query accurately while respecting access controls.",
      buttons: ["View Track Details"],
      detailsJson: `{
  "track": "Enterprise Search",
  "difficulty": "Expert",
  "requirements": [
    "Role-Based Access Control",
    "High-throughput vector search",
    "Multi-tenant architecture"
  ],
  "prizes": [
    "1st: $20,000",
    "2nd: $5,000"
  ],
  "timeline": "Oct 1 - Oct 7, 2026"
}`
    },
    {
      id: "multi-agent",
      shortTitle: "MULTI-AGENT",
      tag: "TRACK 04",
      title: "Orchestrate multiple specialized agents with shared memory.",
      description: "Build a swarm of specialized agents (coder, reviewer, tester) that share a common memory graph to collaborate on complex projects.",
      buttons: ["View Track Details", "Submit Project"],
      detailsJson: `{
  "track": "Multi-Agent Systems",
  "difficulty": "Advanced",
  "requirements": [
    "Shared Knowledge Graph",
    "Agentic communication protocol",
    "Conflict resolution"
  ],
  "prizes": [
    "1st: $15,000",
    "2nd: $5,000"
  ],
  "timeline": "Oct 1 - Oct 7, 2026"
}
  
{
  "track": "Multi-Agent Systems",
  "difficulty": "Advanced",
  "requirements": [
    "Shared Knowledge Graph",
    "Agentic communication protocol",
    "Conflict resolution"
  ],
  "prizes": [
    "1st: $15,000",
    "2nd: $5,000"
  ],
  "timeline": "Oct 1 - Oct 7, 2026"
}{
  "track": "Multi-Agent Systems",
  "difficulty": "Advanced",
  "requirements": [
    "Shared Knowledge Graph",
    "Agentic communication protocol",
    "Conflict resolution"
  ],
  "prizes": [
    "1st: $15,000",
    "2nd: $5,000"
  ],
  "timeline": "Oct 1 - Oct 7, 2026"
}


`
    }
  ];

  return (
    <section id="tracks" className="py-20 md:py-32 relative bg-[#252528]">
      {/* Checkered Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{ 
          backgroundSize: '2rem 2rem', 
          backgroundImage: 'linear-gradient(45deg, #B19DF7 25%, transparent 25%, transparent 75%, #B19DF7 75%, #B19DF7), linear-gradient(45deg, #B19DF7 25%, transparent 25%, transparent 75%, #B19DF7 75%, #B19DF7)', 
          backgroundPosition: '0 0, 1rem 1rem' 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h4 className="text-[#B19DF7] text-sm font-bold tracking-[0.2em] uppercase mb-6">
            THE CHALLENGES
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] mb-8 tracking-tight text-white">
            Tracks & Categories
          </h2>
        </motion.div>

        {/* The Case-Study Tab Interface */}
        <div className="bg-[#B19DF7] rounded-3xl overflow-hidden text-black transition-colors duration-500 relative">
          
          {/* Top Tabs */}
          <div className="flex flex-wrap border-b border-black/10">
            {challenges.map((challenge, idx) => (
              <button
                key={challenge.id}
                onClick={() => { setActiveTab(idx); setShowDetails(false); }}
                className={`px-6 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${
                  activeTab === idx 
                    ? "bg-transparent text-black" 
                    : "bg-black/5 text-black/50 hover:bg-black/10 hover:text-black/80"
                }`}
              >
                {challenge.shortTitle}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="p-12 md:p-16 lg:p-24 grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
            
            {/* Left side text */}
            <div className="flex flex-col items-start z-10 relative">
              <div className="text-xs font-bold tracking-widest uppercase mb-8 text-black/70">
                {challenges[activeTab].tag}
              </div>
              <h3 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-8 tracking-tight">
                {challenges[activeTab].title}
              </h3>
              <p className="text-black/70 text-lg mb-10 max-w-lg">
                {challenges[activeTab].description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-6 py-3 bg-[#1C1C1E] text-white rounded-full text-sm font-medium hover:bg-black transition-colors"
                >
                  {showDetails ? "Hide Details" : challenges[activeTab].buttons[0]}
                </button>
              </div>
            </div>

            {/* Right side Terminal Details */}
            <div className="flex justify-center md:justify-end items-center relative z-10 w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-80 bg-[#0c0c0e] rounded-xl border border-white/10 p-6 font-mono text-sm overflow-hidden flex flex-col shadow-2xl relative text-left"
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                {showDetails ? (
                  <div className="text-white/80 overflow-y-auto terminal-scroll pr-2 flex-1 whitespace-pre-wrap">
                    <Typewriter text={challenges[activeTab].detailsJson} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/40 pb-12">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mb-4" />
                    <div className="animate-pulse tracking-widest text-xs">AWAITING INPUT...</div>
                  </div>
                )}
              </motion.div>
            </div>

          </div>
          
          {/* Dot Indicators */}
          <div className="absolute top-24 right-12 hidden md:flex items-center gap-2">
            {challenges.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeTab === idx ? "w-6 bg-black" : "w-1.5 bg-black/20"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};



const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "What is the overarching theme of this hackathon?", a: "The theme centers on building next-generation Agentic AI applications. Participants are challenged to design autonomous, memory-augmented AI agents that can reason, plan, and execute complex multi-step tasks across diverse domains." },
    { q: "Who is eligible to participate?", a: "We welcome a diverse range of participants including software engineers, AI researchers, product designers, and data scientists. Whether you are an experienced professional or a passionate student, you can participate globally." },
    { q: "Do I need prior experience with Agentic AI or Cognee?", a: "While prior experience with AI frameworks is beneficial, it is not strictly required. We provide comprehensive documentation, API access, and mentorship sessions to help you rapidly prototype using Cognee's open-source framework." },
    { q: "How do teams work?", a: "Participants can compete individually or in teams of up to four members. If you do not have a team, we facilitate networking events and dedicated Discord channels during the registration phase to help you find collaborators." },
    { q: "What is the evaluation criteria for the submissions?", a: "Projects will be judged on technical complexity, innovative use of memory and graph architectures, user experience, and practical real-world applicability. Bonus points are awarded for leveraging Cognee’s advanced graph structures." },
    { q: "Is this a virtual or in-person event?", a: "The hackathon is a hybrid event. The ideation, building, and initial submission phases are entirely virtual, allowing global participation. The Final Demo round will be livestreamed, with an optional in-person component for finalists." },
    { q: "Who holds the intellectual property rights to the projects built?", a: "You and your team retain full ownership and intellectual property rights to the code and products you build during the hackathon. We encourage open-sourcing, but it is not mandatory." },
    { q: "What resources and APIs will be provided?", a: "Participants will receive free tier access to premium LLM APIs, dedicated cloud compute credits, and priority technical support from the Cognee core engineering team." },
    { q: "How do I get support during the hackathon?", a: "Technical mentors and industry experts will be available around the clock on our official Discord server. We will also host daily technical workshops and live Q&A sessions to help unblock you." }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 relative bg-[#070709]">
      {/* Checkered Background */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #B19DF7 1px, transparent 1px),
            linear-gradient(to bottom, #B19DF7 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070709] via-transparent to-[#070709] z-10 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-20">
        <div className="text-center mb-24">
          <h4 className="text-[#B19DF7] text-sm font-bold tracking-[0.2em] uppercase mb-6">
            SUPPORT
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] mb-8 tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-[#1C1C1E] ${openIndex === i ? 'border-[rgba(177,157,247,0.5)] shadow-[0_0_20px_rgba(177,157,247,0.1)]' : 'border-white/5 hover:border-white/20'}`} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="p-6 md:p-8 flex justify-between items-center gap-4">
                <h4 className={`text-base md:text-lg font-semibold transition-colors duration-300 ${openIndex === i ? 'text-[#B19DF7]' : 'text-white'}`}>
                  {faq.q}
                </h4>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-[#B19DF7]/20 text-[#B19DF7]' : 'bg-white/5 text-white/50'}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-6 md:px-8 pb-6 md:pb-8 text-white/60 text-sm md:text-base leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-20 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-primary/10"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Build the Future?</h2>
      <p className="text-xl text-white/70 mb-10">Join thousands of developers in the largest AI Agentic Hackathon.</p>
      <Button variant="primary" className="mx-auto text-lg px-8 py-4 active:scale-95" onClick={() => document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' })}>
        Register for Free Now
      </Button>
    </div>
  </section>
);

const Footer = () => {
  const particles = React.useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1.5
    }));
  }, []);

  return (
    <footer 
      id="footer" 
      className="border-t border-white/5 bg-black pt-24 pb-12 relative overflow-hidden group"
    >
      <style>{`
        .footer-particle {
          animation-name: footerFloatUp;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
          opacity: 0;
          animation-play-state: paused;
        }
        #footer:hover .footer-particle {
          animation-play-state: running;
        }
        @keyframes footerFloatUp {
          0% { transform: translateY(0px) scale(0); opacity: 0; }
          20% { opacity: 0.8; transform: translateY(-20px) scale(1); }
          100% { transform: translateY(-150px) scale(0); opacity: 0; }
        }
      `}</style>
      
      {/* Particles Container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#B19DF7] shadow-[0_0_12px_#B19DF7] footer-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            {/* Cognee X Nerds Room Branding */}
            <div className="flex items-center gap-3 mb-6">
              <img src="/images.png" alt="Cognee Logo" className="h-10 w-auto object-contain mix-blend-screen" />
              <span className="text-white/30 font-light text-xl">X</span>
              <img src="/nerdsroom.jpg" alt="Nerds Room" className="h-10 w-10 rounded-full object-cover mix-blend-screen" />
            </div>
            <p className="text-white/50 text-base leading-relaxed max-w-sm">
              The ultimate Agentic AI Hackathon. Build autonomous agents, leverage graph memory, and shape the future of AI.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-base text-white/50">
              <li><a href="#home" className="hover:text-[#B19DF7] transition-colors inline-block">Home</a></li>
              <li><a href="#why-participate" className="hover:text-[#B19DF7] transition-colors inline-block">Why Participate</a></li>
              <li><a href="#tracks" className="hover:text-[#B19DF7] transition-colors inline-block">Tracks</a></li>
              <li><a href="#timeline" className="hover:text-[#B19DF7] transition-colors inline-block">Timeline</a></li>
              <li><a href="#faq" className="hover:text-[#B19DF7] transition-colors inline-block">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Connect</h4>
            <ul className="space-y-4 text-base text-white/50">
              <li><a href="https://twitter.com/cognee_" target="_blank" rel="noopener noreferrer" className="hover:text-[#B19DF7] transition-colors inline-block">Twitter (X)</a></li>
              <li><a href="https://discord.com/invite/m63hxKsp4p" target="_blank" rel="noopener noreferrer" className="hover:text-[#B19DF7] transition-colors inline-block">Discord</a></li>
              <li><a href="https://github.com/topoteretes/cognee" target="_blank" rel="noopener noreferrer" className="hover:text-[#B19DF7] transition-colors inline-block">GitHub</a></li>
              <li><a href="https://www.linkedin.com/company/cognee-ai" target="_blank" rel="noopener noreferrer" className="hover:text-[#B19DF7] transition-colors inline-block">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm font-medium">
            © 2026 Cognee X Nerds Room. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Timeline = () => {
  const steps = [
    {
      title: "Registration",
      date: "6 September – 20 September",
      desc: "Registrations officially open. Participants can register, explore the hackathon theme, form teams, and start working on their ideas."
    },
    {
      title: "Profile Review & Ideation",
      date: "3rd Week of September",
      desc: "Registered participants will go through the profile review round while teams develop and refine their initial ideas."
    },
    {
      title: "Project & Ideation Submission",
      date: "4th Week of September",
      desc: "Teams submit their final project idea, concept, and proposed solution for evaluation."
    },
    {
      title: "Final Round",
      date: "1st Week of October",
      desc: "Shortlisted teams move to the final round, present their projects, and compete for the final awards."
    }
  ];

  const blocks = React.useMemo(() => {
    const colors = ["#2a203f", "#33264c", "#1e172e", "#251c38"];
    return Array.from({ length: 60 }).map((_, i) => ({
      left: `${Math.floor(Math.random() * 100)}%`,
      top: `-10%`,
      width: `${[30, 60, 90][Math.floor(Math.random() * 3)]}px`,
      height: `${[30, 60, 90][Math.floor(Math.random() * 3)]}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 40 + 35,
      delay: -(Math.random() * 60)
    }));
  }, []);

  return (
    <section id="timeline" className="py-20 md:py-32 relative overflow-hidden bg-[#070709]">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#B19DF7]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      {/* Falling Background Grid Blocks */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <style>{`
          @keyframes timeline-fall {
            0% { transform: translateY(-10vh); }
            100% { transform: translateY(400vh); }
          }
        `}</style>
        {blocks.map((b, i) => (
          <div 
            key={i} 
            className="absolute mix-blend-screen"
            style={{ 
              left: b.left, 
              top: b.top,
              width: b.width, 
              height: b.height, 
              opacity: b.opacity,
              backgroundColor: b.color,
              animation: `timeline-fall ${b.duration}s linear ${b.delay}s infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h4 className="text-[#B19DF7] text-sm font-bold tracking-[0.2em] uppercase mb-6">
            ROADMAP
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] mb-8 tracking-tight text-white">
            Hackathon Timeline
          </h2>
        </div>

        <div className="relative">
          {/* Subtle vertical line baseline */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 overflow-hidden rounded-full z-0">
            <div 
              className="absolute left-0 right-0 h-[300px] bg-gradient-to-b from-transparent via-[#B19DF7] to-transparent opacity-80"
              style={{ animation: 'flowDown 3s linear infinite' }}
            ></div>
          </div>
          <style>{`
            @keyframes flowDown {
              0% { top: -300px; }
              100% { top: 100%; }
            }
          `}</style>
          
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial="inactive"
                whileInView="active"
                viewport={{ margin: "-50% 0px -50% 0px" }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Glowing Node that activates on scroll */}
                <motion.div 
                  variants={{
                    inactive: { backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "none", scale: 0.8 },
                    active: { backgroundColor: "#B19DF7", boxShadow: "0 0 20px #B19DF7, 0 0 40px #B19DF7", scale: 1.2 }
                  }}
                  className="absolute left-[28px] md:left-1/2 top-[44px] md:top-1/2 w-4 h-4 rounded-full -translate-x-1/2 md:-translate-y-1/2 z-10 transition-all duration-500"
                ></motion.div>
                
                {/* Active spine segment (Optional extra flair) */}
                <motion.div
                  variants={{
                    inactive: { opacity: 0 },
                    active: { opacity: 1 }
                  }}
                  className="absolute left-[28px] md:left-1/2 top-[44px] md:top-1/2 bottom-0 w-[2px] bg-gradient-to-b from-[#B19DF7] to-transparent -translate-x-1/2 z-0 pointer-events-none transition-opacity duration-700 hidden md:block"
                  style={{ height: '100px' }}
                ></motion.div>

                {/* Card Container */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 md:text-right text-left' : 'md:pl-16 text-left'}`}>
                  <motion.div 
                    variants={{
                      inactive: { borderColor: "rgba(255,255,255,0.05)" },
                      active: { borderColor: "rgba(177,157,247,0.5)" }
                    }}
                    className="glass-panel p-8 rounded-3xl transition-all duration-500 relative overflow-hidden bg-[#1C1C1E]"
                  >
                    <div className="relative z-10">
                      <motion.span 
                        variants={{
                          inactive: { color: "rgba(255,255,255,0.5)" },
                          active: { color: "#B19DF7" }
                        }}
                        className="font-mono text-sm tracking-widest mb-4 block transition-colors duration-500"
                      >
                        {step.date}
                      </motion.span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed text-sm md:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const ParticleText = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create context without willReadFrequently to avoid potential browser quirks
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000, radius: 100 };

    class Particle {
      x: number; baseY: number; size: number; density: number;
      y: number; baseX: number;
      
      constructor(x: number, y: number, size: number) {
        this.x = x; 
        this.y = y; 
        this.baseX = x; 
        this.baseY = y;
        this.size = size; 
        this.density = Math.random() * 30 + 1;
      }
      
      draw() {
        ctx!.fillStyle = '#000000'; // Pure black particles
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * this.density;
          this.y -= (dy / distance) * force * this.density;
        } else {
          this.x -= (this.x - this.baseX) / 10;
          this.y -= (this.y - this.baseY) / 10;
        }
      }
    }

    const init = () => {
      particles = [];
      // Force CSS dimensions based on container or window
      const width = canvas.parentElement?.clientWidth || window.innerWidth - 48;
      const height = 180;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      
      const fontSize = window.innerWidth < 768 ? 38 : 80;
      ctx.font = `900 ${fontSize}px "Arial", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      if (window.innerWidth < 768) {
        ctx.fillText('COGNEE X', width / 2, height / 2 - 22);
        ctx.fillText('NERDS ROOM', width / 2, height / 2 + 22);
      } else {
        ctx.fillText('COGNEE X NERDS ROOM', width / 2, height / 2);
      }

      try {
        const data = ctx.getImageData(0, 0, width, height).data;
        const step = window.innerWidth < 768 ? 4 : 6;
        const particleSize = window.innerWidth < 768 ? 1.5 : 2.5;
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            if (data[(y * width + x) * 4 + 3] > 128) {
              particles.push(new Particle(x, y, particleSize));
            }
          }
        }
      } catch (e) {
        console.error("Canvas pixel read failed", e);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Use a small timeout to allow layout to settle
    const t = setTimeout(() => {
      init();
      animate();
    }, 150);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };
    const onResize = () => init();

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="w-full bg-[#070709] pt-4 pb-12 relative flex justify-center">
      <div className="w-full max-w-7xl mx-6 h-[180px] bg-[#B19DF7] rounded-[40px] relative overflow-hidden cursor-crosshair">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block"></canvas>
      </div>
    </div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500); // 2.5 seconds loading
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1000] bg-[#070709] flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Awesome loader graphics */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 border-t-2 border-r-2 border-[#B19DF7] rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-b-2 border-l-2 border-white rounded-full animate-spin absolute top-4 left-4" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#B19DF7]" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white tracking-[0.3em] font-mono text-sm"
        >
          INITIALIZING <span className="text-[#B19DF7] animate-pulse">AGENTS...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#B19DF7] z-[500] origin-left shadow-[0_0_10px_rgba(177,157,247,0.8)]"
      style={{ scaleX }}
    />
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <ScrollProgress />

      <Header />
      <Hero />
      <WhyParticipate />
      <Tracks />
      <Timeline />
      <FAQ />
      <CTA />
      <Footer />
      <ParticleText />
    </main>
  );
}
