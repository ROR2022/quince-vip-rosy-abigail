// 📅 DateSection - Sección de fecha y countdown

import React, {useState, useEffect} from 'react'
import CountdownTimer from '../countdown-timer'
import { weddingData } from '../../data/weddingData'
//import { getOverlayStyle } from '@/utils/overlay'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getAnimationConfig } from '@/data/animationConfig'
import Image from 'next/image'

export default function DateSection() {
  const { wedding, messages } = weddingData
  //const { dateSection } = styling
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
      const [isVisible, setIsVisible] = useState(false);
      
    
      const basicClass="text-8xl font-bold text-amber-500 mb-2";
      const completeClass="text-8xl font-bold text-amber-500 mb-2 scale-up-center";
    
      useEffect(() => {
        const handleScroll = () => {
          //console.log('Scroll position:', window.scrollY);
          setScrollPosition(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      useEffect(() => {
        if(scrollPosition >= 1200 && scrollPosition < 2000) {
          setIsVisible(true);
        }
      },[scrollPosition])
    

  // Configurar animación de scroll con fallback de carga inmediata
  const animationConfig = getAnimationConfig('date')
  const { ref: sectionRef } = useScrollAnimation(
    animationConfig.options,
    'fadeIn', // Animación más suave
    animationConfig.delay,
    true // Carga inmediata como fallback
  )

  return (
    <section 
      ref={sectionRef}
      style={{
         backgroundImage: `url('/images/fondoRosySimple.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', 
        position: 'relative',
        //...animationStyle
      }} 
    id="date" className="py-20">

    {/* Overlay configurable */}
       {/* <div 
        style={getOverlayStyle(dateSection)}
        className="absolute inset-0 z-0"
      ></div>  
      style={{
                backgroundColor: "#C8BFE780",
              }}
      */}

      <div 
        style={{
          // Remover animación CSS duplicada, usar solo scroll animation
          willChange: 'transform, opacity', // Optimización para móviles
          //backgroundColor: "#C8BFE795",
        }}
        className="container text-white rounded-b-2xl mx-auto px-4  p-6 rounded-2xl"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-lg text-muted-foreground italic">
            {messages.dateMessage}
          </p>

          <h2 
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
          className="font-main-text text-4xl text-white font-bold">FECHA ESPECIAL</h2>

          <div className="bg-primary/20 rounded-3xl p-12 max-w-md mx-auto">
            <div className="text-2xl font-medium text-foreground mb-2">
              {wedding.dayName}
            </div>
            <div 
            
            className='flex justify-center gap-3'>
              <div
              style={{display:'none'}}
              >
                <Image
                  src="/images/decoration1a.png"
                  alt="Fecha"
                  width={100}
                  height={100}
                />
              </div>
            <div className={isVisible ? completeClass : basicClass}>
              {wedding.day}
            </div>
            <div
            style={{display:'none'}}
            >
              <Image
                src="/images/decoration1b.png"
                alt="Fecha"
                width={100}
                height={100}
              />
            </div>
            </div>
            <div className="text-2xl font-medium text-foreground mb-2">
              {wedding.month}
            </div>
            <div className="text-3xl font-medium text-foreground">
              {wedding.year}
            </div>
          </div>

          <h3 className="font-script text-3xl text-secondary">
            {messages.countdownTitle}
          </h3>

          <CountdownTimer />
        </div>
      </div>
    </section>
  )
}
