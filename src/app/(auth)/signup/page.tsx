'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async () => {
    setLoading(true)
    setError('')

    // Basic validation
    if (!form.username.match(/^[a-zA-Z0-9_]+$/)) {
      setError('Username can only contain letters, numbers and underscores')
      setLoading(false)
      return
    }

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username.toLowerCase(),
          full_name: form.fullName,
        },
      },
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
      <h2 className="text-xl font-medium text-white mb-1">Create your account</h2>
      <p className="text-zinc-500 text-sm mb-8">
        Already have one?{' '}
        <Link href="/login" className="text-[#e8ff47] hover:underline">
          Log in
        </Link>
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-zinc-400 uppercase tracking-widest block mb-2">
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            placeholder="Alex Rivera"
            value={form.fullName}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#e8ff47]/50 transition-colors placeholder:text-zinc-600"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 uppercase tracking-widest block mb-2">
            Username
          </label>
          <div className="flex items-center bg-black/40 border border-white/10 rounded-sm focus-within:border-[#e8ff47]/50 transition-colors">
            <span className="text-zinc-500 text-sm pl-4 pr-2">linkify.io/</span>
            <input
              name="username"
              type="text"
              placeholder="yourname"
              value={form.username}
              onChange={handleChange}
              className="flex-1 bg-transparent py-3 pr-4 text-white text-sm outline-none placeholder:text-zinc-600"
            />
          </div>
        </div>

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
            placeholder="Min. 6 characters"
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
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[#e8ff47] text-black font-medium text-sm tracking-widest py-3 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
        >
          {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
        </button>
      </div>
    </div>
  )
}