import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ArticleEditor } from "@/components/admin/article-editor"

export default async function NewArticlePage() {
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

  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return <ArticleEditor categories={categories || []} />
}
