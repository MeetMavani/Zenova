import { ArrowRight } from 'lucide-react';

const BlogCard = ({ blog }) => {
  return (
    <div className="rounded-2xl overflow-hidden border hover:shadow-2xl transition-shadow bg-white flex flex-col justify-between max-w-sm mx-auto p-4">

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-70 object-cover rounded-lg transition-transform hover:scale-105"
      />

      <div className="p-5 flex flex-col gap-2">
        <div className="text-sm text-gray-500 flex items-center gap-4 pl">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        <h2 className="text-xl font-mono text-gray-900 leading-snug">
          {blog.title}
        </h2>

        <div className="mt-4 flex items-center justify-between px-1">
          <div className="flex items-start gap-3">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{blog.author.name}</p>
              <p className="text-xs text-gray-500">{blog.author.role}</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
