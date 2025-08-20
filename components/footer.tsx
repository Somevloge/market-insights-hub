import Link from "next/link"
import { Globe, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MIH</span>
              </div>
              <span className="font-serif text-xl font-bold">Market Insights Hub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for cryptocurrency, forex, and financial market analysis in Ethiopia.
            </p>
            <div className="flex items-center space-x-1 text-brand-yellow">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Available in English & Amharic</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/crypto" className="text-gray-400 hover:text-white transition-colors">
                  Cryptocurrency
                </Link>
              </li>
              <li>
                <Link href="/forex" className="text-gray-400 hover:text-white transition-colors">
                  Forex
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="text-gray-400 hover:text-white transition-colors">
                  Market Analysis
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/cryptocurrency" className="text-gray-400 hover:text-white transition-colors">
                  Cryptocurrency
                </Link>
              </li>
              <li>
                <Link href="/category/forex" className="text-gray-400 hover:text-white transition-colors">
                  Forex Trading
                </Link>
              </li>
              <li>
                <Link href="/category/stocks" className="text-gray-400 hover:text-white transition-colors">
                  Stock Markets
                </Link>
              </li>
              <li>
                <Link href="/category/commodities" className="text-gray-400 hover:text-white transition-colors">
                  Commodities
                </Link>
              </li>
              <li>
                <Link href="/category/analysis" className="text-gray-400 hover:text-white transition-colors">
                  Technical Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-green" />
                <span className="text-gray-400">info@marketinsightshub.et</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-green" />
                <span className="text-gray-400">+251 11 123 4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-green mt-1" />
                <span className="text-gray-400">Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Market Insights Hub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
