import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SideScrollServices = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const slidesRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();

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

  // Desktop horizontal scroll animation
  const initDesktopAnimation = () => {
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
            
            // Image scaling and positioning
            const image = slide.querySelector('.slide-image');
            if (image) {
              const minHeight = 40;
              const maxHeight = 60;
              const imageHeight = minHeight + (maxHeight - minHeight) * sectionProgress;
              gsap.to(image, {
                scale: 1,
                height: `${imageHeight}vh`,
                top: `calc(50% - ${imageHeight / 2}vh)`,
                duration: 0.5,
                ease: "power2.out"
              });
            }

            // Text animations
            const textElements = slide.querySelectorAll('.slide-text');
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
          });
        }
      }
    });

    return tl;
  };

  // Mobile pinned scroll animation
  const initMobileAnimation = () => {
    const slides = slidesRef.current.filter(slide => slide !== null);
    if (slides.length === 0) return;

    // Create ScrollTrigger for each panel
    let tops = slides.map((panel, idx) =>
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        end: idx === slides.length - 1 ? "bottom top+=80%" : "+=4000vh"
      })
    );

    // Pin each slide
    slides.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        end: i === slides.length - 1 ? "bottom top+=80%" : undefined,
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          const textElements = panel.querySelectorAll('.slide-text');
          gsap.fromTo(
            textElements,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
          );
        }
      });
    });

    // Add snapping functionality, but allow it to be killed on last slide
    let snapTrigger; // Declare first

    snapTrigger = ScrollTrigger.create({
      snap: {
        snapTo: (progress, self) => {
          let panelStarts = tops.map(st => st.start);
          let snapScroll = gsap.utils.snap(panelStarts, self.scroll());
          return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
        },
        duration: 0.5
      },
      onUpdate: self => {
        // If last panel is in view, kill snapping
        const lastPanel = slides[slides.length - 1];
        const rect = lastPanel.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          if (snapTrigger) {
            snapTrigger.kill();
            snapTrigger = null;
          }
        }
      }
    });

    return { tops, snapTrigger };
  };

  useEffect(() => {
    console.log('Effect running, isMobile:', isMobile);
    
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    let animation;
    if (isMobile) {
      animation = initMobileAnimation();
    } else {
      animation = initDesktopAnimation();
    }

    return () => {
      if (animation && animation.kill) {
        animation.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const getSectionProgress = (index) => {
    const sectionProgress = Math.max(0, Math.min(1, (scrollProgress - (index * 0.2)) / 0.4));
    return sectionProgress;
  };

  const slideWidths = [50, 30, 20, 10]; // in vw

  if (isMobile) {
    // Mobile layout - stacked panels
    return (
      <div ref={containerRef} className="mobile-container">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            ref={el => slidesRef.current[index] = el}
            className={`panel ${slide.color} h-screen w-full relative overflow-hidden flex flex-col`}
          >
            {/* Background Image */}
            <div
              className="slide-image bg-cover bg-center w-full"
              style={{
                height: '60vh',
                backgroundImage: `url(${slide.image})`,
                filter: 'brightness(0.7)',
                // borderBottomLeftRadius: '2rem',
                // borderBottomRightRadius: '2rem',
              }}
            />

            {/* Overlay */}
            <div
              className="absolute left-0 top-0 w-full"
              style={{
                height: '60vh',
                background: `linear-gradient(135deg, ${slide.color}40, ${slide.color}80)`,
                opacity: 0.8,
                borderBottomLeftRadius: '2rem',
                borderBottomRightRadius: '2rem',
                pointerEvents: 'none'
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center p-6 mt-auto">
              {/* Section Number */}
              <div className="slide-text text-sm font-mono text-black/60 mb-4">
                0{slide.id}
              </div>
              {/* Title */}
              <h3 className="slide-text text-4xl font-bold text-black mb-6 leading-tight">
                {slide.title}
              </h3>
              {/* Description */}
              <p className="slide-text text-lg text-black/80 leading-relaxed max-w-md">
                {slide.text}
              </p>
              {/* Animated underline */}
              <div className="slide-text mt-6 h-0.5 bg-black/40 w-[60px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop layout - horizontal scroll
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
                    <p className="slide-text text-lg lg:text-xl text-black/80 leading-relaxed">
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
      </div>
    </div>
  );
};

export default SideScrollServices;
