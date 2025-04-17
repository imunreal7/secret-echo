// frontend/src/pages/index.tsx
import React from "react";
import Link from "next/link";

const Home = () => {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Welcome to Secret Echo 👋</h1>
            <p>This is a simple chat app with AI powered responses</p>
            <div style={{ marginTop: "1rem" }}>
                <Link href="/login">Go to Login</Link> | <Link href="/signup">Signup</Link>
            </div>
        </div>
    );
};

export default Home;

