import { Button } from "@/components/ui/button"
import { TrendingUp, Globe, BarChart3 } from "lucide-react"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-green-dark text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Stay Ahead: Real-Time Insights on <span className="text-brand-yellow">Crypto & Forex</span> Markets
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed">
            Your trusted source for market analysis and trading tips in Ethiopia
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-brand-yellow text-brand-green hover:bg-brand-yellow/90 font-semibold">
              Explore Latest Trends
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-green bg-transparent"
            >
              Join Our Community
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-Time Analysis</h3>
              <p className="text-green-100">Get instant market insights and trending analysis</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multilingual Support</h3>
              <p className="text-green-100">Available in English and Amharic</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Insights</h3>
              <p className="text-green-100">Professional analysis from market experts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
