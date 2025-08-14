"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Save, Shield } from "lucide-react"
import { changePassword } from "@/lib/profile-actions"

export function PasswordChange() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }

    if (formData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }

    setLoading(true)

    try {
      await changePassword(formData.newPassword)
      alert("Password updated successfully!")
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error changing password:", error)
      alert("Error changing password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-brand-green" />
            <span>Change Password</span>
          </CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={loading} className="bg-brand-green hover:bg-brand-green/90">
                {loading ? (
                  "Updating..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Password
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <span className="text-brand-green">•</span>
              <span>Use a strong password with at least 8 characters</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-brand-green">•</span>
              <span>Include uppercase and lowercase letters, numbers, and symbols</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-brand-green">•</span>
              <span>Don't reuse passwords from other accounts</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-brand-green">•</span>
              <span>Consider using a password manager</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
