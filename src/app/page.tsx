import Head from 'next/head';
import Header from '../app/components/Header';
import Hero from '../app/components/Hero';
import Features from '../app/components/Features';
import Download from '../app/components/Download';
import About from '../app/components/About';
import Footer from '../app/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>SafeSchool - Your Safety, Our Mission</title>
        <meta name="description" content="SafeSchool is a mobile app for emergency alerts and safety in Nigeria." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />
      <Features />
      <Download />
      <About />
      <Footer />
    </>
  );
}
