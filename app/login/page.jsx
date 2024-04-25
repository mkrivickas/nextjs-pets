"use client";

import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const loginTest = await axios.post("/login-action", {
      username: e.target.username.value,
      password: e.target.password.value,
    });

    console.log(loginTest.data.message);

    if (loginTest.data.message == "Success") {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="page-section">
      <div className="page-section-inner">
        <a href="/" className="small-link">
          &laquo; Bėk namo
        </a>

        <h1 className="page-section-title mb-big">Turėsime Tave perauklėti.</h1>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            autoComplete="off"
            className="form-field"
            type="text"
            name="username"
            placeholder="Vartotojas"
          />
          <input
            className="form-field"
            name="password"
            type="password"
            placeholder="Slaptažodis"
          />
          <button className="our-btn">Prisijungti</button>
        </form>
      </div>
    </div>
  );
}
