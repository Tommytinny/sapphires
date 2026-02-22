import React, { useState, useEffect, useRef } from 'react';
import yeeImg from '../../assets/yeepage.jpg'
import wiziImg from '../../assets/wizipage.jpg'
import wilsonImg from '../../assets/wilsonpage.jpg'
import qubyImg from '../../assets/qubypage.jpg'
import noveltyImg from '../../assets/noveltypage.jpg'
import neurosamaImg from '../../assets/neurosamapage.jpg'
import molangImg from '../../assets/molangpage.jpg'
import dotImg from '../../assets/dotpage.jpg'
import conqueredImg from '../../assets/conqueredpage.jpg'
import born19Img from '../../assets/born19page.jpg'

// Add CSS keyframes for animations
const animationStyles = `
  @keyframes slideDown {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes roll {
    0%, 100% {
      transform: translateY(-25%);
    }
    50% {
      transform: none;
    }
  }

  @keyframes slideFromLeft {
    from {
      transform: translateX(-60px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideFromDown {
    from {
      transform: translateY(40px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);

interface StatItem {
  value: string;
  label: string;
  numericValue: number; // e.g., 50000 for '50K+'
}

const stats: StatItem[] = [
  {
    value: '50K+',
    label: 'Likes Delivered',
    numericValue: 50000,
  },
  {
    value: '25K+',
    label: 'Retweets',
    numericValue: 25000,
  },
  {
    value: '10K+',
    label: 'Comments',
    numericValue: 10000,
  },
  {
    value: '200+',
    label: 'Trends Created',
    numericValue: 200,
  },
];

// Counter Component
const Counter: React.FC<{ target: number; suffix: string; isInView: boolean }> = ({ target, suffix, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, isInView]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return <span>{formatNumber(count)}{suffix}</span>;
};


export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
  
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
  
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, []);

  const memes1 = [
    {
      name: "yee",
      logo: yeeImg
    },
    {
      name: "wizi",
      logo: wiziImg
    },
    {
      name: "wilson",
      logo: wilsonImg
    },
    {
      name: "quby",
      logo: qubyImg
    }, 
  ];

  const memes2 = [
    {
      name: "novelty",
      logo: noveltyImg
    },
    {
      name: "neurosama",
      logo: neurosamaImg
    },
    {
      name: "born19",
      logo: born19Img
    },
  ];

  const memes3 = [
    {
      name: "molang",
      logo: molangImg
    },
    {
      name: "dot",
      logo: dotImg
    },
    {
      name: "conquered",
      logo: conqueredImg
    },
    {
      name: "born19",
      logo: born19Img
    },
  ]
  return (
    <section className="md:py-16 md:pb-2 px-4 md:px-8 bg-gradient-to-br from-white via-blue-50 to-slate-100" ref={containerRef}>
       
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 pt-0 md:pt-20 pl-0 lg:pl-10">
          <h1 className="text-4xl text-gray-600 md:text-5xl text-center md:text-left font-bold font-unbounded leading-tight" style={{
            animation: 'slideFromLeft 0.8s ease-out'
          }}>
            Sapphires Help Your Projects Dominate Twitter & Trend Faster
          </h1>
          <p className="text-gray-500 text-center md:text-left text-lg leading-relaxed font-unbounded" style={{
            animation: 'slideFromDown 0.8s ease-out 0.2s both'
          }}>
            Top-notch, trusted, fully verified X raiders to promote and boost your crypto coin launches. Real engagement. Real results. Real growth.
          </p>
          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <a href="#booking" className="px-6 py-2 bg-[#117cb4] text-[#c5e0fa] font-unbounded rounded-full text-sm font-semibold transition-opacity shadow-md hover:shadow-lg transform hover:scale-105" style={{
              animation: 'fadeIn 0.8s ease-out 0.4s both'
            }}>
                Book Raid Session
            </a>
            
          </div>
        </div>

        {/* Memes image component */}
        <div className='w-full flex justify-center order-first md:order-none'>
          <div className="relative grid max-w-96 max-auto grid-cols-3 gap-3 md:gap-4 overflow-hidden h-[400px] w-full">
          
            <div className="absolute pointer-events-none top-0 z-20 h-52 w-full bg-gradient-to-b from-blue-50 to-transparent to-40%"></div>
            <div className="space-y-4" style={{
              animation: 'slideDown 15.s ease-out'
            }}>
              {memes1.map((meme, index) => (
                <img
                key={index}
                src={meme.logo}
                alt={meme.name} 
                className="relative object-cover rounded-xl h-28 md:h-28"
              />
              ))}
              
              {/*<div className="bg-gradient-to-br from-green-200 to-gray-100 rounded-xl h-28 md:h-28"></div>
              <div className="bg-gradient-to-br from-pink-200 to-pink-100 rounded-xl h-28 md:h-28"></div>
              <div className="bg-gradient-to-br from-yellow-300 to-yellow-200 rounded-xl h-28 md:h-28"></div>
              <div className="bg-gradient-to-br from-orange-200 to-orange-100 rounded-xl h-28 md:h-28"></div>*/}
            </div>
            
            <div className="space-y-4" style={{
              animation: 'roll 4s cubic-bezier(0.1,0,1,1)'
            }}>
              {memes2.map((meme, index) => (
                <img
                key={index}
                src={meme.logo}
                alt={meme.name}
                className="relative object-cover rounded-xl h-32 md:h-32"
              />
              ))}
              {/*<div className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200 rounded-xl h-28 md:h-28 col-span-1 md:col-span-1"></div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-400 rounded-xl h-28 md:h-40"></div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl h-28 md:h-28"></div>*/}
            </div>

            <div className='space-y-4' style={{
              animation: 'slideUp 0.8s ease-out'
            }}>
              {memes3.map((meme, index) => (
                <img
                key={index}
                src={meme.logo}
                alt={meme.name}
                className="relative object-cover rounded-xl h-28 md:h-28"
              />
              ))}
              {/*<div className="bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl h-28 md:h-28"></div>
              <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-xl h-28 md:h-28"></div>
              <div className="bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl h-28 md:h-28"></div>
              <div className="bg-gradient-to-br from-cyan-300 via-green-400 to-pink-400 rounded-xl h-28 md:h-28"></div>*/}
            </div>

            <div className="absolute pointer-events-none bottom-0 z-20 h-52 w-full bg-gradient-to-b from-transparent to-blue-50 from-60%"></div>
            
          </div>
        </div>

      </div>
      
      <div className="w-full  md:px-10 lg:px-32 sm:px-0">
        {/*<div className='relative h-32 border border-gray-200 w-full'>
          <div className='absolute top-1/2 w-full h-[2px] bg-black -rotate-6'></div>
        </div>*/}
            <div className="pt-4 pb-6  sm:pb-8 md:pb-2 lg:pb-2">
              <div className="w-full">
                <div className="grid items-center px-0 md:px-10 lg:px-20 justify-center gap-4 md:gap-6 lg:gap-4 xl:gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
                  {stats.map((stat, index) => (
                    <article
                      key={index}
                      className={`flex flex-col ${index == 0 ? '' : 'border-t-2 border-white/20 sm:border-t-0  md:border-l-2 md:border-white/20'} items-center justify-center text-center p-4 transition-transform duration-500 hover:scale-110`}
                    >
                      <span className="mb-3">
                        <p className="text-[40px] sm:text-[40px] font-semibold font-unbounded text-[#117cb4] bg-gradient-to-br from-[#117cb4] to-zinc-500 bg-clip-text text-transparent">
                          {isInView ? (
                            <Counter target={stat.numericValue} suffix="+" isInView={isInView} />
                          ) : (
                            '0+'
                          )}
                        </p>
                      </span>
                      <div className="flex flex-col items-center justify-center gap-1">
                        <h2 className=" text-xs font-unbounded font-medium uppercase whitespace-nowrap text-zinc-600">
                          {stat.label}
                        </h2>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </section>
  );
}