import { useEffect, useRef } from 'react';
import vid from '../assets/intro-video.mp4'; // Example video import, adjust path as needed

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Work = () => {
  const trackRef = useRef(null);
  const headingRefs = useRef([]);
  const sectionRefs = useRef([]);
  const cardRefs = useRef([]);

  const headings = ['Fiction', 'Documentary', 'Shorts', 'Art'];
  const videos = [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    'https://www.w3schools.com/html/movie.mp4',
    vid
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateActive = (index) => {
      // Update heading states
      headingRefs.current.forEach((el, i) => {
        if (el) {
          if (i === index) {
            el.classList.add('text-gray-900', 'font-bold', 'scale-130');
            el.classList.remove('text-gray-400', 'font-normal', 'scale-60');
          } else {
            el.classList.add('text-gray-400', 'font-normal', 'scale-60');
            el.classList.remove('text-gray-900', 'font-bold', 'scale-130');
          }
        }
      });

      // Update card states
      cardRefs.current.forEach((card, i) => {
        if (card) {
          if (i === index) {
            card.classList.add('scale-110', 'z-10');
            card.classList.remove('scale-60');
          } else {
            card.classList.add('scale-60');
            card.classList.remove('scale-110', 'z-10');
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
          duration: 0.6,
          ease: 'power3.out',
        });
      }
    };

    // Create scroll triggers for each section
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => updateActive(index),
          onEnterBack: () => updateActive(index),
        });
      }
    });

    // Fade out the header track when scrolling past the last section
    if (sectionRefs.current[sectionRefs.current.length - 1]) {
      ScrollTrigger.create({
        trigger: sectionRefs.current[sectionRefs.current.length - 1],
        start: 'bottom center',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(trackRef.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          gsap.to(trackRef.current, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
        }
      });
    }

    // Fade out the header track before the first section enters
    if (sectionRefs.current[0]) {
      ScrollTrigger.create({
        trigger: sectionRefs.current[0],
        start: 'top 40%', // Delay the fade-in
        end: 'top center',
        onEnter: () => {
          gsap.to(trackRef.current, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          gsap.to(trackRef.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' });
        }
      });

      // Ensure headers are visible if first section is already in view on mount
      const rect = sectionRefs.current[0].getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        gsap.set(trackRef.current, { autoAlpha: 1 });
      }
    }

    // Initialize first section as active
    updateActive(0);

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative bg-gray-100 font-sans overflow-x-hidden">
      {/* Background Track */}
      <div className="fixed top-2/5 left-0 w-screen z-10 pointer-events-none overflow-hidden">
        <div 
          ref={trackRef}
          style={{ opacity: 0 }}
          className="flex justify-center gap-32 transform translate-x-0 transition-transform duration-300 ease-out"
        >
          {headings.map((heading, index) => (
            <div
              key={index}
              ref={(el) => (headingRefs.current[index] = el)}
              className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-400 transition-all duration-400 ease-in-out whitespace-nowrap transform scale-40"
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
            className="w-4/5 md:w-3/5 lg:w-1/2 aspect-video rounded-3xl overflow-hidden relative shadow-2xl transform scale-60 transition-transform duration-500 ease-in-out"
          >
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Work;