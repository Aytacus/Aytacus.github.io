import React, { useCallback } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useLanguage } from './LanguageContext';

const GITHUB_URL = 'https://github.com/Aytacus';
const MEDIUM_URL = 'https://medium.com/@akgunyucel';
const LINKEDIN_URL = 'https://linkedin.com/in/yücel-aytaç-akgün-358130227';
const EMAIL = 'mailto:akgunyucel45@gmail.com';

/* -------------------- ICONS -------------------- */
const IconLinkedIn = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
  </svg>
);
const IconGitHub = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.922.43.37.823 1.096.823 2.21 0 1.595-.015 2.88-.015 3.27 0 .32.218.694.825.576 4.765-1.587 8.2-6.086 8.2-11.385 0-6.63-5.37-12-12-12z" />
  </svg>
);
const IconMedium = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537V7.794l-5.389 13.688h-.728L4.28 7.794v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404H0v-.404l2.521-3.058c.27-.279.39-.67.325-1.052V6.887z" />
  </svg>
);
const IconMail = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

/* -------------------- DECORATIVE SVGs -------------------- */
const Cloud = ({ size = 200, opacity = 1 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 200 120" fill="none" style={{ opacity }}>
    <g fill="#ffffff" stroke="rgba(45, 74, 91, 0.08)" strokeWidth="1.5">
      <ellipse cx="55" cy="75" rx="40" ry="28" />
      <ellipse cx="100" cy="58" rx="45" ry="34" />
      <ellipse cx="145" cy="72" rx="38" ry="26" />
      <ellipse cx="80" cy="85" rx="30" ry="20" />
      <ellipse cx="130" cy="86" rx="28" ry="18" />
    </g>
  </svg>
);

const FloatingClouds = () => (
  <>
    <div className="cloud cloud-1" aria-hidden="true"><Cloud size={220} /></div>
    <div className="cloud cloud-2" aria-hidden="true"><Cloud size={280} opacity={0.85} /></div>
    <div className="cloud cloud-3" aria-hidden="true"><Cloud size={160} opacity={0.7} /></div>
  </>
);

const AvatarPortrait = ({ alt }) => (
  <div className="avatar-frame">
    {/* Soft warm halo behind the portrait */}
    <div className="avatar-glow" aria-hidden="true" />

    {/* Decorative floating elements */}
    <svg
      className="avatar-decor"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top-right cloud */}
      <g className="float-element" opacity="0.85">
        <ellipse cx="430" cy="60" rx="34" ry="10" fill="#fff" />
        <ellipse cx="455" cy="55" rx="22" ry="8" fill="#fff" />
        <ellipse cx="410" cy="68" rx="22" ry="7" fill="#fff" />
      </g>
      {/* Bottom-left cloud */}
      <g className="float-slow" opacity="0.75">
        <ellipse cx="60" cy="430" rx="30" ry="9" fill="#fff" />
        <ellipse cx="40" cy="438" rx="18" ry="7" fill="#fff" />
        <ellipse cx="82" cy="437" rx="18" ry="6" fill="#fff" />
      </g>
      {/* Soft spirits/sparkles */}
      <g className="float-element">
        <circle cx="40" cy="120" r="4" fill="#fff" />
        <circle cx="40" cy="120" r="10" fill="#fff" opacity="0.3" />
      </g>
      <g className="float-slow">
        <circle cx="465" cy="280" r="3" fill="#fff" />
        <circle cx="465" cy="280" r="8" fill="#fff" opacity="0.3" />
      </g>
      <g className="float-element">
        <circle cx="80" cy="290" r="2.5" fill="#fff" />
        <circle cx="80" cy="290" r="6" fill="#fff" opacity="0.35" />
      </g>
      {/* Tiny stars */}
      <g fill="var(--accent)" opacity="0.7">
        <path d="M450 180 l 2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" />
        <path d="M50 360 l 1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z" />
      </g>
    </svg>

    {/* The actual portrait image */}
    <img src={`${process.env.PUBLIC_URL}/anime_me.png`} alt={alt} className="avatar-image" />
  </div>
);

/* -------------------- SKILLS -------------------- */
const skills = [
  { name: 'Python', level: 90 },
  { name: { tr: 'Yapay Zekâ / Derin Öğrenme', en: 'AI / Deep Learning' }, level: 88 },
  { name: { tr: 'Robotik', en: 'Robotics' }, level: 85 },
  { name: 'Flutter', level: 85 },
  { name: 'C', level: 80 },
  { name: 'C#', level: 72 },
  { name: 'Java', level: 70 },
  { name: 'JavaScript', level: 65 },
  { name: 'React', level: 60 },
];

/* -------------------- PROJECTS -------------------- */
const projects = [
  {
    title: { tr: 'ONNX Temelleri', en: 'ONNX Basics' },
    meta: { tr: 'Python • ONNX • Model Dağıtımı', en: 'Python • ONNX • Model Deployment' },
    desc: {
      tr: "ONNX'in nasıl çalıştığını gerçekten anlamak için yaptığım küçük bir uygulamalı proje. Modelleri PyTorch ve TensorFlow'dan dışa aktarıp ONNX Runtime üzerinde çalıştırıyor.",
      en: "A small hands-on project I built to actually understand how ONNX works. It exports models from PyTorch and TensorFlow and runs them through ONNX Runtime.",
    },
    link: 'https://github.com/Aytacus/ONNX_Basic',
  },
  {
    title: { tr: 'Yaş Tespit Sistemi', en: 'Age Detector' },
    meta: { tr: 'Python • Bilgisayarlı Görü • Derin Öğrenme', en: 'Python • Computer Vision • Deep Learning' },
    desc: {
      tr: 'Kameradaki kişiyi çocuk, yetişkin ya da yaşlı olarak gerçek zamanlı tahmin eden bir bilgisayarlı görü projesi.',
      en: 'A computer vision project that decides if the person in front of the camera is a child, an adult or an elder, in real time.',
    },
    link: 'https://github.com/Aytacus/Age_Detector',
  },
  {
    title: { tr: 'Gerçek Fotoğraftan Ghibli Stiline', en: 'Real to Ghibli Style Transfer' },
    meta: 'Python • PyTorch • CycleGAN',
    desc: {
      tr: 'Gerçek fotoğrafları Studio Ghibli tarzına çeviren bir CycleGAN projesi. (Bu sitenin teması da aslında oradan geliyor.)',
      en: "A CycleGAN model that turns ordinary photos into Studio Ghibli–style art. (This site's theme is basically a nod to it.)",
    },
    link: 'https://github.com/Aytacus/real_to_ghibli',
  },
  {
    title: { tr: 'Sesli Yapay Zekâ Masaüstü Asistanı', en: 'AI Voice Desktop Assistant' },
    meta: { tr: 'Python • Groq LLaMA • Otomasyon', en: 'Python • Groq LLaMA • Automation' },
    desc: {
      tr: "Sesle uygulama açan, Selenium ile YouTube'dan video oynatan ve Groq'un LLaMA 3.3 modelini kullanarak sistem komutlarını çalıştıran bir masaüstü asistanı.",
      en: "A desktop assistant that opens apps by voice, plays videos through Selenium, and runs system commands using Groq's LLaMA 3.3 model.",
    },
    link: 'https://github.com/Aytacus/python-ai-desktop-assistant-withvoice',
  },
  {
    title: { tr: 'Hikâye Oluşturucu Yapay Zekâ', en: 'Story Creator AI' },
    meta: 'Python • PyQt6 • BLIP + LLaMA',
    desc: {
      tr: 'Yüklediğin görselin altyazısını BLIP ile çıkarıp, ardından LLaMA 3.3 ile o görsele yaratıcı bir hikâye yazan bir masaüstü uygulaması.',
      en: 'A desktop app that captions an image you upload using BLIP, and then writes a short creative story for it with LLaMA 3.3.',
    },
    link: 'https://github.com/Aytacus/storycreator',
  },
  {
    title: { tr: 'BTU LangChain RAG (Bitirme Projesi)', en: 'BTU LangChain RAG (Graduation Project)' },
    meta: { tr: 'Python • Yapay Zekâ • RAG', en: 'Python • AI • RAG' },
    desc: {
      tr: "Bitirme projem. Bursa Teknik Üniversitesi'nin belgelerine LangChain + RAG ile bağlanıp onlara soru sorabilmeni sağlayan bir asistan.",
      en: "My graduation project. An assistant that connects to Bursa Technical University's documents through LangChain + RAG so you can ask questions about them.",
    },
    link: 'https://github.com/Aytacus/BTU-LangChain-RAG',
  },
  {
    title: { tr: 'Türkçe için Konuşma-Yazı Sistemi', en: 'Speech-to-Text for Turkish' },
    meta: { tr: 'Python • NLP • Konuşma Tanıma', en: 'Python • NLP • Speech Recognition' },
    desc: {
      tr: 'Türkçe için bir konuşmadan metne sistemi üzerinde yaptığım deneme. Türkçenin fonetiğine daha iyi oturan model ve decoder ayarlarını test ettim.',
      en: 'A speech-to-text experiment for Turkish — testing acoustic models and decoder setups that fit Turkish phonetics better.',
    },
    link: 'https://github.com/Aytacus/STT-for-Turkish',
  },
  {
    title: { tr: 'Diyet Takip Uygulaması', en: 'Diet Tracker App' },
    meta: { tr: 'Flutter • Mobil Uygulama', en: 'Flutter • Mobile App' },
    desc: {
      tr: 'Flutter ile yazdığım bir diyet takip uygulaması. BMI hesabı, besin detayları ve kişisel diyet listesi var.',
      en: 'A diet tracker I built with Flutter. It does BMI calculations, shows food details and keeps a personal diet list.',
    },
    link: 'https://github.com/Aytacus/diet_tracker_flutter',
  },
  {
    title: { tr: 'Sesli Müzik Asistanı', en: 'Voice Assistant Music' },
    meta: { tr: 'Flutter • Ses Tanıma', en: 'Flutter • Voice Recognition' },
    desc: {
      tr: 'Sesli komutlarla müzik kontrolü yapabilen küçük bir mobil uygulama.',
      en: 'A small mobile app for controlling music playback with voice commands.',
    },
    link: 'https://github.com/Aytacus/voice_assistant_music',
  },
  {
    title: { tr: 'Çevrimdışı Dosya Aktarımı', en: 'Offline File Transfer' },
    meta: { tr: 'Python • Ağ', en: 'Python • Networking' },
    desc: {
      tr: 'İnternet bağlantısı olmadığında cihazlar arasında dosya aktarmak için yazdığım Python aracı.',
      en: "A Python tool I wrote to move files between devices when there's no internet around.",
    },
    link: 'https://github.com/Aytacus/offline_file_transfer',
  },
  {
    title: 'UART VIP',
    meta: { tr: 'SystemVerilog • Doğrulama', en: 'SystemVerilog • Verification' },
    desc: {
      tr: "SystemVerilog'da yazdığım, UART iletişim protokolünü doğrulamaya yarayan bir Verification IP.",
      en: 'A Verification IP I wrote in SystemVerilog to validate UART communication.',
    },
    link: 'https://github.com/Aytacus/uart-vip',
  },
  {
    title: { tr: 'Paralel Bubble Sort', en: 'Parallel Bubble Sort' },
    meta: { tr: 'Jupyter Notebook • Paralel Programlama', en: 'Jupyter Notebook • Parallel Computing' },
    desc: {
      tr: "Bubble sort'un paralel bir versiyonu. Sıralı sürümüyle yan yana koyup ne kadar hızlandığına baktığım küçük bir deneme.",
      en: 'A parallel version of bubble sort, put side by side with the sequential one to see how much faster it actually gets.',
    },
    link: 'https://github.com/Aytacus/Parallel-Bubble-Sort',
  },
  {
    title: { tr: 'NS-3 & SUMO Simülasyonu', en: 'NS-3 & SUMO Simulation' },
    meta: { tr: 'C++ • Tcl • LoRaWAN Simülasyonu', en: 'C++ • Tcl • LoRaWAN Simulation' },
    desc: {
      tr: "NS-3'ü SUMO trafik simülatörüyle LoRaWAN üzerinden birleştirip bir VANET senaryosu kurduğum ağ simülasyonu projesi.",
      en: 'A network simulation that connects NS-3 to the SUMO traffic simulator over LoRaWAN to set up a VANET scenario.',
    },
    link: 'https://github.com/Aytacus/Ns-3_Sumo_Application',
  },
];

/* -------------------- BLOG POSTS -------------------- */
const blogs = [
  {
    title: {
      tr: 'Yapay Zekânın Evrensel Dili: ONNX ile Modelleri Özgürleştirmek',
      en: 'The Universal Language of AI: Liberating Models with ONNX',
    },
    meta: { tr: 'Medium • 22 Nisan 2026', en: 'Medium • Apr 22, 2026' },
    desc: {
      tr: "ONNX'in neden bu kadar işe yaradığını ve modelleri PyTorch ya da TensorFlow gibi tek bir framework'e mahkum olmaktan nasıl çıkardığını anlattım.",
      en: "Why ONNX is so useful, and how it keeps a model from being stuck inside a single framework like PyTorch or TensorFlow.",
    },
    link: {
      tr: 'https://medium.com/@akgunyucel/yapay-zekan%C4%B1n-evrensel-dili-onnx-ile-modelleri-%C3%B6zg%C3%BCrle%C5%9Ftirmek-c7b2299422cd',
      en: 'https://medium.com/@akgunyucel/the-universal-language-of-ai-liberating-models-with-onnx-80448950c355',
    },
  },
  {
    title: {
      tr: 'ChatGPT Bir Bedene Kavuşursa: VLMs Dünyası',
      en: 'If ChatGPT Had a Body: The World of VLMs',
    },
    meta: { tr: 'Medium • 11 Şubat 2026', en: 'Medium • Feb 11, 2026' },
    desc: {
      tr: "VLM'ler tam olarak nedir, bilgisayarlı görüyle dil modellerini birleştirmek neye yarar ve robotlar bu sayede çevreyi neden gerçekten anlayabilir hale geliyor — onu anlattım.",
      en: "What VLMs really are, why combining vision with language matters, and how this is what finally lets robots actually understand what they see.",
    },
    link: {
      tr: 'https://medium.com/@akgunyucel/chatgpt-bir-bedene-kavu%C5%9Fursa-vlms-d%C3%BCnyas%C4%B1-a569f77bba72',
      en: 'https://medium.com/@akgunyucel/if-chatgpt-had-a-body-the-world-of-vlms-71d3a0ee4927',
    },
  },
  {
    title: {
      tr: 'Model Çökmesi ve Halüsinasyon: Yapay Zekânın Sessiz Sonu',
      en: 'Model Collapse & Hallucination: The Silent End of AI',
    },
    meta: { tr: 'Medium • 14 Aralık 2025', en: 'Medium • Dec 14, 2025' },
    desc: {
      tr: "Modeller sürekli birbirlerinin ürettiği sentetik veriyle beslendiğinde ne oluyor ve halüsinasyon ile model çöküşü neden tamamen farklı problemler — kısa bir yazı.",
      en: "What happens when models keep being trained on each other's synthetic outputs, and why hallucination and model collapse aren't really the same problem.",
    },
    link: {
      tr: 'https://medium.com/@akgunyucel/model-%C3%A7%C3%B6kmesi-ve-hal%C3%BCsinasyon-yapay-zek%C3%A2n%C4%B1n-sessiz-sonu-ad0b85cca177',
      en: 'https://medium.com/@akgunyucel/model-collapse-and-hallucination-the-silent-end-of-ai-0659c3f358f9',
    },
  },
  {
    title: {
      tr: 'Donanım Savaşları: CPU, GPU ve TPU Arasındaki Kritik Farklar',
      en: 'Hardware Wars: CPU vs GPU vs TPU',
    },
    meta: { tr: 'Medium • 10 Aralık 2025', en: 'Medium • Dec 10, 2025' },
    desc: {
      tr: 'CPU, GPU ve TPU aslında ne yapar ve hangisi nerede işe yarar — derli toplu bir karşılaştırma.',
      en: 'What CPUs, GPUs and TPUs actually do, and which one is the right tool for which kind of job.',
    },
    link: {
      tr: 'https://medium.com/@akgunyucel/donan%C4%B1m-sava%C5%9Flar%C4%B1-cpu-gpu-ve-tpu-aras%C4%B1ndaki-kritik-farklar-f70cd6001246',
      en: 'https://medium.com/@akgunyucel/hardware-wars-critical-differences-between-cpu-gpu-and-tpu-13437d9cb019',
    },
  },
  {
    title: {
      tr: 'Kaggle vs Google Colab: Yapay Zekâ Eğitimi',
      en: 'Kaggle vs Google Colab: AI Training',
    },
    meta: { tr: 'Medium • 11 Kasım 2025', en: 'Medium • Nov 11, 2025' },
    desc: {
      tr: "Model eğitimi açısından Kaggle ile Google Colab'i yan yana koyduğum bir yazı: GPU, veri seti akışı, kullanım rahatlığı.",
      en: 'Kaggle vs Google Colab for training models — GPU access, dataset flow and how comfortable each one feels in practice.',
    },
    link: 'https://medium.com/@akgunyucel/kaggle-vs-google-colab-yapay-zeka-e%C4%9Fitimi-13b73d843526',
    onlyLang: 'tr',
  },
  {
    title: {
      tr: 'Fine-Tuning LLM vs. RAG',
      en: 'Fine-Tuning LLM vs. RAG',
    },
    meta: { tr: 'Medium • 10 Kasım 2025', en: 'Medium • Nov 10, 2025' },
    desc: {
      tr: "Ne zaman bir LLM'i fine-tune etmek mantıklı, ne zaman RAG yetiyor — meseleyi pratik tarafından ele aldım.",
      en: "When fine-tuning an LLM is the right move and when RAG is enough — looked at from a practical angle.",
    },
    link: 'https://medium.com/@akgunyucel/fine-tuning-llm-vs-rag-91d3ed99204b',
    onlyLang: 'tr',
  },
  {
    title: {
      tr: 'SMD Mobil Robotlarını Groq Cloud ile Kontrol Etmek',
      en: 'Controlling SMD Mobile Robots with Groq Cloud',
    },
    meta: { tr: 'Acrome • 9 Nisan 2025', en: 'Acrome • Apr 9, 2025' },
    desc: {
      tr: 'SMD mobil robotlarını Groq Cloud üzerinden gelen LLM cevaplarıyla nasıl kontrol ettiğimizi anlatan bir yazı.',
      en: 'A walkthrough of how we controlled SMD mobile robots using LLM responses served over Groq Cloud.',
    },
    link: 'https://acrome.net/post/controlling-smd-mobile-robots-with-groq',
    onlyLang: 'en',
  },
  {
    title: {
      tr: 'Delta Robot ve Konveyör Örneği',
      en: 'Delta Robot and Conveyor Example',
    },
    meta: { tr: 'Acrome • 15 Kasım 2024', en: 'Acrome • Nov 15, 2024' },
    desc: {
      tr: 'Delta robotu ve konveyörle küçük bir otomasyon örneği. Endüstriyel otomasyonun temel yapı taşlarına giriş niteliğinde bir yazı.',
      en: "A small automation example pairing a delta robot with a conveyor — basically an intro to how industrial automation is wired up.",
    },
    link: 'https://acrome.net/post/delta-robot-and-conveyor-example-a-glimpse-into-industrial-automation',
    onlyLang: 'en',
  },
];

/* -------------------- ACHIEVEMENTS -------------------- */
const achievements = [
  {
    icon: '🏆',
    title: { tr: 'VakıfBank Hack to the Future 2024', en: 'VakıfBank Hack to the Future 2024' },
    role: { tr: 'Finalist Takım Üyesi', en: 'Finalist Team Member' },
    meta: { tr: 'Aralık 2024 • 225 takım arasından ilk 14', en: 'December 2024 • Top 14 of 225 teams' },
    desc: {
      tr: "VakıfBank'ın ulusal hackathonunda finale kalan takımlardan birindeydim. Yarışmada dijital bankacılık deneyimi, yenilikçi ürün ve servisler, sosyal sorumluluk ve yeni nesil müşteri iletişimi temaları üzerine bir çözüm geliştirdik.",
      en: "Our team made it into the finals at VakıfBank's national hackathon. We built a solution around digital banking experience, innovative products & services, social responsibility and next-generation customer communication.",
    },
  },
];

/* -------------------- HELPERS -------------------- */
const pick = (value, lang) => {
  if (value && typeof value === 'object' && 'tr' in value && 'en' in value) {
    return value[lang];
  }
  return value;
};

const Card = ({ item, lang, ctaLabel, badges }) => {
  const onMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);

  const showLangBadge =
    item.onlyLang && badges && item.onlyLang !== lang;
  const langBadgeText =
    item.onlyLang === 'tr' ? badges?.onlyTR : badges?.onlyEN;

  return (
    <div className="work-card" onMouseMove={onMouseMove}>
      {showLangBadge && (
        <span
          className="lang-badge"
          title={langBadgeText}
          aria-label={langBadgeText}
        >
          {item.onlyLang === 'tr' ? 'TR' : 'EN'}
        </span>
      )}
      <div className="work-meta">{pick(item.meta, lang)}</div>
      <div className="work-title">{pick(item.title, lang)}</div>
      <div className="work-desc">{pick(item.desc, lang)}</div>
      <a href={pick(item.link, lang)} target="_blank" rel="noopener noreferrer" className="work-btn">
        {ctaLabel} <IconArrow />
      </a>
    </div>
  );
};

const AchievementCard = ({ item, lang }) => {
  const onMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);

  return (
    <article className="achievement-card" onMouseMove={onMouseMove}>
      <div className="achievement-icon" aria-hidden="true">{item.icon}</div>
      <div className="achievement-body">
        <div className="achievement-role">{pick(item.role, lang)}</div>
        <h3 className="achievement-title">{pick(item.title, lang)}</h3>
        <div className="achievement-meta">{pick(item.meta, lang)}</div>
        <p className="achievement-desc">{pick(item.desc, lang)}</p>
      </div>
    </article>
  );
};

/* -------------------- HOME -------------------- */
const Home = () => {
  const { language, t } = useLanguage();
  const [state, handleSubmit] = useForm('mqaqgqwn');

  return (
    <div className="home-container">
      <FloatingClouds />

      {/* HERO */}
      <section className="hero-section" id="home">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-eyebrow">
              <span className="dot" />
              {t.hero.eyebrow}
            </span>
            <span className="hero-greeting">{t.hero.greeting}</span>
            <h1 className="hero-title">
              <span className="accent">Yücel Aytaç</span> Akgün
            </h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>

            <div className="hero-buttons">
              <a href="#projects" className="hero-btn primary">
                {t.hero.exploreProjects} <IconArrow />
              </a>
              <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" className="hero-btn outline">
                <IconMedium /> {t.hero.readOnMedium}
              </a>
            </div>

            <div className="hero-socials">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><IconGitHub /></a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
              <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" aria-label="Medium"><IconMedium /></a>
              <a href={EMAIL} aria-label="Email"><IconMail /></a>
            </div>
          </div>

          <div className="hero-art">
            <AvatarPortrait alt="Yücel Aytaç Akgün — anime portrait" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <h2 className="section-title">{t.sections.about}</h2>
        <div className="about-card">
          <p className="about-bio">{t.about.bio}</p>
          <div className="skills-bars">
            {skills.map((s, i) => (
              <div className="skill-bar" key={i}>
                <span>
                  <em style={{ fontStyle: 'normal' }}>{pick(s.name, language)}</em>
                  <em style={{ fontStyle: 'normal', color: 'var(--text-muted)' }}>{s.level}%</em>
                </span>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="section achievements-section">
        <h2 className="section-title">{t.sections.achievements}</h2>
        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <AchievementCard key={i} item={a} lang={language} />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section works-section">
        <h2 className="section-title">{t.sections.projects}</h2>
        <div className="works-grid">
          {projects.map((p, i) => (
            <Card key={i} item={p} lang={language} ctaLabel={t.cta.viewCode} />
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="section works-section">
        <h2 className="section-title">{t.sections.blog}</h2>
        <div className="works-grid">
          {blogs.map((b, i) => (
            <Card
              key={i}
              item={b}
              lang={language}
              ctaLabel={t.cta.readMore}
              badges={t.badges}
            />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <h2 className="section-title">{t.sections.contact}</h2>
        {state.succeeded ? (
          <div className="success-message">
            <p>{t.contact.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form minimal-form">
            <input type="text" name="name" placeholder={t.contact.name} required />
            <input type="email" name="email" placeholder={t.contact.email} required />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
            <textarea name="message" placeholder={t.contact.message} required />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
            <button
              type="submit"
              className="hero-btn primary"
              style={{ alignSelf: 'center' }}
              disabled={state.submitting}
            >
              {state.submitting ? t.contact.sending : t.contact.send} <IconArrow />
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-socials">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><IconGitHub /></a>
            <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" aria-label="Medium"><IconMedium /></a>
            <a href={EMAIL} aria-label="Email"><IconMail /></a>
          </div>
          <div className="footer-copy">
            {t.footer.replace('{year}', new Date().getFullYear())}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
