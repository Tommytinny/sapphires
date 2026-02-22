import React from 'react';
import verifiedIcon from '../../assets/verified.svg';

const FeaturesHighlight = () => {

  const featuresCard = [
      {
        heading: 'Verified X raiders',
        subheading: 'Over 50+ all verified X raiders available for engagement',
        label: 'verified',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8" style={{ color: '#117cb4' }}>
            <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        heading: 'Real Engagements',
        subheading: 'Likes, retweets & comments',
        label: 'engagement',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8" style={{ color: '#117cb4' }}>
            <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.646 7.23a2 2 0 01-1.789 1.106H2a2 2 0 01-2-2V8a2 2 0 012-2h2.4a2 2 0 011.38.52l2.05 1.73a1 1 0 00.6.2H12a2 2 0 012 2v2z" />
          </svg>
        )
      },
      {
        heading: 'Real accounts',
        subheading: 'We engage tweets with real accounts and not bots',
        label: 'accounts',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8" style={{ color: '#117cb4' }}>
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
        )
      }
    ];

  return (
    <section id="features" className="w-full flex justify-center px-5 py-16 md:py-20 bg-gradient-to-br from-white via-blue-50 to-slate-100">
      <div className="max-w-6xl w-full">
       
        {/* Main container */}
        <div className="flex flex-col items-center justify-center gap-10 w-full mt-6">
          {/* Cards wrapper */}
          <div className="flex flex-col lg:flex-col items-center justify-center gap-15 w-full">
            {/* Main large card */}
            <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-auto">
              {/*<div className="w-32 h-32 relative overflow-visible drop-shadow-lg transform scale-110 -rotate-8">
                <img
                  src="https://framerusercontent.com/images/meh9J2a3OKOANNzpOvScNpXM.webp?scale-down-to=1024&width=1472&height=1279"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>*/}
              <div className="flex flex-col items-center justify-center gap-2 w-full">
                <h3 className="text-4xl lg:text-5xl font-unbounded tracking-tight text-center mb-6">
                  <span className="text-gray-600 font-bold">
                    What a <span style={{ color: '#117cb4' }}>Raid Session</span> <em>Includes</em>
                  </span>
                </h3>
              </div>
            </div>

            {/* Small cards grid */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-6 w-full lg:w-auto mt-6">
              {/* Cards using map */}
              {featuresCard.map((feature, index) => (
                <div key={index} className="flex flex-col h-[200px] w-[280px] items-center border border-gray-300 p-6 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg bg-white/50 backdrop-blur-sm justify-center gap-0" style={{ '--tw-shadow-color': '#117cb4' } as React.CSSProperties} onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#117cb4'}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = '#d1d5db'}}>
                  {/*<div className="mb-3">
                      <div className="p-3 h-16 w-16 lg:h-20 lg:w-20  flex items-center justify-center transition-all duration-300 bg-white" onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#f0f5ff'; e.currentTarget.style.borderColor = '#0d5a8f'}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#117cb4'}}>
                        {feature.icon}
                      </div>
                    </div>*/}
                    <div className="w-full text-center">
                      <p className="text-center text-gray-700 font-unbounded text-lg font-semibold mt-2">
                        {feature.heading}
                      </p>
                      <span className="text-center text-gray-500 font-unbounded text-sm mt-2 block">
                        {feature.subheading}
                      </span>
                    </div>
                </div> 
              ))}
              {/* Card 2 
              <div className="flex flex-col h-[170px] items-center justify-start gap-0 px-4">
               <div className="w-full">
                  <div className="p-4 h-14 w-14 border rounded-full border-white/20 flex items-center justify-center hover:border-white/30 hover:bg-white/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 459.53"><path fill="#fff" fill-rule="nonzero" d="M9.38 212.26l91.05-1.2c1.9-.01 3.69.53 5.19 1.49 32.96 19.01 62.2 42.95 87.35 71.5 33.32-54.09 68.94-103.63 106.55-149.04C339.7 86.5 382.32 42.5 426.98 2.46a9.464 9.464 0 016.33-2.41L502.67 0c8.53 0 12.23 9.31 6.73 16.26-61.47 68.29-117.32 139.05-167.78 212a2075.014 2075.014 0 00-135.99 226.12c-2.4 4.65-8.14 6.49-12.79 4.09a9.476 9.476 0 01-4.35-4.63C146.26 363.35 86.92 286.45 4.14 229.6c-7.67-5.25-3.96-17.2 5.24-17.34z"/></svg>
                  </div>
                </div>
                <div className="w-[14rem]">
                  <p className="text-left text-white font-mono text-md mt-3">
                    Real Engagements
                  </p>
                  <span className="text-left text-white/70 font-mono text-md mt-3">
                    Likes, retweets & comments
                  </span>
                </div>
              </div>
              {/* Card 3 /}
              <div className="flex flex-col h-[170px] items-center justify-start gap-0 px-4">
               <div className="w-full">
                  <div className="p-4 h-14 w-14 border rounded-full border-white/20 flex items-center justify-center hover:border-white/30 hover:bg-white/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 459.53"><path fill="#fff" fill-rule="nonzero" d="M9.38 212.26l91.05-1.2c1.9-.01 3.69.53 5.19 1.49 32.96 19.01 62.2 42.95 87.35 71.5 33.32-54.09 68.94-103.63 106.55-149.04C339.7 86.5 382.32 42.5 426.98 2.46a9.464 9.464 0 016.33-2.41L502.67 0c8.53 0 12.23 9.31 6.73 16.26-61.47 68.29-117.32 139.05-167.78 212a2075.014 2075.014 0 00-135.99 226.12c-2.4 4.65-8.14 6.49-12.79 4.09a9.476 9.476 0 01-4.35-4.63C146.26 363.35 86.92 286.45 4.14 229.6c-7.67-5.25-3.96-17.2 5.24-17.34z"/></svg>
                  </div>
                </div>
                <div className="w-[14rem]">
                  <p className="text-left text-white font-mono text-md mt-3">
                    Real accounts
                  </p>
                  <span className="text-left text-white/70 font-mono text-md mt-3">
                    We engage tweets with real accounts and not bots
                  </span>
                </div>
              </div>
              {/* Card 4 /}
              <div className="flex flex-col h-[170px] items-center justify-start gap-0 px-4">
               <div className="w-full">
                  <div className="p-4 h-14 w-14 border rounded-full border-white/20 flex items-center justify-center hover:border-white/30 hover:bg-white/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 459.53"><path fill="#fff" fill-rule="nonzero" d="M9.38 212.26l91.05-1.2c1.9-.01 3.69.53 5.19 1.49 32.96 19.01 62.2 42.95 87.35 71.5 33.32-54.09 68.94-103.63 106.55-149.04C339.7 86.5 382.32 42.5 426.98 2.46a9.464 9.464 0 016.33-2.41L502.67 0c8.53 0 12.23 9.31 6.73 16.26-61.47 68.29-117.32 139.05-167.78 212a2075.014 2075.014 0 00-135.99 226.12c-2.4 4.65-8.14 6.49-12.79 4.09a9.476 9.476 0 01-4.35-4.63C146.26 363.35 86.92 286.45 4.14 229.6c-7.67-5.25-3.96-17.2 5.24-17.34z"/></svg>
                  </div>
                </div>
                <div className="w-[14rem]">
                  <p className="text-left text-white font-mono text-md mt-3">
                    Verified X raiders
                  </p>
                  <span className="text-left text-white/70 font-mono text-md mt-3">
                    Over 50+ all verified X raiders available for engagement
                  </span>
                </div>
              </div>*/}

             
            </div>
          </div>

          {/* Bottom text */}
          {/*<div className="flex flex-col items-center justify-center gap-2 w-full">
            <p className="text-center text-white font-mono text-lg">
              Your thoughts aren't our product.{' '}
              <span className="text-cyan-400">Dictate freely.</span>
            </p>
          </div>*/}
        </div>
      </div>
    </section>
  );
};

export default FeaturesHighlight;
