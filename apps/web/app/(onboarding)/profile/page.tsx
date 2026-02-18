import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-haze px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-6 rounded-[36px] bg-white p-10 shadow-soft">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Onboarding 2/3</p>
          <h1 className="text-3xl font-semibold text-ink">Tell us about yourself</h1>
          <p className="text-sm text-slate-500">This helps us match you with the right feedback opportunities.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Full name" />
          <Input placeholder="Country" />
          <Input placeholder="City" />
          <Input placeholder="Age range" />
          <Input placeholder="Interests (comma separated)" className="md:col-span-2" />
        </div>
        <div className="flex justify-between">
          <Link href="/welcome" className="text-sm text-slate-500">Back</Link>
          <Link href="/consent">
            <Button>Continue</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
