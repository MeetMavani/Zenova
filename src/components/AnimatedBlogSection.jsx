import React, { useRef, useEffect } from 'react';
import BlogCard from './BlogCard';
import { blogPosts } from '../utils/blogData';
import gsap from 'gsap';

const AnimatedBlogSection = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      }
    );
  }, []);
  
  return (
    <div className="py-60 px-66 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {blogPosts.map((blog, idx) => (
          <div
            key={blog.id}
            ref={el => (cardsRef.current[idx] = el)}
          >
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBlogSection;