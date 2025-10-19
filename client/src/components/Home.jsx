import React from "react";

/* --- Global Styles and Animation Setup --- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    html, body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      width: 100%;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    *, *::before, *::after {
      box-sizing: inherit;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }

    .animate-fadeInUp {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }

    .gradient-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .glass {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  `}</style>
);

/* --- SVG Icon Components (unchanged) --- */
const MentorshipIcon = () => (
  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  </div>
);

const FlexibleIcon = () => (
  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  </div>
);

const GrowIcon = () => (
  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
      <path d="M12 5v14"></path>
      <path d="M18 11l-6-6-6 6"></path>
    </svg>
  </div>
);

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

/* --- Main Component --- */
const Home = () => {
  return (
    <>
      <GlobalStyles />
        <main className="w-full min-h-screen bg-slate-900 text-white flex flex-col antialiased relative overflow-x-hidden">
        
        {/* Background gradients - fixed positioning */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]"></div>
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        {/* HEADER */}
        <header className="w-full glass sticky top-0 z-50 border-b border-white/10 shadow-xl">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 cursor-pointer group">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <Logo />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Skill Swap</span>
            </a>
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#features" className="text-slate-300 hover:text-white transition-all duration-200 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-violet-500 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300">Features</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-all duration-200 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-violet-500 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300">Testimonials</a>
              <a href="#" className="text-slate-300 hover:text-white transition-all duration-200 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-violet-500 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300">Login</a>
              <a href="#" className="relative group overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 text-sm">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </nav>
            <button className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </header>
          <section className="w-full py-28 z-10">
            <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 text-center">
              <div className="inline-flex items-center justify-center mb-6">
                <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-violet-400 opacity-75 mr-2"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500 mr-3"></span>
                <span className="text-sm font-medium text-slate-300">Join 10,000+ active learners</span>
              </div>
  
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 animate-fadeInUp delay-100">
                <span className="block">Master New Skills</span>
                <span className="gradient-text">Through Peer Learning</span>
              </h1>
          
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-lg lg:text-xl leading-relaxed animate-fadeInUp delay-200 font-light">
            Connect with expert mentors and passionate learners. Build your skills through personalized, one-on-one sessions tailored to your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300 w-full sm:w-auto">
            <a href="#" className="group relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 text-base">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Learning Free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a href="#features" className="group glass border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 text-base flex items-center justify-center gap-2">
              Explore Features
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 w-full max-w-3xl mx-auto animate-fadeInUp delay-400">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">10K+</div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">500+</div>
              <div className="text-sm text-slate-400">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">50K+</div>
              <div className="text-sm text-slate-400">Sessions Completed</div>
            </div>
          </div>
        </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="w-full bg-slate-900/50 py-24 z-10">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8">
            <div className="text-center mb-16 animate-fadeInUp">
              <h2 className="text-4xl md:text-5xl font-bold">Why Skill Swap is Different</h2>
              <p className="text-slate-400 mt-5 max-w-3xl mx-auto text-lg">
                We provide the tools and community you need to thrive.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="group relative glass rounded-2xl p-8 hover:border-violet-500/50 border border-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20 animate-fadeInUp delay-100">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <MentorshipIcon /><h4 className="font-bold text-2xl mb-3 text-white">Expert Mentorship</h4><p className="text-slate-400 text-base leading-relaxed">Connect with industry professionals who provide personalized guidance tailored to your career goals.</p>
                </div>
              </div>
              <div className="group relative glass rounded-2xl p-8 hover:border-blue-500/50 border border-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fadeInUp delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <FlexibleIcon /><h4 className="font-bold text-2xl mb-3 text-white">Flexible Schedule</h4><p className="text-slate-400 text-base leading-relaxed">Learn at your own pace with sessions that adapt to your busy lifestyle and time zone preferences.</p>
                </div>
              </div>
              <div className="group relative glass rounded-2xl p-8 hover:border-pink-500/50 border border-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 animate-fadeInUp delay-300">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <GrowIcon /><h4 className="font-bold text-2xl mb-3 text-white">Career Growth</h4><p className="text-slate-400 text-base leading-relaxed">Build a compelling portfolio, earn verified credentials, and unlock new career opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="w-full py-24 z-10 relative">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20 animate-fadeInUp">
              <span className="inline-block px-4 py-2 rounded-full glass border border-pink-500/30 text-pink-400 text-sm font-semibold mb-4">
                TESTIMONIALS
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                Trusted by <span className="gradient-text">Thousands</span>
              </h2>
              <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                Join a thriving community of learners and educators achieving their goals.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              <div className="group relative glass rounded-2xl p-8 lg:p-10 border border-white/10 hover:border-violet-500/30 transition-all duration-500 hover:scale-105 animate-fadeInUp delay-100">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 text-lg leading-relaxed">"Skill Swap completely transformed my learning journey. The one-on-one mentorship is absolutely phenomenal!"</p>
                  <div className="flex items-center">
                    <img className="w-12 h-12 rounded-full mr-4 ring-2 ring-violet-500/30" src="https://placehold.co/100x100/e2e8f0/1e293b?text=JS" alt="Jane Smith"/>
                    <div><p className="font-bold text-white text-base">Jane Smith</p><p className="text-violet-400 text-sm">Python Developer</p></div>
                  </div>
                </div>
              </div>
              <div className="group relative glass rounded-2xl p-8 lg:p-10 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105 animate-fadeInUp delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 text-lg leading-relaxed">"As a mentor, Skill Swap made connecting with passionate learners incredibly simple. The platform is outstanding!"</p>
                  <div className="flex items-center">
                    <img className="w-12 h-12 rounded-full mr-4 ring-2 ring-blue-500/30" src="https://placehold.co/100x100/e2e8f0/1e293b?text=MD" alt="Michael Doe"/>
                    <div><p className="font-bold text-white text-base">Michael Doe</p><p className="text-blue-400 text-sm">Senior Web Developer</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-white/10 z-10 glass">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Logo />
                  <span className="font-bold text-xl">Skill Swap</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                  Empowering learners and educators worldwide through personalized peer-to-peer learning experiences.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-white mb-4">Platform</h5>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm">Features</a></li>
                  <li><a href="#testimonials" className="text-slate-400 hover:text-white transition-colors text-sm">Testimonials</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-white mb-4">Company</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">About</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Skill Swap. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Home;
