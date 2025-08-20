import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user has admin role
  const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/")
  }

  // Fetch dashboard data
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
    .limit(10)

  const { data: categories } = await supabase.from("categories").select("*").order("name")

  // Get statistics
  const { count: totalArticles } = await supabase.from("news_articles").select("*", { count: "exact", head: true })

  const { count: publishedArticles } = await supabase
    .from("news_articles")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true)

  const { count: featuredArticles } = await supabase
    .from("news_articles")
    .select("*", { count: "exact", head: true })
    .eq("is_featured", true)

  const { count: totalUsers } = await supabase.from("user_profiles").select("*", { count: "exact", head: true })

  const stats = {
    totalArticles: totalArticles || 0,
    publishedArticles: publishedArticles || 0,
    featuredArticles: featuredArticles || 0,
    totalUsers: totalUsers || 0,
  }

  return <AdminDashboard articles={articles || []} categories={categories || []} stats={stats} />
}
