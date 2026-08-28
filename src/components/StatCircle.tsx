export function StatCircle({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-straw-500">
        <span className="font-display text-base font-bold text-oat-50">{value}</span>
      </div>
      <p className="text-sm text-oat-100/80">{label}</p>
    </div>
  )
}
