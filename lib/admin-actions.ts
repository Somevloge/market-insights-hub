"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

function createClient() {
  const cookieStore = cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

// Check if user is admin
async function checkAdminAccess() {
  const supabase = createClient()

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

  return { supabase, user }
}

// Create new article
export async function createArticle(articleData: any) {
  const { supabase } = await checkAdminAccess()

  const { error } = await supabase.from("news_articles").insert({
    ...articleData,
    published_at: articleData.is_published ? new Date().toISOString() : null,
  })

  if (error) {
    throw new Error("Failed to create article")
  }
}

// Update existing article
export async function updateArticle(articleId: string, articleData: any) {
  const { supabase } = await checkAdminAccess()

  const { error } = await supabase
    .from("news_articles")
    .update({
      ...articleData,
      updated_at: new Date().toISOString(),
      published_at: articleData.is_published ? new Date().toISOString() : null,
    })
    .eq("id", articleId)

  if (error) {
    throw new Error("Failed to update article")
  }
}

// Delete article
export async function deleteArticle(articleId: string) {
  const { supabase } = await checkAdminAccess()

  const { error } = await supabase.from("news_articles").delete().eq("id", articleId)

  if (error) {
    throw new Error("Failed to delete article")
  }
}
