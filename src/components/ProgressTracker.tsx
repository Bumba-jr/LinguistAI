import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Trophy, Target, Zap, BarChart3, Loader2 } from 'lucide-react';
import { getStats } from '../services/dbService';
import { cn } from '../lib/utils';

const ProgressTracker = () => {
  const { user } = useAppStore();
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getStats(user.id)
        .then(setStatsData)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const defaultStats = [
    { label: 'Quizzes Completed', value: statsData?.totalQuizzes || '0', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Avg. Accuracy', value: statsData?.avgAccuracy || '0%', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Study Streak', value: '0 Days', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Total Questions', value: statsData?.totalQuestions || '0', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  if (!user) return null;

  return (
    <div className="relative" id="progress-tracker">
      {loading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
          <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {defaultStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
