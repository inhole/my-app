'use client';

import React from 'react';
import Link from 'next/link';
import './globals.css';

const Dashboard: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>대시보드</h1>
          <p>날씨와 도서 정보를 조회하세요</p>
        </header>
        <div className="dashboard">
          <Link href="/weather" className="dashboard-link">
            <div className="dashboard-card">
              <h2>🌤️ 날씨 정보</h2>
              <p>전 세계 도시의 날씨를 확인하세요</p>
            </div>
          </Link>
          <Link href="/book" className="dashboard-link">
            <div className="dashboard-card">
              <h2>📚 도서 정보</h2>
              <p>도서 목록을 관리하세요</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
