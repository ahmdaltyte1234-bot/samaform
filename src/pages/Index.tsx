import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import Portfolio from '@/components/landing/Portfolio';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
