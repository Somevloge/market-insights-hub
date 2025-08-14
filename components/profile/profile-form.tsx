"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Save, User, Mail, Globe } from "lucide-react"
import { updateProfile } from "@/lib/profile-actions"
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

interface Category {
  id: string
  name: string
  name_amharic?: string
}

interface ProfileFormProps {
  user: SupabaseUser
  profile: UserProfile | null
  categories: Category[]
}

export function ProfileForm({ user, profile, categories }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    preferred_language: profile?.preferred_language || "en",
    favorite_categories: profile?.favorite_categories || [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateProfile(user.id, formData)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Error updating profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      favorite_categories: prev.favorite_categories.includes(categoryId)
        ? prev.favorite_categories.filter((id) => id !== categoryId)
        : [...prev.favorite_categories, categoryId],
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Account Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Account Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input id="email" type="email" value={user.email || ""} disabled className="pl-10 bg-gray-50" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="full_name"
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                placeholder="Enter your full name"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="preferred_language">Preferred Language</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              id="preferred_language"
              value={formData.preferred_language}
              onChange={(e) => setFormData((prev) => ({ ...prev, preferred_language: e.target.value }))}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="am">አማርኛ (Amharic)</option>
            </select>
          </div>
        </div>

        {profile && (
          <div className="text-sm text-gray-500">
            <p>Member since: {formatDate(profile.created_at)}</p>
          </div>
        )}
      </div>

      {/* Favorite Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Favorite Categories</h3>
        <p className="text-sm text-gray-600">
          Select categories you're most interested in to personalize your experience
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={formData.favorite_categories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <Label htmlFor={category.id} className="text-sm font-medium cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>

        {formData.favorite_categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.favorite_categories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId)
              return category ? (
                <Badge key={categoryId} variant="secondary" className="bg-brand-light-green text-brand-green">
                  {category.name}
                </Badge>
              ) : null
            })}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="bg-brand-green hover:bg-brand-green/90">
          {loading ? (
            "Saving..."
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
