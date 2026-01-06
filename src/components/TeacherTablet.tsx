import { useState, useEffect } from 'react';
import { StudentBiometrics, AggregateMetrics } from '../types/student';
import { generateMockStudents, updateStudentMetrics } from '../utils/mockData';
import { Activity, AlertTriangle, Brain, Heart, TrendingUp, Users, Filter, Bell, X, Volume2, Zap } from 'lucide-react';

export function TeacherTablet() {
  const [students, setStudents] = useState<StudentBiometrics[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentBiometrics | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'idle' | 'alert'>('all');
  const [stressAlarmActive, setStressAlarmActive] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    setStudents(generateMockStudents());
    
    // Use a counter to track update cycles
    let updateCount = 0;
    
    const interval = setInterval(() => {
      updateCount++;
      // Every 10 cycles (20 seconds), we trigger a high stress period for 3 cycles (6 seconds)
      // This ensures the alarm triggers intermittently and automatically
      const isHighStressPeriod = (updateCount % 10) >= 7; 
      
      setStudents((prev) => prev.map(s => updateStudentMetrics(s, isHighStressPeriod)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredStudents = students.filter((s) => 
    filterStatus === 'all' ? true : s.status === filterStatus
  );

  const metrics: AggregateMetrics = {
    avgEngagement: students.reduce((sum, s) => sum + s.engagement, 0) / students.length,
    avgAttention: students.reduce((sum, s) => sum + s.attention, 0) / students.length,
    avgStress: students.reduce((sum, s) => sum + s.stress, 0) / students.length,
    activeStudents: students.filter((s) => s.status === 'active').length,
    alertCount: students.filter((s) => s.status === 'alert').length,
  };

  // Check if average stress exceeds 50% and trigger alarm
  useEffect(() => {
    if (metrics.avgStress > 50 && !stressAlarmActive) {
      setStressAlarmActive(true);
      setAudioPlaying(true);
      
      // Play alarm sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuFzvLZiTYIG2m98OScTgwOUKnn8LJjHQU5k9n0ynkpBSh+zPLaizsKGGS66+ynVhMMSKHh8bllHAU7ltr0yHYpBSuAzfPaiTcHG2m78OOcTQwOT6nl8LNkHgU6lNr0yHYnBSuAzPPaijkHGmm78OSbTgwNUKnn8LJjHQY7lNn0yHYpBSuAzPLaijcIG2m78OScTgwOUKno8LJjHQU6lNn0yHYpBSuAzPLaizsKGGS66+ynVhUMSKHh8bllHAU7lNn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU7ldn0yHgqBSh/zPDaizwLFmG46+mpWBYLRaDf87toHQU=');
      audio.loop = true;
      audio.play().catch(() => {
        setAudioPlaying(false);
      });

      // Store audio element to stop it later
      (window as any).stressAlarmAudio = audio;
    } else if (metrics.avgStress <= 50 && stressAlarmActive) {
      setStressAlarmActive(false);
      setAudioPlaying(false);
      
      // Stop alarm sound
      if ((window as any).stressAlarmAudio) {
        (window as any).stressAlarmAudio.pause();
        (window as any).stressAlarmAudio = null;
      }
    }
  }, [metrics.avgStress, stressAlarmActive]);

  const dismissAlarm = () => {
    setStressAlarmActive(false);
    setAudioPlaying(false);
    
    // Stop alarm sound
    if ((window as any).stressAlarmAudio) {
      (window as any).stressAlarmAudio.pause();
      (window as any).stressAlarmAudio = null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-300';
      case 'idle': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'alert': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getEngagementColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* STRESS ALARM BANNER - Only shows when avgStress > 50% */}
      {stressAlarmActive && (
        <div className="bg-red-600 text-white rounded-2xl shadow-2xl p-8 border-4 border-red-800 animate-pulse relative">
          <button
            onClick={dismissAlarm}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Bell className="w-16 h-16 animate-bounce" />
                <div className="absolute top-0 right-0 w-5 h-5 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h2 className="text-white mb-2 flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8" />
                  🚨 HIGH STRESS ALERT ACTIVATED! 🚨
                </h2>
                <p className="text-red-100 text-lg">
                  Average class stress level has exceeded 50% threshold - Immediate attention required!
                </p>
                <div className="mt-3 flex items-center gap-4">
                  {audioPlaying && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <Volume2 className="w-5 h-5 animate-pulse" />
                      <span>Alarm Ringing</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Heart className="w-5 h-5" />
                    <span>Time: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
              <p className="text-sm text-red-100 mb-1">Current Average Stress</p>
              <p className="text-6xl">{metrics.avgStress.toFixed(1)}%</p>
              <p className="text-sm text-red-100 mt-2">Threshold: 50%</p>
            </div>
          </div>
          
          {/* Action Items */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-red-700/50 backdrop-blur-sm p-4 rounded-xl border border-red-500">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Immediate Actions
              </h4>
              <ul className="text-red-100 text-sm space-y-1">
                <li>• Pause current activity</li>
                <li>• Implement 5-min break</li>
                <li>• Check room temperature</li>
              </ul>
            </div>
            <div className="bg-red-700/50 backdrop-blur-sm p-4 rounded-xl border border-red-500">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Students Affected
              </h4>
              <p className="text-red-100 text-sm">
                {students.filter(s => s.stress > 50).length} students above 50% stress
              </p>
              <p className="text-red-100 text-sm">
                {students.filter(s => s.stress > 70).length} students in critical zone
              </p>
            </div>
            <div className="bg-red-700/50 backdrop-blur-sm p-4 rounded-xl border border-red-500">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recommendations
              </h4>
              <p className="text-red-100 text-sm">
                Consider breathing exercises, reduce task difficulty, or switch to collaborative learning
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden flex justify-between items-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <h2 className="mb-2">Teacher's Mobile Tablet (C# App)</h2>
          <p className="text-blue-100">Real-time monitoring of student engagement and biometric data</p>
        </div>
      </div>

      {/* Status Legend - Explaining what IDLE means */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          Student Status Legend
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border-2 border-green-300 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-green-700">ACTIVE</span>
            </div>
            <p className="text-sm text-gray-700">
              Student is <strong>engaged and attentive</strong>. Both engagement and attention levels are ≥ 60%. Stress is normal.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border-2 border-yellow-300 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-700">IDLE</span>
            </div>
            <p className="text-sm text-gray-700">
              Student is <strong>disengaged or distracted</strong>. Either engagement &lt; 60% OR attention &lt; 60%. Needs re-engagement strategies.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border-2 border-red-300 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-red-700">ALERT</span>
            </div>
            <p className="text-sm text-gray-700">
              Student has <strong>high stress levels</strong> (&gt; 70%). Requires immediate attention and possible intervention.
            </p>
          </div>
        </div>
      </div>

      {/* Aggregate Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            <span className="text-sm text-gray-600">Avg Engagement</span>
          </div>
          <p className={`text-3xl ${getEngagementColor(metrics.avgEngagement)}`}>
            {metrics.avgEngagement.toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-gray-600">Avg Attention</span>
          </div>
          <p className={`text-3xl ${getEngagementColor(metrics.avgAttention)}`}>
            {metrics.avgAttention.toFixed(1)}%
          </p>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all ${
          stressAlarmActive 
            ? 'bg-red-600 border-red-800 animate-pulse' 
            : 'bg-white border-red-500'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Heart className={`w-6 h-6 ${stressAlarmActive ? 'text-white animate-bounce' : 'text-red-600'}`} />
            <span className={`text-sm ${stressAlarmActive ? 'text-red-100' : 'text-gray-600'}`}>Avg Stress</span>
          </div>
          <p className={`text-3xl ${stressAlarmActive ? 'text-white' : 'text-gray-900'}`}>
            {metrics.avgStress.toFixed(1)}%
          </p>
          {stressAlarmActive && (
            <p className="text-xs text-red-100 mt-2">⚠ CRITICAL LEVEL</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-green-600" />
            <span className="text-sm text-gray-600">Active Students</span>
          </div>
          <p className="text-3xl text-green-600">
            {metrics.activeStudents}/50
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <span className="text-sm text-gray-600">High Stress</span>
          </div>
          <p className="text-3xl text-orange-600">
            {metrics.alertCount}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-6 h-6 text-gray-600" />
          <span className="text-gray-900">Filter Students:</span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-5 py-2 rounded-xl transition-all transform hover:scale-105 ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({students.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-5 py-2 rounded-xl transition-all transform hover:scale-105 ${
              filterStatus === 'active'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active ({students.filter(s => s.status === 'active').length})
          </button>
          <button
            onClick={() => setFilterStatus('idle')}
            className={`px-5 py-2 rounded-xl transition-all transform hover:scale-105 ${
              filterStatus === 'idle'
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Idle ({students.filter(s => s.status === 'idle').length})
          </button>
          <button
            onClick={() => setFilterStatus('alert')}
            className={`px-5 py-2 rounded-xl transition-all transform hover:scale-105 ${
              filterStatus === 'alert'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Alert ({students.filter(s => s.status === 'alert').length})
          </button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            onClick={() => setSelectedStudent(student)}
            className={`bg-white rounded-2xl shadow-md p-5 cursor-pointer transition-all hover:shadow-xl transform hover:-translate-y-1 border-2 ${
              selectedStudent?.id === student.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-900">Student #{student.id}</p>
              <span className={`px-3 py-1 rounded-full text-xs border uppercase tracking-wide ${getStatusColor(student.status)}`}>
                {student.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{student.name}</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Engagement</span>
                <span className={`text-sm ${getEngagementColor(student.engagement)}`}>
                  {student.engagement.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    student.engagement >= 80 ? 'bg-green-500' :
                    student.engagement >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${student.engagement}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-3 pt-3 border-t">
                <span>HR: {student.heartRate.toFixed(0)} bpm</span>
                <span>Stress: {student.stress.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Student Detail */}
      {selectedStudent && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-500">
          <h3 className="text-gray-900 mb-6">
            Detailed View: {selectedStudent.name} (Student #{selectedStudent.id})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="text-gray-700">Engagement Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Engagement Level</span>
                    <span className={`text-sm ${getEngagementColor(selectedStudent.engagement)}`}>
                      {selectedStudent.engagement.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${selectedStudent.engagement}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Attention Level</span>
                    <span className={`text-sm ${getEngagementColor(selectedStudent.attention)}`}>
                      {selectedStudent.attention.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${selectedStudent.attention}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Stress Level</span>
                    <span className="text-sm text-gray-900">{selectedStudent.stress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full transition-all"
                      style={{ width: `${selectedStudent.stress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-gray-700">Biometric Data</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-gray-700">Heart Rate</span>
                  </div>
                  <span className="text-red-600">{selectedStudent.heartRate.toFixed(0)} bpm</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">HRV</span>
                  </div>
                  <span className="text-blue-600">{selectedStudent.hrv.toFixed(0)} ms</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700">Alpha EEG</span>
                  </div>
                  <span className="text-purple-600">{selectedStudent.eegAlpha.toFixed(1)} μV</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-gray-700">Status Information</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-sm text-gray-700">Current Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm border uppercase ${getStatusColor(selectedStudent.status)}`}>
                    {selectedStudent.status}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-sm text-gray-700">Last Update</span>
                  <span className="text-sm text-gray-900">
                    {selectedStudent.lastUpdate.toLocaleTimeString()}
                  </span>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Recommendation:</strong> {
                      selectedStudent.status === 'alert' 
                        ? 'High stress detected. Consider a break or change in activity.'
                        : selectedStudent.status === 'idle'
                        ? 'Low engagement/attention. Student appears disengaged or distracted. Try interactive activities to boost focus.'
                        : 'Student is actively engaged. Maintain current teaching approach.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
