import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xl">S</span>
            </div>
            <span className={`font-semibold text-lg ${isRTL ? 'font-arabic' : ''}`}>
              Sama Form
            </span>
          </div>

          {/* Links */}
          <div className={`flex items-center gap-6 text-sm text-primary-foreground/70 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
            <Link to="#" className="hover:text-primary-foreground transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="#" className="hover:text-primary-foreground transition-colors">
              {t('footer.terms')}
            </Link>
          </div>

          {/* Copyright */}
          <p className={`text-sm text-primary-foreground/70 ${isRTL ? 'font-arabic' : ''}`}>
            © {currentYear} Sama Form. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
