'use client'
import { usePathname } from 'next/navigation'

export default function ShareButtons({ title }: { title: string }) {
  const path = usePathname()
  const url = `https://www.opensubsidies.org${path}`
  const text = encodeURIComponent(title)
  const u = encodeURIComponent(url)

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500">Share:</span>
      <a href={`https://twitter.com/intent/tweet?text=${text}&url=${u}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="Share on X">𝕏</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors" title="Share on Facebook">f</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors" title="Share on LinkedIn">in</a>
    </div>
  )
}
