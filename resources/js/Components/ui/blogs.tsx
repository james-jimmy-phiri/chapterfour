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

/** Individual blog card with a continuously running border beam */
function BlogCard({ article }: { article: ArticleData }) {
  return (
    <div
      className="relative cursor-pointer border border-gray-300/50 bg-white/50 shadow-none backdrop-blur-sm transition-shadow hover:shadow-md"
    >
      {/* Border beam — always animating clockwise */}
      <BorderBeam
        beamLength={100}
        duration={4}
        color="#1a1a1a"
        strokeWidth={2.5}
      />

      <div className="p-0">
        <div className="relative mb-4 sm:mb-6">
          <img
            alt={article.title}
            className="aspect-square h-64 w-full object-cover sm:h-72 md:h-80"
            src={article.image || "/placeholder.svg"}
          />
          <p className="absolute top-0 left-0 rounded-none border-0 bg-white px-2 py-0.5 font-medium text-[10px] text-black uppercase backdrop-blur-sm sm:-top-0.5 sm:-left-0.5 sm:px-3 sm:py-1 sm:text-xs">
            #{article.category}
          </p>
        </div>

        <div className="px-3 pb-3 sm:px-4 sm:pb-4">
          <h3 className="mb-2 font-normal text-base text-gray-900 tracking-tight sm:mb-2 sm:text-lg md:text-2xl">
            {article.title}
          </h3>
          <p className="mb-4 text-gray-600 text-xs leading-relaxed sm:mb-6 sm:text-sm">
            {article.description}
          </p>

          {/* Read More Link and Date */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              className="group relative flex items-center overflow-hidden font-medium text-gray-900 text-xs transition-colors hover:text-gray-700 sm:text-sm"
              href={article.readMoreLink}
            >
              <span className="mr-2 overflow-hidden rounded-none border border-gray-200 p-2 transition-colors duration-300 ease-in group-hover:bg-black group-hover:text-white sm:p-3">
                <ArrowRight className="h-3 w-3 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover:translate-x-8 group-hover:opacity-0 sm:h-4 sm:w-4" />
                <ArrowRight className="absolute top-1/2 -left-4 h-4 w-4 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:left-2 sm:-left-5 sm:h-4 sm:w-4 sm:group-hover:left-3" />
              </span>
              Read more
            </Link>
            <span className="flex items-center gap-2 text-[10px] text-gray-500 sm:gap-3 sm:text-xs">
              {formatDate(article.publishDate)}
              <span className="w-6 border-gray-300 border-t sm:w-16" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blogs({ articlesData, viewAllLink }: BlogsProps) {
  return (
    <section className="bg-white px-4 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-3 font-medium text-gray-600 text-xs uppercase tracking-wider sm:mb-4">
            LATEST INSIGHTS
          </p>
          <h2 className="font-normal text-2xl text-gray-900 tracking-tight sm:text-3xl md:text-5xl">
            News &amp; Resources
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articlesData.map((article, index) => (
            <BlogCard key={index} article={article} />
          ))}
        </div>

        {/* View All Button */}
        {viewAllLink && (
          <div className="mt-12 flex justify-center">
            <Link
              href={viewAllLink}
              className="group relative flex items-center overflow-hidden font-medium text-gray-900 text-sm transition-colors hover:text-gray-700 border border-gray-200 px-6 py-3"
            >
              <span className="mr-2 overflow-hidden rounded-none border border-gray-200 p-2 transition-colors duration-300 ease-in group-hover:bg-black group-hover:text-white">
                <ArrowRight className="h-4 w-4 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover:translate-x-8 group-hover:opacity-0" />
                <ArrowRight className="absolute top-1/2 -left-4 h-4 w-4 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:left-2" />
              </span>
              See All News &amp; Resources
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
