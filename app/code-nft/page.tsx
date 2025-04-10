'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/code-nft.module.css';

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

interface NFTData {
  code: string;
  auditResult: any;
}

// TODO: 실제 0g Newton Testnet에 배포된 NFT 컬렉션 컨트랙트 주소로 변경
// const NFT_CONTRACT_ADDRESS = 'YOUR_NFT_CONTRACT_ADDRESS';

export default function CodeNFTPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [nftData, setNftData] = useState<NFTData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nftName, setNftName] = useState('Eliza Plugin');
  // Restored original wallet state
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  // Removed Thirdweb hooks (useAddress, useConnectionStatus)

  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false); // Restore if needed, or keep commented
  const [tempAddress, setTempAddress] = useState(''); // Restore if needed, or keep commented
  const [releaseDate, setReleaseDate] = useState('2025.04.07');
  const [isMinting, setIsMinting] = useState(false); 
  const [isMinted, setIsMinted] = useState(false);
  const [mintedTxHash, setMintedTxHash] = useState<string | null>(null); // Keep for potential future use
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fetchNFTData = async () => {
      if (!sessionId) return;

      setIsLoading(true);
      try {
        const response = await fetch(`/api/code-nft?sessionId=${sessionId}`);
        const data = await response.json();

        if (data.success) {
          setNftData(data.nftData);
        }
      } catch (error) {
        console.error('Error fetching NFT data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTData();
  }, [sessionId]);

  useEffect(() => {
    // 현재 날짜를 YYYY.MM.DD 형식으로 변환
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setReleaseDate(`${year}.${month}.${day}`);
  }, []);

  // Restored MetaMask connection handler
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

  // Restored simple mint handler (simulates minting completion)
  const handleMint = () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first.');
      return;
    }
    // alert(`Minting ${nftName} for ${connectedAddress} (Not implemented yet)`); // Remove alert

    // Simulate minting process and switch to minted view
    setIsFadingOut(true);
    setIsMinting(true); // Show loading state briefly
    
    setTimeout(() => {
      setMintedTxHash('0x62bd8e352d8d1294b786f71dca3b043dd5565fdd2ed878f5ac7874923f3d3895'); // Use the actual hash provided
      setIsMinted(true); // This will trigger the Mint Result view
      setIsMinting(false);
      setIsFadingOut(false);
    }, 1200); // Simulate minting time
  };

  const handleFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  // Restore address editing handlers if they were used, otherwise keep commented
  /*
  const handleAddressChange = () => {
    setIsEditingAddress(true);
    setTempAddress(connectedAddress || '');
  };
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempAddress.trim()) {
      // This logic doesn't make sense with direct MetaMask connection
      // setConnectedAddress(tempAddress.trim()); 
      setIsEditingAddress(false);
    }
  };
  const handleAddressCancel = () => {
    setIsEditingAddress(false);
    setTempAddress('');
  };
  */

  const handleNameChange = () => {
    if (!isMinted) {
      setIsEditingName(true);
      setTempName(nftName);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setNftName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
    setTempName('');
  };

  if (isLoading) {
    return <div className={styles.loadingState}>Loading NFT data...</div>;
  }

  return (
    <div className={styles.nftPage}>
      <div className={styles.nftContainer}>
        <div className={`${styles.header} ${isMinted ? styles.headerMinted : ''}`}>
          <p className={styles.headerSubtitle}>Modular Code Marketplace</p>
          <h1 className={styles.headerTitle}>
            <Image
              src="/images/marketplace-icon.svg"
              alt="Logo"
              width={32}
              height={32}
              className={styles.headerLogo}
            />
            Code NFT Mint
            <div className={styles.headerUnderline} />
          </h1>
          {isMinted ? (
            <p className={styles.headerDescription}>Congratulations! Your NFT Mint is successfully completed!</p>
          ) : (
            <p className={styles.headerDescription}>Name your NFT and verify to Mint!</p>
          )}
        </div>

        <div className={`${styles.cardsContainer} ${isMinted ? styles.cardsMinted : ''}`}>
          <div className={`${styles.cardWrapper} ${isMinted ? styles.cardMinted : ''} ${isFadingOut ? styles.cardFadingOut : ''}`}>
            <div className={`${styles.nftCard} ${isCardFlipped ? styles.flipped : ''}`}>
              <div className={styles.cardFront}>
                <Image
                  src="/images/star.svg"
                  alt="Star"
                  width={24}
                  height={24}
                  className={`${styles.starIcon} ${isMinted ? styles.starIconMinted : ''}`}
                  style={{
                    filter: isMinted ? 'brightness(0) saturate(100%) invert(43%) sepia(93%) saturate(1752%) hue-rotate(210deg) brightness(101%) contrast(101%)' : 'none'
                  }}
                />
                <div className={styles.nftTag}>NFT</div>
                {isMinted ? (
                  <div className={styles.nftInfo} style={{ '--display-line': 'none' } as React.CSSProperties}>
                    <div className={styles.nftTitle}>
                      {nftName}
                    </div>
                    <div className={`${styles.nftSubtitle} ${styles.mintedSubtitle}`}>
                      {connectedAddress ? `by "${connectedAddress.substring(0, 6)}...${connectedAddress.substring(connectedAddress.length - 4)}"` : 'by "Not Connected"'}
                    </div>
                    <div className={`${styles.nftCreator} ${styles.mintedCreator}`}>
                      Mint Tx Hash
                    </div>
                    <div className={styles.txHash}>
                       {mintedTxHash ? (
                         <a href={`https://chainscan-newton.0g.ai/tx/${mintedTxHash}`} target="_blank" rel="noopener noreferrer">
                            {`${mintedTxHash.substring(0, 10)}...${mintedTxHash.substring(mintedTxHash.length - 8)}`}
                         </a>
                        ) : (
                          '-'
                        )}
                    </div>
                    <div className={styles.resultReport}>
                      <div className={styles.resultRow}>
                        <span className={styles.resultLabel}>Scan Detail</span>
                        <a href={`https://storagescan-newton.0g.ai/submission/6479508?network=turbo`} target="_blank" rel="noopener noreferrer" className={styles.resultValue}><strong>0g Storage</strong></a>
                      </div>
                    </div>
                    <div className={styles.dateBox}>
                      <div className={styles.dateLabel}>Date of Release</div>
                      <div className={styles.dateValue}>{releaseDate}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    {isEditingName ? (
                      <form onSubmit={handleNameSubmit} className={styles.nameForm}>
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className={styles.nameInput}
                          placeholder="Enter NFT name"
                          autoFocus
                        />
                        <div className={styles.nameActions}>
                          <button type="submit" className={styles.nameSubmit}>Save</button>
                          <button type="button" onClick={handleNameCancel} className={styles.nameCancel}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <h2
                        className={`${styles.nftTitle} ${!isMinted ? styles.editable : ''}`}
                        onClick={handleNameChange}
                      >
                        {nftName}
                        <span className={styles.nftTitleUnderline}></span>
                      </h2>
                    )}
                    <p className={styles.nftSubtitle}>
                      give your NFT a name!
                    </p>
                    <div className={styles.nftInfo}>
                      <div className={styles.nftCreator}>Creator: {isWalletConnected ? `${connectedAddress?.substring(0, 6)}...${connectedAddress?.substring(connectedAddress.length - 4)}` : ' '}</div>
                      <div className={styles.dateBox}>
                        <div className={styles.dateLabel}>Date of Release</div>
                        <div className={styles.dateValue}>{releaseDate}</div>
                      </div>
                    </div>
                    <button className={styles.openCodesButton} onClick={handleFlip}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      open my codes
                    </button>
                  </>
                )}
              </div>

              <div className={styles.cardBack}>
                <button className={styles.closeButton} onClick={handleFlip}>×</button>
                <h3 className={styles.backTitle}>Verified Code</h3>
                <div className={styles.codeContent}>
                  <pre>
                    {nftData?.code || `// Example Verified Code\nfunction elizaPlugin() {\n  // AI 기반 대화형 인터페이스\n  class ElizaBot {\n    constructor() {\n      this.memory = new Map();\n      this.patterns = [\n        /* 검증된 패턴 매칭 로직 */\n      ];\n    }\n\n    async processInput(input) {\n      // 사용자 입력 처리\n      const response = await this.analyze(input);\n      return this.formatResponse(response);\n    }\n\n    analyze(input) {\n      // 고급 자연어 처리\n      return this.patterns.find(\n        pattern => pattern.match(input)\n      );\n    }\n  }\n\n  return new ElizaBot();\n}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {!isMinted && (
            <div className={`${styles.mintingSection} ${isMinting ? styles.minting : ''} ${isFadingOut ? styles.mintingFadingOut : ''}`}>
              <div className={`${styles.mintPrompt} ${isWalletConnected ? styles.hidden : ''}`}>
                <div className={styles.mintArrow}>
                  <Image src="/images/arrow-curve.svg" alt="Arrow" width={48} height={48} />
                </div>
                <p className={styles.mintReadyText}>ready to mint?</p>
              </div>

              <div className={styles.mintBox}>
                {/* Restored Wallet Address Box for connected state */}
                {isWalletConnected && connectedAddress && (
                  <div className={styles.walletAddressBox}>
                    <h3>Web3 Wallet Address</h3>
                    <Image src="/images/wallet.svg" alt="Wallet" width={20} height={20} />
                    <p className={styles.walletAddress}>{`${connectedAddress.substring(0, 6)}...${connectedAddress.substring(connectedAddress.length - 4)}`}</p>
                    {/* Restore Change address link if needed, but logic needs review */}
                    {/* <div className={styles.changeWalletText} onClick={handleAddressChange}>Change wallet address</div> */}
                  </div>
                )}

                {/* Wallet Message (show if not connected) */}
                {!isWalletConnected && (
                  <p className={styles.walletMessage}>
                    "Make sure to connect your<br />
                    <strong>Web3 Wallet</strong> to continue!"
                  </p>
                )}

                {/* Restored Connect/Connected Button Logic */}
                {isWalletConnected ? (
                  <button className={`${styles.connectWalletButton} ${styles.connected}`}>
                    <Image src="/images/checkbox.svg" alt="Connected" width={20} height={20} />
                    Wallet Connected
                  </button>
                ) : (
                  <button onClick={handleConnectWallet} className={styles.connectWalletButton}>
                    CONNECT WALLET
                    <Image src="/images/wallet.svg" alt="Wallet" width={20} height={20} />
                  </button>
                )}

                {/* Restored Mint Button */}
                <button
                  className={`${styles.mintButton} ${isWalletConnected ? styles.mintButtonEnabled : styles.mintButtonDisabled}`}
                  onClick={handleMint}
                  disabled={!isWalletConnected || isMinting}
                >
                  {isMinting ? (
                    <>
                      <span>Minting...</span>
                    </>
                   ) : (
                    <>
                      <Image
                        src="/images/rocket.svg"
                        alt="Rocket"
                        width={20}
                        height={20}
                        className={styles.rocketIcon}
                      />
                      <span>Mint</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 