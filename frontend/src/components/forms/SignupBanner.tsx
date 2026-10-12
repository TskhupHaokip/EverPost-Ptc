
export default function SignupBanner() {
  return (
    <section className="relative hidden sm:block w-full overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-xl sm:p-10">
      {/* Development badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-sm font-medium text-amber-300">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
        In Development Mode
      </div>

      {/* Brand */}
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Ever<span className="text-sky-400">post</span>
      </h1>

      <p className="mt-3 text-xl font-semibold text-slate-200 sm:text-2xl">
        Your life. Your stories. Your legacy.
      </p>

      <p className="mt-4 max-w-xl leading-7 text-slate-400">
        Share moments, connect with people, save your memories,
        and prepare messages for the future. Choose your own
        inactivity period and manage your future messages whenever
        life changes.
      </p>

      {/* Features */}
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <span className="text-2xl">🌎</span>
          <h2 className="mt-2 font-semibold">Share Moments</h2>
          <p className="mt-1 text-sm text-slate-400">
            Posts, photos, and connections.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <span className="text-2xl">💙</span>
          <h2 className="mt-2 font-semibold">Save Memories</h2>
          <p className="mt-1 text-sm text-slate-400">
            Keep the moments that matter.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <span className="text-2xl">✉️</span>
          <h2 className="mt-2 font-semibold">Future Messages</h2>
          <p className="mt-1 text-sm text-slate-400">
            Prepare messages and customize your check-in timer.
          </p>
        </div>
      </div>

      {/* Development notice */}
      <div className="mt-7 rounded-xl border border-sky-400/20 bg-sky-400/10 p-4">
        <p className="font-semibold text-sky-300">
          🚧 We're building something meaningful.
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-300">
          Everpost is currently under development. Some features
          may be unavailable or unfinished while we work on the app.
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Made for today. Designed for tomorrow.
      </p>
    </section>
  );
}
