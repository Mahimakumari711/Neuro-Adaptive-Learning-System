import { AlertTriangle } from 'lucide-react';
import { Student } from '../utils/mockData';

interface AlertPanelProps {
  students: Student[];
}

export function AlertPanel({ students }: AlertPanelProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-red-900 mb-2">Low Engagement Alert</h3>
          <p className="text-sm text-red-700 mb-3">
            {students.length} student{students.length !== 1 ? 's' : ''} showing low engagement levels (&lt;40%)
          </p>
          <div className="flex flex-wrap gap-2">
            {students.slice(0, 10).map(student => (
              <div 
                key={student.id}
                className="bg-white border border-red-300 rounded px-3 py-1 text-sm text-red-900"
              >
                Student {student.id}: {student.engagement}%
              </div>
            ))}
            {students.length > 10 && (
              <div className="text-sm text-red-700 px-3 py-1">
                +{students.length - 10} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
