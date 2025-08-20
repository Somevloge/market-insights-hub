"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Mail, Smartphone } from "lucide-react"
import { updateNotificationSettings } from "@/lib/profile-actions"

interface UserProfile {
  id: string
  full_name: string
  preferred_language: string
  notification_preferences: any
  favorite_categories: string[]
  created_at: string
  updated_at: string
}

interface NotificationSettingsProps {
  profile: UserProfile | null
}

export function NotificationSettings({ profile }: NotificationSettingsProps) {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    email_notifications: profile?.notification_preferences?.email || true,
    push_notifications: profile?.notification_preferences?.push || false,
    weekly_digest: profile?.notification_preferences?.weekly_digest || true,
    breaking_news: profile?.notification_preferences?.breaking_news || true,
    new_articles: profile?.notification_preferences?.new_articles || false,
    price_alerts: profile?.notification_preferences?.price_alerts || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateNotificationSettings(profile?.id || "", settings)
      alert("Notification settings updated successfully!")
    } catch (error) {
      console.error("Error updating notification settings:", error)
      alert("Error updating settings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (setting: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-brand-green" />
            <span>Email Notifications</span>
          </CardTitle>
          <CardDescription>Manage email notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email_notifications">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              id="email_notifications"
              checked={settings.email_notifications}
              onCheckedChange={(checked) => handleToggle("email_notifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly_digest">Weekly Digest</Label>
              <p className="text-sm text-gray-600">Get a weekly summary of top articles</p>
            </div>
            <Switch
              id="weekly_digest"
              checked={settings.weekly_digest}
              onCheckedChange={(checked) => handleToggle("weekly_digest", checked)}
              disabled={!settings.email_notifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="breaking_news">Breaking News</Label>
              <p className="text-sm text-gray-600">Get notified about urgent market news</p>
            </div>
            <Switch
              id="breaking_news"
              checked={settings.breaking_news}
              onCheckedChange={(checked) => handleToggle("breaking_news", checked)}
              disabled={!settings.email_notifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-brand-green" />
            <span>Push Notifications</span>
          </CardTitle>
          <CardDescription>Browser and mobile push notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push_notifications">Push Notifications</Label>
              <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
            </div>
            <Switch
              id="push_notifications"
              checked={settings.push_notifications}
              onCheckedChange={(checked) => handleToggle("push_notifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new_articles">New Articles</Label>
              <p className="text-sm text-gray-600">Get notified when new articles are published</p>
            </div>
            <Switch
              id="new_articles"
              checked={settings.new_articles}
              onCheckedChange={(checked) => handleToggle("new_articles", checked)}
              disabled={!settings.push_notifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="price_alerts">Price Alerts</Label>
              <p className="text-sm text-gray-600">Get notified about significant price movements</p>
            </div>
            <Switch
              id="price_alerts"
              checked={settings.price_alerts}
              onCheckedChange={(checked) => handleToggle("price_alerts", checked)}
              disabled={!settings.push_notifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="bg-brand-green hover:bg-brand-green/90">
          {loading ? (
            "Saving..."
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
