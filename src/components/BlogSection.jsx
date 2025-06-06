import BlogCard from './BlogCard';
import { blogPosts } from '../utils/blogData';

const BlogSection = () => {
  return (
    <section className="py-20 px-4 lg:px-16 h-auto bg-white text-gray-800 flex items-center justify-center">
      <div className="w-full rounded-2xl overflow-hidden py-20 bg-white flex flex-col justify-between gap-20">
        <h2 className="text-7xl font-bold text-center">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {blogPosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
