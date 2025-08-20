"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminLayout } from "./admin-layout"
import { Plus, FileText, Users, Eye, Star } from "lucide-react"
import Link from "next/link"

interface Article {
  id: string
  title: string
  is_published: boolean
  is_featured: boolean
  view_count: number
  created_at: string
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

interface Stats {
  totalArticles: number
  publishedArticles: number
  featuredArticles: number
  totalUsers: number
}

interface AdminDashboardProps {
  articles: Article[]
  categories: Category[]
  stats: Stats
}

export function AdminDashboard({ articles, categories, stats }: AdminDashboardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brand-green">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your content and monitor platform activity</p>
          </div>
          <Button asChild className="bg-brand-green hover:bg-brand-green/90">
            <Link href="/admin/articles/new">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-green">{stats.totalArticles}</div>
              <p className="text-xs text-muted-foreground">All articles in system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-green">{stats.publishedArticles}</div>
              <p className="text-xs text-muted-foreground">Live articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-green">{stats.featuredArticles}</div>
              <p className="text-xs text-muted-foreground">Featured articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-green">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Articles */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Articles</CardTitle>
                <CardDescription>Latest articles added to the platform</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/admin/articles">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 line-clamp-1">{article.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{formatDate(article.created_at)}</span>
                      <Badge variant="secondary">{article.categories.name}</Badge>
                      {article.is_featured && <Badge className="bg-brand-yellow text-brand-green">Featured</Badge>}
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.view_count}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={article.is_published ? "default" : "secondary"}>
                      {article.is_published ? "Published" : "Draft"}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/articles/${article.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
