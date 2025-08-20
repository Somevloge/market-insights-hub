"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

interface FeaturedArticlesProps {
  articles: Article[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Featured Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with our top market insights and analysis from leading financial experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <Card
              key={article.id}
              className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={article.image_url || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-brand-green text-white hover:bg-brand-green/90">{article.categories.name}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <Link href={`/article/${article.id}`}>
                  <h3 className="font-serif text-xl font-bold mb-3 text-gray-900 group-hover:text-brand-green transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.views}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
