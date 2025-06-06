import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import zen from '../assets/zen.svg'; // Imported SVG logo

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const redBlanketRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !redBlanketRef.current || !aboutSectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(redBlanketRef.current, { y: '100vh' });
      gsap.set(aboutSectionRef.current, { y: '100vh' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(redBlanketRef.current, {
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to({}, { duration: 0.5 })
      .to(aboutSectionRef.current, {
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (svgRef.current) {
            const coveragePercent = Math.min(progress * 2, 1) * 100;
            svgRef.current.style.background = `linear-gradient(to top, #000000 ${coveragePercent}%, transparent ${coveragePercent}%)`;
            svgRef.current.style.webkitBackgroundClip = 'text';
            svgRef.current.style.backgroundClip = 'text';
            svgRef.current.style.webkitTextFillColor = 'transparent';
          }
        }
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white">
      
      {/* Hero with Masked SVG and Floating Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {/* Top-left floating logo */}
        <img
          src={zen}
          alt="ZEN Logo"
          className="absolute top-12 left-12 w-24 h-24 opacity-80 z-20 pointer-events-none"
        />

        {/* Video-Masked Text */}
        <svg
          ref={svgRef}
          className="w-full h-full max-w-4xl"
          viewBox="0 0 800 200"
          style={{
            maskImage: 'url(#videoMask)',
            WebkitMaskImage: 'url(#videoMask)',
          }}
        >
          <defs>
            <mask id="videoMask">
              <rect width="100%" height="100%" fill="black" />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-8xl font-bold"
                style={{ fontSize: '120px', fontFamily: 'Arial, sans-serif' }}
              >
                ZEN
              </text>
            </mask>
            <pattern id="videoPattern" patternUnits="userSpaceOnUse" width="100%" height="100%">
              <foreignObject width="100%" height="100%">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ transform: 'scale(1.2)' }}
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                </video>
              </foreignObject>
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#videoPattern)" mask="url(#videoMask)" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-transparent stroke-transparent text-8xl font-bold transition-all duration-300"
            style={{
              fontSize: '120px',
              fontFamily: 'Arial, sans-serif',
              mixBlendMode: 'difference'
            }}
          >
            ZEN
          </text>
        </svg>
      </div>

      {/* Red Blanket */}
      <div
        ref={redBlanketRef}
        className="absolute inset-0 bg-red-600 z-20"
        style={{ transform: 'translateY(100vh)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 200">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-black text-8xl font-bold"
              style={{ fontSize: '120px', fontFamily: 'Arial, sans-serif' }}
            >
              ZEN
            </text>
          </svg>
        </div>
      </div>

      {/* About Section */}
      <div
        ref={aboutSectionRef}
        className="absolute inset-0 bg-gray-900 text-white z-30 flex items-center justify-center"
        style={{ transform: 'translateY(100vh)' }}
      >
        <div className="text-center max-w-4xl px-8">
          <h2 className="text-6xl font-bold mb-8">About Us</h2>
          <p className="text-xl leading-relaxed mb-8">
            We create extraordinary digital experiences that push the boundaries of web design and development.
            Our passion lies in crafting immersive, interactive websites that tell stories and captivate audiences.
          </p>
          <button className="px-8 py-4 bg-white text-gray-900 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex flex-col items-center text-black">
          <span className="text-sm mb-2 opacity-80">Scroll to explore</span>
          <div className="w-px h-12 bg-black opacity-60 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
