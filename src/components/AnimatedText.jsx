import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './AnimatedText.css';

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
          delay: i * 0.15 // adds a small delay between lines
        }
      );
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="animated-text-container">
      <h1 ref={textRef}>
        Here at Zenova, we have been achieving design excellence and elegance since 2025.
      </h1>
    </div>
  );
};

export default AnimatedText;
