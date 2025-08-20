import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ArticleManagement } from "@/components/admin/article-management"

export default async function AdminArticlesPage() {
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

  // Fetch articles with pagination
  const { data: articles } = await supabase
    .from("news_articles")
    .select(`
      *,
      categories (
        name,
        name_amharic
      )
    `)
    .order("created_at", { ascending: false })

  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return <ArticleManagement articles={articles || []} categories={categories || []} />
}
