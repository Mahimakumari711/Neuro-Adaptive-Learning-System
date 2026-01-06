import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { StudentBiometrics } from '../types/student';
import { generateMockStudents, updateStudentMetrics } from '../utils/mockData';
import { TrendingUp, Users, Activity, Brain, Calendar, Download, ExternalLink, Sparkles } from 'lucide-react';

export function PowerBIDashboard() {
  const [students, setStudents] = useState<StudentBiometrics[]>([]);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d'>('1h');

  useEffect(() => {
    setStudents(generateMockStudents());
    
    // Initialize historical data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: `${String(i).padStart(2, '0')}:00`,
      engagement: Math.floor(Math.random() * 30) + 60,
      attention: Math.floor(Math.random() * 30) + 60,
      stress: Math.floor(Math.random() * 30) + 30,
    }));
    setHistoricalData(initialData);

    const interval = setInterval(() => {
      setStudents((prev) => prev.map(updateStudentMetrics));
      
      // Update historical data
      setHistoricalData((prev) => {
        const newData = [...prev.slice(1)];
        const avgEngagement = students.reduce((sum, s) => sum + s.engagement, 0) / students.length;
        const avgAttention = students.reduce((sum, s) => sum + s.attention, 0) / students.length;
        const avgStress = students.reduce((sum, s) => sum + s.stress, 0) / students.length;
        
        newData.push({
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          engagement: avgEngagement,
          attention: avgAttention,
          stress: avgStress,
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Prepare data for charts
  const statusDistribution = [
    { name: 'Active', value: students.filter(s => s.status === 'active').length, color: '#10b981' },
    { name: 'Idle', value: students.filter(s => s.status === 'idle').length, color: '#f59e0b' },
    { name: 'Alert', value: students.filter(s => s.status === 'alert').length, color: '#ef4444' },
  ];

  const engagementRanges = [
    { range: '0-20%', count: students.filter(s => s.engagement <= 20).length },
    { range: '21-40%', count: students.filter(s => s.engagement > 20 && s.engagement <= 40).length },
    { range: '41-60%', count: students.filter(s => s.engagement > 40 && s.engagement <= 60).length },
    { range: '61-80%', count: students.filter(s => s.engagement > 60 && s.engagement <= 80).length },
    { range: '81-100%', count: students.filter(s => s.engagement > 80).length },
  ];

  const biometricData = students.slice(0, 10).map(s => ({
    name: s.name.split(' ')[1],
    heartRate: s.heartRate,
    hrv: s.hrv,
    eeg: s.eegAlpha,
  }));

  const avgMetrics = {
    engagement: students.reduce((sum, s) => sum + s.engagement, 0) / students.length,
    attention: students.reduce((sum, s) => sum + s.attention, 0) / students.length,
    stress: students.reduce((sum, s) => sum + s.stress, 0) / students.length,
    heartRate: students.reduce((sum, s) => sum + s.heartRate, 0) / students.length,
  };

  return (
    <div className="space-y-6">
      {/* Power BI Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 rounded-2xl shadow-2xl p-8 text-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/30 backdrop-blur-sm p-4 rounded-xl">
                <Sparkles className="w-10 h-10 text-gray-900" />
              </div>
              <div>
                <h2 className="text-gray-900 mb-1">Microsoft Power BI Analytics</h2>
                <p className="text-gray-800 text-sm">
                  Real-Time Student Engagement Intelligence
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-3 bg-white/30 backdrop-blur-sm text-gray-900 rounded-xl hover:bg-white/50 transition-all border border-white/50">
                <Download className="w-5 h-5" />
                Export Report
              </button>
              <a
                href="https://app.powerbi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
                Open Power BI
              </a>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-gray-800">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span>Updated: {new Date().toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Activity className="w-4 h-4" />
              <span>Live Data Stream</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden transform hover:scale-105 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Brain className="w-10 h-10 opacity-90" />
              <TrendingUp className="w-6 h-6 opacity-80" />
            </div>
            <p className="text-sm opacity-90 mb-1">Avg Engagement</p>
            <p className="text-4xl">{avgMetrics.engagement.toFixed(1)}%</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden transform hover:scale-105 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-10 h-10 opacity-90" />
              <TrendingUp className="w-6 h-6 opacity-80" />
            </div>
            <p className="text-sm opacity-90 mb-1">Avg Attention</p>
            <p className="text-4xl">{avgMetrics.attention.toFixed(1)}%</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden transform hover:scale-105 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-10 h-10 opacity-90" />
              <Activity className="w-6 h-6 opacity-80" />
            </div>
            <p className="text-sm opacity-90 mb-1">Active Students</p>
            <p className="text-4xl">{students.filter(s => s.status === 'active').length}/40</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden transform hover:scale-105 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-10 h-10 opacity-90" />
              <TrendingUp className="w-6 h-6 opacity-80" />
            </div>
            <p className="text-sm opacity-90 mb-1">Avg Heart Rate</p>
            <p className="text-4xl">{avgMetrics.heartRate.toFixed(0)} <span className="text-xl">bpm</span></p>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Time Range Analysis:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('1h')}
              className={`px-5 py-2 rounded-xl transition-all ${
                timeRange === '1h'
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last Hour
            </button>
            <button
              onClick={() => setTimeRange('24h')}
              className={`px-5 py-2 rounded-xl transition-all ${
                timeRange === '24h'
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 24 Hours
            </button>
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-5 py-2 rounded-xl transition-all ${
                timeRange === '7d'
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 7 Days
            </button>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends Over Time */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
            Engagement Metrics Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorAttention" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}
              />
              <Legend />
              <Area type="monotone" dataKey="engagement" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEngagement)" />
              <Area type="monotone" dataKey="attention" stroke="#10b981" fillOpacity={1} fill="url(#colorAttention)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-red-500 rounded-full"></div>
            Student Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            Engagement Level Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementRanges}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#d946ef" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}
              />
              <Legend />
              <Bar dataKey="count" fill="url(#colorBar)" name="Number of Students" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biometric Data Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-blue-500 rounded-full"></div>
            Biometric Data - Top 10 Students
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={biometricData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}
              />
              <Legend />
              <Bar dataKey="heartRate" fill="#ef4444" name="Heart Rate (bpm)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="hrv" fill="#3b82f6" name="HRV (ms)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stress Levels Over Time */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            Stress Levels Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}
              />
              <Legend />
              <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={3} dot={{ r: 5, fill: '#ef4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Panel */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            AI-Powered Insights
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-xl border-l-4 border-blue-500 shadow-sm">
              <p className="text-blue-900 text-sm">
                <strong>Class Engagement:</strong> {
                  avgMetrics.engagement >= 70 
                    ? 'Overall engagement is excellent. Students are highly focused.'
                    : avgMetrics.engagement >= 50
                    ? 'Moderate engagement. Consider interactive activities.'
                    : 'Low engagement detected. Recommend changing teaching approach.'
                }
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border-l-4 border-green-500 shadow-sm">
              <p className="text-green-900 text-sm">
                <strong>Peak Performance:</strong> {
                  students.filter(s => s.engagement > 80).length
                } students are performing at peak engagement levels.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border-l-4 border-yellow-500 shadow-sm">
              <p className="text-yellow-900 text-sm">
                <strong>Attention Required:</strong> {
                  students.filter(s => s.status === 'idle').length
                } students showing signs of disengagement.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border-l-4 border-red-500 shadow-sm">
              <p className="text-red-900 text-sm">
                <strong>Stress Alerts:</strong> {
                  students.filter(s => s.stress > 70).length
                } students experiencing elevated stress levels.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border-l-4 border-purple-500 shadow-sm">
              <p className="text-purple-900 text-sm">
                <strong>Biometric Summary:</strong> Average heart rate is {avgMetrics.heartRate.toFixed(0)} bpm, 
                indicating {avgMetrics.heartRate > 85 ? 'high' : avgMetrics.heartRate > 75 ? 'moderate' : 'low'} activity levels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          Student Details Table
        </h3>
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-900">ID</th>
              <th className="px-4 py-3 text-left text-gray-900">Name</th>
              <th className="px-4 py-3 text-left text-gray-900">Engagement</th>
              <th className="px-4 py-3 text-left text-gray-900">Attention</th>
              <th className="px-4 py-3 text-left text-gray-900">Stress</th>
              <th className="px-4 py-3 text-left text-gray-900">Heart Rate</th>
              <th className="px-4 py-3 text-left text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.slice(0, 15).map((student, idx) => (
              <tr key={student.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                <td className="px-4 py-3 text-gray-900">#{student.id}</td>
                <td className="px-4 py-3 text-gray-900">{student.name}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    student.engagement >= 80 ? 'bg-green-100 text-green-700' :
                    student.engagement >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {student.engagement.toFixed(0)}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    student.attention >= 80 ? 'bg-green-100 text-green-700' :
                    student.attention >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {student.attention.toFixed(0)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-900">{student.stress.toFixed(0)}%</td>
                <td className="px-4 py-3 text-gray-900">{student.heartRate.toFixed(0)} bpm</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide ${
                    student.status === 'active' ? 'bg-green-100 text-green-700 border border-green-300' :
                    student.status === 'idle' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                    'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
