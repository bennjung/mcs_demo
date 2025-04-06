'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/code-nft.module.css';

interface NFTData {
  code: string;
  auditResult: any;
}

export default function CodeNFTPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [nftData, setNftData] = useState<NFTData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nftName, setNftName] = useState('Eliza Plugin');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [walletAddress, setWalletAddress] = useState('0xdf23edfef');
  const [tempAddress, setTempAddress] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

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

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleMint = () => {
    console.log('Minting NFT:', nftName);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddressChange = () => {
    setIsEditingAddress(true);
    setTempAddress(walletAddress);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempAddress.trim()) {
      setWalletAddress(tempAddress.trim());
      setIsEditingAddress(false);
    }
  };

  const handleAddressCancel = () => {
    setIsEditingAddress(false);
    setTempAddress('');
  };

  if (isLoading) {
    return <div className={styles.loadingState}>Loading NFT data...</div>;
  }

  return (
    <div className={styles.nftPage}>
      <div className={styles.nftContainer}>
        {/* 헤더 */}
        <div className={styles.header}>
          <p className={styles.headerSubtitle}>Modular Code Marketplace</p>
          <h1 className={styles.headerTitle}>
            <span className={styles.headerLogo}>
              <Image src="/images/marketplace-icon.svg" alt="Logo" width={32} height={32} />
            </span>
            Code NFT Mint
            <span className={styles.headerUnderline}></span>
          </h1>
          <p className={styles.headerDescription}>Name your NFT and verify to Mint!</p>
        </div>

        {/* 카드 레이아웃 */}
        <div className={styles.cardsContainer}>
          {/* NFT 카드 */}
          <div className={styles.cardWrapper}>
            <div className={`${styles.nftCard} ${isFlipped ? styles.flipped : ''}`}>
              {/* 카드 앞면 */}
              <div className={styles.cardFront}>
                <div className={styles.nftTag}>NFT</div>
                <h2 className={styles.nftTitle}>
                  {nftName}
                  <span className={styles.nftTitleUnderline}></span>
                </h2>
                <p className={styles.nftSubtitle}>give your NFT a name!</p>

                <div className={styles.nftInfo}>
                  <p className={styles.nftCreator}>Creator: DEV1</p>
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
              </div>

              {/* 카드 뒷면 */}
              <div className={styles.cardBack}>
                <button className={styles.closeButton} onClick={handleFlip}>×</button>
                <h3 className={styles.backTitle}>Verified Code</h3>
                <div className={styles.codeContent}>
                  <pre>
                    {nftData?.code || `// Example Verified Code
function elizaPlugin() {
  // AI 기반 대화형 인터페이스
  class ElizaBot {
    constructor() {
      this.memory = new Map();
      this.patterns = [
        /* 검증된 패턴 매칭 로직 */
      ];
    }

    async processInput(input) {
      // 사용자 입력 처리
      const response = await this.analyze(input);
      return this.formatResponse(response);
    }

    analyze(input) {
      // 고급 자연어 처리
      return this.patterns.find(
        pattern => pattern.match(input)
      );
    }
  }

  return new ElizaBot();
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* 민팅 섹션 */}
          <div className={styles.mintingSection}>
            <div className={`${styles.mintPrompt} ${isWalletConnected ? styles.hidden : ''}`}>
              <div className={styles.mintArrow}>
                <Image src="/images/arrow-curve.svg" alt="Arrow" width={48} height={48} />
              </div>
              <p className={styles.mintReadyText}>ready to mint?</p>
            </div>

            <div className={styles.mintBox}>
              {isWalletConnected && (
                <div className={styles.walletAddressBox}>
                  <h3>Web3 Wallet Address</h3>
                  <Image src="/images/wallet.svg" alt="Wallet" width={20} height={20} />
                  {isEditingAddress ? (
                    <form onSubmit={handleAddressSubmit} className={styles.addressForm}>
                      <input
                        type="text"
                        value={tempAddress}
                        onChange={(e) => setTempAddress(e.target.value)}
                        className={styles.addressInput}
                        placeholder="Enter wallet address"
                      />
                      <div className={styles.addressActions}>
                        <button type="submit" className={styles.addressSubmit}>Save</button>
                        <button type="button" onClick={handleAddressCancel} className={styles.addressCancel}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className={styles.walletAddress}>{walletAddress}</p>
                      <div className={styles.changeWalletText} onClick={handleAddressChange}>
                        Change wallet address
                      </div>
                    </>
                  )}
                </div>
              )}

              <p className={styles.walletMessage}>
                "Make sure to connect your<br />
                <strong>Web3 Wallet</strong> to continue!"
              </p>
              
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

              <button
                className={`${styles.mintButton} ${isWalletConnected ? styles.mintButtonEnabled : styles.mintButtonDisabled}`}
                onClick={handleMint}
                disabled={!isWalletConnected}
              >
                <Image 
                  src="/images/rocket.svg" 
                  alt="Rocket" 
                  width={20} 
                  height={20} 
                  className={styles.rocketIcon}
                />
                <span>Mint</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 