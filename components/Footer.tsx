import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mono-label mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 sm:flex-row sm:justify-between">
        <p>© {profile.name}. All rights reserved.</p>
        <p>Designed and built in {profile.location}</p>
      </div>
    </footer>
  );
}
