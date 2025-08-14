"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "./profile-form"
import { BookmarkedArticles } from "./bookmarked-articles"
import { NotificationSettings } from "./notification-settings"
import { PasswordChange } from "./password-change"
import { User, Settings, Bookmark, Lock } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  full_name: string
  preferred_language: string
  notification_preferences: any
  favorite_categories: string[]
  created_at: string
  updated_at: string
}

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

interface Category {
  id: string
  name: string
  name_amharic?: string
}

interface ProfileTabsProps {
  user: SupabaseUser
  profile: UserProfile | null
  bookmarks: BookmarkedArticle[]
  categories: Category[]
}

export function ProfileTabs({ user, profile, bookmarks, categories }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile" className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="bookmarks" className="flex items-center space-x-2">
          <Bookmark className="w-4 h-4" />
          <span className="hidden sm:inline">Bookmarks</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center space-x-2">
          <Lock className="w-4 h-4" />
          <span className="hidden sm:inline">Security</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm user={user} profile={profile} categories={categories} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bookmarks">
        <Card>
          <CardHeader>
            <CardTitle>Bookmarked Articles</CardTitle>
            <CardDescription>Articles you've saved for later reading</CardDescription>
          </CardHeader>
          <CardContent>
            <BookmarkedArticles bookmarks={bookmarks} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationSettings profile={profile} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Update your password and security preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordChange />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
