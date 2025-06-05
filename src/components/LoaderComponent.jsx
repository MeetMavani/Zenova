import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function LoaderComponent({ onFinish }) {
  const loaderRef = useRef();
  const zenovaRef = useRef();
  const productionRef = useRef();
  const circlesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        if (onFinish) onFinish();
      }
    });

    // 1. ZENOVA appears and scales in
    tl.fromTo(
      zenovaRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 }
    );

    // 2. Warp through ZENOVA (scale up and blur)
    tl.to(
      zenovaRef.current,
      { scale: 50, filter: 'blur(0px)', opacity: 0, duration: 0.7, left: '30%'},
      "+=0.2"
    );

    // 3. Warp through circles
    circlesRef.current.forEach((circle, i) => {
      tl.fromTo(
        circle,
        { scale: 0, opacity: 0 },
        // { scale: 2.5, opacity: 1, duration: 0.5, filter: 'blur(0px)', ease: 'none' },
        { scale: 25, opacity: 1, duration: 1.5, filter: 'blur(0px)', ease: 'none'},
        "+=0.05"
      );
    //   tl.to(
    //     circle,
    //     { scale: 8, opacity: 0, duration: 0.5, filter: 'blur(0px)', ease: 'none'},
    //     "+=0.05"
    //   );
    });

    // 4. PRODUCTION appears, zooms in, and warps
    tl.fromTo(
      productionRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5 }
    );
    tl.to(
      productionRef.current,
      { scale: 50, opacity: 0, filter: 'blur(0px)', duration: 1 }
    );

    // Fade out loader
    // tl.to(loaderRef.current, { opacity: 0, color: '#ff6467', duration: 0.4 });

  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* ZENOVA */}
      <div
        ref={zenovaRef}
        style={{
          position: 'absolute',
          color: '#fff',
          fontSize: '5vw',
          fontWeight: 900,
          letterSpacing: '0.2em',
          textAlign: 'center',
          width: '100%',
          top: '40%',
          left: 0,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        ZENOVA
      </div>
      {/* Circles */}
      {[...Array(1)].map((_, i) => (
        <div
          key={i}
          ref={el => (circlesRef.current[i] = el)}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '10px solid #fff',
            width: 200 + i * 200,
            height: 200 + i * 200,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) scale(0.5)',
            opacity: 0,
            pointerEvents: 'none'
          }}
        />
      ))}
      {/* PRODUCTION */}
      <div
        ref={productionRef}
        style={{
          position: 'absolute',
          color: '#fff',
          fontSize: '3vw',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textAlign: 'center',
          width: '100%',
          top: '50%',
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        PRODUCTION
      </div>
    </div>
  );
}

export default LoaderComponent;