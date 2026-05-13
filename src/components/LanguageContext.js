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
        "Bilgisayar Mühendisiyim. Yapay zekâ, robotik ve bilgisayarlı görü tarafında çalışıyor, öğrendiklerimi de zaman zaman Medium'da yazıya döküyorum.",
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
      bio: "Bilgisayar Mühendisiyim. Vaktimin büyük çoğunluğu yapay zekâ, robotik, görüntü işleme ve bilgisayarlı görü tarafında geçiyor. Bir fikrin defterden çıkıp gerçekten çalışan bir şeye dönüştüğü kısım benim için en zevkli yer — sonrasında da öğrendiklerimi Medium'da yazıya döküyorum.",
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
        "Computer Engineer. I work on AI, robotics and computer vision, and I write about what I'm learning along the way on Medium.",
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
      bio: "I'm a Computer Engineer. Most of my time goes into AI, robotics, image processing and computer vision. My favorite part is the moment an idea moves out of a notebook and turns into something that actually works — and I usually end up writing about what I learned on Medium afterwards.",
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
