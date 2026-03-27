import React from "react";
import { Link } from "react-router-dom";
import "./publicPages.css";

const LoginPage = () => {
  return (
    <main className="public-page auth-page">
      <section className="auth-card">
        <h1>Welcome back</h1>
        <p>Login to continue to your Titan Trades dashboard.</p>

        <form className="auth-form">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="••••••••" />

          <Link to="/dashboard" className="primary-btn auth-submit">
            Sign In
          </Link>
        </form>

        <p className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
