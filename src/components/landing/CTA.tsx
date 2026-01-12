import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-gradient-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center ${isRTL ? 'font-arabic' : ''}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            {t('cta.subtitle')}
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 text-lg px-10 py-6"
            >
              {t('cta.button')}
              <ArrowIcon className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
