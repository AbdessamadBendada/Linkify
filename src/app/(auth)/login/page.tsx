'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="bg-[#141410] border border-white/10 rounded-sm p-8">
      <h2 className="text-xl font-medium text-white mb-1">Welcome back</h2>
      <p className="text-zinc-500 text-sm mb-8">
        No account yet?{' '}
        <Link href="/signup" className="text-[#e8ff47] hover:underline">
          Sign up free
        </Link>
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-zinc-400 uppercase tracking-widest block mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#e8ff47]/50 transition-colors placeholder:text-zinc-600"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 uppercase tracking-widest block mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#e8ff47]/50 transition-colors placeholder:text-zinc-600"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-sm px-4 py-3">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#e8ff47] text-black font-medium text-sm tracking-widest py-3 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
        >
          {loading ? 'LOGGING IN...' : 'LOG IN →'}
        </button>
      </div>
    </div>
  )
}
