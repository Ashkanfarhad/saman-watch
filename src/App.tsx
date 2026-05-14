/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  MessageCircle, 
  MapPin, 
  ExternalLink,
  Clock,
  Navigation,
  Sparkles,
  Phone
} from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Types ---
interface BusinessLink {
  id: string;
  title: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

// --- Components ---

const SparkleBg = () => {
  const [sparkles, setSparkles] = useState<{ id: number; top: string; left: string; size: string; delay: string }[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      delay: `${Math.random() * 5}s`,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="sparkle-container">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
};

const GlowingOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] animate-pulse-glow" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
  </div>
);

export default function App() {
  const businessData = {
    name: "SAMAN WATCH",
    type: "فڕۆشتنی کاتژمێری دەستی و بۆنی پیاوان",
    address: "ڕانیە - بەرامبەر باغی گشتی",
    quote: "کوالێتی پێشینەی کارەکانمانە",
    logo: "https://i.ibb.co/jZyd1430/photo-2026-05-14-01-34-01.jpg", // Corrected ID
    accentColor: "gold",
  };

  const links: BusinessLink[] = [
    {
      id: "instagram",
      title: "ئینستاگرام",
      url: "https://instagram.com/saman.watchh",
      icon: <Instagram className="w-6 h-6" />,
      color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600",
    },
    {
      id: "tiktok",
      title: "تیک تۆک",
      url: "https://www.tiktok.com/@saman.watch1",
      icon: (
        <img 
          src="https://i.ibb.co/qLvQBz8b/tiktok.png" 
          alt="TikTok" 
          className="w-7 h-7 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://i.ibb.co/68vG9v9/tiktok-icon.png"; // Fallback attempt
            target.onerror = () => {
              target.style.display = 'none'; // If both fail, hide and show fallback
            }
          }}
        />
      ),
      color: "bg-zinc-800",
    },
    {
      id: "whatsapp",
      title: "واتسئەپ",
      url: "https://wa.me/9647509330128",
      icon: <Phone className="w-6 h-6" />,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-gold/30" dir="rtl">
      <GlowingOrbs />
      <SparkleBg />

      <main className="relative z-10 max-w-md mx-auto px-6 pt-16 pb-24 flex flex-col items-center">
        
        {/* Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          {/* Logo */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-28 h-28 rounded-full border-2 border-gold p-1 mb-6 relative shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center">
              <img 
                src="https://i.ibb.co/jZyd1430/photo-2026-05-14-01-34-01.jpg" 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== "https://ui-avatars.com/api/?name=SAMAN+WATCH&background=D4AF37&color=fff") {
                    // Try another common direct link pattern
                    target.src = "https://i.ibb.co/jZyd143/photo-2026-05-14-01-34-01.jpg";
                    target.onerror = () => {
                      target.src = "https://ui-avatars.com/api/?name=SAMAN+WATCH&background=D4AF37&color=fff";
                    };
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Name */}
          <h1 className="text-4xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            {businessData.name}
          </h1>

          {/* Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-300 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>{businessData.address}</span>
          </div>
        </motion.div>

        {/* Links Section */}
        <div className="w-full space-y-4 mb-16">
          <AnimatePresence>
            {links.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full flex items-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-gold/50 hover:bg-zinc-800 transition-all duration-300 backdrop-blur-md"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-white ${link.color} shadow-lg transition-transform group-hover:rotate-6`}>
                  {link.icon}
                </div>
                <span className="mr-5 text-lg font-medium text-zinc-200 group-hover:text-gold transition-colors">
                  {link.title}
                </span>
                <ExternalLink className="mr-auto w-5 h-5 text-zinc-600 group-hover:text-gold/50 opacity-0 group-hover:opacity-100 transition-all" />
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Quote Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full text-center relative px-4"
        >
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-10 shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
          <p className="text-2xl font-medium tracking-wide leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 drop-shadow-sm">
            <span className="text-gold opacity-50 text-3xl ml-2 font-serif">"</span>
            {businessData.quote}
            <span className="text-gold opacity-50 text-3xl mr-2 font-serif">"</span>
          </p>
        </motion.div>

        {/* Footer Section - Chaplin Chap Branded */}
        <footer className="mt-24 pt-12 border-t border-zinc-900 w-full flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4 group">
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-500 shimmer-text font-medium">
                دروستکراوە لە لایەن (چاپلین چاپ)
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
            </div>
            
            <motion.a
              href="https://chaplin-chap.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Floating Logo Glow */}
              <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src="https://i.ibb.co/7NNMczJt/chaplin.png" 
                alt="Chaplin Chap" 
                className="w-12 h-12 rounded-xl relative z-10 transition-all duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== "https://ui-avatars.com/api/?name=CC&background=333&color=fff") {
                    target.src = "https://i.ibb.co/7NNMczJ/chaplin.png"; // Fallback attempt
                    target.onerror = () => {
                      target.src = "https://ui-avatars.com/api/?name=CC&background=333&color=fff";
                    };
                  }
                }}
              />
            </motion.a>

            <motion.a
              href="https://chaplin-chap.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold text-gold hover:text-white transition-colors group overflow-hidden"
            >
              {/* Pulse effect background */}
              <motion.div 
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gold"
              />
              <span className="relative z-10">Chaplin Chap</span>
            </motion.a>
          </div>
        </footer>

      </main>
    </div>
  );
}
