import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SeoHead from './SeoHead';
import { SITE, mailtoLink } from './siteConfig';

// ============================================================================
// CUSTOM COMPONENTS
// ============================================================================

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
  style,
}) => {
  const Component = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, margin: '50px', amount: 0.1 }}
    >
      {children}
    </Component>
  );
};

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < padding) {
      setIsActive(true);
      setOffset({
        x: distanceX / strength,
        y: distanceY / strength,
      });
    } else {
      setIsActive(false);
      setOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mousemove', handleMouseMove as any);
      ref.current.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        ref.current?.removeEventListener('mousemove', handleMouseMove as any);
        ref.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        willChange: 'transform',
        transition: isActive ? activeTransition : inactiveTransition,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');

  return (
    <p ref={ref} className={className} style={style}>
      <span style={{ visibility: 'hidden', position: 'absolute' }}>
        {text}
      </span>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          scrollYProgress={scrollYProgress}
          index={i}
          total={chars.length}
        />
      ))}
    </p>
  );
};

const AnimatedChar = ({
  char,
  scrollYProgress,
  index,
  total,
}: {
  char: string;
  scrollYProgress: any;
  index: number;
  total: number;
}) => {
  const charOpacity = useTransform(() => {
    const progress = scrollYProgress.get();
    const charStart = index / total;
    const charEnd = (index + 1) / total;

    if (progress < charStart) return 0.2;
    if (progress > charEnd) return 1;
    const charProgress = (progress - charStart) / (charEnd - charStart);
    return 0.2 + charProgress * 0.8;
  });

  return (
    <motion.span style={{ opacity: charOpacity }}>
      {char}
    </motion.span>
  );
};

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

const contactButtonClassName =
  'relative inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white border-2 border-white transition-all duration-200 hover:opacity-80';

const contactButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
  outline: '2px solid white',
  outlineOffset: '-3px',
};

const ContactButton: React.FC = () => (
  <a
    href="https://wa.me/919644515315"
    target="_blank"
    rel="noopener noreferrer"
    className={contactButtonClassName}
    style={contactButtonStyle}
  >
    Contact Me
  </a>
);

const LiveProjectButton: React.FC<{ url: string }> = ({ url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] transition-all duration-200 hover:bg-[#D7E2EA]/10"
  >
    Live Project
  </a>
);

// ============================================================================
// MARQUEE SECTION
// ============================================================================

interface MarqueeSectionProps {}

const MarqueeSection: React.FC<MarqueeSectionProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const images = [
    'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
    'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
    'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
    'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
    'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
    'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
  ];

  const row1Images = images.slice(0, 11);
  const row2Images = images.slice(11);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const newOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ImageTile = ({ src }: { src: string }) => (
    <div
      className="flex-shrink-0 w-[420px] h-[270px] rounded-2xl overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      <img
        src={src}
        alt="project"
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <div ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-x-clip">
      <div className="flex gap-3 mb-3" style={{ willChange: 'transform', transform: `translateX(${offset - 200}px)` }}>
        {[...row1Images, ...row1Images, ...row1Images].map((img, idx) => (
          <ImageTile key={idx} src={img} />
        ))}
      </div>

      <div className="flex gap-3" style={{ willChange: 'transform', transform: `translateX(${-(offset - 200)}px)` }}>
        {[...row2Images, ...row2Images, ...row2Images].map((img, idx) => (
          <ImageTile key={idx} src={img} />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  return (
    <div
      className="bg-[#0C0C0C]"
      style={{
        fontFamily: "'Kanit', sans-serif",
        overflowX: 'clip',
      }}
    >
      <SeoHead />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
        
        html, body, #root {
          background: #0C0C0C;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        * {
          box-sizing: border-box;
        }
        
        .hero-heading {
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ================================================================= */}
      {/* HERO SECTION */}
      {/* ================================================================= */}
      <section aria-label="Home" className="min-h-screen flex flex-col overflow-x-clip relative bg-[#0C0C0C]">
        {/* Navbar */}
        <FadeIn delay={0} y={-20} as="nav" className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          <div className="flex justify-between w-full text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
            <a href="#about" className="transition-opacity duration-200 hover:opacity-70">
              About
            </a>
            <a href="#services" className="transition-opacity duration-200 hover:opacity-70">
              Services
            </a>
            <a href="#projects" className="transition-opacity duration-200 hover:opacity-70">
              Projects
            </a>
            <a href="#contact" className="transition-opacity duration-200 hover:opacity-70">
              Contact
            </a>
          </div>
        </FadeIn>

        {/* Hero Heading */}
        <div className="pt-16 sm:flex-1 sm:flex sm:items-center sm:justify-center overflow-hidden">
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1
            className="hero-heading font-black uppercase tracking-tight leading-none w-full text-center text-[18vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]"
            >
             HI, I'M AMIT
            </h1>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <FadeIn delay={0.35} y={20} className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 w-full">
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
            style={{
              fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)',
              maxWidth: 'clamp(160px, 25vw, 260px)',
            }}
          >
            a web developer crafting fast, modern, and engaging digital experiences for businesses and startups
          </p>

          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </FadeIn>

        {/* Portrait with Magnet */}
        <FadeIn delay={0.6} y={30} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:block">
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <img
              src="/images/amit.PNG"
              alt="amit"
              className="rounded-3xl object-cover"
              style={{
                width: '420px',
                height: 'auto',
              }}
            />
          </Magnet>
        </FadeIn>

        {/* Mobile Portrait */}
        <div className="sm:hidden absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-10">  
          <Magnet padding={150} strength={3}>
            <img
              src="/images/amit.PNG"
              alt="amit"
              className="rounded-3xl object-cover"
              style={{
                width: '280px',
                height: 'auto',
              }}
            />
          </Magnet>
        </div>
      </section>

      {/* ================================================================= */}
      {/* MARQUEE SECTION */}
      {/* ================================================================= */}
      <MarqueeSection />

      {/* ================================================================= */}
      {/* ABOUT SECTION */}
      {/* ================================================================= */}
      <section id="about" aria-label="About" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden">
        {/* Decorative Images */}
        <FadeIn delay={0.1} x={-80} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="moon"
            style={{
              width: 'clamp(120px, 15vw, 210px)',
              height: 'auto',
            }}
          />
        </FadeIn>

        <FadeIn delay={0.25} x={-80} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3d-object"
            style={{
              width: 'clamp(100px, 14vw, 180px)',
              height: 'auto',
            }}
          />
        </FadeIn>

        <FadeIn delay={0.15} x={80} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="lego"
            style={{
              width: 'clamp(120px, 15vw, 210px)',
              height: 'auto',
            }}
          />
        </FadeIn>

        <FadeIn delay={0.3} x={80} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3d-group"
            style={{
              width: 'clamp(130px, 16vw, 220px)',
              height: 'auto',
            }}
          />
        </FadeIn>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase text-center leading-none tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 12vw, 160px)',
              }}
            >
              About me
            </h2>
          </FadeIn>

          <div className="w-full max-w-[560px] flex flex-col gap-16 sm:gap-20 md:gap-24 items-center">
            <AnimatedText
              text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
              className="text-[#D7E2EA] font-medium text-center leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              }}
            />

            <ContactButton />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SERVICES SECTION */}
      {/* ================================================================= */}
      <section
        id="services"
        aria-label="Services"
        className="bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
        style={{
          borderRadius: 'clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0',
        }}
      >
        <FadeIn delay={0} y={40}>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
            style={{
              fontSize: 'clamp(3rem, 12vw, 160px)',
            }}
          >
            Services
          </h2>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
          {[
            {
              number: '01',
              name: 'Frontend Development',
              description: 'Building responsive, interactive, and visually appealing user interfaces using React, Next.js, TypeScript, Tailwind CSS, and modern web technologies.',
            },
            {
              number: '02',
              name: 'Full Stack Development',
              description: 'Developing complete web applications with scalable architectures, API integrations, authentication systems, databases, and backend services.',
            },
            {
              number: '03',
              name: 'UI/UX Implementation',
              description: 'Transforming design concepts into pixel-perfect, accessible, and user-friendly web experiences optimized for all devices.',
            },
            {
              number: '04',
              name: 'Performance Optimization',
              description: 'Improving website speed, SEO, accessibility, Core Web Vitals, and overall user experience for better engagement and conversions.',
            },
            {
              number: '05',
              name: 'Website Maintenance',
              description: 'Providing ongoing updates, bug fixes, feature enhancements, and technical support to keep applications running smoothly.',
            },
          ].map((service, i) => (
            <FadeIn key={i} delay={i * 0.1} y={20}>
              <div
                className={`flex gap-6 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12 ${
                  i !== 4 ? 'border-b border-[rgba(12,12,12,0.15)]' : ''
                }`}
              >
                <div
                  className="font-black text-[#0C0C0C] flex-shrink-0"
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 140px)',
                  }}
                >
                  {service.number}
                </div>

                <div className="flex-1 flex flex-col gap-2 sm:gap-3">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-tight"
                    style={{
                      fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="text-[#0C0C0C] font-light leading-relaxed opacity-60"
                    style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                      maxWidth: '42rem',
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* PROJECTS SECTION */}
      {/* ================================================================= */}
      <section
        id="projects"
        aria-label="Projects"
        className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 -mt-10 sm:-mt-12 md:-mt-14 relative z-10"
        style={{
          borderRadius: 'clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0',
        }}
      >
        <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-28">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 12vw, 160px)',
            }}
          >
            Project
          </h2>
        </FadeIn>

        <ProjectsCarousel />
      </section>

      {/* ================================================================= */}
      {/* CONTACT SECTION */}
      {/* ================================================================= */}
      <section
        id="contact"
        aria-label="Contact"
        className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 flex flex-col items-center gap-10 sm:gap-14"
      >
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 12vw, 160px)',
            }}
          >
            Contact
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={30}>
          <p
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-xl"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            }}
          >
            Have a project in mind? Let&apos;s build something great together. Reach out by email,Instagram or Whatsapp.
          </p>
        </FadeIn>

        <FadeIn delay={0.25} y={20} className="flex flex-col items-center gap-4 sm:gap-5">
          <a
            href={mailtoLink}
            className="text-[#D7E2EA] font-medium uppercase tracking-wide transition-opacity duration-200 hover:opacity-70"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            {SITE.email}
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA] font-medium uppercase tracking-wide transition-opacity duration-200 hover:opacity-70"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            Instagram @{SITE.instagramHandle}
          </a>

          <FadeIn delay={0.3} y={20}>
  <p
    className="text-[#D7E2EA]/70 text-center max-w-md"
    style={{
      fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
    }}
  >
    Click below to connect with me directly on WhatsApp.
  </p>
</FadeIn>
        </FadeIn>

        <FadeIn delay={0.35} y={20}>
          <ContactButton />
        </FadeIn>
      </section>
    </div>
  );
}

// ============================================================================
// PROJECTS CAROUSEL
// ============================================================================

interface Project {
  number: string;
  name: string;
  category: string;
  url: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

const ProjectsCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const projects: Project[] = [
    {
      number: '01',
      name: 'Kunshak Exports',
      category: 'Personal',
      url: "https://kunshak.com/",
      col1Image1:
        '/images/kunshak1.png',
      col1Image2:
        '/images/kunshak2.png',
      col2Image:
        '/images/kunshak3.png',    
    },
    {
      number: '02',
      name: 'Jyotirvedam',
      category: 'Client',
      url: "https://www.jyotirvedam.in/",
      col1Image1:
      '/images/jyotirvedam1.png',
      col1Image2:
      '/images/jyotirvedam2.png',
      col2Image:
      '/images/jyotirvedam3.png',
    },
      {
        number: '03',
      name: 'MySimhastha',
      category: 'Client',
      url: "https://www.mysimhastha.com/",
      col1Image1:
        '/images/mysimhastha1.png',
      col1Image2:
        '/images/mysimhastha2.png',
      col2Image:
        '/images/mysimhastha3.png',
    },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        perspective: 1000,
        paddingBottom: "20px",
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} total={projects.length} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, total, scrollYProgress }) => {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <motion.div
      style={{
        scale,
        position: 'sticky',
        top: `calc(clamp(1.5rem, 8vw, 2rem) + ${index * 28}px)`,
        zIndex: index + 1,
        marginTop: index > 0 ? `${index * 28}px` : 0,
        transformOrigin: 'center center',
      }}
    >
      <div
        className="border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
        style={{
          borderRadius: 'clamp(40px, 5vw, 60px)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-8 sm:mb-10 md:mb-12">
          <div className="flex-1">
            <div
              className="font-black text-[#D7E2EA] mb-2"
              style={{
                fontSize: 'clamp(3rem, 10vw, 140px)',
              }}
            >
              {project.number}
            </div>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <h3
                className="font-medium uppercase text-[#D7E2EA] tracking-tight"
                style={{
                  fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                }}
              >
                {project.name}
              </h3>
              <span className="text-[#D7E2EA] opacity-60 font-light" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}>
                {project.category}
              </span>
            </div>
          </div>

          <LiveProjectButton url={project.url} />
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-6">
          {/* Left Column - 2 Images */}
          <div className="col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-6">
            <img
              src={project.col1Image1}
              alt="project-col1-1"
              className="w-full object-cover"
              style={{
                height: 'clamp(130px, 16vw, 230px)',
                borderRadius: 'clamp(40px, 5vw, 60px)',
              }}
            />
            <img
              src={project.col1Image2}
              alt="project-col1-2"
              className="w-full object-cover"
              style={{
                height: 'clamp(160px, 22vw, 340px)',
                borderRadius: 'clamp(40px, 5vw, 60px)',
              }}
            />
          </div>

          {/* Right Column - 1 Large Image */}
          <div className="col-span-6">
            <img
              src={project.col2Image}
              alt="project-col2"
              className="w-full h-full object-cover"
              style={{
                minHeight: 'clamp(300px, 45vw, 580px)',
                borderRadius: 'clamp(40px, 5vw, 60px)',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
