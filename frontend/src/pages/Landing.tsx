import {Link} from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070B14]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#070B14]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">MockLabs</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#why-us" className="text-gray-300 hover:text-white transition-colors">
              Why Us
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#works" className="text-gray-300 hover:text-white transition-colors">
              Works
            </Link>
            <Link href="#careers" className="text-gray-300 hover:text-white transition-colors">
              Careers
            </Link>
            <Link className=" text-gray-300 hover:text-white">
              Contact Us
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent" />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-[#1D2333] rounded-full px-4 py-2 mb-8">
            <span className="text-white">Flexible Plans for You</span>
            <svg className="w-4 h-4 ml-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight mb-6">
          Ace JEE with Precision: Your Path to Top Ranks Starts Here"
          </h1>

          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
          Master JEE Main & Advanced with AI-powered mock tests, adaptive learning, and real-time performance analysis—tailored for your success.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer font-semibold text-white px-12 py-3 text-xl rounded-full">
            Start a Test
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-[#0D1219] rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-b from-gray-800/50 to-transparent rounded-xl">
              <div className="text-5xl font-bold text-white mb-2">20+</div>
              <div className="text-gray-400">Team members</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-gray-800/50 to-transparent rounded-xl">
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Tests uploaded</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-gray-800/50 to-transparent rounded-xl">
              <div className="text-5xl font-bold text-white mb-2">2+</div>
              <div className="text-gray-400">Years of experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Lander</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We combine creativity with strategic thinking to deliver landing pages that convert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-[#1D2333] rounded-xl hover:bg-[#2A3447] transition-colors">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Online Presence?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who have elevated their business with our landing pages.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1219] py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="text-2xl font-bold text-white mb-6 block">
                Lander
              </Link>
              <p className="text-gray-400">Creating high-converting landing pages that drive results.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 Lander. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "High-Converting Designs",
    description: "Our landing pages are strategically designed to maximize conversion rates and drive results.",
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Responsive & Fast",
    description: "Every page is optimized for all devices and loads lightning fast for the best user experience.",
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Data-Driven Approach",
    description: "We use analytics and user behavior data to continuously improve and optimize your pages.",
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
]

