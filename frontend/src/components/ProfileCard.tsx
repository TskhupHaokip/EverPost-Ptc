import { useEffect, useRef, useState } from "react";
import type { ProfileProps } from "../models/model";

interface ProfileCardProps {
  profile: ProfileProps;
  isOwnProfile: boolean;
  username?: string;
}

interface PreviewImage {
  src: string;
  alt: string;
}

/* ---------- Image dialog (click image -> opens, click outside / X / Esc -> closes) ---------- */
const ImageDialog = ({
  src,
  alt,
  onClose,
}: PreviewImage & { onClose: () => void }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    // lock page scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      /* the backdrop click lands on the <dialog> itself, so target === currentTarget */
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto max-h-[85vh] w-[min(92vw,900px)] overflow-visible bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close image"
        className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/60"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <img
        src={src}
        alt={alt}
        className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl"
      />
    </dialog>
  );
};

/* ---------- Profile card ---------- */
const ProfileCard = ({ profile, isOwnProfile, username }: ProfileCardProps) => {
  const [preview, setPreview] = useState<PreviewImage | null>(null);

  const coverAlt = `${profile.nick_name}'s cover`;
  console.log(profile.pic)
  console.log(profile.cover)

  return (
    <>
      {/* No overflow-hidden here, so hover previews can float outside the card */}
      <div className="group relative w-full max-w-[340px] rounded-[24px] border border-gray-100 bg-white/80 shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800/80 dark:bg-slate-900/90 md:max-w-[440px]">
        {/* ---------- Cover ---------- */}
        <div className="group/cover relative">
          <button
            type="button"
            onClick={() => setPreview({ src: profile.cover, alt: coverAlt })}
            aria-label="View cover photo"
            className="block h-32 w-full cursor-zoom-in overflow-hidden rounded-t-[24px] bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-slate-800 md:h-44"
          >
            <img
              src={profile.cover}
              alt={coverAlt}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/cover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 rounded-t-[24px] bg-linear-to-t from-black/25 via-transparent to-transparent" />
          </button>

          {/* Hover preview (desktop / hover-capable screens only) */}
          <img
            src={profile.cover}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-full z-30 mt-3 hidden aspect-video w-[125%] -translate-x-1/2 scale-95 rounded-2xl object-cover opacity-0 shadow-2xl ring-1 ring-black/10 transition-all duration-200 ease-out group-hover/cover:scale-100 group-hover/cover:opacity-100 md:block"
          />
        </div>

        {/* ---------- Body ---------- */}
        <div className="relative px-6 pb-6 pt-16 text-center md:px-8 md:pb-8 md:pt-20">
          {/* Avatar */}
          <div className="group/avatar absolute -top-12 left-1/2 z-20 -translate-x-1/2 md:-top-16">
            <button
              type="button"
              onClick={() =>
                setPreview({ src: profile.pic, alt: profile.nick_name })
              }
              aria-label={`View ${profile.nick_name}'s profile picture`}
              className="block h-24 w-24 cursor-zoom-in rounded-full border-4 border-white bg-slate-50 shadow-md transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-900 dark:bg-slate-800 md:h-32 md:w-32"
            >
              <img
                src={profile.pic}
                alt={profile.nick_name}
                className="h-full w-full rounded-full object-cover"
              />
            </button>

            {/* Hover preview */}
            <img
              src={profile.pic}
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 hidden h-56 w-56 -translate-x-1/2 scale-90 rounded-2xl border-4 border-white object-cover opacity-0 shadow-2xl transition-all duration-200 ease-out group-hover/avatar:scale-100 group-hover/avatar:opacity-100 dark:border-slate-800 md:block"
            />
          </div>

          {/* Identity */}
          <div className="flex flex-col items-center gap-1">
            {username && (
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">
                {username}
              </h2>
            )}
            <span className="text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 md:text-sm">
              {profile.nick_name}
            </span>
          </div>

          {/* Bio */}
          <p className="mt-3 min-h-[44px] text-sm leading-relaxed text-gray-500 dark:text-gray-400 md:mt-4 md:text-base">
            {profile.bio || "No bio added yet."}
          </p>

          {/* Action */}
          <div className="mt-6 md:mt-8">
            {isOwnProfile ? (
              <button
                type="button"
                className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:shadow-none dark:focus:ring-offset-slate-900 md:py-3 md:text-base"
              >
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-700 md:py-3 md:text-base"
              >
                View Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {preview && <ImageDialog {...preview} onClose={() => setPreview(null)} />}
    </>
  );
};

export default ProfileCard;
