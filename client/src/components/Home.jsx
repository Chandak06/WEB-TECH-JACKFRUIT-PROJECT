import React, { useState, useEffect, useRef } from 'react';

// --- Global Styles ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    html { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
    body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    .gradient-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `}</style>
);

// --- Reusable Hooks ---
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);
  return [ref, isIntersecting];
};

const useScrollEffects = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrollY(offset);
            setIsScrolled(offset > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return { isScrolled, scrollY };
};

// --- Core UI & Icon Components ---
const AnimateOnScroll = ({ children, delay = 0, className = '' }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
        <div ref={ref} style={{
            animationName: isVisible ? 'fadeInUp' : 'none',
            animationDuration: '0.8s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            animationDelay: `${delay}ms`,
        }} className={`opacity-0 ${className}`}>
            {children}
        </div>
    );
};

const Logo = React.memo(() => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
));

const StarIcon = React.memo(() => (
    <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
));

const MentorshipIcon = React.memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
));
const FlexibleIcon = React.memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
      <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
    </svg>
));
const GrowIcon = React.memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
        <path d="M12 5v14"></path><path d="M18 11l-6-6-6 6"></path>
    </svg>
));

// --- Data Constants ---
const NAV_LINKS = [
  { href: "#features", text: "Features" },
  { href: "#testimonials", text: "Testimonials" },
  { href: "/login", text: "Login", isSecondary: true },
  { href: "/signup", text: "Get Started", isPrimary: true },
];
const FEATURES_DATA = [
    { Icon: MentorshipIcon, title: "Expert Mentorship", description: "Connect with industry professionals who provide personalized guidance tailored to your career goals.", color: "violet" },
    { Icon: FlexibleIcon, title: "Flexible Schedule", description: "Learn at your own pace with sessions that adapt to your busy lifestyle.", color: "blue" },
    { Icon: GrowIcon, title: "Career Growth", description: "Build a compelling portfolio and unlock new career opportunities.", color: "pink" },
];
const TESTIMONIALS_DATA = [
    { stars: 5, text: "Skill Swap completely transformed my learning journey. The one-on-one mentorship is absolutely phenomenal!", author: { name: "Jane Smith", title: "Python Developer", imgSrc: "https://placehold.co/100x100/e2e8f0/1e293b?text=JS", color: "violet" } },
    { stars: 5, text: "As a mentor, connecting with passionate learners is incredibly simple. The platform is outstanding!", author: { name: "Michael Doe", title: "Senior Web Developer", imgSrc: "https://placehold.co/100x100/e2e8f0/1e293b?text=MD", color: "blue" } },
    { stars: 5, text: "The flexibility is a game-changer. I can finally learn UI/UX design around my packed schedule.", author: { name: "Emily White", title: "Product Manager", imgSrc: "https://placehold.co/100x100/e2e8f0/1e293b?text=EW", color: "pink" } },
];
const STATS_DATA = [
    { value: "10K+", label: "Active Users" },
    { value: "500+", label: "Expert Mentors" },
    { value: "50K+", label: "Sessions Completed" },
];

// --- Section Components ---
const Header = ({ isScrolled }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <header
            className={`w-full sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`}
            style={{
                background: `rgba(15, 23, 42, ${isScrolled ? 0.6 : 0.2})`,
                backdropFilter: `blur(${isScrolled ? '12px' : '4px'})`,
                borderBottom: `1px solid rgba(255, 255, 255, ${isScrolled ? 0.1 : 0})`,
            }}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
                <a href="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg">
                    <div className="transform group-hover:scale-110 transition-transform duration-300"><Logo /></div>
                    <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Skill Swap</span>
                </a>
                <nav className="hidden md:flex gap-2 items-center">
                    {NAV_LINKS.map(link => (
                        <a key={link.text} href={link.href} className={ link.isPrimary ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transform hover:scale-105 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ml-6" : link.isSecondary ? "text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium py-2 px-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900" : "text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium relative py-2 px-4 rounded-lg after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-violet-500 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"}>
                            {link.text}
                        </a>
                    ))}
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} aria-controls="mobile-menu" className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div id="mobile-menu" className="md:hidden px-6 pb-6 space-y-4">
                    {NAV_LINKS.map(link => (
                        <a key={link.text} href={link.href} className={`block text-center rounded-lg py-3 px-4 font-semibold transition-all duration-300 ${link.isPrimary ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                            {link.text}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

const Hero = () => (
    <section className="w-full pt-28 pb-32 z-10 relative">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 text-center">
            <AnimateOnScroll>
                <div className="inline-flex items-center justify-center mb-8">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-violet-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500 mr-3"></span>
                    <span className="text-sm font-medium text-slate-300">Join 10,000+ active learners</span>
                </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
                    <span className="block">Master New Skills</span>
                    <span className="gradient-text">Through Peer Learning</span>
                </h1>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
                <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-lg lg:text-xl leading-relaxed font-light">
                    Connect with expert mentors and passionate learners. Build your skills through personalized, one-on-one sessions tailored to your goals.
                </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300} className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                <a href="/signup" className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
                    <span className="relative z-10 flex items-center justify-center gap-2">Start Learning Free <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></span>
                </a>
                <a href="#features" className="group bg-slate-800/50 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
                    Explore Features <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </a>
            </AnimateOnScroll>
        </div>
    </section>
);

const Stats = () => (
    <section className="pb-32">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8">
            <AnimateOnScroll delay={400} className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl mx-auto">
                {STATS_DATA.map((stat, index) => (
                    <div key={stat.label} className={`text-center ${index === 1 ? 'sm:border-x border-white/10' : ''}`}>
                        <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                ))}
            </AnimateOnScroll>
        </div>
    </section>
);

const FeatureCard = React.memo(({ Icon, title, description, color }) => { const colorClasses = { violet: { bg: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/30', hoverBorder: 'hover:border-violet-500/50', shadow: 'hover:shadow-violet-500/20', gradient: 'from-violet-500/5' }, blue: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', hoverBorder: 'hover:border-blue-500/50', shadow: 'hover:shadow-blue-500/20', gradient: 'from-blue-500/5' }, pink: { bg: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30', hoverBorder: 'hover:border-pink-500/50', shadow: 'hover:shadow-pink-500/20', gradient: 'from-pink-500/5' } }; const selectedColor = colorClasses[color] || colorClasses.violet; return ( <div className={`group relative bg-slate-800/50 rounded-2xl p-8 border border-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${selectedColor.hoverBorder} ${selectedColor.shadow}`}> <div className={`absolute inset-0 bg-gradient-to-br ${selectedColor.gradient} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div> <div className="relative z-10"> <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedColor.bg} ${selectedColor.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}> <Icon /> </div> <h4 className="font-bold text-2xl mb-3 text-white">{title}</h4> <p className="text-slate-400 text-base leading-relaxed">{description}</p> </div> </div> ); });

const Features = () => (
    <section id="features" className="w-full bg-slate-900/50 py-32 z-10">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8">
            <AnimateOnScroll className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold">Why Skill Swap is Different</h2>
                <p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg">We provide the tools and community you need to thrive.</p>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {FEATURES_DATA.map((feature, index) => (
                    <AnimateOnScroll key={feature.title} delay={index * 100}><FeatureCard {...feature} /></AnimateOnScroll>
                ))}
            </div>
        </div>
    </section>
);

const TestimonialCard = React.memo(({ stars, text, author }) => { const colorClasses = { violet: { ring: 'ring-violet-500/30', text: 'text-violet-400' }, blue: { ring: 'ring-blue-500/30', text: 'text-blue-400' }, pink: { ring: 'ring-pink-500/30', text: 'text-pink-400' } }; const selectedColor = colorClasses[author.color] || colorClasses.violet; return ( <div className="relative bg-slate-800/50 rounded-2xl p-8 lg:p-10 border border-white/10 h-full"> <div className="relative z-10 flex flex-col h-full"> <div className="flex gap-1 mb-4"> {[...Array(stars)].map((_, i) => <StarIcon key={i} />)} </div> <p className="text-slate-300 mb-6 text-lg leading-relaxed flex-grow">"{text}"</p> <div className="flex items-center"> <img className={`w-12 h-12 rounded-full mr-4 ring-2 ${selectedColor.ring}`} src={author.imgSrc} alt={`Profile photo of ${author.name}`} /> <div> <p className="font-bold text-white text-base">{author.name}</p> <p className={`text-sm ${selectedColor.text}`}>{author.title}</p> </div> </div> </div> </div> ); });

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const timeoutRef = useRef(null);
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length), 5000);
        return () => clearTimeout(timeoutRef.current);
    }, [activeIndex]);

    return (
        <section id="testimonials" className="w-full py-32 z-10 relative overflow-hidden">
            <div className="max-w-4xl mx-auto w-full px-6 sm:px-8 lg:px-12">
                <AnimateOnScroll className="text-center mb-20">
                    <span className="inline-block px-4 py-2 rounded-full bg-slate-800/50 border border-pink-500/30 text-pink-400 text-sm font-semibold mb-4">TESTIMONIALS</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">Trusted by <span className="gradient-text">Thousands</span></h2>
                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed font-light">Join a thriving community of learners and educators achieving their goals.</p>
                </AnimateOnScroll>
                <div className="relative h-80 md:h-72">
                    {TESTIMONIALS_DATA.map((testimonial, index) => (
                        <div key={index} className={`absolute w-full transition-opacity duration-700 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                           <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </div>
                 <div className="flex justify-center gap-2 mt-12">
                    {TESTIMONIALS_DATA.map((_, index) => (
                        <button key={index} onClick={() => setActiveIndex(index)} aria-label={`Go to testimonial ${index + 1}`} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-violet-500 scale-125' : 'bg-slate-600 hover:bg-slate-400'}`}></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => { const footerLinks = { Platform: [ { href: "#features", text: "Features" }, { href: "#testimonials", text: "Testimonials" }, { href: "#", text: "Pricing" }, ], Company: [ { href: "#", text: "About" }, { href: "#", text: "Privacy" }, { href: "#", text: "Terms" }, ], }; const socialIcons = [ { href: "#", label: "Twitter", path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" }, { href: "#", label: "GitHub", path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }, { href: "#", label: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }, ]; return ( <footer className="w-full border-t border-white/10 z-10 bg-slate-900/50"> <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-16"> <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"> <div className="col-span-2"> <div className="flex items-center gap-3 mb-4"> <Logo /> <span className="font-bold text-xl text-white">Skill Swap</span> </div> <p className="text-slate-400 text-sm leading-relaxed max-w-md"> Empowering learners and educators worldwide through personalized peer-to-peer learning experiences. </p> </div> {Object.entries(footerLinks).map(([title, links]) => ( <div key={title}> <h5 className="font-bold text-white mb-4">{title}</h5> <ul className="space-y-3"> {links.map(link => ( <li key={link.text}><a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400 rounded">{link.text}</a></li> ))} </ul> </div> ))} </div> <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"> <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Skill Swap. All rights reserved.</p> <div className="flex gap-4"> {socialIcons.map((icon) => ( <a key={icon.label} href={icon.href} aria-label={icon.label} className="text-slate-400 hover:text-white transition-colors rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={icon.path}/></svg></a> ))} </div> </div> </div> </footer> ); };

// --- Main App Component ---
export default function SkillSwapLandingPage() {
    const { isScrolled, scrollY } = useScrollEffects();
    return (
        <>
            <GlobalStyles />
            <main className="w-full min-h-screen bg-slate-900 text-white flex flex-col relative overflow-x-hidden">
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * 0.2}px)`, animation: 'float 4s ease-in-out infinite' }}></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * 0.1}px)`, animation: 'float 4s ease-in-out infinite 1s' }}></div>
                </div>

                <Header isScrolled={isScrolled} />

                <div className='relative z-10'>
                    <Hero />
                    <Stats />
                    <Features />
                    <Testimonials />
                </div>

                <Footer />
            </main>
        </>
    );
}

