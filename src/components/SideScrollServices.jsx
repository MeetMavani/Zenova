import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SideScrollServices = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const slidesRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sample data
  const slidesData = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=800&fit=crop', 
      text: 'We build brands that last.', 
      title: 'Brand Strategy', 
      color: 'bg-[#f0efeb]' 
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800&fit=crop', 
      text: 'Design with consistency.', 
      title: 'Design Systems', 
      color: 'bg-[#818f7c]' 
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop', 
      text: 'Modern, scalable web.', 
      title: 'Web Development', 
      color: 'bg-[#Ad92a1]' 
    },
    { 
      id: 4, 
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop', 
      text: 'Stories in motion.', 
      title: 'Video Production', 
      color: 'bg-[#c3cdd9]' 
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const slides = slidesRef.current;
    
    if (!container || !scrollContainer || slides.length === 0) return;

    // Set initial styles with GSAP
    slides.forEach((slide, index) => {
      const baseWidth = window.innerWidth * 0.15;
      gsap.set(slide, { width: baseWidth });
      
      // Set initial image scale
      const image = slide.querySelector('.slide-image');
      if (image) {
        gsap.set(image, { scale: 0.6 });
      }
      
      // Set initial text opacity and transform
      const textElements = slide.querySelectorAll('.slide-text');
      textElements.forEach(el => {
        gsap.set(el, { opacity: 0, y: 30 });
      });
    });

    // Create smooth scroll animation
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          
          // Horizontal scroll effect
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          gsap.to(scrollContainer, {
            scrollLeft: progress * maxScroll,
            duration: 0.1,
            ease: "none"
          });
          
          // Animate each slide based on progress
          slides.forEach((slide, index) => {
            const sectionStart = index * 0.2;
            const sectionEnd = sectionStart + 0.4;
            const sectionProgress = Math.max(0, Math.min(1, (progress - sectionStart) / 0.4));
            
            // Smooth width animation
            const baseWidth = window.innerWidth * 0.25;
            const expandedWidth = window.innerWidth * 0.85;
            const currentWidth = baseWidth + (expandedWidth - baseWidth) * sectionProgress;
            
            gsap.to(slide, {
              width: currentWidth,
              duration: 0.3,
              ease: "power2.out"
            });
            
            // --- Image scaling and positioning (updated) ---
            const image = slide.querySelector('.slide-image');
            if (image) {
              // Image scales from 0.92 (inactive) to 1 (active), and height from 40vh to 60vh
              const minScale = 0.92;
              const maxScale = 1;
              const minHeight = 40; // vh
              const maxHeight = 60; // vh
              // const imageScale = minScale + (maxScale - minScale) * sectionProgress;
              const imageScale = 1;
              const imageHeight = minHeight + (maxHeight - minHeight) * sectionProgress;
              gsap.to(image, {
                scale: imageScale,
                height: `${imageHeight}vh`,
                top: `calc(50% - ${imageHeight / 2}vh)`,
                duration: 0.5,
                ease: "power2.out"
              });
            }

            // --- Text animations (updated for more space and smoothness) ---
            const textElements = slide.querySelectorAll('.slide-text');
            // Fade in and slide up text as section comes into focus
            const textOpacity = Math.max(0, Math.min(1, (sectionProgress - 0.15) / 0.4));
            textElements.forEach((el, textIndex) => {
              gsap.to(el, {
                opacity: textOpacity,
                y: 30 - 30 * textOpacity,
                duration: 0.5,
                ease: "power2.out",
                delay: textIndex * 0.05
              });
            });
            
            // Animate progress indicators
            const progressBar = slide.querySelector('.progress-bar');
            if (progressBar) {
              gsap.to(progressBar, {
                scaleX: sectionProgress,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          });
        }
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const getSectionProgress = (index) => {
    const sectionProgress = Math.max(0, Math.min(1, (scrollProgress - (index * 0.2)) / 0.4));
    return sectionProgress;
  };

  const slideWidths = [50, 30, 20, 10]; // in vw

  return (
    <div 
      ref={containerRef}
      className="h-[400vh] relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="h-full flex overflow-x-hidden"
          style={{
            width: `${slideWidths.reduce((a, b) => a + b, 0)}vw`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {slidesData.map((slide, index) => {
            const sectionProgress = getSectionProgress(index);
            const isActive = sectionProgress > 0;
            const isFullyActive = sectionProgress > 0.5;
            
            return (
              <div
                key={slide.id}
                ref={el => slidesRef.current[index] = el}
                className={`${slide.color} h-full flex-shrink-0 relative overflow-hidden`}
                style={{
                  width: `${slideWidths[index]}vw`
                }}
              >
                {/* Background Image */}
                <div 
                  className="slide-image absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    filter: isActive ? 'brightness(0.8)' : 'brightness(0.6)'
                  }}
                />
                
                {/* Overlay */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${slide.color}40, ${slide.color}80)`,
                    opacity: isActive ? 0.7 : 0.9
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12">
                  <div>
                    {/* Section Number */}
                    <div className="slide-text text-sm font-mono text-black/60 mb-2">
                      0{slide.id}
                    </div>
                    
                    {/* Title */}
                    <h3 className="slide-text text-3xl lg:text-5xl font-bold text-black mb-4 leading-tight">
                      {slide.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="slide-text text-lg lg:text-xl text-black/80 max-w-md leading-relaxed">
                      {slide.text}
                    </p>
                    
                    {/* Animated underline */}
                    {isFullyActive && (
                      <div className="slide-text mt-6 h-0.5 bg-black/40 w-[60px] origin-left" />
                    )}
                  </div>
                </div>
                
                {/* Side indicator for compressed state */}
                {!isActive && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 -rotate-90">
                    <div className="text-xs font-mono text-black/60 whitespace-nowrap">
                      {slide.title}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-8 z-20">
          <div className="flex space-x-2">
            {slidesData.map((_, index) => (
              <div
                key={index}
                className="w-8 h-0.5 bg-black/20 overflow-hidden"
              >
                <div 
                  className="progress-bar h-full bg-black/60 origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideScrollServices;
