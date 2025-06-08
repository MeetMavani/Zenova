import { useEffect, useRef } from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

// Mock data for demonstration - replace with your actual import
const blogPosts = [
  {
    id: 1,
    title: "Revolutionize Your Projects: Exploring Bit PI's Game-Changing Features",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    date: "02 Jan 2024",
    readTime: "5 min",
    author: {
      name: "Onie Datta",
      role: "Content Writer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
  },
  {
    id: 2,
    title: "Revolutionize Your Projects: Exploring Bit PI's Game-Changing Features",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
    date: "02 Jan 2024",
    readTime: "5 min",
    author: {
      name: "Onie Datta",
      role: "Content Writer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
  },
  {
    id: 3,
    title: "Revolutionize Your Projects: Exploring Bit PI's Game-Changing Features",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    date: "02 Jan 2024",
    readTime: "5 min",
    author: {
      name: "Onie Datta",
      role: "Content Writer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
  },
];

const BlogSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP animations
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;
      
      // Animate container
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Animate cards with stagger
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div 
        ref={containerRef}
        className="max-w-8xl mx-auto w-full"
      >
        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-12 place-items-center">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              ref={addToRefs}
              className="group flex flex-col items-center justify-center rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white p-4 md:p-6 lg:p-8"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '3px'
              }}
            >
              {/* Inner Card Content */}
              <div className="bg-white flex flex-col items-center justify-center rounded-3xl p-4 md:p-6 lg:p-8 h-[60vh]">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className=" md:h-64 lg:h-80 xl:h-86 xl:w-[32rem] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="space-y-6 flex flex-col items-center justify-center h-[20vh] w-auto">
                  {/* Date and Read Time */}
                  <div className="flex justify-between gap-5 mt-4 lg:w-[20vw] md:w-auto sm:w-[20vw] w-[80vw] text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 line-clamp-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>

                  {/* Author Section */}
                  <div className="flex items-center justify-between gap-15 mt-4 lg:w-[20vw] md:w-auto w-[80vw]">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-gray-100"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                          {post.author.name}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500">
                          {post.author.role}
                        </p>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300 shrink-0">
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GSAP CDN Script */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    </div>
  );
};

export default BlogSection;