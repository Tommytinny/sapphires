import React from 'react';
import Clippy from '@/assets/clippy.jpeg';
import Novelty from '@/assets/novelty.jpeg';
import Rosecoin from '@/assets/rose.jpeg';
import Juan from '@/assets/juan.jpeg';
import Shrek from '@/assets/shrek.jpeg';
import Brainrot from '@/assets/brainrot.jpeg';
import Wilson from '@/assets/wilson.jpeg';
import Neurosama from '@/assets/neurosama.jpeg';
import Conquered from '@/assets/conquered.jpeg';
import Yee from '@/assets/yee.jpeg';
import Dot from '@/assets/dot.jpeg';
import Molang from '@/assets/molang.jpeg';
import Bear from '@/assets/bear.jpeg';
import Born_in_19 from '@/assets/born_in_19.jpeg';
import Burg from '@/assets/burg.jpeg';
import Cp from '@/assets/cp.jpeg';
import Craft from '@/assets/craft.jpeg';
import Exo from '@/assets/exo.jpeg';
import Fine from '@/assets/fine.jpeg';
import Hippotato from '@/assets/hippotato.jpeg';
import Quby from '@/assets/quby.jpeg';
import Wheel from '@/assets/wilson.jpeg';






const FloatingCustomers = () => {
  const clients = [
    { id: 1, name: '$Clippy', icon: Clippy },
    { id: 2, name: '$Novelty', icon: Novelty  },
    { id: 3, name: '$Rosecoin', icon: Rosecoin  },
    { id: 4, name: '$juan', icon: Juan  },
    { id: 5, name: '$Shrek', icon: Shrek },
    { id: 6, name: '$Fine', icon: Fine },
    { id: 7, name: '$Cp', icon: Cp },
    { id: 8, name: '$Brainrot', icon: Brainrot },
    { id: 9, name: '$Wilson', icon: Wilson },
    { id: 10, name: '$Neurosama', icon: Neurosama },
    { id: 11, name: '$Conquered', icon: Conquered },
    { id: 12, name: '$Yee', icon: Yee },
    { id: 13, name: '$Dot', icon: Dot },
    { id: 14, name: '$Molang', icon: Molang },
    { id: 15, name: '$Burg', icon: Burg },
    { id: 16, name: '$Bear', icon: Bear },
    { id: 17, name: '$Exo', icon: Exo },
    { id: 18, name: '$Craft', icon: Craft },
    { id: 19, name: '$Wheel', icon: Wheel },
    { id: 20, name: '$Quby', icon: Quby },
    { id: 21, name: '$Hippotato', icon: Hippotato },
    { id: 22, name: '$Bornin19', icon: Born_in_19 },
  ];
  
  const clients1 = [
    { id: 22, name: '$Bornin19', icon: Born_in_19 },
    { id: 21, name: '$Hippotato', icon: Hippotato },
    { id: 20, name: '$Quby', icon: Quby },
    { id: 19, name: '$Wheel', icon: Wheel },
    { id: 18, name: '$Craft', icon: Craft },
    { id: 17, name: '$Exo', icon: Exo },
    { id: 16, name: '$Bear', icon: Bear },
    { id: 15, name: '$Burg', icon: Burg },
    { id: 14, name: '$Molang', icon: Molang },
    { id: 13, name: '$Dot', icon: Dot },
    { id: 12, name: '$Yee', icon: Yee },
    { id: 11, name: '$Conquered', icon: Conquered },
    { id: 10, name: '$Neurosama', icon: Neurosama },
    { id: 9, name: '$Wilson', icon: Wilson },
    { id: 8, name: '$Brainrot', icon: Brainrot },
    { id: 7, name: '$Cp', icon: Cp },
    { id: 6, name: '$Fine', icon: Fine },
    { id: 5, name: '$Shrek', icon: Shrek },
    { id: 4, name: '$juan', icon: Juan  },
    { id: 3, name: '$Rosecoin', icon: Rosecoin  },
    { id: 2, name: '$Novelty', icon: Novelty  },
    { id: 1, name: '$Clippy', icon: Clippy },
  ];
  
  const getLogoSVG = (name: string) => {
    switch (name) {
      case 'Clippy':
        return (
          <svg fill="none" height="72" viewBox="0 0 176 72" width="176" xmlns="http://www.w3.org/2000/svg">
            <text x="88" y="45" textAnchor="middle" className="font-bold text-xl fill-gray-700" fillOpacity="0.64">CLIPPY</text>
          </svg>
        );
      case 'Novelty':
        return (
          <svg fill="none" height="72" viewBox="0 0 176 72" width="176" xmlns="http://www.w3.org/2000/svg">
            <text x="88" y="45" textAnchor="middle" className="font-bold text-lg fill-gray-700" fillOpacity="0.64">NOVELTY</text>
          </svg>
        );
      case 'Rosecoin':
        return (
          <svg fill="none" height="72" viewBox="0 0 176 72" width="176" xmlns="http://www.w3.org/2000/svg">
            <text x="88" y="45" textAnchor="middle" className="font-bold text-lg fill-gray-700" fillOpacity="0.64">ROSE</text>
          </svg>
        );
      case 'Juan':
        return (
          <svg fill="none" height="72" viewBox="0 0 176 72" width="176" xmlns="http://www.w3.org/2000/svg">
            <text x="88" y="45" textAnchor="middle" className="font-bold text-2xl fill-gray-700" fillOpacity="0.64">JUAN</text>
          </svg>
        );
      case 'Shrek':
        return (
          <svg fill="none" height="72" viewBox="0 0 176 72" width="176" xmlns="http://www.w3.org/2000/svg">
            <text x="88" y="45" textAnchor="middle" className="font-bold text-xl fill-gray-700" fillOpacity="0.64">SHREK</text>
          </svg>
        );
      case 'Ogwhale':
        return (
          <svg fill="none" height="72" viewBox="0 0 176 72" width="176" xmlns="http://www.w3.org/2000/svg">
            <text x="88" y="45" textAnchor="middle" className="font-bold text-lg fill-gray-700" fillOpacity="0.64">OGWHALE</text>
          </svg>
        );
      case 'Brainrot':
        return (
          <svg fill="none" height="72" viewBox="0 0 176 72" width="176" xmlns="http://www.w3.org/2000/svg">
            <text x="88" y="45" textAnchor="middle" className="font-bold text-lg fill-gray-700" fillOpacity="0.64">BRAINROT</text>
          </svg>
        );
      case 'Safemoon':
        return (
          <svg fill="none" height="72" viewBox="0 0 176 72" width="176" xmlns="http://www.w3.org/2000/svg">
            <text x="88" y="45" textAnchor="middle" className="font-bold text-lg fill-gray-700" fillOpacity="0.64">SAFEMOON</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="customers" className="py-0 bg-blue-100 relative overflow-hidden">
      {/* V-curve top border */}
      <svg className="w-full h-auto" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ marginTop: '-2px' }}>
        <path d="M 0 30 Q 600 100 1200 30 L 1200 0 L 0 0 Z" fill="rgb(239 246 255 / var(--tw-bg-opacity, 1))" />
      </svg>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="floating-customers overflow-hidden space-y-4">
          {/* Background image */}
        
          <div className="floating-customers-inner hover:paused flex gap-4 animate-scroll">
            {/* First set of clients */}
          

            {clients.map(client => (
              <div className="bg-gradient-to-br from-white to-slate-50 px-6 py-2 md:py-2 flex items-center border-2" style={{
                borderColor: '#e5e7eb'
              }} key={client.id}>
                
                <div className="flex flex-col gap-4">
                  {/* Description and Image Row */}
                  <div className="flex justify-between gap-4 items-start">
                    {/* Image */}
                    <div className="flex items-center justify-center">
                      <div className="w-[40px] h-[40px] flex-[0_0_56px] rounded-xl border-2 flex items-center justify-center overflow-hidden" style={{
                        borderColor: '#d1d5db'
                      }}>
                        <img src={client.icon} alt={client.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="">
                      <div className="">
                        <h3 className="text-sm font-bold font-unbounded text-gray-800">
                          {client.name}
                        </h3>
                        <p className="text-gray-600 font-unbounded text-xs leading-relaxed">
                        @{client.name}
                      </p>
                      </div>
                      
                    </div>

                  </div>

                </div>
              </div>
            ))}
            {/* Duplicate for continuous scroll */}
            {clients.map(client => (
              <div
                key={`duplicate-${client.id}`}
                className="floating-customers-item flex-shrink-0 w-44 h-24 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <div className="w-32 h-16 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all" style={{ '--tw-shadow-color': '#117cb4' } as React.CSSProperties}>
                  {getLogoSVG(client.name)}
                </div>
              </div>
            ))}
          </div>
          <div className="floating-customers-inner hover:paused flex gap-4 animate-[scroll_20s_linear_infinite_reverse]">
            {/* First set of clients */}
          

            {clients1.map(client => (
              <div className="bg-gradient-to-br from-white to-slate-50  px-6 py-2 md:py-2 flex items-center border-2" style={{
                borderColor: '#e5e7eb'
              }} key={client.id}>
                
                <div className="flex flex-col gap-4">
                  {/* Description and Image Row */}
                  <div className="flex justify-between gap-4 items-start">
                    {/* Image */}
                    <div className="flex items-center justify-center">
                      <div className="w-[40px] h-[40px] flex-[0_0_56px] rounded-xl border-2 flex items-center justify-center overflow-hidden" style={{
                        borderColor: '#d1d5db'
                      }}>
                        <img src={client.icon} alt={client.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="">
                      <div className="">
                        <h3 className="text-sm font-bold font-unbounded text-gray-800">
                          {client.name}
                        </h3>
                        <p className="text-gray-600 font-unbounded text-xs leading-relaxed">
                        @{client.name}
                      </p>
                      </div>
                      
                    </div>

                  </div>

                </div>
              </div>
            ))}
            {/* Duplicate for continuous scroll */}
            {clients.map(client => (
              <div
                key={`duplicate-${client.id}`}
                className="floating-customers-item flex-shrink-0 w-44 h-24 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <div className="w-32 h-16 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all" style={{ '--tw-shadow-color': '#117cb4' } as React.CSSProperties}>
                  {getLogoSVG(client.name)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        
      `}</style>
    </section>
  );
};

export default FloatingCustomers;