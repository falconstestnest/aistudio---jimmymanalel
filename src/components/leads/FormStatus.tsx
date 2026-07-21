export default function FormStatus({
  error,
  success,
  support,
}: {
  error?: string | null;
  success?: string | null;
  support?: string | null;
}) {
  if (!error && !success) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-xl border px-4 py-3 text-sm ${
        error
          ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      }`}
    >
      <p className="font-semibold text-white">{error || success}</p>
      {support ? <p className="mt-1 text-xs text-zinc-400">{support}</p> : null}
    </div>
  );
}
