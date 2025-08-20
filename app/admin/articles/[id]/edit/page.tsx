import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { ArticleEditor } from "@/components/admin/article-editor"

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const supabase = createClient()

  // Check if user is authenticated and is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/")
  }

  // Fetch the article to edit
  const { data: article, error } = await supabase
    .from("news_articles")
    .select(`
      *,
      categories (
        id,
        name,
        name_amharic
      )
    `)
    .eq("id", params.id)
    .single()

  if (error || !article) {
    notFound()
  }

  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return <ArticleEditor article={article} categories={categories || []} />
}
