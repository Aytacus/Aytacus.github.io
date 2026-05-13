import React, { createContext, useContext, useEffect, useState } from 'react';

export const LanguageContext = createContext();

const STORAGE_KEY = 'pw_lang';

const getInitialLang = () => {
  if (typeof window === 'undefined') return 'tr';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'tr' || stored === 'en') return stored;
  const nav = (window.navigator?.language || 'tr').toLowerCase();
  return nav.startsWith('tr') ? 'tr' : 'en';
};

export const translations = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımda',
      achievements: 'Başarılar',
      projects: 'Projeler',
      blog: 'Blog',
      contact: 'İletişim',
    },
    hero: {
      eyebrow: 'Yeni fırsatlara açığım',
      greeting: 'Merhaba, ben',
      subtitle:
        'Yapay Zekâ, Robotik ve Bilgisayarlı Görü kesişiminde çalışan bir Bilgisayar Mühendisiyim. Akıllı sistemler geliştiriyor ve arkasındaki teknolojiyi yazıya döküyorum.',
      exploreProjects: 'Projeleri Keşfet',
      readOnMedium: "Medium'da Oku",
    },
    sections: {
      about: 'Hakkımda',
      achievements: 'Başarılar & Öne Çıkanlar',
      projects: 'Projeler',
      blog: 'Blog Yazıları',
      contact: 'İletişim',
    },
    about: {
      bio: 'Teknoloji ve yenilikçiliğe tutkulu bir Bilgisayar Mühendisiyim; yapay zekâ, robotik, görüntü işleme ve bilgisayarlı görü alanlarında uzmanlaşıyorum. Araştırma defterlerinden üretim uygulamalarına kadar uçtan uca sistemler geliştirmekten ve öğrendiklerimi Medium’daki blog yazılarımla paylaşmaktan keyif alıyorum.',
    },
    badges: {
      onlyTR: 'Yazı yalnızca Türkçe',
      onlyEN: 'Yazı yalnızca İngilizce',
    },
    contact: {
      name: 'Adınız',
      email: 'E-posta adresiniz',
      message: 'Projenizi veya fikrinizi anlatın...',
      send: 'Mesaj Gönder',
      sending: 'Gönderiliyor...',
      success: 'Mesajınız için teşekkürler — en kısa sürede dönüş yapacağım.',
    },
    cta: {
      viewCode: 'Kodu Gör',
      readMore: 'Devamını Oku',
    },
    footer: '© {year} Yücel Aytaç Akgün — React ile geliştirildi.',
    a11y: {
      themeLight: 'Açık temaya geç',
      themeDark: 'Koyu temaya geç',
      languageToggle: 'Dili değiştir',
      menuToggle: 'Menüyü aç/kapat',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      achievements: 'Achievements',
      projects: 'Projects',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Available for new opportunities',
      greeting: "Hi, I'm",
      subtitle:
        'Computer Engineer crafting at the intersection of Artificial Intelligence, Robotics and Computer Vision. I build intelligent systems and write blog posts about the tech behind them.',
      exploreProjects: 'Explore Projects',
      readOnMedium: 'Read on Medium',
    },
    sections: {
      about: 'About Me',
      achievements: 'Achievements & Highlights',
      projects: 'Projects',
      blog: 'Blog Posts',
      contact: 'Contact',
    },
    about: {
      bio: "I'm a Computer Engineer passionate about technology and innovation, specializing in artificial intelligence, robotics, image processing and computer vision. I enjoy shipping end-to-end systems — from research notebooks to production apps — and sharing what I learn through blog posts on Medium.",
    },
    badges: {
      onlyTR: 'Post available in Turkish only',
      onlyEN: 'Post available in English only',
    },
    contact: {
      name: 'Your name',
      email: 'Your email',
      message: 'Tell me about your project or idea...',
      send: 'Send Message',
      sending: 'Sending...',
      success: "Thanks for your message — I'll get back to you soon.",
    },
    cta: {
      viewCode: 'View Code',
      readMore: 'Read More',
    },
    footer: '© {year} Yücel Aytaç Akgün — Built with React.',
    a11y: {
      themeLight: 'Switch to light mode',
      themeDark: 'Switch to dark mode',
      languageToggle: 'Toggle language',
      menuToggle: 'Toggle menu',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore storage errors
    }
  }, [language]);

  const toggleLanguage = () => setLanguage((l) => (l === 'tr' ? 'en' : 'tr'));

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (ctx === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
