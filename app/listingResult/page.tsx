'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/code-nft.module.css';

// Keep EthereumProvider if needed for future interactions, otherwise remove
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

// Remove NFTData interface if not needed
/*
interface NFTData {
  code: string;
  auditResult: any;
}
*/

export default function ListingResultPage() { // Renamed component
  const searchParams = useSearchParams();
  
  // Get listing details from query parameters
  const moduleId = searchParams.get('moduleId');
  const moduleName = searchParams.get('moduleName') || `Module ${moduleId || 'N/A'}`; // Get name or fallback
  const price = searchParams.get('price');
  const category = searchParams.get('category');
  const txHash = searchParams.get('txHash');
  const listerAddress = searchParams.get('listerAddress'); // Get lister address if passed

  // Remove unnecessary states
  const [isLoading, setIsLoading] = useState(false); // Keep if there's any async loading needed
  // const [nftData, setNftData] = useState<NFTData | null>(null);
  // const [nftName, setNftName] = useState('Eliza Plugin');
  // const [isWalletConnected, setIsWalletConnected] = useState(false);
  // const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  // const [isCardFlipped, setIsCardFlipped] = useState(false);
  // const [isEditingAddress, setIsEditingAddress] = useState(false); 
  // const [tempAddress, setTempAddress] = useState(''); 
  const [releaseDate, setReleaseDate] = useState('-'); // Use listing date or remove
  // const [isMinting, setIsMinting] = useState(false); 
  // const [isMinted, setIsMinted] = useState(false); // Assume page load means success
  // const [mintedTxHash, setMintedTxHash] = useState<string | null>(null); 
  // const [isEditingName, setIsEditingName] = useState(false);
  // const [tempName, setTempName] = useState('');
  // const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Set listing date (or fetch if needed)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setReleaseDate(`${year}.${month}.${day}`);
    
    // No data fetching needed if all info is in query params
    // Remove fetchNFTData useEffect

  }, []); // Run once on mount

  // Remove handleConnectWallet, handleMint, handleFlip, handleNameChange, etc.

  if (isLoading) { // Keep if loading state is used
    return <div className={styles.loadingState}>Loading Listing Details...</div>;
  }

  // Helper to format address
  const formatAddress = (address: string | null) => {
    if (!address) return 'N/A';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Helper to format transaction hash
   const formatTxHash = (hash: string | null) => {
     if (!hash) return 'N/A';
     return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
   };


  return (
    <div className={styles.nftPage}>
      <div className={styles.nftContainer}>
        {/* --- Header --- */}
        <div className={`${styles.header} ${styles.headerMinted}`}> {/* Apply minted style directly */}
          <p className={styles.headerSubtitle}>Modular Code Marketplace</p>
          <h1 className={styles.headerTitle}>
            <Image
              src="/images/marketplace-icon.svg"
              alt="Logo"
              width={32}
              height={32}
              className={styles.headerLogo}
            />
            Module Listing Successful {/* Updated Title */}
            <div className={styles.headerUnderline} />
          </h1>
          <p className={styles.headerDescription}>Congratulations! Your module has been successfully listed!</p> {/* Updated Description */}
        </div>

        {/* --- Result Card --- */}
        {/* Use cardsContainer and cardWrapper for consistent layout */}
        <div className={`${styles.cardsContainer} ${styles.cardsMinted}`}> 
          <div className={`${styles.cardWrapper} ${styles.cardMinted}`}> 
            {/* Use nftCard for styling, no flip needed here */}
            <div className={styles.nftCard}>
              {/* Use cardFront for background/padding */}
              <div className={styles.cardFront}>
                <Image
                  src="/images/star.svg" // Or listing success icon
                  alt="Success"
                  width={24}
                  height={24}
                  className={styles.starIcon} // Adjust style if needed
                   style={{ filter: 'brightness(0) saturate(100%) invert(43%) sepia(93%) saturate(1752%) hue-rotate(210deg) brightness(101%) contrast(101%)' }} // Example success color filter
                />
                <div className={styles.nftTag}>LISTED</div> {/* Updated Tag */}
                
                {/* Display Listing Info */}
                <div className={styles.nftInfo} style={{ '--display-line': 'none' } as React.CSSProperties}>
                  <div className={styles.nftTitle}>
                    {moduleName}
                    <span className={styles.nftTitleUnderline}></span>
                  </div>
                  <div className={`${styles.nftSubtitle} ${styles.mintedSubtitle}`}>
                    Listed by: {formatAddress(listerAddress)}
                  </div>
                  
                  {/* Listing Details Section */}
                  <div className={styles.resultReport} style={{ marginTop: '1rem' }}> 
                    <div className={styles.resultRow}>
                      <span className={styles.resultLabel}>Price</span>
                      <span className={styles.resultValue}>{price ? `${price} ETH` : 'N/A'}</span>
                    </div>
                     <div className={styles.resultRow}>
                      <span className={styles.resultLabel}>Category</span>
                      <span className={styles.resultValue}>{category || 'N/A'}</span>
                    </div>
                    <div className={styles.resultRow}>
                       <span className={styles.resultLabel}>Listing Tx Hash</span>
                       {txHash ? (
                         <a 
                           href={`https://chainscan-newton.0g.ai/tx/${txHash}`} // Link to explorer
                           target="_blank" 
                           rel="noopener noreferrer"
                           className={styles.resultValue} // Style as link
                           style={{ textDecoration: 'underline' }} 
                         >
                            {formatTxHash(txHash)}
                         </a>
                        ) : (
                          <span className={styles.resultValue}>{formatTxHash(txHash)}</span>
                        )}
                    </div>
                    {/* Add other relevant details if needed */}
                  </div>

                  <div className={styles.dateBox}>
                    <div className={styles.dateLabel}>Date Listed</div>
                    <div className={styles.dateValue}>{releaseDate}</div>
                  </div>
                </div>
              </div>
              {/* Remove Card Back */} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 