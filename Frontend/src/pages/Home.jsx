import Features from '../components/Features/Features';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';

function Home() {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default Home;