import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const split = new SplitType(textRef.current, {
      types: 'lines, words, chars',
      lineClass: 'lineParent',
      wordClass: 'word',
      charClass: 'char'
    });

    const lines = textRef.current.querySelectorAll('.lineParent');

    lines.forEach((line, i) => {
      gsap.from(
        line.querySelectorAll('.char'),
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.02,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 60%',
            end: 'top 40%',
            scrub: true,
          },
          delay: i * 0.15
        }
      );
    });

    // Add custom styles for SplitType classes
    const style = document.createElement('style');
    style.textContent = `
      .lineParent {
        display: block;
        overflow: hidden;
      }
      .char {
        display: inline-block;
      }
    `;
    document.head.appendChild(style);

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-[#1b1b1b] text-white h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden font-sans">
      <h1
        ref={textRef}
        className="sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl leading-relaxed sm:leading-snug text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wider sm:tracking-widest break-words text-center"
      >
        Here at Zenova, we have been achieving design excellence and elegance since 2025.
      </h1>
    </div>
  );
};

export default AnimatedText;