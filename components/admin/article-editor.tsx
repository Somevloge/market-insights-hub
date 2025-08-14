"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AdminLayout } from "./admin-layout"
import { Save, ArrowLeft } from "lucide-react"
import { createArticle, updateArticle } from "@/lib/admin-actions"
import Link from "next/link"

interface Article {
  id?: string
  title: string
  title_amharic?: string
  content: string
  content_amharic?: string
  summary: string
  summary_amharic?: string
  source_url?: string
  source_name?: string
  category_id: string
  image_url?: string
  is_featured: boolean
  is_published: boolean
  categories?: {
    id: string
    name: string
    name_amharic?: string
  }
}

interface Category {
  id: string
  name: string
  name_amharic?: string
}

interface ArticleEditorProps {
  article?: Article
  categories: Category[]
}

export function ArticleEditor({ article, categories }: ArticleEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: article?.title || "",
    title_amharic: article?.title_amharic || "",
    content: article?.content || "",
    content_amharic: article?.content_amharic || "",
    summary: article?.summary || "",
    summary_amharic: article?.summary_amharic || "",
    source_url: article?.source_url || "",
    source_name: article?.source_name || "",
    category_id: article?.category_id || categories[0]?.id || "",
    image_url: article?.image_url || "",
    is_featured: article?.is_featured || false,
    is_published: article?.is_published || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (article?.id) {
        await updateArticle(article.id, formData)
      } else {
        await createArticle(formData)
      }
      router.push("/admin/articles")
    } catch (error) {
      console.error("Error saving article:", error)
      alert("Error saving article. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/admin/articles">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="font-serif text-3xl font-bold text-brand-green">
                {article ? "Edit Article" : "Create New Article"}
              </h1>
              <p className="text-gray-600 mt-2">
                {article ? "Update article information" : "Add a new article to your platform"}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* English Content */}
              <Card>
                <CardHeader>
                  <CardTitle>English Content</CardTitle>
                  <CardDescription>Article content in English</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter article title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      value={formData.summary}
                      onChange={(e) => handleInputChange("summary", e.target.value)}
                      placeholder="Brief summary of the article"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      placeholder="Full article content"
                      rows={12}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Amharic Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Amharic Content (Optional)</CardTitle>
                  <CardDescription>Article content in Amharic</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title_amharic">Title (Amharic)</Label>
                    <Input
                      id="title_amharic"
                      value={formData.title_amharic}
                      onChange={(e) => handleInputChange("title_amharic", e.target.value)}
                      placeholder="የጽሁፍ ርዕስ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="summary_amharic">Summary (Amharic)</Label>
                    <Textarea
                      id="summary_amharic"
                      value={formData.summary_amharic}
                      onChange={(e) => handleInputChange("summary_amharic", e.target.value)}
                      placeholder="የጽሁፍ ማጠቃለያ"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content_amharic">Content (Amharic)</Label>
                    <Textarea
                      id="content_amharic"
                      value={formData.content_amharic}
                      onChange={(e) => handleInputChange("content_amharic", e.target.value)}
                      placeholder="ሙሉ የጽሁፍ ይዘት"
                      rows={8}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Publish Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_published">Published</Label>
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => handleInputChange("is_published", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_featured">Featured</Label>
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => handleInputChange("is_featured", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Category & Meta */}
              <Card>
                <CardHeader>
                  <CardTitle>Category & Meta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category_id">Category *</Label>
                    <select
                      id="category_id"
                      value={formData.category_id}
                      onChange={(e) => handleInputChange("category_id", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => handleInputChange("image_url", e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="source_name">Source Name</Label>
                    <Input
                      id="source_name"
                      value={formData.source_name}
                      onChange={(e) => handleInputChange("source_name", e.target.value)}
                      placeholder="e.g., Reuters, Bloomberg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="source_url">Source URL</Label>
                    <Input
                      id="source_url"
                      value={formData.source_url}
                      onChange={(e) => handleInputChange("source_url", e.target.value)}
                      placeholder="https://source.com/article"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <Button type="submit" disabled={loading} className="w-full bg-brand-green hover:bg-brand-green/90">
                    {loading ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {article ? "Update Article" : "Create Article"}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
