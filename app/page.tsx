'use client';

import { useState } from 'react';
import Image from "next/image";
import LoginModal from './components/LoginModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FeatureDetail {
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ReactNode;
  categorySlug: string;
}

export default function Home() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const features: FeatureDetail[] = [
    {
      title: "AI-Powered Matching",
      shortDescription: "Find the perfect code with our AI matching system.",
      fullDescription: "It analyzes your needs and connects you to the best solutions, saving time and ensuring quality.",
      icon: (
        <Image
          src="/images/ai-icon.svg"
          alt="AI Icon"
          width={80}
          height={80}
          className="icon"
        />
      ),
      categorySlug: "AI"
    },
    {
      title: "DeFi Integrations",
      shortDescription: "Integrate decentralized finance features easily.",
      fullDescription: "Access DeFi protocols, manage assets, and build financial applications on the blockchain.",
      icon: (
        <Image
          src="/images/crypto-icon.svg"
          alt="DeFi Icon"
          width={80}
          height={80}
          className="icon"
        />
      ),
      categorySlug: "DeFi"
    },
    {
      title: "Gaming Modules",
      shortDescription: "Build immersive Web3 games faster.",
      fullDescription: "Leverage pre-built modules for player management, item ownership (NFTs), and in-game economies.",
      icon: (
        <Image
          src="/images/trading-icon.svg"
          alt="Gaming Icon"
          width={80}
          height={80}
          className="icon"
        />
      ),
      categorySlug: "Gaming"
    },
    {
      title: "Infra & Tools",
      shortDescription: "Essential infrastructure and developer tools.",
      fullDescription: "Find tools for deployment, monitoring, security audits, and more to streamline your development workflow.",
      icon: (
        <Image
          src="/images/globe-icon.svg"
          alt="Infra Icon"
          width={80}
          height={80}
          className="icon"
        />
      ),
      categorySlug: "Infra"
    }
  ];

  const handleFeatureCardClick = (categorySlug: string) => {
    console.log(`handleFeatureCardClick called with slug: ${categorySlug}`);
    if (categorySlug === 'AI') {
      console.log('Attempting to navigate to /market/AI');
      try {
        router.push(`/market/${categorySlug}`);
        console.log('router.push executed successfully');
      } catch (error) {
        console.error('Error during router.push:', error);
      }
    } else {
      console.log(`Navigation skipped for category: ${categorySlug}`);
    }
  };

  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock the <span style={{ color: '#2563eb' }}>Future</span> of Code Trading
          </h1>
          <h2 className="hero-subtitle">
            — AI-Powered, Crypto-Secured
          </h2>
          <p className="hero-description">
            Trade Smarter, Build Faster<br />
            Where Developers Thrive in a<br />
            Trustless Global Marketplace
          </p>
        </div>
        <div className="button-group">
          <button className="button button-primary" onClick={() => setIsLoginModalOpen(true)}>
            <span>Get Started</span>
            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link href="/market/All" className="button button-secondary">
            <span>Explore the Marketplace</span>
          </Link>
        </div>
      </section>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            onClick={() => {
              console.log(`Card clicked: ${feature.title}`);
              handleFeatureCardClick(feature.categorySlug);
            }}
            style={{ cursor: feature.categorySlug === 'AI' ? 'pointer' : 'default' }}
          >
            <h3 className="feature-title">{feature.title}</h3>
            <div className="feature-icon">
              {feature.icon}
            </div>
            <p className="feature-description">
              {feature.shortDescription}
            </p>
          </div>
        ))}
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </main>
  );
}
