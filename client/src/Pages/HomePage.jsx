import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/HomePage.css";

const HomePage = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="hp-container">
      <nav className="hp-nav">
        <div className="nav-inner">
          <div className="logo">SkillSwap</div>
          <div className="nav-actions">
            {isAuthenticated ? (
              <>
                <span className="nav-greet">Hi, {user?.name?.split(' ')[0] ?? 'there'}</span>
                <Link to="/dashboard" className="btn">Dashboard</Link>
                <Link to="/profile" className="btn">Profile</Link>
                <Link to="/requests" className="btn">Requests</Link>
                <button className="btn" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">Log in</Link>
                <Link to="/signup" className="btn primary">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <header className="hp-hero">
        <div className="hp-hero-inner">
          <h1 className="hp-title">SkillSwap</h1>
          <p className="hp-sub">
            Swap skills with classmates — teach what you know, learn what you
            don't.
          </p>
          <div className="hp-cta">
            <a className="btn primary" href="#features">
              Get Started
            </a>
            <a className="btn" href="#how">
              How it works
            </a>
          </div>
        </div>
        <div className="hp-hero-art" aria-hidden="true">
          <div className="hp-blob" />
        </div>
      </header>

      <main>
        <section id="features" className="hp-features">
          <h2>What you can do</h2>
          <div className="cards">
            <article className="card">
              <div className="card-icon">🧑‍🏫</div>
              <h3>Teach a skill</h3>
              <p>
                Create a short listing for a skill you'd like to teach — coding,
                design, photography, and more.
              </p>
            </article>

            <article className="card">
              <div className="card-icon">🎓</div>
              <h3>Join a session</h3>
              <p>
                Find micro-lessons or practice sessions hosted by other students
                and join in-person or online.
              </p>
            </article>

            <article className="card">
              <div className="card-icon">🤝</div>
              <h3>Swap & grow</h3>
              <p>
                Exchange time and knowledge. Build your portfolio and earn peer
                recommendations.
              </p>
            </article>
          </div>
        </section>

        <section id="how" className="hp-how">
          <h2>How it works</h2>
          <ol className="steps">
            <li>
              <strong>Create a listing</strong>
              <span>
                {" "}
                — Describe what you can teach and how long a session takes.
              </span>
            </li>
            <li>
              <strong>Connect with learners</strong>
              <span> — Students request or join your session.</span>
            </li>
            <li>
              <strong>Swap & review</strong>
              <span>
                {" "}
                — Hold the session, leave feedback, and grow your reputation.
              </span>
            </li>
          </ol>
        </section>

        <section className="hp-action">
          <div className="action-inner">
            <h3>Ready to share what you know?</h3>
            <p>
              Make your first listing in a few quick steps — it only takes a
              minute.
            </p>
            <a className="btn primary large" href="#">
              Create a listing
            </a>
          </div>
        </section>
      </main>

      <footer className="hp-footer">
        <div className="footer-inner">
          <p>SkillSwap — a simple peer-to-peer skill exchange for students.</p>
          <small>Built for class assignment · Minimal demo UI</small>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
