'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import LinkEditor from '@/components/LinkEditor'

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(profile)
      setLoading(false)
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-zinc-500 tracking-widest text-sm animate-pulse">LOADING...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* NAV */}
   <nav className="border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur sticky top-0 z-10">
  <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
    <span className="text-[#e8ff47] font-black tracking-widest text-xl">LINKIFY</span>
    <div className="flex items-center gap-6">
      <a
        href={`/${profile?.username}`}
        target="_blank"
        className="text-zinc-400 hover:text-white text-sm transition-colors"
      >View page ↗</a>
      <button
        onClick={handleLogout}
        className="text-zinc-500 hover:text-white text-sm transition-colors"
      >
        Log out
      </button>
    </div>
  </div>
</nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-zinc-500 text-sm mb-1">Your page is live at</p>
          <a
            href={`/${profile?.username}`}
            target="_blank"
            className="text-[#e8ff47] hover:underline font-medium"
          >
            linkify.io/{profile?.username}
          </a>
        </div>

        {/* PROFILE SECTION */}
        <div className="bg-[#141410] border border-white/08 rounded-sm p-6 mb-6">
          <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-6">Profile</h2>
          <ProfileEditor profile={profile} onUpdate={setProfile} />
        </div>

        {/* LINKS SECTION */}
        <div className="bg-[#141410] border border-white/08 rounded-sm p-6">
          <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-6">Links</h2>
          <LinkEditor userId={profile?.id} />
        </div>
      </div>
    </div>
  )
}

function ProfileEditor({ profile, onUpdate }: { profile: any, onUpdate: (p: any) => void }) {
  const [form, setForm] = useState({ full_name: profile?.full_name || '', bio: profile?.bio || '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .update(form)
      .eq('id', profile.id)
      .select()
      .single()
    onUpdate(data)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-zinc-500 uppercase tracking-widest block mb-2">Display Name</label>
        <input
          type="text"
          value={form.full_name}
          onChange={e => setForm({ ...form, full_name: e.target.value })}
          className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#e8ff47]/50 transition-colors"
        />
      </div>
      <div>
        <label className="text-xs text-zinc-500 uppercase tracking-widest block mb-2">Bio</label>
        <input
          type="text"
          value={form.bio}
          onChange={e => setForm({ ...form, bio: e.target.value })}
          placeholder="A short description about you"
          className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#e8ff47]/50 transition-colors placeholder:text-zinc-600"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-[#e8ff47] text-black text-xs font-medium tracking-widest px-6 py-2.5 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {saved ? 'SAVED ✓' : saving ? 'SAVING...' : 'SAVE PROFILE'}
      </button>
    </div>
  )
}