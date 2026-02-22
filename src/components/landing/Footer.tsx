import React from 'react';
import tbImage from '../../assets/tb.jpg';
import flImage from '../../assets/fl.jpg'

const Footer = () => {
  // Add animation keyframes
  const gradientStyle = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  `;

  const socialLinks = [
    { name: 'Twitter', icon: 'X', url: '#' },
    { name: 'Telegram', icon: 'TG', url: '#' },
    { name: 'Discord', icon: 'DC', url: '#' }
  ];

  const teamMembers = [
    {
      name: 'Torboski',
      twitter: 'https://x.com/tobkimart',
      telegram: 'https://t.me/tobkim',
      avatar: 'Tb',
      image: tbImage
    },
    {
      name: 'Faceless',
      twitter: 'https://x.com/faceless_xr',
      telegram: 'https://t.me/facelessxr',
      avatar: 'Fl',
      image: flImage
    }
  ];

  return (
    <footer className="border-t border-gray-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Contact Section */}
        <div className="flex justify-center py-12 border-t border-gray-200">
          <div className=''>
            <div>
              <h3 className="text-4xl font-unbounded tracking-tight text-gray-600 text-center mb-6">
                <span>
                  Contact <span style={{ color: '#117cb4' }}>Us</span>
                </span>
              </h3>
            </div>
            <div className="flex sm:flex items-center justify-start gap-10">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 transition-all duration-300 hover:shadow-lg" style={{ '--tw-shadow-color': '#117cb4' } as React.CSSProperties} onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#117cb4'}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = '#d1d5db'}} />
                  <p className="text-md font-medium text-gray-600 transition-colors duration-300 font-unbounded">{member.name}</p>
                  <div className="flex gap-3">
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      style={{ color: '#117cb4' }}
                      onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#f0f5ff'}}
                      onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'transparent'}}
                      title="Twitter"
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 462.799" className="w-4 h-4" fill="currentColor">
                        <path fillRule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z" />
                      </svg>
                    </a>
                    <a
                      href={member.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      style={{ color: '#117cb4' }}
                      onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#f0f5ff'}}
                      onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'transparent'}}
                      title="Telegram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333334 333334" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" className="w-4 h-4" fill="currentColor" aria-hidden>
                        <path d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm80219 91205l-29735 149919s-4158 10396-15594 5404l-68410-53854s76104-68409 79222-71320c3119-2911 2079-3534 2079-3534 207-3535-5614 0-5614 0l-100846 64043-42002-14140s-6446-2288-7069-7277c-624-4992 7277-7694 7277-7694l166970-65498s13722-6030 13722 3951zm-87637 122889l-27141 24745s-2122 1609-4443 601l5197-45965 26387 20619z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div id="about" className="border-t border-gray-200 pt-8 pb-12 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2 mb-8 md:mb-0">
            {socialLinks.map(link => (
              <a
                key={link.name}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow on ${link.name}`}
                className="flex h-6 w-6 items-center justify-center transition-all duration-300 hover:scale-125"
                style={{ color: '#117cb4' }}
                href={link.url}
              >
                {link.name === 'Twitter' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 462.799" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path fillRule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z" />
                  </svg>
                ) : link.name === 'Telegram' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333334 333334" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm80219 91205l-29735 149919s-4158 10396-15594 5404l-68410-53854s76104-68409 79222-71320c3119-2911 2079-3534 2079-3534 207-3535-5614 0-5614 0l-100846 64043-42002-14140s-6446-2288-7069-7277c-624-4992 7277-7694 7277-7694l166970-65498s13722-6030 13722 3951zm-87637 122889l-27141 24745s-2122 1609-4443 601l5197-45965 26387 20619z" />
                  </svg>
                ) : link.name === 'Discord' ? (
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.08.08 0 0 0 .087-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.294a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.699.77 1.364 1.225 1.994a.08.08 0 0 0 .086.028 19.86 19.86 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-4.467-.838-8.343-3.554-11.761a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.91-2.157-2.037 0-1.128.952-2.037 2.157-2.037 1.211 0 2.176.918 2.157 2.037 0 1.127-.952 2.037-2.157 2.037zm7.975 0c-1.183 0-2.157-.91-2.157-2.037 0-1.128.952-2.037 2.157-2.037 1.211 0 2.176.918 2.157 2.037 0 1.127-.946 2.037-2.157 2.037z" />
                  </svg>
                ) : null}
              </a>
            ))}
          </div>
          <div className="mt-8 md:mt-0 flex flex-col md:flex-row items-center gap-4 text-xs font-medium leading-5 text-gray-600 max-md:flex-col md:order-1 font-unbounded">
            <div>
              <p className="">© 2026 SAPPHIRES. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <a className="transition-all duration-300 text-gray-600 hover:text-gray-800 hover:underline underline-offset-2" href="#privacy">Privacy Policy</a>
              <a className="transition-all duration-300 text-gray-600 hover:text-gray-800 hover:underline underline-offset-2" href="#terms">Terms of Use</a>
            </div>
          </div>
        </div>
        <div className="pb-8 text-xs leading-5 text-gray-500 max-md:text-center font-unbounded">
          <p>SAPPHIRES is a verified X raid platform helping crypto projects gain community engagement through coordinated social interactions. Any other trademarks are the property of their respective owners.</p>
          <p className="mt-2">SAPPHIRES operates as a community engagement platform. Users are responsible for complying with platform terms of service and applicable regulations.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;