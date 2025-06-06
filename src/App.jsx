import { useState } from 'react';
import './App.css';
import HomeScrollAnimation from './components/HomeScrollAnimation';
import BlogSection from './components/BlogSection';
import SideScrollServices from './components/SideScrollServices';
import AnimatedText from './components/AnimatedText';
import MenuCube from './components/MenuCube';
import LoaderComponent from './components/LoaderComponent';
import MagicClothesChange from './components/MagicClothesChange';
import Footer from './components/Footer';
import Banner from './components/Banner';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <MenuCube />
      {loading && <LoaderComponent onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          <MagicClothesChange />
          <Banner />
          <SideScrollServices />
          <AnimatedText />
          <BlogSection />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
