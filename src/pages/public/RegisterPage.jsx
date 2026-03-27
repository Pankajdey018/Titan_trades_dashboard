import React from "react";
import { Link } from "react-router-dom";
import "./publicPages.css";

const RegisterPage = () => {
  return (
    <main className="public-page auth-page">
      <section className="auth-card">
        <h1>Create your account</h1>
        <p>Get started with Titan Trades and access your trading workspace.</p>

        <form className="auth-form">
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" placeholder="Jane Doe" />

          <label htmlFor="register-email">Email</label>
          <input id="register-email" type="email" placeholder="you@example.com" />

          <label htmlFor="register-password">Password</label>
          <input id="register-password" type="password" placeholder="Create password" />

          <Link to="/dashboard" className="primary-btn auth-submit">
            Create Account
          </Link>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
