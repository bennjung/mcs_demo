'use client'; // Keep client component for potential interactions

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Use useParams to get dynamic route segment
import styles from '../../styles/market.module.css'; // Create or use existing market styles
import headerStyles from '../../styles/code-nft.module.css'; // Import header styles for reuse
import myPageStyles from '../../styles/mypage.module.css'; // Reuse MyPage grid styles

// Temporary Module Interface (Adjust as needed based on actual data)
interface MarketModule {
  id: number;
  name: string;
  category: string;
  price: number;
  purchaseCount: number;
  // Add other relevant fields: description, creator, image, etc.
}

// Mock data function modified to include Eliza Plugin and 5 crypto AI modules
const getMockModulesByCategory = (category: string): MarketModule[] => {
  const modules: MarketModule[] = [];

  // 1. Add Eliza Plugin first
  modules.push({
    id: 0, // Assign a unique ID
    name: "Eliza Plugin",
    category: category, // Assign current category or a specific one if needed
    price: 0.75, // Example price
    purchaseCount: 1234, // Example count
  });

  // 2. Define 5 Crypto-related AI module names
  const cryptoAiNames = [
    "Crypto Trading Bot",
    "DeFi Yield Optimizer",
    "NFT Rarity Analyzer",
    "Blockchain Transaction Scorer",
    "DeFi Protocol Analyzer"
  ];

  const count = 5; // Generate 5 crypto AI modules

  for (let i = 0; i < count; i++) {
    modules.push({
      id: i + 1, // Start IDs from 1
      name: cryptoAiNames[i], // Use crypto AI name from the list
      category: category,
      price: Math.round(Math.random() * 100) / 100, 
      purchaseCount: Math.floor(Math.random() * 1000),
    });
  }
  return modules;
};

export default function CategoryMarketPage() {
  const params = useParams();
  const category = params.category as string || 'Unknown'; // Get category from URL

  const [modules, setModules] = useState<MarketModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate fetching data for the category
    const fetchedModules = getMockModulesByCategory(decodeURIComponent(category));
    setModules(fetchedModules);
    setIsLoading(false);
  }, [category]);

  // Function to get random background (copied from MyPage)
  const cardBackgrounds = [
    '/images/market-card-background.png',
    '/images/my-page-background.png'
  ];
  const getRandomBackground = () => {
    return cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)];
  };

  if (isLoading) {
    // Add a proper loading component later
    return <div>Loading modules for {decodeURIComponent(category)}...</div>;
  }

  return (
    <div className={styles.marketPageContainer}> {/* Use a container class */}
      {/* Use header structure similar to code-nft page */}
      <div className={headerStyles.header} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className={`${headerStyles.headerTitle} ${styles.categoryTitleOverride}`}> {/* Combine styles */}
          <Image
            src="/images/marketplace-icon.svg" 
            alt="Category Icon"
            width={32} 
            height={32}
            className={headerStyles.headerLogo} // Reuse logo style
          />
          {decodeURIComponent(category)} {/* Display category name */}
          <div className={headerStyles.headerUnderline} /> {/* Reuse underline style */}
        </h1>
        {/* Optional: Add a subtitle if needed */}
        {/* <p className={headerStyles.headerDescription}>Browse modules in the {decodeURIComponent(category)} category.</p> */}
      </div>

      {/* Reuse MyPage grid styles, adjust if needed */}
      <div className={myPageStyles.moduleGrid}>
        {modules.map((module) => (
          <div
            key={module.id}
            className={myPageStyles.moduleCard} 
            style={{ 
              backgroundImage: `url(${getRandomBackground()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer' 
            }}
            // onClick={() => handleModuleClick(module.id)} // Add click handler later
          >
            <h3 className={myPageStyles.moduleName}>{module.name}</h3>

            {/* Info Box below the button */}
            <div className={styles.moduleInfoBox}> 
              <div className={styles.infoRow}>
                 <span>Module Price:</span>
                 <span>{module.price.toFixed(2)} ETH</span> 
              </div>
               <div className={styles.infoRow}>
                 <span>Total Purchases:</span>
                 <span>{module.purchaseCount}</span> 
              </div>
            </div>
            {/* Purchase Button - Moved below info box */}
            <button className={styles.purchaseButton}>
              Buy {/* Changed from 구매하기 */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
