import { FaLocationDot, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
                <FaLocationDot className="text-white text-lg" />
              </div>
              <span className="text-white text-2xl font-bold">Finda</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">The ultimate platform for discovering and connecting with verified local businesses.</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-teal transition">
                <FaFacebook className="text-white" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-teal transition">
                <FaTwitter className="text-white" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-teal transition">
                <FaInstagram className="text-white" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-teal transition">
                <FaLinkedin className="text-white" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/#features" className="text-gray-400 hover:text-teal transition">Features</Link></li>
              <li><Link href="/#how-it-works" className="text-gray-400 hover:text-teal transition">How It Works</Link></li>
              <li><Link href="/for-business#pricing" className="text-gray-400 hover:text-teal transition">Pricing</Link></li>
              <li><Link href="/for-business" className="text-gray-400 hover:text-teal transition">For Business</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-teal transition">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-teal transition">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-teal transition">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-teal transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-gray-400 hover:text-teal transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-teal transition">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-teal transition">Cookie Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-teal transition">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">© 2024 Finda. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-teal text-sm transition">Privacy</Link>
            <Link href="#" className="text-gray-400 hover:text-teal text-sm transition">Terms</Link>
            <Link href="#" className="text-gray-400 hover:text-teal text-sm transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
