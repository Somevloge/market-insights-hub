"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, Bookmark, X } from "lucide-react"
import { removeBookmark } from "@/lib/profile-actions"
import { useState } from "react"

interface BookmarkedArticle {
  id: string
  created_at: string
  news_articles: {
    id: string
    title: string
    summary: string
    published_at: string
    view_count: number
    image_url?: string
    categories: {
      name: string
      name_amharic?: string
    }
  }
}

interface BookmarkedArticlesProps {
  bookmarks: BookmarkedArticle[]
}

export function BookmarkedArticles({ bookmarks }: BookmarkedArticlesProps) {
  const [localBookmarks, setLocalBookmarks] = useState(bookmarks)
  const [loading, setLoading] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleRemoveBookmark = async (bookmarkId: string) => {
    setLoading(bookmarkId)
    try {
      await removeBookmark(bookmarkId)
      setLocalBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== bookmarkId))
    } catch (error) {
      console.error("Error removing bookmark:", error)
      alert("Error removing bookmark. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  if (localBookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <Bookmark className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No bookmarks yet</h3>
        <p className="mt-2 text-gray-600">
          Start bookmarking articles you want to read later. You can bookmark articles by clicking the bookmark icon on
          any article.
        </p>
        <Button asChild className="mt-4 bg-brand-green hover:bg-brand-green/90">
          <Link href="/">Browse Articles</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">{localBookmarks.length} bookmarked articles</p>
      </div>

      <div className="grid gap-4">
        {localBookmarks.map((bookmark) => (
          <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-4">
                {bookmark.news_articles.image_url && (
                  <div className="flex-shrink-0">
                    <img
                      src={bookmark.news_articles.image_url || `/placeholder.svg?height=80&width=120&query=news`}
                      alt={bookmark.news_articles.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <Link href={`/article/${bookmark.news_articles.id}`}>
                      <h3 className="font-medium text-gray-900 hover:text-brand-green transition-colors line-clamp-2">
                        {bookmark.news_articles.title}
                      </h3>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                      disabled={loading === bookmark.id}
                      className="flex-shrink-0 text-gray-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{bookmark.news_articles.summary}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <Badge variant="secondary" className="text-xs">
                        {bookmark.news_articles.categories.name}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(bookmark.news_articles.published_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{bookmark.news_articles.view_count}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">Saved {formatDate(bookmark.created_at)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
