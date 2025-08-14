"use client"

import { Header } from "@/components/header"
import { NewsGrid } from "@/components/news-grid"
import { CategoryFilter } from "@/components/category-filter"
import { FeaturedArticles } from "@/components/featured-articles"
import { useLanguage } from "@/lib/contexts/language-context"

interface Article {
  id: string
  title: string
  title_amharic?: string
  summary: string
  summary_amharic?: string
  published_at: string
  view_count: number
  image_url?: string
  is_featured: boolean
  categories: {
    name: string
    name_amharic?: string
  }
}

interface Category {
  id: string
  name: string
  name_amharic?: string
}

interface LocalizedHomepageProps {
  featuredArticles: Article[]
  recentArticles: Article[]
  categories: Category[]
}

export function LocalizedHomepage({ featuredArticles, recentArticles, categories }: LocalizedHomepageProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-green to-brand-light-green text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">{t("heroTitle")}</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">{t("heroSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brand-yellow text-brand-green px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                {t("exploreLatest")}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-green transition-colors">
                {t("joinCommunity")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles && featuredArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-center mb-12 text-brand-green">{t("featuredStories")}</h2>
            <FeaturedArticles articles={featuredArticles} />
          </div>
        </section>
      )}

      {/* Category Filter and News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with Categories */}
            <aside className="lg:w-1/4">
              <div className="sticky top-8">
                <h3 className="font-serif text-xl font-bold mb-6 text-brand-green">{t("categories")}</h3>
                {categories && <CategoryFilter categories={categories} />}
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-2xl font-bold text-brand-green">{t("latestNews")}</h2>
                <p className="text-gray-600">{t("getInsights")}</p>
              </div>
              {recentArticles && <NewsGrid articles={recentArticles} />}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
