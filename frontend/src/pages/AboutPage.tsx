
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-10">

        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-cyan-400">
            About EverLast
          </h1>

          <p className="text-xl font-medium">
            Moments fade. Connections last.
          </p>

          <p className="mx-auto max-w-xl text-slate-400">
            EverLast is a social space where people can share
            their thoughts, connect with others, and interact
            through posts and conversations.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-800 p-5">
            <h2 className="mb-2 text-xl font-semibold text-cyan-400">
              Share your thoughts
            </h2>
            <p className="text-slate-300">
              Create posts and let others see what's on your mind.
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <h2 className="mb-2 text-xl font-semibold text-cyan-400">
              Discover people
            </h2>
            <p className="text-slate-300">
              Visit profiles and learn more about other users.
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <h2 className="mb-2 text-xl font-semibold text-cyan-400">
              Show appreciation
            </h2>
            <p className="text-slate-300">
              Like posts and engage with what others share.
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <h2 className="mb-2 text-xl font-semibold text-cyan-400">
              Make connections
            </h2>
            <p className="text-slate-300">
              Explore a growing community of people and ideas.
            </p>
          </div>
        </section>

        <footer className="border-t border-slate-700 pt-6 text-center">
          <p className="text-lg font-semibold">
            Your story belongs here.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            EverLast — Share a little. Connect a lot.
          </p>
        </footer>

      </div>
    </div>
  );
};

export default AboutPage;
