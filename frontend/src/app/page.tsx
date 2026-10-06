"use client";

import { useState } from "react";
import { pingBackend } from "../lib/api";


export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function testBackend() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await pingBackend();

      setMessage(data.message);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to connect to backend"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Frontend ↔ FastAPI Test</h1>

      <button
        onClick={testBackend}
        disabled={loading}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Testing..." : "Test Backend"}
      </button>

      {message && (
        <p style={{ marginTop: "20px", color: "green" }}>
          Backend response: {message}
        </p>
      )}

      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>
          Error: {error}
        </p>
      )}
    </main>
  );
}