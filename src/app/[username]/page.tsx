import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createClient()

  // Fetch profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  console.log('username from params:', username)
  console.log('profile found:', profile)
  console.log('error:', error)

  if (!profile) notFound()

  // Fetch links
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', profile.id)
    .order('position')

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">

        {/* PROFILE */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e8ff47] to-[#a8cc00] flex items-center justify-center text-black text-2xl font-bold mx-auto mb-4">
            {profile.full_name?.charAt(0).toUpperCase() || '?'}
          </div>
          <h1 className="text-white font-medium text-xl mb-1">
            {profile.full_name || profile.username}
          </h1>
          {profile.bio && (
            <p className="text-zinc-500 text-sm">{profile.bio}</p>
          )}
        </div>

        {/* LINKS */}
        <div className="space-y-3">
          {links && links.length > 0 ? (
            links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#141410] border border-white/10 rounded-sm px-6 py-4 text-white text-sm font-medium text-center hover:bg-[#1f1f18] hover:border-[#e8ff47]/30 transition-all duration-200"
              >
                {link.title}
              </a>
            ))
          ) : (
            <p className="text-zinc-600 text-sm text-center">No links yet.</p>
          )}
        </div>

        {/* FOOTER */}
        <div className="text-center mt-10">
          <a
            href="/signup"
            className="text-zinc-600 text-xs hover:text-[#e8ff47] transition-colors"
          >
            Made with LINKIFY
          </a>
        </div>

      </div>
    </div>
  )
}