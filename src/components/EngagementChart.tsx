import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Student } from '../utils/mockData';

interface EngagementChartProps {
  students: Student[];
}

export function EngagementChart({ students }: EngagementChartProps) {
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    const avgEngagement = students.length > 0 
      ? students.reduce((acc, s) => acc + s.engagement, 0) / students.length
      : 0;
    
    const avgHeartRate = students.length > 0
      ? students.reduce((acc, s) => acc + s.heartRate, 0) / students.length
      : 0;

    const avgHRV = students.length > 0
      ? students.reduce((acc, s) => acc + s.hrv, 0) / students.length
      : 0;

    const now = new Date();
    const timeLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    setHistoricalData(prev => {
      const newData = [...prev, {
        time: timeLabel,
        engagement: Math.round(avgEngagement),
        heartRate: Math.round(avgHeartRate),
        hrv: Math.round(avgHRV)
      }];
      return newData.slice(-15); // Keep last 15 data points
    });
  }, [students]);

  // Distribution data
  const highEngagement = students.filter(s => s.engagement >= 70).length;
  const mediumEngagement = students.filter(s => s.engagement >= 40 && s.engagement < 70).length;
  const lowEngagement = students.filter(s => s.engagement < 40).length;

  const pieData = [
    { name: 'High (≥70%)', value: highEngagement, color: '#22c55e' },
    { name: 'Medium (40-69%)', value: mediumEngagement, color: '#eab308' },
    { name: 'Low (<40%)', value: lowEngagement, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Trends */}
        <div>
          <h3 className="text-sm text-gray-700 mb-3">Real-Time Engagement Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Avg Engagement %"
                dot={{ fill: '#3b82f6', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Distribution */}
        <div>
          <h3 className="text-sm text-gray-700 mb-3">Engagement Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biometric Trends */}
      <div>
        <h3 className="text-sm text-gray-700 mb-3">Biometric Data Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="heartRate" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Avg Heart Rate (bpm)"
              dot={{ fill: '#ef4444', r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="hrv" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              name="Avg HRV (ms)"
              dot={{ fill: '#8b5cf6', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
