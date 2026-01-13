import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.startProject': 'Start Your Project',

    // Hero
    'hero.title': 'Your Smart Interior Design Assistant',
    'hero.subtitle': 'Transform your space with AI-powered design consultation. We bring your vision to life with expert guidance and personalized solutions.',
    'hero.cta': 'Start Your Project Now',
    'hero.learnMore': 'Learn More',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive interior design solutions for every space',
    'services.apartment.title': 'Apartment Design',
    'services.apartment.desc': 'Modern living spaces tailored to your lifestyle',
    'services.villa.title': 'Villa & Palace Design',
    'services.villa.desc': 'Luxurious designs for prestigious residences',
    'services.shop.title': 'Shop & Store Design',
    'services.shop.desc': 'Retail spaces that drive customer engagement',
    'services.restaurant.title': 'Restaurant & Cafe Design',
    'services.restaurant.desc': 'Atmospheric dining experiences',
    'services.office.title': 'Office & Company Design',
    'services.office.desc': 'Productive workspaces that inspire',
    'services.salon.title': 'Beauty Salon Design',
    'services.salon.desc': 'Elegant spaces for beauty and wellness',

    // Portfolio
    'portfolio.title': 'Our Portfolio',
    'portfolio.subtitle': 'Explore our latest interior design projects',

    // CTA
    'cta.title': 'Ready to Transform Your Space?',
    'cta.subtitle': 'Get started with a personalized consultation today',
    'cta.button': 'Start Your Project Now',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    // Form
    'form.fullName': 'Full Name',
    'form.fullNamePlaceholder': 'Enter your full name',
    'form.email': 'Email',
    'form.emailPlaceholder': 'Enter your email',
    'form.phone': 'Phone Number',
    'form.phonePlaceholder': 'Enter your phone number',
    'form.city': 'City',
    'form.cityPlaceholder': 'Enter your city',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'خدماتنا',
    'nav.portfolio': 'أعمالنا',
    'nav.contact': 'تواصل معنا',
    'nav.startProject': 'ابدأ مشروعك',

    // Hero
    'hero.title': 'مساعدك الذكي للتصميم الداخلي',
    'hero.subtitle': 'حوّل مساحتك مع استشارات التصميم المدعومة بالذكاء الاصطناعي. نحقق رؤيتك بإرشاد خبير وحلول مخصصة.',
    'hero.cta': 'ابدأ مشروعك الآن',
    'hero.learnMore': 'اعرف المزيد',

    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'حلول تصميم داخلي شاملة لكل مساحة',
    'services.apartment.title': 'تصميم الشقق',
    'services.apartment.desc': 'مساحات معيشة عصرية مصممة لنمط حياتك',
    'services.villa.title': 'تصميم الفلل والقصور',
    'services.villa.desc': 'تصاميم فاخرة للمساكن الراقية',
    'services.shop.title': 'تصميم المحلات والمتاجر',
    'services.shop.desc': 'مساحات تجارية تجذب العملاء',
    'services.restaurant.title': 'تصميم المطاعم والكافيهات',
    'services.restaurant.desc': 'تجارب طعام بأجواء مميزة',
    'services.office.title': 'تصميم المكاتب والشركات',
    'services.office.desc': 'مساحات عمل منتجة وملهمة',
    'services.salon.title': 'تصميم صالونات التجميل',
    'services.salon.desc': 'مساحات أنيقة للجمال والعافية',

    // Portfolio
    'portfolio.title': 'أعمالنا',
    'portfolio.subtitle': 'استكشف أحدث مشاريع التصميم الداخلي',

    // CTA
    'cta.title': 'جاهز لتحويل مساحتك؟',
    'cta.subtitle': 'ابدأ باستشارة مخصصة اليوم',
    'cta.button': 'ابدأ مشروعك الآن',

    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
