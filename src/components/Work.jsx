import { useEffect, useRef } from 'react';
import vid from '../assets/intro-video.mp4'; // Example video import, adjust path as needed

const Work = () => {
  const trackRef = useRef(null);
  const headingsRef = useRef([]);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null); // New ref for video section

  const headings = ['Fiction', 'Documentary', 'Shorts', 'Art'];
  const videos = [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    'https://www.w3schools.com/html/movie.mp4',
    vid
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Fade headings in/out based on section visibility
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const isVisible = sectionRect.top + 450 < windowHeight && sectionRect.bottom - 500 > 0;

        if (trackRef.current) {
          trackRef.current.style.opacity = isVisible ? '1' : '0';
          trackRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
        }
      }

      // Card animation logic
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const isActive = cardCenter >= windowHeight * 0.3 && cardCenter <= windowHeight * 0.7;

        if (isActive) {
          card.style.transform = 'scale(1.05)';
          card.style.zIndex = '20';
          moveHeadings(index);
        } else {
          card.style.transform = 'scale(0.9)';
          card.style.zIndex = '10';
        }
      });
    };

    const moveHeadings = (activeIndex) => {
      if (!trackRef.current || !headingsRef.current[activeIndex]) return;

      const vw = window.innerWidth;
      const gap = vw * 0.1; // 10vw gap
      const headingWidth = headingsRef.current[activeIndex].offsetWidth;
      const moveX = -activeIndex * (headingWidth + gap);

      trackRef.current.style.transform = `translateX(${moveX}px)`;

      headingsRef.current.forEach((heading, i) => {
        if (heading) {
          heading.style.opacity = i === activeIndex ? '1' : '0.2';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial trigger

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Horizontal Headings */}
      <div className="fixed top-1/2 left-0 transform -translate-y-1/2 w-full z-30 flex justify-center pointer-events-none">
        <div
          ref={trackRef}
          className="flex gap-[10vw] items-center transition-transform duration-700 ease-out px-[5vw] opacity-0 transition-opacity duration-500"
        >
          {headings.map((heading, index) => (
            <h1
              key={index}
              ref={(el) => (headingsRef.current[index] = el)}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl m-0 opacity-20 whitespace-nowrap transition-opacity duration-300 font-bold text-gray-800"
            >
              {heading}
            </h1>
          ))}
        </div>
      </div>

      {/* Vertical Video Cards */}
      <div
        ref={sectionRef}
        className="mt-[100vh] pb-[100vh] flex flex-col items-center gap-48 sm:gap-56 md:gap-64 lg:gap-72"
      >
        {videos.map((videoSrc, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[75vw] xl:w-[70vw] max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl transform scale-90 transition-all duration-300 z-10"
            data-title={index}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto block object-cover rounded-2xl"
              onError={(e) => {
                console.log(`Video ${index + 1} failed to load`);
                e.target.style.display = 'none';
              }}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
