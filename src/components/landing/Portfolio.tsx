import { useLanguage } from '@/contexts/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const portfolioItems = [
  {
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
    title: { en: 'Modern Living Room', ar: 'غرفة معيشة عصرية' },
    category: { en: 'Apartment Design', ar: 'تصميم شقة' },
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    title: { en: 'Luxury Villa Interior', ar: 'ديكور فيلا فاخرة' },
    category: { en: 'Villa Design', ar: 'تصميم فيلا' },
  },
  {
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    title: { en: 'Contemporary Restaurant', ar: 'مطعم معاصر' },
    category: { en: 'Restaurant Design', ar: 'تصميم مطعم' },
  },
  {
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
    title: { en: 'Executive Office Space', ar: 'مكتب تنفيذي' },
    category: { en: 'Office Design', ar: 'تصميم مكتب' },
  },
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop',
    title: { en: 'Boutique Store', ar: 'متجر بوتيك' },
    category: { en: 'Retail Design', ar: 'تصميم تجاري' },
  },
  {
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
    title: { en: 'Luxury Beauty Salon', ar: 'صالون تجميل فاخر' },
    category: { en: 'Salon Design', ar: 'تصميم صالون' },
  },
];

const Portfolio = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isRTL ? 'font-arabic' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('portfolio.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {portfolioItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group relative overflow-hidden rounded-xl aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className={`absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${isRTL ? 'text-right' : ''}`}>
                    <span className={`text-accent text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>
                      {item.category[language]}
                    </span>
                    <h3 className={`text-primary-foreground text-lg font-semibold mt-1 ${isRTL ? 'font-arabic' : ''}`}>
                      {item.title[language]}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={`hidden md:flex ${isRTL ? '-right-12' : '-left-12'}`} />
          <CarouselNext className={`hidden md:flex ${isRTL ? '-left-12' : '-right-12'}`} />
        </Carousel>
      </div>
    </section>
  );
};

export default Portfolio;
