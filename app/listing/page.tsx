'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../styles/code-nft.module.css';
import listingStyles from '../styles/listing.module.css';

// Restored MetaMask provider type definition
interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] | object }) => Promise<any>;
  on: (event: string, listener: (...args: any[]) => void) => void;
  removeListener: (event: string, listener: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

interface ModuleData {
  code: string;
  // auditResult: any; // Remove auditResult as it's likely not needed for listing
}

// TODO: 실제 0g Newton Testnet에 배포된 NFT 컬렉션 컨트랙트 주소로 변경
// const NFT_CONTRACT_ADDRESS = 'YOUR_NFT_CONTRACT_ADDRESS';

const CATEGORIES = ["AI", "DeFi", "Gaming", "Utility", "Infra", "Other"];

export default function ListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleId = searchParams.get('moduleId');
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [moduleName, setModuleName] = useState('Eliza Plugin');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // State for new inputs
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // State for wallet connection
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!moduleId) return;

      setIsLoading(true);
      try {
        // Placeholder data for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate fetch time
        setModuleData({ code: `// Sample code for module ${moduleId}
function hello() {
  console.log("Hello from module ${moduleId}");
}` });
        // setModuleName(`Module ${moduleId}`); // Example dynamic name

      } catch (error) {
        console.error('Error fetching module data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  // Wallet Connection Handler
  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setConnectedAddress(accounts[0]);
          setIsWalletConnected(true);
          console.log('Wallet connected:', accounts[0]);
        } else {
          console.error('No accounts found.');
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to continue.');
    }
  };

  const handleFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleListModule = async () => {
    if (!isWalletConnected) {
       alert('Please connect your wallet first.');
       return;
     }
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      alert('Please enter a valid positive price.');
      return;
    }
    if (!selectedCategory) {
      alert('Please select a category.');
      return;
    }

    console.log('Simulating Module Listing:', {
      moduleId,
      moduleName,
      price: parseFloat(price),
      category: selectedCategory,
      listerAddress: connectedAddress 
    });

    // Simulate calling the smart contract and getting a transaction hash
    await new Promise(resolve => setTimeout(resolve, 500)); // Shorter delay if no visual loading
    const fakeTxHash = `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    console.log('Simulated Tx Hash:', fakeTxHash);
    
    // Construct the URL with query parameters
    const queryParams = new URLSearchParams({
      moduleId: moduleId || '',
      moduleName: moduleName,
      price: price,
      category: selectedCategory,
      txHash: fakeTxHash,
      listerAddress: connectedAddress || ''
    });

    // Redirect to the listing result page
    router.push(`/listingResult?${queryParams.toString()}`);
  };

  if (isLoading) {
    return <div className={styles.loadingState}>Loading Module data...</div>;
  }

  return (
    <div className={styles.nftPage}>
      <div className={styles.nftContainer}>
        <div className={styles.header}>
          <p className={styles.headerSubtitle}>Modular Code Marketplace</p>
          <h1 className={styles.headerTitle}>
            <Image
              src="/images/marketplace-icon.svg"
              alt="Logo"
              width={32}
              height={32}
              className={styles.headerLogo}
            />
            Module Listing
            <div className={styles.headerUnderline} />
          </h1>
          <p className={styles.headerDescription}>Set the price and category to list your module.</p>
        </div>

        <div className={styles.cardsContainer}>
          <div className={styles.cardWrapper}>
            <div className={`${styles.nftCard} ${isCardFlipped ? styles.flipped : ''}`}>
              <div className={`${styles.cardFront} ${listingStyles.cardFrontLayout}`}>
                <Image
                  src="/images/star.svg"
                  alt="Icon"
                  width={24}
                  height={24}
                  className={styles.starIcon}
                />
                <div className={styles.nftTag}>MODULE</div>
                <div className={styles.nftTitle} style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                  {moduleName || `Module ${moduleId || 'N/A'}`}
                  <span className={styles.nftTitleUnderline}></span>
                </div>
                <div className={listingStyles.listingSectionInsideCard}>
                  <h2 className={listingStyles.sectionTitle}>Listing Details</h2>
                  <div className={listingStyles.formGroup}>
                    <label htmlFor="price" className={listingStyles.formLabel}>Price (ETH)</label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g., 0.01"
                      className={listingStyles.formInput}
                      min="0"
                      step="any"
                    />
                  </div>
                  <div className={listingStyles.formGroup}>
                    <label className={listingStyles.formLabel}>Category</label>
                    <div className={listingStyles.radioGroup}>
                      {CATEGORIES.map((category) => (
                        <label key={category} className={listingStyles.radioLabel}>
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={listingStyles.radioInput}
                          />
                          {category}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleConnectWallet}
                    className={`${listingStyles.walletButton} ${isWalletConnected ? listingStyles.connected : ''}`}
                    disabled={isWalletConnected}
                  >
                    {isWalletConnected ? (
                      <>
                        <Image src="/images/checkbox.svg" alt="Connected" width={16} height={16} />
                        {`${connectedAddress?.substring(0, 6)}...${connectedAddress?.substring(connectedAddress.length - 4)}`}
                      </>
                    ) : (
                      <>
                        CONNECT WALLET
                        <Image src="/images/wallet.svg" alt="Wallet" width={20} height={20} />
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleListModule}
                    className={listingStyles.listButton}
                    disabled={!isWalletConnected}
                  >
                    List Module
                    <Image src="/images/send-icon.svg" alt="List" width={16} height={16} className={listingStyles.buttonIcon}/>
                  </button>
                </div>
                <button onClick={handleFlip} className={listingStyles.viewCodeButton}>
                  View Code Snippet →
                </button>
              </div>
              <div className={styles.cardBack}>
                <button onClick={handleFlip} className={styles.closeButton}>×</button>
                <h3 className={styles.backTitle}>Code Snippet</h3>
                <div className={styles.codeContent}>
                  <pre><code>{moduleData?.code || '// Code not available'}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 