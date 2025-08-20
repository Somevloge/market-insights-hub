"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage, getLocalizedContent } from "@/lib/contexts/language-context"

interface Category {
  id: string
  name: string
  name_amharic?: string
}

interface CategoryFilterProps {
  categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { language, t } = useLanguage()

  return (
    <div className="space-y-3">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        className={`w-full justify-start ${
          selectedCategory === null
            ? "bg-brand-green hover:bg-brand-green/90 text-white"
            : "hover:bg-brand-green hover:text-white"
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        {t("allCategories")}
      </Button>

      {categories.map((category) => {
        const localizedName = getLocalizedContent(
          {
            en: category.name,
            am: category.name_amharic,
          },
          language,
          category.name,
        )

        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`w-full justify-start ${
              selectedCategory === category.id
                ? "bg-brand-green hover:bg-brand-green/90 text-white"
                : "hover:bg-brand-green hover:text-white"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="flex-1 text-left">{localizedName}</span>
            <Badge variant="secondary" className="ml-2 bg-brand-yellow text-brand-green">
              12
            </Badge>
          </Button>
        )
      })}
    </div>
  )
}
