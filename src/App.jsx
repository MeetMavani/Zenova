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

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <MenuCube />
      {loading && <LoaderComponent onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          <MagicClothesChange />
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
