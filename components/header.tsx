"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "am">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "am" : "en")
  }

  const t = (key: string) => {
    const translations = {
      en: {
        home: "Home",
        cryptocurrency: "Cryptocurrency",
        forex: "Forex",
        analysis: "Analysis",
        signIn: "Sign In",
        signUp: "Sign Up",
      },
      am: {
        home: "መነሻ",
        cryptocurrency: "ክሪፕቶ ምንዛሬ",
        forex: "ፎሬክስ",
        analysis: "ትንተና",
        signIn: "ግባ",
        signUp: "ተመዝገብ",
      },
    }
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MIH</span>
            </div>
            <span className="font-serif text-xl font-bold text-brand-green">Market Insights Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              {t("home")}
            </Link>
            <Link href="/crypto" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              {t("cryptocurrency")}
            </Link>
            <Link href="/forex" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              {t("forex")}
            </Link>
            <Link href="/analysis" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              {t("analysis")}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-1 border-brand-green text-brand-green hover:bg-brand-green hover:text-white bg-transparent"
            >
              <Globe className="w-4 h-4" />
              <span className={language === "am" ? "amharic-text" : ""}>{language === "en" ? "EN" : "አማ"}</span>
            </Button>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="bg-transparent border-gray-300 hover:border-brand-green hover:text-brand-green"
              >
                <Link href="/auth/login">{t("signIn")}</Link>
              </Button>
              <Button size="sm" asChild className="bg-brand-green hover:bg-brand-green/90 text-white">
                <Link href="/auth/signup">{t("signUp")}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                {t("home")}
              </Link>
              <Link href="/crypto" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                {t("cryptocurrency")}
              </Link>
              <Link href="/forex" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                {t("forex")}
              </Link>
              <Link href="/analysis" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                {t("analysis")}
              </Link>

              {/* Mobile Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="self-start items-center space-x-1 border-brand-green text-brand-green hover:bg-brand-green hover:text-white bg-transparent"
              >
                <Globe className="w-4 h-4" />
                <span className={language === "am" ? "amharic-text" : ""}>{language === "en" ? "EN" : "አማ"}</span>
              </Button>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" size="sm" asChild className="bg-transparent">
                  <Link href="/auth/login">{t("signIn")}</Link>
                </Button>
                <Button size="sm" asChild className="bg-brand-green hover:bg-brand-green/90">
                  <Link href="/auth/signup">{t("signUp")}</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
