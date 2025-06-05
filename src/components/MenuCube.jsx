import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./MenuCube.css";

const menuItems = ["home", "works", "about", "contact"];

const MenuCube = () => {
  const cubeRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const itemRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      gsap.to(cubeRef.current, {
        rotateY: "+=180",
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        backdropFilter: "blur(10px)",
        duration: 0.2,
      });
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
      );
    } else {
      gsap.to(cubeRef.current, {
        rotateY: "-=180",
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        backdropFilter: "blur(0px)",
        duration: 0.2,
      });
    }
  }, [isOpen]);

  const handleHover = (enter) => {
    gsap.to(cubeRef.current, {
      rotateX: enter ? 15 : 0,
      rotateZ: enter ? 15 : 0,
      duration: 0.1,
    });
  };

  useEffect(() => {
    itemRefs.current.forEach((item, idx) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(itemRefs.current, {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(item, {
          x: 20,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });
  }, []);

  return (
    <>
      <div className="cube-container">
        <div
          className="cube"
          ref={cubeRef}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="face front">Close</div>
          <div className="face back">Menu</div>
          <div className="face right" />
          <div className="face left" />
          <div className="face top" />
          <div className="face bottom" />
        </div>
      </div>

      <div className="overlay max-w-screen" ref={overlayRef}>
        <div
          ref={textRef}
          className="flex flex-col items-start justify-center gap-6 pl-24 pt-32 text-white text-9xl"
        >
          {menuItems.map((label, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`cursor-pointer transition-transform duration-300 ease-out ${
                label === "home"
                  ? "italic font-serif text-blue-400 text-9xl"
                  : "uppercase font-extrabold"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuCube;
