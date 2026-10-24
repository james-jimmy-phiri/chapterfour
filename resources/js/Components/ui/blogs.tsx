import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { BorderBeam } from "@/Components/ui/border-beam";

export interface ArticleData {
  category: string;
  description: string;
  image: string;
  publishDate: string;
  readMoreLink: string;
  title: string;
}

const formatDate = (dateString: string) => {
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return dateString;
    }
};

interface BlogsProps {
    articlesData: ArticleData[];
    viewAllLink?: string;
}

/** Individual blog card with a continuously running border beam and interactive hover effects */
function BlogCard({ article }: { article: ArticleData }) {
  return (
    <Link
      href={article.readMoreLink}
      className="block relative cursor-pointer border border-gray-300/50 bg-white/70 shadow-none backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-rust/40 group overflow-hidden focus:outline-none"
    >
      {/* Border beam — always animating clockwise */}
      <BorderBeam
        beamLength={100}
        duration={4}
        color="#1a1a1a"
        strokeWidth={2.5}
      />

      <div className="p-0">
        <div className="relative overflow-hidden mb-4 sm:mb-6">
          <img
            alt={article.title}
            className="h-44 w-full object-cover sm:h-52 md:h-56 group-hover:scale-105 transition-transform duration-500 ease-out"
            src={article.image || "/images/new/news_placeholder.webp"}
            onError={(e) => {
              e.currentTarget.src = "/images/new/news_placeholder.webp";
            }}
          />
          <p className="absolute top-0 left-0 rounded-none border-0 bg-white px-2.5 py-1 font-bold text-xs text-black uppercase backdrop-blur-sm sm:-top-0.5 sm:-left-0.5 sm:px-3 sm:py-1">
            #{article.category}
          </p>
        </div>
        {/* Orange separator bar — between image and text, hover only */}
        <div className="h-1 w-full bg-gradient-to-r from-brand-rust via-brand-amber to-brand-rust scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100 transition-all duration-500 origin-left"></div>

        <div className="px-3 pb-3 sm:px-4 sm:pb-4">
          <h3 className="mb-2.5 font-bold text-lg text-gray-900 tracking-tight sm:text-xl md:text-2xl">
            {article.title}
          </h3>
          <p className="mb-4 text-gray-600 text-sm sm:text-base leading-relaxed sm:mb-6">
            {article.description}
          </p>

          {/* Read More Link and Date */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span
              className="group/btn relative flex items-center overflow-hidden font-semibold text-gray-900 text-sm sm:text-base transition-colors group-hover:text-brand-rust"
            >
              <span className="mr-2 overflow-hidden rounded-none border border-gray-200 p-2 transition-colors duration-300 ease-in group-hover:bg-black group-hover:text-white sm:p-3">
                <ArrowRight className="h-3.5 w-3.5 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover:translate-x-8 group-hover:opacity-0 sm:h-4 sm:w-4" />
                <ArrowRight className="absolute top-1/2 -left-4 h-4 w-4 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:left-2 sm:-left-5 sm:h-4 sm:w-4 sm:group-hover:left-3" />
              </span>
              Read more
            </span>
            <span className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 sm:gap-3">
              {formatDate(article.publishDate)}
              <span className="w-6 border-gray-300 border-t sm:w-16" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Blogs({ articlesData, viewAllLink }: BlogsProps) {
  return (
    <section className="bg-white px-4 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-3 font-bold text-brand-rust text-sm uppercase tracking-wider sm:mb-4">
            LATEST INSIGHTS
          </p>
          <h2 className="font-extrabold text-3xl text-gray-900 tracking-tight sm:text-4xl md:text-5xl">
            News &amp; Resources
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articlesData.slice(0, 3).map((article, index) => (
            <BlogCard key={index} article={article} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={viewAllLink || '/news'}
            className="group relative flex items-center overflow-hidden font-bold text-gray-900 text-sm sm:text-base transition-colors hover:text-gray-700 border border-gray-300 px-7 py-3.5 shadow-xs"
          >
            <span className="mr-2 overflow-hidden rounded-none border border-gray-200 p-2 transition-colors duration-300 ease-in group-hover:bg-black group-hover:text-white">
              <ArrowRight className="h-4 w-4 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover:translate-x-8 group-hover:opacity-0" />
              <ArrowRight className="absolute top-1/2 -left-4 h-4 w-4 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:left-2" />
            </span>
            See All News &amp; Resources
          </Link>
        </div>
      </div>
    </section>
  );
}
