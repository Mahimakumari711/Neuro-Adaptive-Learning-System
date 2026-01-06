import { useState, useEffect } from 'react';
import { StudentCard } from './StudentCard';
import { EngagementChart } from './EngagementChart';
import { SystemStatus } from './SystemStatus';
import { AlertPanel } from './AlertPanel';
import { Student, generateMockStudent, updateStudentData } from '../utils/mockData';

export function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  // Initialize students
  useEffect(() => {
    const initialStudents = Array.from({ length: 40 }, (_, i) => 
      generateMockStudent(i + 1)
    );
    setStudents(initialStudents);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStudents(prevStudents => 
        prevStudents.map(student => updateStudentData(student))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const avgEngagement = students.length > 0 
    ? Math.round(students.reduce((acc, s) => acc + s.engagement, 0) / students.length)
    : 0;

  const activeDevices = students.filter(s => s.connected).length;
  const alertCount = students.filter(s => s.engagement < 40).length;

  return (
    <div className="space-y-6">
      {/* System Status */}
      <SystemStatus 
        activeDevices={activeDevices}
        totalDevices={40}
        avgEngagement={avgEngagement}
        isConnected={isConnected}
      />

      {/* Alert Panel */}
      {alertCount > 0 && (
        <AlertPanel 
          students={students.filter(s => s.engagement < 40)}
        />
      )}

      {/* Engagement Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-gray-900 mb-4">Class Engagement Analytics</h2>
        <EngagementChart students={students} />
      </div>

      {/* Student Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-gray-900 mb-4">Individual Student Monitoring (40 Devices)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {students.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
}
