export default function Loading() {
  return (
    <div className="min-h-screen bg-clinical-offwhite flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-clinical-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-ink-muted">Loading Medica...</p>
      </div>
    </div>
  );
}
