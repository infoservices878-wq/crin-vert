import type { LucideIcon } from 'lucide-react'

export function ContactInfoCard({
  icon: Icon,
  title,
  detail,
}: {
  icon: LucideIcon
  title: string
  detail: string
}) {
  return (
    <div className="flex items-center gap-5 rounded-full border border-hunter-800/10 bg-oat-50 px-6 py-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-oat-200">
        <Icon className="h-6 w-6 text-hunter-800" strokeWidth={1.75} />
      </div>
      <div>
        <p className="font-display text-base font-bold text-hunter-900">{title}</p>
        <p className="mt-0.5 text-sm text-ink-600">{detail}</p>
      </div>
    </div>
  )
}
