import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const letsTalkRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const letsTalkPanel = letsTalkRef.current;
    const container = containerRef.current;

    if (letsTalkPanel && container) {
      const animation = gsap.to(letsTalkPanel, {
        scrollTrigger: {
          trigger: container,
          start: "top center+=200",
          end: "bottom top-=300",
          scrub: true,
        },
        rotateZ: -8,
        y: "-60%",
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
        className="relative h-screen bg-red-500 overflow-hidden"
      >
        {/* Tilting Let's Talk Panel */}
        <div
          ref={letsTalkRef}
          className="absolute bottom-0 left-0 w-full h-screen bg-white origin-bottom-left z-20
                     flex items-center justify-start"
          style={{ transformOrigin: "bottom left" }}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="relative">
              <h1 className="text-[20vw] md:text-[12rem] lg:text-[16rem] font-black leading-none text-black tracking-tight">
                Let's Talk
              </h1>
              <div className="absolute top-0 right-0 mt-8 mr-8">
                <div className="w-16 h-16 bg-black flex items-center justify-center rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-black w-full mt-8"></div>
          </div>
        </div>

        {/* Red background content (visible when panel tilts) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-white text-6xl font-bold">
            CREATIVE STUDIO
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;