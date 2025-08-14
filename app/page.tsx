import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedArticles } from "@/components/featured-articles"
import { NewsGrid } from "@/components/news-grid"
import { Footer } from "@/components/footer"

// Mock data for demonstration
const mockFeaturedArticles = [
  {
    id: "1",
    title: "Bitcoin Reaches New All-Time High",
    title_amharic: "ቢትኮይን አዲስ ከፍተኛ ዋጋ ደረሰ",
    summary:
      "Bitcoin has surged to unprecedented levels, breaking through previous resistance levels and attracting institutional investors.",
    summary_amharic: "ቢትኮይን ወደ ከፍተኛ ደረጃ በመድረስ የቀደመውን መከላከያ በመስበር የተቋም ባለሀብቶችን እየሳበ ነው።",
    image_url: "/placeholder.svg?height=400&width=600",
    published_at: new Date().toISOString(),
    categories: { name: "Cryptocurrency", name_amharic: "ክሪፕቶ ምንዛሬ" },
    views: 1250,
  },
  {
    id: "2",
    title: "Ethiopian Birr Shows Strength Against USD",
    title_amharic: "የኢትዮጵያ ብር በዶላር ላይ ጥንካሬ አሳየ",
    summary:
      "The Ethiopian Birr has demonstrated remarkable resilience in recent trading sessions against major currencies.",
    summary_amharic: "የኢትዮጵያ ብር በቅርብ ጊዜ የንግድ ክፍለ ጊዜዎች ውስጥ በዋና ምንዛሬዎች ላይ አስደናቂ ጥንካሬ አሳይቷል።",
    image_url: "/placeholder.svg?height=400&width=600",
    published_at: new Date().toISOString(),
    categories: { name: "Forex", name_amharic: "ፎሬክስ" },
    views: 890,
  },
  {
    id: "3",
    title: "Gold Prices Surge Amid Market Uncertainty",
    title_amharic: "የወርቅ ዋጋ በገበያ አለመረጋጋት ምክንያት ጨመረ",
    summary:
      "Gold continues its upward trajectory as investors seek safe-haven assets during volatile market conditions.",
    summary_amharic: "ወርቅ ባለሀብቶች በተለዋዋጭ የገበያ ሁኔታዎች ውስጥ ደህንነታቸው የተጠበቀ ንብረት ሲፈልጉ ወደ ላይ መሄዱን ቀጥሏል።",
    image_url: "/placeholder.svg?height=400&width=600",
    published_at: new Date().toISOString(),
    categories: { name: "Commodities", name_amharic: "ሸቀጦች" },
    views: 675,
  },
]

const mockRecentArticles = [
  ...mockFeaturedArticles,
  {
    id: "4",
    title: "Ethereum 2.0 Staking Rewards Analysis",
    title_amharic: "የኢተሪየም 2.0 ስቴኪንግ ሽልማት ትንተና",
    summary: "A comprehensive analysis of Ethereum 2.0 staking rewards and their long-term implications for investors.",
    summary_amharic: "የኢተሪየም 2.0 ስቴኪንግ ሽልማቶች እና ለባለሀብቶች ረጅም ጊዜ ተፅእኖዎች ሰፊ ትንተና።",
    image_url: "/placeholder.svg?height=300&width=400",
    published_at: new Date().toISOString(),
    categories: { name: "Cryptocurrency", name_amharic: "ክሪፕቶ ምንዛሬ" },
    views: 445,
  },
  {
    id: "5",
    title: "African Stock Markets Weekly Roundup",
    title_amharic: "የአፍሪካ የአክሲዮን ገበያዎች ሳምንታዊ ማጠቃለያ",
    summary: "Key movements and trends across major African stock exchanges this week, including Ethiopia.",
    summary_amharic: "በዚህ ሳምንት ኢትዮጵያን ጨምሮ በዋና የአፍሪካ የአክሲዮን ልውውጦች ውስጥ ቁልፍ እንቅስቃሴዎች እና አዝማሚያዎች።",
    image_url: "/placeholder.svg?height=300&width=400",
    published_at: new Date().toISOString(),
    categories: { name: "Stocks", name_amharic: "አክሲዮኖች" },
    views: 320,
  },
]

const mockCategories = [
  { id: "1", name: "Cryptocurrency", name_amharic: "ክሪፕቶ ምንዛሬ" },
  { id: "2", name: "Forex", name_amharic: "ፎሬክስ" },
  { id: "3", name: "Stocks", name_amharic: "አክሲዮኖች" },
  { id: "4", name: "Commodities", name_amharic: "ሸቀጦች" },
  { id: "5", name: "Market Analysis", name_amharic: "የገበያ ትንተና" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <FeaturedArticles articles={mockFeaturedArticles} />
        <NewsGrid articles={mockRecentArticles} categories={mockCategories} />
      </main>
      <Footer />
    </div>
  )
}
