import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MagicClothesChange() {
  const topRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(topRef.current, {
        scaleY: 0,
        transformOrigin: 'bottom center',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          // markers: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[100vh] w-full overflow-x-hidden"
      // className="relative h-[200vh] w-full overflow-x-hidden"
    >
      {/* Bottom layer */}
      {/* <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-blue-600">
        <h1 className="text-8xl font-bold text-white select-none">Hello</h1>
      </div> */}
      <div className=" top-0 left-0 w-full h-screen flex items-center justify-center bg-blue-200">
        <h1 className="text-8xl font-bold text-white select-none">Banner</h1>
      </div>

      {/* Top layer */}
      {/* <div
        ref={topRef}
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-red-600 origin-bottom"
      >
        <h1 className="text-8xl font-bold text-white select-none">Hello</h1>
      </div> */}
    </div>
  );
}
