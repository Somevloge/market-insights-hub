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

// Check if user is authenticated
async function checkAuth() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return { supabase, user }
}

// Update user profile
export async function updateProfile(userId: string, profileData: any) {
  const { supabase } = await checkAuth()

  const { error } = await supabase.from("user_profiles").upsert({
    id: userId,
    ...profileData,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error("Failed to update profile")
  }
}

// Update notification settings
export async function updateNotificationSettings(userId: string, settings: any) {
  const { supabase } = await checkAuth()

  const { error } = await supabase
    .from("user_profiles")
    .update({
      notification_preferences: settings,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)

  if (error) {
    throw new Error("Failed to update notification settings")
  }
}

// Change password
export async function changePassword(newPassword: string) {
  const { supabase } = await checkAuth()

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    throw new Error("Failed to change password")
  }
}

// Remove bookmark
export async function removeBookmark(bookmarkId: string) {
  const { supabase } = await checkAuth()

  const { error } = await supabase.from("user_bookmarks").delete().eq("id", bookmarkId)

  if (error) {
    throw new Error("Failed to remove bookmark")
  }
}

// Add bookmark
export async function addBookmark(articleId: string) {
  const { supabase, user } = await checkAuth()

  const { error } = await supabase.from("user_bookmarks").insert({
    user_id: user.id,
    article_id: articleId,
  })

  if (error) {
    throw new Error("Failed to add bookmark")
  }
}
