import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const supabase = createClient()

  const { data: article, error } = await supabase
    .from("news_articles")
    .select(`
      *,
      categories (
        name,
        name_amharic
      )
    `)
    .eq("id", params.id)
    .eq("is_published", true)
    .single()

  if (error || !article) {
    notFound()
  }

  // Increment view count
  await supabase
    .from("news_articles")
    .update({ view_count: article.view_count + 1 })
    .eq("id", params.id)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Badge className="bg-brand-green text-white">{article.categories.name}</Badge>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{article.view_count + 1} views</span>
              </div>
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

          {article.summary && <p className="text-xl text-gray-600 leading-relaxed mb-6">{article.summary}</p>}

          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center space-x-4">
              {article.source_name && <span className="text-sm text-gray-500">Source: {article.source_name}</span>}
            </div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        {article.image_url && (
          <div className="mb-8">
            <img
              src={article.image_url || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-relaxed whitespace-pre-line">{article.content}</div>
        </div>

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-brand-green text-brand-green">
                {article.categories.name}
              </Badge>
              {article.source_url && (
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green hover:underline text-sm"
                >
                  Read Original Source
                </a>
              )}
            </div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              <span>Share Article</span>
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
