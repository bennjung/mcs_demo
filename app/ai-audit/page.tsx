import '../styles/ai-audit.css';

export default function AiAuditPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">AI Audit</h1>
      <div className="content-box">
        <p>Welcome to the AI Audit page. Here you can analyze and audit AI systems.</p>
        <div className="status-container">
          <div className="status-item">
            <h3>System Status</h3>
            <span className="status-badge">Active</span>
          </div>
          <div className="status-item">
            <h3>Last Audit</h3>
            <span className="status-text">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
} 