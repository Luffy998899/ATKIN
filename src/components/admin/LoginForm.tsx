"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setPending(false);
      return;
    }

    router.replace(params.get("next") ?? "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@atinhealthcare.com"
        autoComplete="username"
      />
      <Field
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
        autoComplete="current-password"
      />

      {error && <p className="label border-l-2 border-red-500 pl-3 text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={pending || !email || !password}
        className="group relative w-full overflow-hidden bg-ink px-8 py-4 label text-bone transition-colors duration-400 hover:text-ink disabled:opacity-50"
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
        <span className="relative z-10">{pending ? "Signing in…" : "Sign in"}</span>
      </button>
    </form>
  );
}

function Field({
  label, type, value, onChange, placeholder, autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <label className="relative block">
      <span className="label mb-2 block text-ink/45">{label}</span>
      <input
        type={type}
        value={value}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pb-3 pt-1 text-[0.95rem] text-ink outline-none placeholder:text-ink/25"
      />
      <span className="absolute inset-x-0 bottom-0 block h-px bg-rule" />
      <motion.span
        className="absolute inset-x-0 bottom-0 block h-px origin-left bg-leaf"
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </label>
  );
}
