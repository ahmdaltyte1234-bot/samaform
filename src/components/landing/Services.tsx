import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Castle, ShoppingBag, UtensilsCrossed, Building2, Sparkles } from 'lucide-react';

const services = [
  { 
    icon: Home, 
    titleKey: 'services.apartment.title', 
    descKey: 'services.apartment.desc',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'
  },
  { 
    icon: Castle, 
    titleKey: 'services.villa.title', 
    descKey: 'services.villa.desc',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'
  },
  { 
    icon: ShoppingBag, 
    titleKey: 'services.shop.title', 
    descKey: 'services.shop.desc',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
  },
  { 
    icon: UtensilsCrossed, 
    titleKey: 'services.restaurant.title', 
    descKey: 'services.restaurant.desc',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
  },
  { 
    icon: Building2, 
    titleKey: 'services.office.title', 
    descKey: 'services.office.desc',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
  },
  { 
    icon: Sparkles, 
    titleKey: 'services.salon.title', 
    descKey: 'services.salon.desc',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop'
  },
];

const Services = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isRTL ? 'font-arabic' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.titleKey}
                className="group bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={t(service.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className={`p-6 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className={`text-lg font-semibold text-foreground ${isRTL ? 'font-arabic' : ''}`}>
                      {t(service.titleKey)}
                    </h3>
                  </div>
                  <p className={`text-muted-foreground text-sm ${isRTL ? 'font-arabic' : ''}`}>
                    {t(service.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
