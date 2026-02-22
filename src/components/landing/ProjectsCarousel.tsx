import React, { useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRaids } from '@/contexts/RaidContext';
import shrekImg from '../../assets/yeepage.jpg';
import molangImg from '../../assets/molangpage.jpg';
import noveltyImg from '../../assets/noveltypage.jpg';
import born19Img from '../../assets/born19page.jpg';
import Clippy from '@/assets/clippy.jpeg';
import Brainrot from '@/assets/brainrot.jpeg';

interface RaidSession {
  id: number;
  project_name: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
  likes: number;
  retweets: number;
  comments: number;
  engagements: number;
  started_at: string;
  estimated_end: string;
  twitter_link?: string;
  duration?: string;
  package?: string;
  chain_id: string;
  token_address: string;
}

// Fallback raids for when no data is available
const FALLBACK_RAIDS: RaidSession[] = [
];

interface CarouselConfig {
  title: string;
  borderColor: string;
  primaryColor?: string;
  scrollColor?: string;
  itemsPerPage?: number;
}

interface CarouselProps {
  projects: RaidSession[];
  renderCard: (project: RaidSession) => ReactNode;
  config: CarouselConfig;
  isMobile: boolean;
}

const fetchTokenPrice = async (chainId: string, tokenAddress: string) => {
  const res = await fetch(`https://api.dexscreener.com/tokens/v1/${chainId}/${tokenAddress}`);
  return res.json();
};

const useDexPriceData = (chainId?: string, tokenAddress?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['price', chainId, tokenAddress],
    queryFn: () => fetchTokenPrice(chainId || '', tokenAddress || ''),
    enabled: Boolean(chainId && tokenAddress),
    refetchInterval: 1000,
  });

  const pair = Array.isArray(data) && data.length > 0 ? data[0] : null;

  return {
    pair,
    imageUrl: pair?.info?.imageUrl,
    twitterUrl: pair?.info?.socials?.find((s: any) => s.type === 'twitter')?.url,
    priceUsd: pair?.priceUsd,
    priceNative: pair?.priceNative,
    baseTokenSymbol: pair?.baseToken?.symbol,
    liquidity: pair?.liquidity?.usd,
    fdv: pair?.fdv,
    marketCap: pair?.marketCap,
    isLoading,
    error,
  };
};

const PriceDisplay: React.FC<{ chainId?: string; tokenAddress?: string }> = ({ chainId, tokenAddress }) => {
  const { priceUsd, priceNative, baseTokenSymbol, liquidity, fdv, marketCap, isLoading, error } = useDexPriceData(chainId, tokenAddress);

  const fmtPrice = (v: any, digits = 6) => {
    if (v == null) return '-';
    const n = typeof v === 'string' ? parseFloat(v) : Number(v);
    if (Number.isNaN(n)) return '-';
    if (Math.abs(n) >= 1) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
    return n.toFixed(digits);
  };

  const fmtCurrency = (v: any) => {
    if (v == null) return '-';
    const n = typeof v === 'string' ? parseFloat(v) : Number(v);
    if (Number.isNaN(n)) return '-';
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  if (isLoading) return <p className="text-xs text-gray-500">Loading price...</p>;
  if (error) return <p className="text-xs text-red-500">Price unavailable</p>;

  return (
    <>
      <div className="grid grid-cols-2 my-4 gap-3">
        <div className="border border-gray-300  text-center rounded-md py-1">
          <p className="text-xs font-unbounded  text-gray-400">Price USD</p>
          <span className="font-unbounded font-semibold text-xs text-gray-600">{priceUsd ? `$${fmtPrice(priceUsd, 6)}` : '-'}</span>
        </div>
        <div className="border border-gray-300  text-center rounded-md py-1">
          <p className="text-xs font-unbounded  text-gray-400">Price</p>
          <span className="font-unbounded font-semibold text-xs text-gray-600">{priceNative ? `${fmtPrice(priceNative, 6)} ` : '-'}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 my-4 gap-3">
        <div className="border border-gray-300  text-center rounded-md py-1">
          <p className="text-xs font-unbounded  text-gray-400">Liquidity</p>
          <span className="font-unbounded font-semibold text-xs text-gray-600">{fmtCurrency(liquidity)}</span>
        </div>
        <div className="border border-gray-300  text-center rounded-md py-1">
          <p className="text-xs font-unbounded  text-gray-400">FDV</p>
          <span className="font-unbounded font-semibold text-xs text-gray-600">{fmtCurrency(fdv)}</span>
        </div>
        <div className="border border-gray-300  text-center rounded-md py-1">
          <p className="text-xs font-unbounded  text-gray-400">MKT Cap</p>
          <span className="font-unbounded font-semibold text-xs text-gray-600">{fmtCurrency(marketCap)}</span>
        </div>
      </div>
    </>
  );
};

const GenericCarousel = ({ projects, renderCard, config, isMobile }: CarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const itemsPerPage = config.itemsPerPage || (isMobile ? 1 : 2);
  const cardWidth = isMobile ? 300 : 40.333333; // percentage for md+ or px for mobile
  const cardWidthPx = isMobile ? 300 : undefined;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isManualScrollRef = React.useRef(false);

  // Calculate total scrollable width
  const totalCards = projects.length;
  const maxScroll = Math.max(0, totalCards - itemsPerPage);
  const maxScrollPercent = maxScroll > 0 ? 100 : 0;

  const checkOverflow = () => {
    if (containerRef.current) {
      const hasOverflow = containerRef.current.scrollWidth > containerRef.current.clientWidth;
      setIsOverflowing(hasOverflow);
    }
  };

  // Handle manual scroll events
  const handleContainerScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;

      if (maxScrollLeft > 0) {
        // Calculate scroll position proportionally based on actual scroll range
        const calculatedPosition = (scrollLeft / maxScrollLeft) * (totalCards - itemsPerPage);
        setScrollPosition(Math.max(0, Math.min(calculatedPosition, totalCards - itemsPerPage)));
      }
    }
  };

  // Attach resize listener once
  useEffect(() => {
    const onResize = () => checkOverflow();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Re-check overflow when projects change (after layout)
  useEffect(() => {
    // Wait for next paint so DOM sizing is accurate
    const raf = requestAnimationFrame(() => checkOverflow());
    return () => cancelAnimationFrame(raf);
  }, [projects]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = () => {
      isManualScrollRef.current = true;
    };

    const handleMouseUp = () => {
      isManualScrollRef.current = false;
    };

    const handleTouchStart = () => {
      isManualScrollRef.current = true;
    };

    const handleTouchEnd = () => {
      isManualScrollRef.current = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('scroll', handleContainerScroll);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('scroll', handleContainerScroll);
    };
  }, [maxScroll]);

  const handleScroll = (direction: 'next' | 'prev') => {
    isManualScrollRef.current = false;
    if (containerRef.current) {
      const container = containerRef.current;
      const cardElement = container.querySelector('[class*="flex-"]') as HTMLElement;
      if (!cardElement) return;

      const cardWidth = cardElement.offsetWidth + 16; // 16px for padding
      const scrollAmount = cardWidth;

      if (direction === 'next') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const nextSlide = () => {
    handleScroll('next');
  };

  const prevSlide = () => {
    handleScroll('prev');
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    isManualScrollRef.current = false;
    if (containerRef.current) {
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;
      const newScrollLeft = percentage * maxScrollLeft;
      
      container.scrollLeft = newScrollLeft;
      // Update scroll position after scroll
      setTimeout(() => handleContainerScroll(), 0);
    }
  };

  // Calculate progress indicator dimensions based on scroll range
  const maxScrollableCards = totalCards - itemsPerPage;
  const progressWidth = maxScrollableCards > 0 ? (itemsPerPage / totalCards) * 100 : 100;
  const progressLeft = maxScrollableCards > 0 ? (scrollPosition / maxScrollableCards) * (100 - progressWidth) : 0;

  return (
    <div className="mb-16">
      <h3 className="text-2xl md:text-3xl font-bold mb-8 font-unbounded" style={{ color: config.primaryColor || config.borderColor }}>
        {config.title}
      </h3>

      {projects.length > 0 ? (
        <>
          <div className="overflow-hidden">
            <div 
              className="flex rounded-2xl w-full"
              ref={containerRef}
              style={{
                flexWrap: 'nowrap',
                paddingBottom: itemsPerPage === 1 ? '0px' : '0px',
                overflow: 'auto hidden',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none'
              }}
              >
              {projects.map((project, idx) => (
                <div 
                  key={project.id} 
                  className={`md:px-2 flex-[0_0_300px] w-full relative md:flex-[0_0_40.333333%] max-w-[300px] md:max-w-[none] px-2`}
                >
                  {renderCard(project)}
                </div>
              ))}
            </div>
            {/* Filmstrip Navigation - Below Cards */}
            {maxScrollableCards > 0 ? (
              <div className="w-full flex items-center justify-center mt-8">
                <div className="filmstrip-position-wrapper w-full flex items-center justify-center">
                  {/* Previous Button */}
                  {isOverflowing && (
                  <button
                    onClick={prevSlide}
                    className={`scroll-btn prev w-6 h-6 flex items-center justify-center transition-all duration-300 mr-4 ${
                      scrollPosition > 0.5 ? 'opacity-60 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{ color: config.scrollColor || config.borderColor }}
                    aria-label="Previous"
                    title="Previous"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>)}

                  {/* Scroll Position Indicator */}
                  <div className="scroll-position flex-1 max-w-xs h-12 relative flex items-center cursor-pointer" onClick={handleProgressBarClick}>
                    {/* Background bar */}
                    <div 
                      className="absolute w-full h-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(197,224,250,.04)'
                      }}
                    />
                    {/* Progress indicator */}
                    <div 
                      className="scroll-position-inner absolute h-full transition-all duration-500 rounded-full cursor-grab active:cursor-grabbing"
                      style={{
                        width: `${isOverflowing ? progressWidth : 100}%`,
                        left: `${progressLeft}%`,
                        height: '4px',
                        backgroundColor: config.scrollColor || config.borderColor
                      }}
                    />
                  </div>

                  {/* Next Button */}
                  {isOverflowing && (
                  <button
                    onClick={nextSlide}
                    className={`scroll-btn next w-6 h-6 flex items-center justify-center transition-all duration-300 ml-4 ${
                      scrollPosition < maxScrollableCards - 0.5 ? 'opacity-60 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{ color: config.scrollColor || config.borderColor }}
                    aria-label="Next"
                    title="Next"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
                    </svg>
                  </button>)}
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center mt-8">
                <div className="filmstrip-position-wrapper w-full flex items-center justify-center">
                  {/* Full Width Indicator - No Overflow */}
                  <div className="scroll-position flex-1 h-12 relative flex items-center">
                    {/* Background bar */}
                    <div 
                      className="absolute w-full h-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(197,224,250,.04)'
                      }}
                    />
                    {/* Progress indicator - Full width */}
                    <div 
                      className="scroll-position-inner absolute h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `100%`,
                        height: '4px',
                        backgroundColor: config.scrollColor || config.borderColor
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-gray-200">
          <p className="text-gray-600 font-unbounded text-lg">No projects available at the moment.</p>
        </div>
      )}
    </div>
  );
};

const ProjectsCarousel = () => {
  const { raids, loading } = useRaids();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use fetched raids from Supabase or fallback to demo data
  const allRaids = raids.length > 0 ? raids : FALLBACK_RAIDS;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-green-500/50 text-green-600';
      case 'completed':
        return 'border-blue-500/50 text-blue-600';
      case 'pending':
        return 'border-yellow-500/50 text-yellow-600';
      default:
        return 'bg-white/10 border-white/20 text-white';
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-white/20';
    }
  };

  const calculateProgressFromTime = (startedAt: string, estimatedEnd: string): number => {
    try {
      // Parse ISO datetime strings and calculate progress
      const startTime = new Date(startedAt).getTime();
      const endTime = new Date(estimatedEnd).getTime();
      const now = Date.now();

      // If times are invalid, return 0
      if (isNaN(startTime) || isNaN(endTime)) return 0;

      const elapsedTime = now - startTime;
      const totalTime = endTime - startTime;

      if (totalTime <= 0) return 0;
      
      const progress = Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));
      return progress;
    } catch (error) {
      console.error('Error calculating progress:', error);
      return 0;
    }
  };

  const formatRelativeTime = (dateString: string, isEnd: boolean = false): string => {
    try {
      const date = new Date(dateString);
      const now = Date.now();
      const diff = isEnd ? date.getTime() - now : now - date.getTime();
      
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return isEnd ? `${days} day${days > 1 ? 's' : ''} remaining` : `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        return isEnd ? `${hours} hour${hours > 1 ? 's' : ''} remaining` : `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        return isEnd ? `${minutes} minute${minutes > 1 ? 's' : ''} remaining` : `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        return isEnd ? 'Starting soon' : 'Just now';
      }
    } catch (error) {
      console.error('Error formatting relative time:', error);
      return '';
    }
  };

  const activeProjects = allRaids.filter(r => r.status === 'active');
  const previousProjects = allRaids.filter(r => r.status === 'completed');

  const ActiveProjectCard = ({ project }: { project: RaidSession }) => {
    const { imageUrl: dexImageUrl, twitterUrl: dexTwitterUrl } = useDexPriceData(project.chain_id, project.token_address);
    const [displayImage, setDisplayImage] = useState('');
    const displayTwitter = project.twitter_link;
    const [copied, setCopied] = useState(false);
    const [calculatedProgress, setCalculatedProgress] = useState(calculateProgressFromTime(project.started_at, project.estimated_end));

    useEffect(() => {
      // Update display image when dexImageUrl is loaded
      if (dexImageUrl) setDisplayImage(dexImageUrl);
    }, [dexImageUrl]);

    useEffect(() => {
      // Update progress every second
      const interval = setInterval(() => {
        const newProgress = calculateProgressFromTime(project.started_at, project.estimated_end);
        setCalculatedProgress(newProgress);
      }, 1000);

      return () => clearInterval(interval);
    }, [project.started_at, project.estimated_end]);

    const shortenAddress = (address: string, chars = 6) => {
      if (!address) return '';
      return `${address.slice(0, chars)}...${address.slice(-chars)}`;
    };

    const handleCopyAddress = () => {
      if (project.token_address) {
        navigator.clipboard.writeText(project.token_address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
    <div key={project.id} className="group">
    <div className="w-full transition-[.3s ease]  bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 md:p-6 border-2" style={{
      borderColor: '#117cb4',
      boxShadow: '0 0 20px rgba(17, 124, 180, 0.2)'
    }}>
    {/* Header */}
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#f0f5ff] flex items-center justify-center overflow-hidden">
            <img src={displayImage} alt={project.project_name} className='w-full h-full object-cover'/>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">

            <h3 className="text-lg font-semibold space-x-2 font-unbounded text-gray-800">
              {project.project_name}
            </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500 font-unbounded">
                CA: <span className="text-xs md:text-sm">{shortenAddress(project.token_address)}</span>
              </p>
              <button
                onClick={handleCopyAddress}
                className="text-gray-500 hover:text-[#117cb4] transition-colors border border-gray-300 hover:border-[#117cb4] rounded-md p-1"
                title="Copy contract address"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.216 0-2.318.597-2.998 1.524m5.670 6.402A2.251 2.251 0 0013.5 9.75h-3c-1.217 0-2.319.597-2.999 1.524m8.970 6.402A2.251 2.251 0 0013.5 19.5h-3c-1.216 0-2.318-.597-2.999-1.524M3 19.75V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75Z" />
                </svg>
              </button>
              {copied && <span className="text-xs text-green-600 font-unbounded">Copied!</span>}
            </div>
          </div>
        </div>
      </div>
      
    </div>

    
   

    
    <div className="p-0">
      {/* Timeline */}
      <div className="flex items-center justify-between gap-4 text-xs text-gray-600 font-unbounded pt-0 mb-4">
        <span>Started: {formatRelativeTime(project.started_at, false)}</span>
        <span className="text-right">Ends: {formatRelativeTime(project.estimated_end, true)}</span>
      </div>

      <PriceDisplay chainId={project.chain_id} tokenAddress={project.token_address} />

      
      {/* Progress Section */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-button font-unbounded">Raid Progress</span>
        <span className="text-button font-unbounded font-medium">{Math.floor(calculatedProgress)}%</span>
      </div>
      {/* Engagement Metrics */}
      <div className="mt-2 bg-gray-200 rounded-full h-2">
        <div className="bg-button h-2 rounded-full" style={{ width: `${Math.min(100, Math.floor(calculatedProgress))}%` }}></div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-4 text-center">
        <div><div className="text-sm md:text-lg font-bold font-unbounded text-gray-700">{Math.floor(project.likes).toLocaleString()}</div><div className="text-xs font-unbounded text-button">Likes Sent</div></div>
        <div><div className="text-sm md:text-lg font-bold font-unbounded text-gray-700">{Math.floor(project.retweets).toLocaleString()}</div><div className="text-xs font-unbounded text-button">Retweets</div></div>
        <div><div className="text-sm md:text-lg font-bold font-unbounded text-gray-700">{Math.floor(project.comments).toLocaleString()}</div><div className="text-xs font-unbounded text-button">Comments</div></div>
      </div>
    </div>


    {/* View on X Button */}
    <div className="flex justify-center pt-2">
      <a
        href={displayTwitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center bg-[#117cb4] text-[#c5e0fa] gap-2 px-4 py-2 rounded-lg  border border-white/20 text-xs font-medium  shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 462.799" fill="currentColor" className="w-3 h-3">
          <path fillRule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z" />
        </svg>
        View on X
      </a>
    </div>
  </div>
    </div>
  );};

  const PastProjectCard = ({ project }: { project: RaidSession }) => {
    const { imageUrl: dexImageUrl } = useDexPriceData(project.chain_id, project.token_address);
    const [displayImage, setDisplayImage] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (dexImageUrl) setDisplayImage(dexImageUrl);
    }, [dexImageUrl]);

    const shortenAddress = (address: string, chars = 6) => {
      if (!address) return '';
      return `${address.slice(0, chars)}...${address.slice(-chars)}`;
    };

    const handleCopyAddress = () => {
      if (project.token_address) {
        navigator.clipboard.writeText(project.token_address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 md:p-6 border-2" style={{ borderColor: '#e5e7eb' }}>
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#f0f5ff] flex items-center justify-center overflow-hidden">
                  <img src={displayImage} alt={project.project_name} className='w-full h-full object-cover'/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-unbounded text-gray-800">
                    {project.project_name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 font-unbounded">CA: <span className="text-xs md:text-sm">{shortenAddress(project.token_address)}</span></p>
                    <button
                      onClick={handleCopyAddress}
                      className="text-gray-500 hover:text-[#117cb4] transition-colors border border-gray-300 hover:border-[#117cb4] rounded-md p-1"
                      title="Copy contract address"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.216 0-2.318.597-2.998 1.524m5.670 6.402A2.251 2.251 0 0013.5 9.75h-3c-1.217 0-2.319.597-2.999 1.524m8.970 6.402A2.251 2.251 0 0013.5 19.5h-3c-1.216 0-2.318-.597-2.999-1.524M3 19.75V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75Z" />
                      </svg>
                    </button>
                    {copied && <span className="text-xs text-green-600 font-unbounded">Copied!</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats - Full Width */}
          <div className="flex space-x-2 pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500 font-unbounded mb-1">Engagement</p>
              <p className="text-base font-bold text-gray-800">{Math.floor(project.engagements).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-unbounded mb-1">Duration</p>
              <p className="text-base font-bold text-gray-800">{project.duration}</p>
            </div>
           
          </div>
        </div>
      </div>
    );
  };



  return (
    <section className="pt-16 md:pt-24 bg-white relative overflow-hidden">
      <style>{`
        .filmstrip-position-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .filmstrip-position-wrapper .scroll-btn.prev {
          margin-right: 16px;
        }

        .filmstrip-position-wrapper .scroll-btn.enabled {
          opacity: 0.6;
          pointer-events: all;
        }

        .filmstrip-position-wrapper .scroll-btn {
          cursor: pointer;
          transition-duration: 0.3s;
        }

        .filmstrip-position-wrapper .scroll-position {
          height: 48px;
          flex: 0 0 33%;
          max-width: 320px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .filmstrip-position-wrapper .scroll-position::before {
          content: "";
          display: block;
          width: 100%;
          height: 4px;
          border-radius: 100vw;
          background-color: rgba(197,224,250,.04);
          position: absolute;
          top: calc(50% - 2px);
        }

        .filmstrip-position-wrapper .scroll-position-inner {
          height: 100%;
          position: absolute;
          top: calc(50% - 2px);
          height: 4px;
          border-radius: 100vw;
        }

        .filmstrip-position-wrapper .scroll-btn.next {
          margin-left: 16px;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(17, 124, 180, 0.3), 0 0 40px rgba(17, 124, 180, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(17, 124, 180, 0.5), 0 0 60px rgba(17, 124, 180, 0.2);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-50px);
          }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-6">
        {/* Loading State 
        {loading && (
          <div className="mb-8 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
            Loading raid sessions from Supabase...
          </div>
        )}*/}

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight font-unbounded">
            <span className="text-gray-600">Our <span style={{ color: '#117cb4' }}>Projects</span></span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto font-unbounded">
            Join active raid sessions or explore our track record of successful campaigns
          </p>
        </div>

        {/* Active Raids Section */}
        <GenericCarousel
          projects={activeProjects}
          renderCard={(project) => <ActiveProjectCard project={project} />}
          config={{
            title: 'Live Raid Updates',
            borderColor: '#117cb4',
            primaryColor: '#117cb4',
            scrollColor: '#117cb4',
            itemsPerPage: 1
          }}
          isMobile={isMobile}
        />

        {/* Previous Projects Section */}
        <GenericCarousel
          projects={previousProjects}
          renderCard={(project) => <PastProjectCard project={project} />}
          config={{
            title: 'Past Success Stories',
            borderColor: '#e5e7eb',
            primaryColor: '#333',
            scrollColor: '#117cb4',
            itemsPerPage: 1
          }}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
};

export default ProjectsCarousel;
