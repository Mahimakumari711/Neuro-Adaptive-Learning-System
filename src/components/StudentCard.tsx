import { Heart, Activity, Wifi, WifiOff } from 'lucide-react';
import { Student } from '../utils/mockData';

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const getEngagementColor = (engagement: number) => {
    if (engagement >= 70) return 'bg-green-500';
    if (engagement >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getEngagementBg = (engagement: number) => {
    if (engagement >= 70) return 'bg-green-50 border-green-200';
    if (engagement >= 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className={`border rounded-lg p-3 transition-all ${getEngagementBg(student.engagement)}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-gray-900 text-sm">Student {student.id}</div>
          <div className="text-xs text-gray-500">{student.name}</div>
        </div>
        {student.connected ? (
          <Wifi className="size-4 text-green-600" />
        ) : (
          <WifiOff className="size-4 text-gray-400" />
        )}
      </div>

      <div className="space-y-2">
        {/* Engagement Level */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-600">Engagement</span>
            <span className="text-gray-900">{student.engagement}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getEngagementColor(student.engagement)}`}
              style={{ width: `${student.engagement}%` }}
            />
          </div>
        </div>

        {/* Heart Rate */}
        <div className="flex items-center gap-2 text-xs">
          <Heart className="size-3 text-red-500" />
          <span className="text-gray-600">HR:</span>
          <span className="text-gray-900">{student.heartRate} bpm</span>
        </div>

        {/* HRV */}
        <div className="flex items-center gap-2 text-xs">
          <Activity className="size-3 text-blue-500" />
          <span className="text-gray-600">HRV:</span>
          <span className="text-gray-900">{student.hrv} ms</span>
        </div>

        {/* Alpha Wave */}
        <div className="flex items-center gap-2 text-xs">
          <Activity className="size-3 text-purple-500" />
          <span className="text-gray-600">Alpha:</span>
          <span className="text-gray-900">{student.alphaWave.toFixed(1)} μV</span>
        </div>
      </div>
    </div>
  );
}
