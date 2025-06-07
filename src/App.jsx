import { useState } from 'react';
import './App.css';
import BlogSection from './components/BlogSection';
import SideScrollServices from './components/SideScrollServices';
import AnimatedText from './components/AnimatedText';
import MenuCube from './components/MenuCube';
import LoaderComponent from './components/LoaderComponent';
import MagicClothesChange from './components/MagicClothesChange';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import Work from './components/Work';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <MenuCube />
      {loading && <LoaderComponent onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          <HeroBanner />
          {/* <MagicClothesChange /> */}
          <SideScrollServices />
          <AnimatedText />
          <Work />
          <BlogSection />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
