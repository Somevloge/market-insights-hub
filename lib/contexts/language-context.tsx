"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "am"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Basic translations for UI elements
const translations = {
  en: {
    // Navigation
    home: "Home",
    cryptocurrency: "Cryptocurrency",
    forex: "Forex",
    analysis: "Analysis",
    signIn: "Sign In",
    signUp: "Sign Up",
    account: "Account",
    profile: "Profile",
    signOut: "Sign Out",

    // Homepage
    heroTitle: "Stay Ahead: Real-Time Insights on Crypto and Forex Markets",
    heroSubtitle: "Your trusted source for market analysis and trading tips.",
    exploreLatest: "Explore Latest Trends",
    joinCommunity: "Join Our Community",
    featuredStories: "Featured Stories",
    latestNews: "Latest News",
    getInsights: "Get insights in your language",
    categories: "Categories",
    allCategories: "All Categories",

    // Article
    views: "views",
    readMore: "Read More",
    share: "Share",
    shareArticle: "Share Article",
    source: "Source",
    readOriginal: "Read Original Source",

    // Profile
    myProfile: "My Profile",
    manageAccount: "Manage your account settings and preferences",
    profileInfo: "Profile Information",
    updatePersonal: "Update your personal information and preferences",
    bookmarks: "Bookmarks",
    bookmarkedArticles: "Bookmarked Articles",
    savedArticles: "Articles you've saved for later reading",
    settings: "Settings",
    notificationSettings: "Notification Settings",
    manageNotifications: "Manage how you receive updates and notifications",
    security: "Security",
    securitySettings: "Security Settings",
    updateSecurity: "Update your password and security preferences",

    // Common
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    back: "Back",
    next: "Next",
    previous: "Previous",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    date: "Date",
    category: "Category",
    author: "Author",
    published: "Published",
    draft: "Draft",
    featured: "Featured",
  },
  am: {
    // Navigation
    home: "መነሻ",
    cryptocurrency: "ክሪፕቶ ምንዛሬ",
    forex: "ፎሬክስ",
    analysis: "ትንተና",
    signIn: "ግባ",
    signUp: "ተመዝገብ",
    account: "መለያ",
    profile: "መገለጫ",
    signOut: "ውጣ",

    // Homepage
    heroTitle: "ወደፊት ይሂዱ፡ በክሪፕቶ እና ፎሬክስ ገበያዎች ላይ የእውነተኛ ጊዜ ግንዛቤዎች",
    heroSubtitle: "የገበያ ትንተና እና የንግድ ምክሮች የታመነ ምንጭዎ።",
    exploreLatest: "የቅርብ ጊዜ አዝማሚያዎችን ያስሱ",
    joinCommunity: "ማህበረሰባችንን ይቀላቀሉ",
    featuredStories: "ተመራጭ ታሪኮች",
    latestNews: "የቅርብ ጊዜ ዜናዎች",
    getInsights: "በቋንቋዎ ግንዛቤዎችን ያግኙ",
    categories: "ምድቦች",
    allCategories: "ሁሉም ምድቦች",

    // Article
    views: "እይታዎች",
    readMore: "ተጨማሪ ያንብቡ",
    share: "አጋራ",
    shareArticle: "ጽሁፍ አጋራ",
    source: "ምንጭ",
    readOriginal: "የመጀመሪያውን ምንጭ ያንብቡ",

    // Profile
    myProfile: "የእኔ መገለጫ",
    manageAccount: "የመለያ ቅንብሮችዎን እና ምርጫዎችዎን ያስተዳድሩ",
    profileInfo: "የመገለጫ መረጃ",
    updatePersonal: "የግል መረጃዎን እና ምርጫዎችዎን ያዘምኑ",
    bookmarks: "ዕልባቶች",
    bookmarkedArticles: "የተዕልባት ጽሁፎች",
    savedArticles: "በኋላ ለማንበብ የተቀመጡ ጽሁፎች",
    settings: "ቅንብሮች",
    notificationSettings: "የማሳወቂያ ቅንብሮች",
    manageNotifications: "ዝማኔዎችን እና ማሳወቂያዎችን እንዴት እንደሚቀበሉ ያስተዳድሩ",
    security: "ደህንነት",
    securitySettings: "የደህንነት ቅንብሮች",
    updateSecurity: "የይለፍ ቃልዎን እና የደህንነት ምርጫዎችዎን ያዘምኑ",

    // Common
    loading: "በመጫን ላይ...",
    save: "አስቀምጥ",
    cancel: "ሰርዝ",
    edit: "አርም",
    delete: "ሰርዝ",
    view: "ይመልከቱ",
    back: "ተመለስ",
    next: "ቀጣይ",
    previous: "ቀዳሚ",
    search: "ፈልግ",
    filter: "ማጣሪያ",
    sort: "ደርድር",
    date: "ቀን",
    category: "ምድብ",
    author: "ደራሲ",
    published: "ታትሟል",
    draft: "ረቂቅ",
    featured: "ተመራጭ",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred_language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "am")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("preferred_language", lang)
    // Note: In production, this would also update the user profile in the database
  }

  const t = (key: string, fallback?: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations.en]
    return translation || fallback || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Helper function to get localized content from articles
export function getLocalizedContent(
  content: { en?: string; am?: string } | string,
  language: Language,
  fallback = "",
): string {
  if (typeof content === "string") return content

  if (language === "am" && content.am) return content.am
  if (content.en) return content.en

  return fallback
}

// Helper function to format content for display
export function formatArticleContent(article: any, language: Language) {
  return {
    title: getLocalizedContent(
      {
        en: article.title,
        am: article.title_amharic,
      },
      language,
      article.title,
    ),
    summary: getLocalizedContent(
      {
        en: article.summary,
        am: article.summary_amharic,
      },
      language,
      article.summary,
    ),
    content: getLocalizedContent(
      {
        en: article.content,
        am: article.content_amharic,
      },
      language,
      article.content,
    ),
    categoryName: getLocalizedContent(
      {
        en: article.categories?.name,
        am: article.categories?.name_amharic,
      },
      language,
      article.categories?.name,
    ),
  }
}
