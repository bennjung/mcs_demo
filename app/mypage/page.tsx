import '../styles/mypage.css';

export default function MyPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">My Page</h1>
      <div className="content-box">
        <div className="profile-section">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <h2 className="profile-name">John Doe</h2>
            <p className="profile-email">john.doe@example.com</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Audits</span>
              <span className="stat-number">24</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Reports Submitted</span>
              <span className="stat-number">12</span>
            </div>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📊</div>
              <div className="activity-content">
                <div className="activity-title">Completed AI Audit</div>
                <div className="activity-date">2 hours ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <div className="activity-title">Submitted Report</div>
                <div className="activity-date">1 day ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
