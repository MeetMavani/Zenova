import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const letsTalkRef = useRef(null);
  const containerRef = useRef(null);

  const [openSections, setOpenSections] = useState({
    reachOut: false,
    findUs: false,
    social: false,
    nav: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    const letsTalkPanel = letsTalkRef.current;
    const container = containerRef.current;

    if (letsTalkPanel && container) {
      const animation = gsap.to(letsTalkPanel, {
        scrollTrigger: {
          trigger: container,
          start: "bottom bottom+=200",
          end: "bottom top-=300",
          scrub: true,
        },
        rotateZ: -12,
        y: "-80%",
        ease: "power1.out",
      });

      return () => {
        if (animation.scrollTrigger) animation.scrollTrigger.kill();
        animation.kill();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        
      </header>

      {/* Tilt Reveal Container */}
      <div
        ref={containerRef}
        className="relative flex items-end justify-center h-screen bg-red-500 overflow-hidden"
      >
        {/* Tilting Let's Talk Panel */}
        <div
          ref={letsTalkRef}
          className="absolute bottom-0 left-0 w-full h-screen bg-white origin-bottom-left z-20
                     flex flex-col items-center justify-between"
          style={{ transformOrigin: "bottom left" }}
        >
          <div className=" flex-1 flex flex-col justify-center items-center max-w-7xl mx-auto px-6 w-full">
            <div className="flex items-center justify-center">
              <h1 className="text-[15vw] md:text-[12rem] lg:text-[16rem] font-black leading-none text-black tracking-tight">
                Let's Talk
              </h1>
              <div className="mt-8 mr-8">
                <div className="w-16 h-16 lg:h-40 lg:w-40 bg-black flex items-center justify-center rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-black w-full mt-8"></div>
          </div>
          <h1 className="text-[20vw] md:text-[12rem] lg:text-[16rem] font-black leading-none text-black tracking-tight">
            THE LINE</h1>
        </div>

        {/* Red background content (visible when panel tilts) */}
        <footer className="bg-red-500 text-white">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-60 mb-8">
          {/* Reach Out Section */}
          <div>
            <button 
              onClick={() => toggleSection('reachOut')}
              className="w-full text-left flex justify-between items-center md:cursor-default"
            >
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">/ Reach Out</h3>
              <span className="md:hidden text-xl">
                {openSections.reachOut ? '−' : '+'}
              </span>
            </button>
            <div className={`space-y-2 ${openSections.reachOut ? 'block' : 'hidden'} md:block`}>
              <p className="text-lg">info@thelinestudio.com</p>
              <p className="text-lg">44 (0)20 30020224</p>
            </div>
          </div>

          {/* Find Us Section */}
          <div>
            <button 
              onClick={() => toggleSection('findUs')}
              className="w-full text-left flex justify-between items-center md:cursor-default"
            >
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">/ Find Us</h3>
              <span className="md:hidden text-xl">
                {openSections.findUs ? '−' : '+'}
              </span>
            </button>
            <div className={`space-y-1 ${openSections.findUs ? 'block' : 'hidden'} md:block`}>
              <p>The Line Animation Studio Ltd</p>
              <p>Studio 02</p>
              <p>De Beauvoir Block, 92-96</p>
              <p>De Beauvoir Road</p>
              <p>London, N1 4EN</p>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <button 
              onClick={() => toggleSection('social')}
              className="w-full text-left flex justify-between items-center md:cursor-default"
            >
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">/ Social</h3>
              <span className="md:hidden text-xl">
                {openSections.social ? '−' : '+'}
              </span>
            </button>
            <div className={`space-y-2 ${openSections.social ? 'block' : 'hidden'} md:block`}>
              <p>YouTube</p>
              <p>Instagram</p>
              <p>TikTok</p>
              <p>X</p>
              <p>Facebook</p>
              <p>LinkedIn</p>
            </div>
          </div>

          {/* Nav Section */}
          <div>
            <button 
              onClick={() => toggleSection('nav')}
              className="w-full text-left flex justify-between items-center md:cursor-default"
            >
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">/ Nav</h3>
              <span className="md:hidden text-xl">
                {openSections.nav ? '−' : '+'}
              </span>
            </button>
            <div className={`space-y-2 ${openSections.nav ? 'block' : 'hidden'} md:block`}>
              <p>Home</p>
              <p>Work</p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-red-400 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4 text-sm">
              <span>© 2025</span>
              <span>SITE CREDITS</span>
              <span>/</span>
              <span>PRIVACY</span>
              <span>/</span>
              <span>UP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
      </div>
    </div>
  );
};

export default Footer;