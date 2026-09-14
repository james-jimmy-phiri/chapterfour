import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    FileText, Download, Calendar, Search, Filter,
    ArrowRight, BookOpen, Newspaper, Tag, Sparkles
} from 'lucide-react';
import { useState } from 'react';

interface ResourceItem {
    id?: number;
    title: string;
    slug: string;
    type?: string;
    excerpt?: string;
    published_at?: string;
    featured_image_url?: string;
}

interface ResourcesProps {
    resources?: {
        data?: ResourceItem[];
        links?: any[];
        total?: number;
    } | ResourceItem[];
}

const defaultResources: ResourceItem[] = [
    {
        id: 1,
        title: 'State of Constitutional Rights in Malawi: 2024 Youth Barometer',
        slug: 'state-of-constitutional-rights-2024',
        type: 'Report',
        excerpt: 'A comprehensive national assessment of civil liberties, youth civic participation, and access to justice across all 28 districts.',
        published_at: 'Oct 14, 2024',
    },
    {
        id: 2,
        title: 'Joint Statement on Proposed Amendments to the NGO Act',
        slug: 'joint-statement-ngo-act',
        type: 'Press Release',
        excerpt: 'Chapter Four alongside civil society partners urge parliament to uphold freedom of association and civic space.',
        published_at: 'Nov 02, 2024',
    },
    {
        id: 3,
        title: 'Community Paralegal Handbook: Navigating Bail and Police Custody',
        slug: 'community-paralegal-handbook',
        type: 'Publication',
        excerpt: 'A practical, simplified guide for grassroots paralegals and human rights defenders defending accused youth.',
        published_at: 'Sep 28, 2024',
    },
    {
        id: 4,
        title: 'Policy Brief: Youth Participation in District Development Funds',
        slug: 'policy-brief-district-funds',
        type: 'Policy Brief',
        excerpt: 'Analyzing the barriers preventing young citizens from auditing local government development expenditure.',
        published_at: 'Aug 19, 2024',
    },
];

const categories = ['All', 'Report', 'Publication', 'Press Release', 'Policy Brief'];

export default function Resources({ resources }: ResourcesProps) {
    const rawData = Array.isArray(resources) ? resources : (resources?.data || []);
    const items = rawData.length > 0 ? rawData : defaultResources;

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = items.filter(item => {
        const matchesCat = selectedCategory === 'All' || (item.type?.toLowerCase() === selectedCategory.toLowerCase());
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesSearch;
    });

    return (
        <PublicLayout>
            <Head title="Resources & Publications - Chapter Four" />

            {/* Header Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                            <BookOpen className="w-3.5 h-3.5" /> Knowledge & Publications
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
                            Evidence, Insights & <span className="italic text-gradient-gold">Public Discourse</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-navy-200 leading-relaxed font-light">
                            Explore our research reports, legal handbooks, policy submissions, and press statements.
                        </p>

                        {/* Search & Filter Controls */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
                            <div className="relative w-full">
                                <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search resources..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900/90 border border-navy-700 text-white placeholder-navy-400 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mt-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-amber-500 text-navy-950 shadow-md shadow-amber-500/20'
                                            : 'bg-navy-900/80 text-navy-300 hover:text-white border border-navy-800'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* List Section */}
            <section className="py-20 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredItems.map((item, i) => (
                            <motion.div
                                key={item.slug || i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="p-8 rounded-2xl bg-navy-900/50 border border-navy-800 hover:border-amber-500/30 hover:bg-navy-900/80 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-4">
                                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            {item.type || 'Resource'}
                                        </span>
                                        {item.published_at && (
                                            <span className="text-xs text-navy-400 flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {item.published_at}
                                            </span>
                                        )}
                                    </div>

                                    <Link href={`/resources/${item.slug}`}>
                                        <h3 className="font-serif text-2xl text-white font-normal mb-3 group-hover:text-amber-300 transition-colors">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <p className="text-navy-300 text-sm font-light leading-relaxed mb-6">
                                        {item.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-navy-800/80">
                                    <Link
                                        href={`/resources/${item.slug}`}
                                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider transition-colors"
                                    >
                                        Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <span className="text-xs text-navy-400 flex items-center gap-1">
                                        <FileText className="w-3.5 h-3.5" /> PDF Available
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 text-navy-400 font-light">
                            No resources found matching your current filter.
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
