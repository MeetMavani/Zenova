import { useEffect, useRef, useState } from 'react';
import vid from '../assets/intro-video.mp4'; // Example video import, adjust path as needed

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Work = () => {
  const trackRef = useRef(null);
  const headingRefs = useRef([]);
  const sectionRefs = useRef([]);
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const headings = ['Fiction', 'Documentary', 'Shorts', 'Art'];
  const videos = [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    'https://www.w3schools.com/html/movie.mp4',
    vid
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Mobile-specific ScrollTrigger config
    if (isMobile) {
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
        ignoreMobileResize: true
      });
    }

    const updateActive = (index) => {
      console.log('Updating active to:', index); // Debug log
      setActiveIndex(index);

      // Update heading states
      headingRefs.current.forEach((el, i) => {
        if (el) {
          if (i === index) {
            el.classList.add('text-gray-900', 'font-bold');
            el.classList.remove('text-gray-400', 'font-normal');
            gsap.to(el, { scale: isMobile ? 1.1 : 1.25, duration: 0.3, ease: 'power2.out' });
          } else {
            el.classList.add('text-gray-400', 'font-normal');
            el.classList.remove('text-gray-900', 'font-bold');
            gsap.to(el, { scale: isMobile ? 0.7 : 0.6, duration: 0.3, ease: 'power2.out' });
          }
        }
      });

      // Update card states
      cardRefs.current.forEach((card, i) => {
        if (card) {
          if (i === index) {
            card.classList.add('z-10');
            card.classList.remove('z-0');
            gsap.to(card, { scale: isMobile ? 1.05 : 1.1, duration: 0.5, ease: 'power2.out' });
          } else {
            card.classList.add('z-0');
            card.classList.remove('z-10');
            gsap.to(card, { scale: isMobile ? 0.7 : 0.6, duration: 0.5, ease: 'power2.out' });
          }
        }
      });

      // Update track position
      const centerOffset = window.innerWidth / 2;
      const selectedHeading = headingRefs.current[index];
      if (selectedHeading && trackRef.current) {
        const headingRect = selectedHeading.getBoundingClientRect();
        const headingCenter = headingRect.left + headingRect.width / 2;
        const delta = centerOffset - headingCenter;

        const currentTranslate = gsap.getProperty(trackRef.current, 'x') || 0;
        gsap.to(trackRef.current, {
          x: currentTranslate + delta,
          duration: isMobile ? 0.4 : 0.6,
          ease: 'power3.out',
        });
      }
    };

    // Alternative mobile scroll detection using Intersection Observer
    if (isMobile) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.5
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            console.log('Mobile intersection:', index); // Debug log
            updateActive(index);
          }
        });
      }, observerOptions);

      // Observe all sections
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.observe(section);
        }
      });

      // Mobile visibility control
      if (trackRef.current) {
        // Set initial visibility for mobile
        gsap.set(trackRef.current, { autoAlpha: 0 });
        
        // Check if component is in view on mobile
        const checkMobileVisibility = () => {
          if (sectionRefs.current[0] && sectionRefs.current[sectionRefs.current.length - 1]) {
            const firstRect = sectionRefs.current[0].getBoundingClientRect();
            const lastRect = sectionRefs.current[sectionRefs.current.length - 1].getBoundingClientRect();
            
            // Show if any part of component is visible
            if (firstRect.top < window.innerHeight * 0.9 && lastRect.bottom > window.innerHeight * 0.1) {
              gsap.to(trackRef.current, { autoAlpha: 1, duration: 0.5 });
            } else {
              gsap.to(trackRef.current, { autoAlpha: 0, duration: 0.5 });
            }
          }
        };
        
        // Check visibility on scroll for mobile
        const mobileScrollHandler = () => {
          requestAnimationFrame(checkMobileVisibility);
        };
        
        window.addEventListener('scroll', mobileScrollHandler, { passive: true });
        
        // Initial check
        setTimeout(checkMobileVisibility, 100);
        
        // Store cleanup function
        const mobileCleanup = () => {
          window.removeEventListener('scroll', mobileScrollHandler);
        };
        
        // Return combined cleanup
        return () => {
          observer.disconnect();
          mobileCleanup();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }

      // Cleanup function for mobile
      return () => {
        observer.disconnect();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }

    // Desktop ScrollTrigger setup
    const triggers = [];

    // Create scroll triggers for each section
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => updateActive(index),
          onEnterBack: () => updateActive(index),
        });
        triggers.push(trigger);
      }
    });

    // Component visibility control - Show headers when first section enters viewport
    if (sectionRefs.current[0]) {
      const showTrigger = ScrollTrigger.create({
        trigger: sectionRefs.current[0],
        start: 'top 80%', // Show headers before first section fully enters
        end: 'top 20%',
        onEnter: () => {
          gsap.to(trackRef.current, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          gsap.to(trackRef.current, { autoAlpha: 0, duration: 0.6, ease: 'power2.out' });
        }
      });
      triggers.push(showTrigger);
    }

    // Hide headers when last section exits viewport
    if (sectionRefs.current[sectionRefs.current.length - 1]) {
      const hideTrigger = ScrollTrigger.create({
        trigger: sectionRefs.current[sectionRefs.current.length - 1],
        start: 'bottom 20%', // Hide headers when last section is almost out
        end: 'bottom -20%',
        onEnter: () => {
          gsap.to(trackRef.current, { autoAlpha: 0, duration: 0.6, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          gsap.to(trackRef.current, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' });
        }
      });
      triggers.push(hideTrigger);
    }

    // Set initial visibility - headers hidden by default
    gsap.set(trackRef.current, { autoAlpha: 0 });
    
    // Check if component is already in view on page load
    if (sectionRefs.current[0]) {
      const firstSectionRect = sectionRefs.current[0].getBoundingClientRect();
      const lastSectionRect = sectionRefs.current[sectionRefs.current.length - 1]?.getBoundingClientRect();
      
      // Show headers if any part of the component is visible
      if (firstSectionRect.top < window.innerHeight * 0.8 && 
          lastSectionRect.bottom > window.innerHeight * 0.2) {
        gsap.set(trackRef.current, { autoAlpha: 1 });
      }
    }

    // Initialize first section as active
    setTimeout(() => {
      updateActive(0);
    }, 100);

    // Cleanup for desktop
    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div className="relative bg-gray-100 font-sans overflow-x-hidden">
      {/* Debug info - remove in production */}
      {/* <div className="fixed top-4 left-4 z-50 bg-black text-white p-2 text-xs">
        Mobile: {isMobile ? 'Yes' : 'No'} | Active: {activeIndex}
      </div> */}

      {/* Background Track */}
      <div className="fixed top-2/5 left-0 w-screen z-10 pointer-events-none overflow-hidden">
        <div 
          ref={trackRef}
          className="flex justify-center gap-8 md:gap-16 lg:gap-32 transform translate-x-0"
          style={{ opacity: 0 }} // Always start hidden
        >
          {headings.map((heading, index) => (
            <div
              key={index}
              ref={(el) => (headingRefs.current[index] = el)}
              className="text-3xl md:text-5xl lg:text-7xl font-normal text-gray-400 transition-colors duration-400 ease-in-out whitespace-nowrap"
              style={{ transform: 'scale(0.7)' }}
            >
              {heading}
            </div>
          ))}
        </div>
      </div>

      {/* Video Sections */}
      {videos.map((videoSrc, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className="h-screen flex justify-center items-center z-20 relative"
          data-index={index}
        >
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            className="w-4/5 md:w-3/5 lg:w-1/2 aspect-video rounded-3xl overflow-hidden relative shadow-2xl"
            style={{ transform: 'scale(0.7)' }}
          >
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              webkit-playsinline="true"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Work;