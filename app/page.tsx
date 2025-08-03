"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Globe,
  BookOpen,
  Clock,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
} from "lucide-react"
import PriceChart from "@/components/price-chart"
import RSIChart from "@/components/rsi-chart"
import VolumeChart from "@/components/volume-chart"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { TrendingDown, BarChart3, Activity } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

export default function HomePage() {
  const [language, setLanguage] = useState("EN")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState("BTC/USD")
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [selectedIndicators, setSelectedIndicators] = useState(["MA", "RSI"])

  const content = {
    EN: {
      nav: {
        home: "Home",
        crypto: "Crypto News",
        forex: "Forex News",
        analysis: "Analysis",
        login: "Login",
      },
      hero: {
        headline: "Stay Ahead of Market Trends",
        subheadline:
          "Get real-time financial news, expert analysis, and trading insights for crypto and forex markets.",
        cta: "Start Trading",
      },
      sections: {
        recentNews: "Recent Market News",
        features: "Why Choose Market Insights Hub?",
        realTime: {
          title: "Real-Time News",
          description: "Get instant updates on market movements and breaking financial news.",
        },
        analysis: {
          title: "Fundamental Analysis",
          description: "Expert analysis and insights to help you make informed trading decisions.",
        },
        education: {
          title: "Educational Resources",
          description: "Learn trading strategies and market fundamentals from industry experts.",
        },
      },
      charts: {
        title: "Live Market Charts",
        subtitle: "Real-time price data with technical analysis",
        assets: "Assets",
        timeframe: "Timeframe",
        indicators: "Indicators",
        price: "Price",
        volume: "Volume",
        change: "24h Change",
        high: "24h High",
        low: "24h Low",
      },
      footer: {
        about: "About Us",
        contact: "Contact",
        privacy: "Privacy Policy",
        rights: "© 2024 Market Insights Hub. All rights reserved.",
      },
    },
    AM: {
      nav: {
        home: "መነሻ",
        crypto: "ክሪፕቶ ዜና",
        forex: "ፎሬክስ ዜና",
        analysis: "ትንተና",
        login: "ግባ",
      },
      hero: {
        headline: "የገበያ አዝማሚያዎችን ቀድመው ይከታተሉ",
        subheadline: "ለክሪፕቶ እና ፎሬክስ ገበያዎች የእውነተኛ ጊዜ የፋይናንስ ዜናዎች፣ የባለሙያ ትንተና እና የንግድ ግንዛቤዎች ያግኙ።",
        cta: "ንግድ ጀምር",
      },
      sections: {
        recentNews: "የቅርብ ጊዜ የገበያ ዜናዎች",
        features: "ለምን Market Insights Hub ይምረጡ?",
        realTime: {
          title: "የእውነተኛ ጊዜ ዜና",
          description: "በገበያ እንቅስቃሴዎች እና በሚሰበር የፋይናንስ ዜናዎች ላይ ፈጣን ዝመናዎችን ያግኙ።",
        },
        analysis: {
          title: "መሰረታዊ ትንተና",
          description: "በመረጃ ላይ የተመሰረተ የንግድ ውሳኔዎችን እንዲያደርጉ የሚረዱዎት የባለሙያ ትንተና እና ግንዛቤዎች።",
        },
        education: {
          title: "የትምህርት ሀብቶች",
          description: "ከኢንዱስትሪ ባለሙያዎች የንግድ ስልቶችን እና የገበያ መሰረታዊ ነገሮችን ይማሩ።",
        },
      },
      charts: {
        title: "የቀጥታ የገበያ ቻርቶች",
        subtitle: "የእውነተኛ ጊዜ የዋጋ መረጃ ከቴክኒካል ትንተና ጋር",
        assets: "ንብረቶች",
        timeframe: "የጊዜ ክፈፍ",
        indicators: "አመላካቾች",
        price: "ዋጋ",
        volume: "መጠን",
        change: "የ24 ሰዓት ለውጥ",
        high: "የ24 ሰዓት ከፍተኛ",
        low: "የ24 ሰዓት ዝቅተኛ",
      },
      footer: {
        about: "ስለ እኛ",
        contact: "አግኙን",
        privacy: "የግላዊነት ፖሊሲ",
        rights: "© 2024 Market Insights Hub። ሁሉም መብቶች የተጠበቁ ናቸው።",
      },
    },
  }

  const currentContent = content[language as keyof typeof content]

  const newsItems = [
    {
      id: 1,
      title: language === "EN" ? "Bitcoin Reaches New All-Time High" : "ቢትኮይን አዲስ ከፍተኛ ደረጃ ደረሰ",
      summary:
        language === "EN"
          ? "Bitcoin surged past $75,000 amid institutional adoption and regulatory clarity."
          : "ቢትኮይን በተቋማዊ ተቀባይነት እና የህግ ግልጽነት ምክንያት ከ75,000 ዶላር በላይ ጨምሯል።",
      timestamp: "2 hours ago",
      category: "Crypto",
    },
    {
      id: 2,
      title: language === "EN" ? "EUR/USD Shows Strong Bullish Momentum" : "EUR/USD ጠንካራ የመጨመር ፍጥነት አሳይቷል",
      summary:
        language === "EN"
          ? "The euro strengthens against the dollar following positive economic data from the eurozone."
          : "ዩሮ ከዶላር ጋር ሲነጻጸር ከዩሮ ዞን አዎንታዊ የኢኮኖሚ መረጃ በመከተል ጠንክሯል።",
      timestamp: "4 hours ago",
      category: "Forex",
    },
    {
      id: 3,
      title: language === "EN" ? "Federal Reserve Hints at Rate Cuts" : "የፌደራል ሪዘርቭ የወለድ ምጣኔ ቅነሳ ጠቁሟል",
      summary:
        language === "EN"
          ? "Fed officials suggest potential interest rate reductions in upcoming meetings."
          : "የፌድ ባለስልጣናት በሚቀጥሉት ስብሰባዎች ላይ የወለድ ምጣኔ ቅነሳ እንደሚኖር ጠቁሟል።",
      timestamp: "6 hours ago",
      category: "Analysis",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white font-roboto">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold font-montserrat text-[#007BFF]">Market Insights Hub</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-white hover:text-[#007BFF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {currentContent.nav.home}
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#007BFF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {currentContent.nav.crypto}
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#007BFF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {currentContent.nav.forex}
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#007BFF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {currentContent.nav.analysis}
                </a>
              </div>
            </div>

            {/* Language Switcher and Login */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === "EN" ? "AM" : "EN")}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                aria-label={`Switch to ${language === "EN" ? "Amharic" : "English"}`}
              >
                {language}
              </button>
              <Button className="bg-[#007BFF] hover:bg-blue-600 text-white">{currentContent.nav.login}</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                {currentContent.nav.home}
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                {currentContent.nav.crypto}
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                {currentContent.nav.forex}
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                {currentContent.nav.analysis}
              </a>
              <div className="flex items-center space-x-2 px-3 py-2">
                <button
                  onClick={() => setLanguage(language === "EN" ? "AM" : "EN")}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm font-medium"
                >
                  {language}
                </button>
                <Button className="bg-[#007BFF] hover:bg-blue-600 text-white">{currentContent.nav.login}</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-montserrat text-white mb-6 leading-tight">
            {currentContent.hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {currentContent.hero.subheadline}
          </p>
          <Button
            size="lg"
            className="bg-[#007BFF] hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            {currentContent.hero.cta}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-montserrat text-white mb-8 text-center">
            {currentContent.sections.recentNews}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <Card
                key={item.id}
                className="bg-gray-700 border-gray-600 hover:bg-gray-650 transition-colors cursor-pointer"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-[#007BFF] bg-blue-900 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.timestamp}
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg font-semibold leading-tight">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Charts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-montserrat text-white mb-4">{currentContent.charts.title}</h2>
            <p className="text-xl text-gray-300">{currentContent.charts.subtitle}</p>
          </div>

          {/* Chart Controls */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Asset Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{currentContent.charts.assets}</label>
                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                >
                  <option value="BTC/USD">Bitcoin (BTC/USD)</option>
                  <option value="ETH/USD">Ethereum (ETH/USD)</option>
                  <option value="EUR/USD">Euro (EUR/USD)</option>
                  <option value="GBP/USD">British Pound (GBP/USD)</option>
                </select>
              </div>

              {/* Timeframe Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {currentContent.charts.timeframe}
                </label>
                <div className="flex space-x-2">
                  {["1H", "1D", "1W", "1M"].map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedTimeframe === timeframe
                          ? "bg-[#007BFF] text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>

              {/* Indicators Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {currentContent.charts.indicators}
                </label>
                <div className="flex flex-wrap gap-2">
                  {["MA", "RSI", "MACD", "BB"].map((indicator) => (
                    <button
                      key={indicator}
                      onClick={() => {
                        setSelectedIndicators((prev) =>
                          prev.includes(indicator) ? prev.filter((i) => i !== indicator) : [...prev, indicator],
                        )
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        selectedIndicators.includes(indicator)
                          ? "bg-[#28A745] text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {indicator}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">{currentContent.charts.price}</div>
              <div className="text-2xl font-bold text-white">$67,234.50</div>
              <div className="flex items-center text-[#28A745] text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2.34%
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">{currentContent.charts.volume}</div>
              <div className="text-2xl font-bold text-white">$2.1B</div>
              <div className="flex items-center text-red-400 text-sm">
                <TrendingDown className="h-4 w-4 mr-1" />
                -5.67%
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">{currentContent.charts.high}</div>
              <div className="text-2xl font-bold text-white">$68,450.00</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">{currentContent.charts.low}</div>
              <div className="text-2xl font-bold text-white">$65,890.00</div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="h-96">
              <PriceChart asset={selectedAsset} timeframe={selectedTimeframe} indicators={selectedIndicators} />
            </div>
          </div>

          {/* Technical Indicators Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-[#007BFF]" />
                RSI (Relative Strength Index)
              </h3>
              <div className="h-48">
                <RSIChart />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-[#28A745]" />
                Volume Analysis
              </h3>
              <div className="h-48">
                <VolumeChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-montserrat text-white mb-12 text-center">
            {currentContent.sections.features}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#007BFF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-montserrat text-white mb-3">
                {currentContent.sections.realTime.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{currentContent.sections.realTime.description}</p>
            </div>
            <div className="text-center">
              <div className="bg-[#28A745] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-montserrat text-white mb-3">
                {currentContent.sections.analysis.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{currentContent.sections.analysis.description}</p>
            </div>
            <div className="text-center">
              <div className="bg-[#007BFF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-montserrat text-white mb-3">
                {currentContent.sections.education.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{currentContent.sections.education.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold font-montserrat text-[#007BFF] mb-4">Market Insights Hub</h3>
              <p className="text-gray-300 leading-relaxed">
                {language === "EN"
                  ? "Your trusted source for financial news, market analysis, and trading insights in crypto and forex markets."
                  : "በክሪፕቶ እና ፎሬክስ ገበያዎች ውስጥ ለፋይናንስ ዜናዎች፣ የገበያ ትንተና እና የንግድ ግንዛቤዎች የሚታመን ምንጭዎ።"}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#007BFF] transition-colors">
                    {currentContent.footer.about}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#007BFF] transition-colors">
                    {currentContent.footer.contact}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#007BFF] transition-colors">
                    {currentContent.footer.privacy}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-[#007BFF] transition-colors" aria-label="Facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#007BFF] transition-colors" aria-label="Twitter">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#007BFF] transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#007BFF] transition-colors" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">{currentContent.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
