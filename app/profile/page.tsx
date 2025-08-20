import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { ProfileTabs } from "@/components/profile/profile-tabs"

export default async function ProfilePage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  // Fetch user bookmarks
  const { data: bookmarks } = await supabase
    .from("user_bookmarks")
    .select(`
      *,
      news_articles (
        id,
        title,
        summary,
        published_at,
        view_count,
        image_url,
        categories (
          name,
          name_amharic
        )
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch categories for preferences
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-brand-green">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <ProfileTabs user={user} profile={profile} bookmarks={bookmarks || []} categories={categories || []} />
      </div>
    </div>
  )
}
