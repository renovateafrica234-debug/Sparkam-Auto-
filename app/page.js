"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (window.location.hash === "#_=_") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  if (status === "loading") return null;

  return (
    <div style={{ background: "black", color: "white", minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Sparkam Auto Live - App ID 1408305487572055</h1>

        {session ? (
          <>
            <img src={session.user?.image} alt="profile" style={{ width: 80, height: 80, borderRadius: 999, margin: "20px auto", display: "block" }} />
            <p>Welcome {session.user?.name}</p>
            <button onClick={() => signOut()} style={{ marginTop: 12, padding: "10px 18px", cursor: "pointer" }}>
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => signIn("facebook")} style={{ background: "#22ff88", color: "black", padding: "12px 20px", borderRadius: 8, cursor: "pointer", marginTop: 20, fontWeight: "bold" }}>
            Sign In with Facebook
          </button>
        )}
      </div>
    </div>
  );
          }
