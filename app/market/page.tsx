'use client';

import '../styles/market.css';
import { useRouter } from 'next/navigation';

export default function MarketPage() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/market/${encodeURIComponent(category)}`);
  };

  return (
    <div className="market-container">
      <div className="market-header">
        <h2 className="market-subtitle">Modular Code Marketplace</h2>
        <div className="market-title-wrapper">
          <img src="/images/marketplace-icon.svg" alt="Marketplace Icon" className="market-icon" />
          <h1 className="market-title">Module Category</h1>
        </div>
        <p className="market-description">"Come and choose what you were looking for!"</p>
      </div>
      
      <div className="module-grid">
        <div className="module-card ai" onClick={() => handleCategoryClick('AI')}>
          <h2>AI</h2>
          <p>AI modules for on-chain analysis, trading strategies.</p>
          <div className="module-stats">
            <p>Registered module count</p>
            <strong>3,366</strong>
          </div>
          <hr />
          <div className="module-tags">
            <span className="tag">Agent</span>
            <span className="tag">RAG</span>
            <span className="tag">MCP</span>
            <span className="tag">NLP</span>
            <span className="tag">Dall-E</span>
          </div>
        </div>

        <div className="module-card defi" onClick={() => handleCategoryClick('Defi')}>
          <h2>Defi</h2>
          <p>DeFi modules for yield optimization, lending, liquidity.</p>
          <div className="module-stats">
            <p>Registered module count</p>
            <strong>14,002</strong>
          </div>
          <hr />
          <div className="module-tags">
            <span className="tag">LP</span>
            <span className="tag">Stake</span>
            <span className="tag">Lending</span>
            <span className="tag">AMM</span>
            <span className="tag">Farm</span>
            <span className="tag">Dex</span>
          </div>
        </div>

        <div className="module-card wallet" onClick={() => handleCategoryClick('Wallet')}>
          <h2>Wallet</h2>
          <p>Secure wallets for multi-chain asset management, DApp integration.</p>
          <div className="module-stats">
            <p>Registered module count</p>
            <strong>2,105</strong>
          </div>
          <hr />
          <div className="module-tags">
            <span className="tag">Custody</span>
            <span className="tag">MultiSig</span>
            <span className="tag">Sign</span>
            <span className="tag">Absract</span>
          </div>
        </div>

        <div className="module-card privacy" onClick={() => handleCategoryClick('Privacy')}>
          <h2>Privacy</h2>
          <p>ZKP modules for anonymous transactions, data privacy.</p>
          <div className="module-stats">
            <p>Registered module count</p>
            <strong>1,890</strong>
          </div>
          <hr />
          <div className="module-tags">
            <span className="tag">ZKP</span>
            <span className="tag">Mixer</span>
            <span className="tag">Encrypt</span>
            <span className="tag">MEV</span>
            <span className="tag">OffChain</span>
            <span className="tag">AnonID</span>
          </div>
        </div>
      </div>
    </div>
  );
}
