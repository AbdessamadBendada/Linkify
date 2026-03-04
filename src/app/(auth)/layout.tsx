export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-widest text-[#e8ff47]">
            LINKIFY
          </h1>
          <p className="text-zinc-500 text-sm mt-2">Your link, your identity</p>
        </div>
        {children}
      </div>
    </div>
  )
}