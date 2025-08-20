"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye } from "lucide-react"

interface Article {
  id: string
  title: string
  title_amharic?: string
  summary: string
  summary_amharic?: string
  published_at: string
  views: number
  image_url?: string
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

interface NewsGridProps {
  articles: Article[]
  categories: Category[]
}

export function NewsGrid({ articles, categories }: NewsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.categories.name.toLowerCase() === selectedCategory.toLowerCase())

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Latest News</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the latest updates on cryptocurrency, forex, and financial markets
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-brand-green hover:bg-brand-green/90" : ""}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className={selectedCategory === category.name ? "bg-brand-green hover:bg-brand-green/90" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={article.image_url || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-brand-green">
                    {article.categories.name}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <Link href={`/article/${article.id}`}>
                  <h3 className="font-serif text-lg font-semibold mb-2 text-gray-900 group-hover:text-brand-green transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{article.views}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
