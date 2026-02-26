import React, { useState, useEffect, useRef } from 'react';

// Add CSS keyframes for animations
const animationStyles = `
  @keyframes slideFromRight {
    from {
      transform: translateX(60px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
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
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const faqs = [
    {
      question: 'What is a Raid Session?',
      answer: 'A Raid Session is a coordinated engagement event where our verified X raiders help boost your project\'s visibility by creating likes, retweets, and comments on your specified tweets. This drives organic visibility and helps your content trend.'
    },
    {
      question: 'How long does a typical raid session take?',
      answer: 'We offer flexible durations ranging from 12 hours (1 day) to 168 hours (1 week). The duration depends on your package selection and project goals. Most clients see results within the first 24-48 hours.'
    },
    {
      question: 'Are all the engagements from real accounts?',
      answer: 'Yes! All engagements come from real, verified X accounts. We never use bots or fake accounts. Every interaction is genuine and helps build authentic community engagement for your project.'
    },
    {
      question: 'Can I customize my raid session?',
      answer: 'Absolutely! We can customize raid sessions based on your specific needs. You can choose the duration, target tweets, and engagement goals. Contact us to discuss your custom requirements.'
    },
    {
      question: 'How do I track my raid session progress?',
      answer: 'After booking, you\'ll receive real-time updates on engagement metrics. We provide detailed reports showing likes, retweets, comments, and trending position throughout your raid session.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden" id="faq" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight font-unbounded" style={{
            animation: isInView ? 'slideFromRight 0.8s ease-out' : 'none'
          }}>
            <span className="text-gray-600">Frequently Asked <span style={{ color: '#117cb4' }}>Questions</span></span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto font-unbounded" style={{
            animation: isInView ? 'slideFromLeft 0.8s ease-out 0.2s both' : 'none'
          }}>
            Find answers to common questions about our raid sessions and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4" style={{
          animation: isInView ? 'slideFromLeft 0.8s ease-out 0.3s both' : 'none'
        }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 flex items-center gap-2 justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm md:text-lg font-semibold font-unbounded text-gray-800 text-left">
                  {faq.question}
                </span>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 transition-transform duration-300"
                    style={{
                      color: '#117cb4',
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  openIndex === index ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm md:text-lg font-unbounded leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-slate-100 border border-gray-200 rounded-2xl p-8 md:p-12 text-center" style={{
          animation: isInView ? 'slideFromRight 0.8s ease-out 0.4s both' : 'none'
        }}>
          <h3 className="text-2xl font-bold font-unbounded text-gray-800 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 font-unbounded mb-6">
            Get in touch with our team for personalized support
          </p>
          <a
            href="https://x.com/sapphiresinc"
            className="px-8 py-3 rounded-lg font-semibold font-unbounded transition-all duration-300 shadow-md hover:shadow-lg"
            style={{
              backgroundColor: '#117cb4',
              color: '#c5e0fa'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#0d5a8f'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '#117cb4'}}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
