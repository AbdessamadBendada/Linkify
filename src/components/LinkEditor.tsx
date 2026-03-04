'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Link = {
  id: string
  title: string
  url: string
  position: number
}

export default function LinkEditor({ userId }: { userId: string }) {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [newLink, setNewLink] = useState({ title: '', url: '' })
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', userId)
      .order('position')
    setLinks(data || [])
    setLoading(false)
  }

  const addLink = async () => {
    if (!newLink.title || !newLink.url) return
    setAdding(true)

    // Make sure URL has https://
    const url = newLink.url.startsWith('http')
      ? newLink.url
      : `https://${newLink.url}`

    const supabase = createClient()
    const { data } = await supabase
      .from('links')
      .insert({ user_id: userId, title: newLink.title, url, position: links.length })
      .select()
      .single()

    setLinks([...links, data])
    setNewLink({ title: '', url: '' })
    setAdding(false)
  }

  const deleteLink = async (id: string) => {
    const supabase = createClient()
    await supabase.from('links').delete().eq('id', id)
    setLinks(links.filter(l => l.id !== id))
  }

  const updateLink = async (id: string, field: string, value: string) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l))
    const supabase = createClient()
    await supabase.from('links').update({ [field]: value }).eq('id', id)
  }

  if (loading) return <p className="text-zinc-600 text-sm">Loading links...</p>

  return (
    <div className="space-y-3">
      {/* EXISTING LINKS */}
      {links.length === 0 && (
        <p className="text-zinc-600 text-sm py-4 text-center">No links yet. Add your first one below!</p>
      )}

      {links.map(link => (
        <div key={link.id} className="flex items-center gap-3 bg-black/30 border border-white/08 rounded-sm px-4 py-3 group">
          <div className="flex-1 grid grid-cols-2 gap-3">
            <input
              value={link.title}
              onChange={e => updateLink(link.id, 'title', e.target.value)}
              placeholder="Title"
              className="bg-transparent text-white text-sm outline-none border-b border-transparent focus:border-white/20 transition-colors pb-0.5"
            />
            <input
              value={link.url}
              onChange={e => updateLink(link.id, 'url', e.target.value)}
              placeholder="URL"
              className="bg-transparent text-zinc-400 text-sm outline-none border-b border-transparent focus:border-white/20 transition-colors pb-0.5"
            />
          </div>
          <button
            onClick={() => deleteLink(link.id)}
            className="text-zinc-700 hover:text-red-400 transition-colors text-lg leading-none opacity-0 group-hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}

      {/* ADD NEW LINK */}
      <div className="flex items-center gap-3 border border-dashed border-white/15 rounded-sm px-4 py-3 mt-4">
        <div className="flex-1 grid grid-cols-2 gap-3">
          <input
            value={newLink.title}
            onChange={e => setNewLink({ ...newLink, title: e.target.value })}
            placeholder="Title (e.g. Twitter)"
            className="bg-transparent text-white text-sm outline-none placeholder:text-zinc-600"
          />
          <input
            value={newLink.url}
            onChange={e => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="URL (e.g. twitter.com/you)"
            className="bg-transparent text-zinc-400 text-sm outline-none placeholder:text-zinc-600"
            onKeyDown={e => e.key === 'Enter' && addLink()}
          />
        </div>
        <button
          onClick={addLink}
          disabled={adding || !newLink.title || !newLink.url}
          className="bg-[#e8ff47] text-black text-xs font-medium tracking-widest px-4 py-2 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-30 whitespace-nowrap"
        >
          ADD +
        </button>
      </div>
    </div>
  )
}
