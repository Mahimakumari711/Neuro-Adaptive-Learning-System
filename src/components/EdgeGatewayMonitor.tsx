import { useState, useEffect } from 'react';
import { Cpu, HardDrive, Wifi, Database, Activity, Zap, Server, GitBranch, ExternalLink, Cloud, Shield } from 'lucide-react';

interface SystemMetrics {
  cpuUsage: number;
  gpuUsage: number;
  memoryUsage: number;
  storageUsed: number;
  networkThroughput: number;
  mlInferences: number;
  messagesProcessed: number;
  uptime: number;
}

export function EdgeGatewayMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 45,
    gpuUsage: 32,
    memoryUsage: 62,
    storageUsed: 24300,
    networkThroughput: 156,
    mlInferences: 0,
    messagesProcessed: 0,
    uptime: 0,
  });

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        gpuUsage: Math.max(10, Math.min(70, prev.gpuUsage + (Math.random() - 0.5) * 8)),
        memoryUsage: Math.max(40, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        storageUsed: prev.storageUsed + Math.floor(Math.random() * 10),
        networkThroughput: Math.floor(Math.random() * 100) + 100,
        mlInferences: prev.mlInferences + Math.floor(Math.random() * 50) + 20,
        messagesProcessed: prev.messagesProcessed + Math.floor(Math.random() * 30) + 10,
        uptime: prev.uptime + 1,
      }));

      // Add random log entries
      if (Math.random() > 0.7) {
        const logTypes = [
          'INFO: Processing biometric data from 40 devices',
          'SUCCESS: ML model inference completed in 12ms',
          'INFO: Heart rate anomaly detected for Student #23',
          'SUCCESS: Data synchronized with Azure IoT Hub',
          'INFO: Local database updated with latest metrics',
          'WARNING: High stress level detected for 3 students',
          'INFO: Edge logic processed 1,247 data points',
          'SUCCESS: Model predictions cached locally',
        ];
        const newLog = `[${new Date().toLocaleTimeString()}] ${logTypes[Math.floor(Math.random() * logTypes.length)]}`;
        setLogs((prev) => [newLog, ...prev].slice(0, 20));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getUsageColor = (value: number) => {
    if (value >= 80) return 'text-red-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getUsageBarColor = (value: number) => {
    if (value >= 80) return 'bg-gradient-to-r from-red-500 to-red-600';
    if (value >= 60) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    return 'bg-gradient-to-r from-green-500 to-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <Server className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-white mb-1">Azure IoT Edge Gateway</h2>
                <p className="text-indigo-100 text-sm">
                  Industrial PC / Raspberry Pi - Real-time System Monitoring
                </p>
              </div>
            </div>
            <a
              href="https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Devices%2FIotHubs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Azure Portal
            </a>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Online</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Uptime: {Math.floor(metrics.uptime / 3600)}h {Math.floor((metrics.uptime % 3600) / 60)}m</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Secure Connection</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
            <span className={`text-3xl ${getUsageColor(metrics.cpuUsage)}`}>
              {metrics.cpuUsage.toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">CPU Usage</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all ${getUsageBarColor(metrics.cpuUsage)}`}
              style={{ width: `${metrics.cpuUsage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <span className={`text-3xl ${getUsageColor(metrics.gpuUsage)}`}>
              {metrics.gpuUsage.toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">GPU Usage</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all ${getUsageBarColor(metrics.gpuUsage)}`}
              style={{ width: `${metrics.gpuUsage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <Database className="w-8 h-8 text-green-600" />
            </div>
            <span className={`text-3xl ${getUsageColor(metrics.memoryUsage)}`}>
              {metrics.memoryUsage.toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Memory Usage</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all ${getUsageBarColor(metrics.memoryUsage)}`}
              style={{ width: `${metrics.memoryUsage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Wifi className="w-8 h-8 text-orange-600" />
            </div>
            <span className="text-3xl text-gray-900">
              {metrics.networkThroughput}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Network I/O (KB/s)</p>
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-3 rounded-full transition-all ${
                  i < Math.floor((metrics.networkThroughput / 200) * 10)
                    ? 'bg-gradient-to-t from-orange-500 to-orange-400'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Processing Units */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Cpu className="w-6 h-6 text-indigo-600" />
              </div>
              CPU/GPU Processing Unit
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Active
            </span>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">CPU Model</p>
                <p className="text-gray-900">Intel Core i7-11700K</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">GPU</p>
                <p className="text-gray-900">NVIDIA RTX 3060</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Cores</p>
                <p className="text-gray-900">8 Cores / 16 Threads</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <p className="text-sm text-gray-600 mb-1">Temperature</p>
                <p className="text-gray-900">54°C / 62°C</p>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg">
              <p className="text-sm opacity-90 mb-1">ML Inferences Processed</p>
              <p className="text-3xl">{metrics.mlInferences.toLocaleString()}</p>
              <div className="mt-2 flex items-center text-sm">
                <Activity className="w-4 h-4 mr-1" />
                Real-time Processing
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <HardDrive className="w-6 h-6 text-purple-600" />
              </div>
              Local SSMC Storage
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Healthy
            </span>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Total Capacity</p>
                <p className="text-gray-900">128 GB</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
                <p className="text-sm text-gray-600 mb-1">Used Space</p>
                <p className="text-gray-900">{(metrics.storageUsed / 1024).toFixed(1)} GB</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                <p className="text-sm text-gray-600 mb-1">ML Model Size</p>
                <p className="text-gray-900">1.2 GB</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Database Size</p>
                <p className="text-gray-900">4.8 GB</p>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl shadow-lg">
              <p className="text-sm opacity-90 mb-1">Messages Processed</p>
              <p className="text-3xl">{metrics.messagesProcessed.toLocaleString()}</p>
              <div className="mt-2 flex items-center text-sm">
                <Database className="w-4 h-4 mr-1" />
                Edge Processing
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ML Model Information */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-8 border-2 border-emerald-200">
        <h3 className="text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <GitBranch className="w-6 h-6 text-emerald-600" />
          </div>
          Machine Learning Model Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border-2 border-green-200 shadow-sm hover:shadow-md transition-all">
            <p className="text-sm text-gray-600 mb-2">Model Version</p>
            <p className="text-xl text-gray-900 mb-3">Engagement-Detector v2.3.1</p>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Active
            </span>
          </div>
          <div className="p-6 bg-white rounded-xl border-2 border-blue-200 shadow-sm hover:shadow-md transition-all">
            <p className="text-sm text-gray-600 mb-2">Training Accuracy</p>
            <p className="text-xl text-gray-900 mb-3">94.7%</p>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              <Shield className="w-4 h-4" />
              Validated
            </span>
          </div>
          <div className="p-6 bg-white rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-all">
            <p className="text-sm text-gray-600 mb-2">Avg Inference Time</p>
            <p className="text-xl text-gray-900 mb-3">12ms</p>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
              <Zap className="w-4 h-4" />
              Optimized
            </span>
          </div>
        </div>
      </div>

      {/* Offline Edge Logic */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Server className="w-6 h-6 text-orange-600" />
          </div>
          Offline Edge Logic & Local Processing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <span className="text-gray-900">Local Processing</span>
              <span className="px-4 py-1 bg-green-500 text-white rounded-full text-sm">Enabled</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <span className="text-gray-900">Data Caching</span>
              <span className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
              <span className="text-gray-900">Failover Mode</span>
              <span className="px-4 py-1 bg-gray-400 text-white rounded-full text-sm">Standby</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <span className="text-gray-900">SQL Database</span>
              <span className="px-4 py-1 bg-purple-500 text-white rounded-full text-sm">Running</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
              <span className="text-gray-900">Cache Hit Rate</span>
              <span className="text-xl text-indigo-600">87.3%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <span className="text-gray-900">Sync Pending</span>
              <span className="text-xl text-orange-600">247 records</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Connections */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Wifi className="w-6 h-6 text-blue-600" />
          </div>
          Network Connections & Azure Integration
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl hover:shadow-md transition-all">
            <div>
              <p className="text-gray-900 mb-1">Ethernet/LAN → Cassia x2000 Gateway</p>
              <p className="text-sm text-gray-600">1 Gbps Full Duplex</p>
            </div>
            <span className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-xl hover:shadow-md transition-all">
            <div>
              <p className="text-gray-900 mb-1">Wi-Fi Module → Local Router</p>
              <p className="text-sm text-gray-600">802.11ax (WiFi 6)</p>
            </div>
            <span className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-xl hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <Cloud className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-gray-900 mb-1">Internet → Azure IoT Hub</p>
                <p className="text-sm text-gray-600">Cloud Endpoint: eastus.azure-devices.net</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Active
              </span>
              <a
                href="https://portal.azure.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-gradient-to-br from-gray-900 to-slate-900 rounded-2xl shadow-2xl p-8">
        <h3 className="text-white mb-6 flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          System Logs (Real-time)
        </h3>
        <div className="bg-black/50 backdrop-blur-sm text-green-400 p-6 rounded-xl font-mono text-sm h-96 overflow-y-auto border border-green-500/30">
          {logs.length === 0 ? (
            <p className="text-gray-500 animate-pulse">Waiting for log entries...</p>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className="mb-2 hover:bg-green-500/10 px-3 py-2 rounded transition-all">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
