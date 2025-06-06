import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import MagicClothesChange from './MagicClothesChange';

function Video() {
    gsap.registerPlugin(ScrollTrigger);

    const videoRef = useRef(null)
    const textRef = useRef(null)
    const triggerRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline(
            {
                scrollTrigger: {
                    trigger: triggerRef.current,
                    scrub: 2,
                    start: "bottom bottom",
                    end: "+=1000vh",
                    pin: true,
                    pinSpacing: true,
                },
            }
        );
        tl.to(
            videoRef.current,
            {
                translateY: "-100vh",
                // filter: "grayscale(80%)",
                ease: "none",
            }
        );
        ScrollTrigger.refresh();
    
    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
    }, [])

    return (
        <div className=" min-h-screen">
            <div 
                ref={triggerRef} 
                className="overflow-hidden relative flex flex-col w-full h-screen"
            >   
                <div ref={videoRef} className="flex flex-col">
                    <video 
                        ref={videoRef} 
                        src="/intro-video.mp4" 
                        loop 
                        autoPlay 
                        muted
                        className="w-full h-full object-cover"
                        ></video>

                    <div  className='min-h-screen w-full bg-blue-200'/>
                </div>
                
                <div className="h-full absolute top-0 left-0 right-0 bg-black select-none mix-blend-multiply flex items-center justify-center">
                    <h1 
                        ref={textRef} 
                        className="text-white leading-none tracking-[-2vw]"
                        style={{ fontSize: '28vw' }}
                    >
                        ZENOVA
                    </h1>
                    
                </div>
            </div>
        </div>
    )
}

export default Video