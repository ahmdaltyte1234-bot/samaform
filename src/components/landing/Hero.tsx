import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50 -z-10" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isRTL ? 'lg:order-2 text-right' : 'lg:order-1'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full animate-fade-in">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className={`text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered Design'}
              </span>
            </div>

            {/* Title */}
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-slide-up ${isRTL ? 'font-arabic' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              {t('hero.title')}
            </h1>

            {/* Subtitle */}
            <p 
              className={`text-lg md:text-xl text-muted-foreground max-w-xl animate-slide-up ${isRTL ? 'font-arabic' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-wrap gap-4 animate-slide-up ${isRTL ? 'justify-end' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              <Link to="/register">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 text-base px-8">
                  {t('hero.cta')}
                  <ArrowIcon className="w-5 h-5" />
                </Button>
              </Link>
              <a href="#services">
                <Button size="lg" variant="outline" className="text-base px-8">
                  {t('hero.learnMore')}
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div 
              className={`flex gap-8 pt-8 animate-fade-in ${isRTL ? 'justify-end' : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              {[
                { value: '500+', label: isRTL ? 'مشروع مكتمل' : 'Projects Completed' },
                { value: '98%', label: isRTL ? 'رضا العملاء' : 'Client Satisfaction' },
                { value: '15+', label: isRTL ? 'سنة خبرة' : 'Years Experience' },
              ].map((stat, index) => (
                <div key={index} className={`${isRTL ? 'text-right' : ''}`}>
                  <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                  <div className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
              {/* Main Image */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=1000&fit=crop"
                  alt="Modern interior design"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className={`absolute -bottom-6 ${isRTL ? '-right-6' : '-left-6'} bg-card p-4 rounded-xl shadow-xl border border-border animate-fade-in`} style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className={`font-semibold text-foreground ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {isRTL ? 'تصميم ذكي' : 'Smart Design'}
                    </div>
                    <div className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {isRTL ? 'استشارات مخصصة' : 'Personalized Consultation'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
