'use client';
import { trpc } from '@/lib/trpc/client';
import { NeoCard } from '@/components/ui/neo-card';
import { Users } from 'lucide-react';

export default function DashboardPage() {
  const { data: stats, isLoading } = trpc.user.getStats.useQuery();

  return (
    <div className="space-y-10 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NeoCard className="flex items-center gap-6">
          <div className="p-4 rounded-2xl shadow-neo-in text-accent">
            <Users size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total Users
            </p>
            <h3 className="text-2xl font-black text-slate-700">
              {isLoading ? '...' : stats?.totalUsers ?? 0}
            </h3>
          </div>
        </NeoCard>
      </div>
    </div>
  );
}
