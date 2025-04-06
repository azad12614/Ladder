// File: src/pages/Home.jsx
import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home-container">
      <section className="hero">
        <h1 className="hero-title">🪜Ladder Platform</h1>
        <p className="hero-subtitle">
          A Codeforces-based competitive programming training platform tailored
          for IIUCCPS Programmers.
        </p>
        <Link to="/view-problems" className="cta-btn">
          Start Solving
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🎯 Structured Ladders</h3>
          <p>
            Problems are categorized by rating and knowledge areas for gradual
            progression.
          </p>
        </div>
        <div className="feature-card">
          <h3>🔐 Admin Control</h3>
          <p>
            Secure access with authentication and role-based admin features.
          </p>
        </div>
        <div className="feature-card">
          <h3>📊 Progress Tracking</h3>
          <p>
            Track your Codeforces submissions and view your problem status in
            real time.
          </p>
        </div>
      </section>

      <section className="about">
        <h2>Why Ladder?</h2>
        <p>
          This platform was built with programmers in mind — a clean UI, smooth
          experience, and tools to help you train like a pro. From
          beginner-friendly problems to advanced rating-based ladders, it's all
          here.
        </p>
      </section>
    </main>
  );
};

export default Home;
