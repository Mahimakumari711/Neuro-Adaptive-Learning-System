import { useEffect, useState } from 'react';
import { Bluetooth, Wifi, Database, Cloud, Activity, TrendingUp, Zap, CheckCircle, ExternalLink } from 'lucide-react';

export function SystemDashboard() {
  const [dataFlow, setDataFlow] = useState(0);
  const [stats, setStats] = useState({
    activeHeadsets: 50,
    dataRate: 0,
    bluetoothSignal: 98,
    cloudStatus: 'Connected',
    messagesProcessed: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow((prev) => (prev + 1) % 100);
      setStats((prev) => ({
        ...prev,
        dataRate: Math.floor(Math.random() * 50) + 150,
        messagesProcessed: prev.messagesProcessed + Math.floor(Math.random() * 10) + 5,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Azure Integration Banner */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <Cloud className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-white mb-1">Connected to Azure IoT Hub</h2>
                <p className="text-blue-100 text-sm">
                  Real-time data streaming from 50 IoT devices
                </p>
              </div>
            </div>
            <a
              href="https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Devices%2FIotHubs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Open in Azure
            </a>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-blue-100 text-sm mb-1">Region</p>
              <p className="text-xl">India</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-blue-100 text-sm mb-1">Tier</p>
              <p className="text-xl">Standard S1</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-blue-100 text-sm mb-1">Daily Quota</p>
              <p className="text-xl">400K / 400K</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-blue-100 text-sm mb-1">Latency</p>
              <p className="text-xl">23ms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Active Headsets</p>
          <p className="text-3xl text-gray-900">{stats.activeHeadsets}/50</p>
          <div className="mt-3 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            100% Online
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-1 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Data Rate</p>
          <p className="text-3xl text-gray-900">{stats.dataRate} <span className="text-lg text-gray-500">KB/s</span></p>
          <div className="mt-3 flex items-center text-sm text-blue-600">
            <Activity className="w-4 h-4 mr-1" />
            Real-time
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Bluetooth className="w-8 h-8 text-purple-600" />
            </div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Bluetooth Signal</p>
          <p className="text-3xl text-gray-900">{stats.bluetoothSignal}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${stats.bluetoothSignal}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Cloud className="w-8 h-8 text-indigo-600" />
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Live</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Messages Processed</p>
          <p className="text-3xl text-gray-900">{stats.messagesProcessed.toLocaleString()}</p>
          <div className="mt-3 flex items-center text-sm text-indigo-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +{Math.floor(Math.random() * 10) + 5}/sec
          </div>
        </div>
      </div>

      {/* Component Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Bluetooth className="w-6 h-6 text-blue-600" />
              </div>
              Cassia x2000 BLE Gateway
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Online
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Connected Devices</span>
              <span className="text-gray-900">50/50</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Connection Type</span>
              <span className="text-gray-900">Bluetooth 5.0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Range Coverage</span>
              <span className="text-gray-900">300m</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Protocol</span>
              <span className="text-gray-900">BLE 5.0 LE</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              Azure IoT Edge Gateway
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Running
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">CPU Usage</span>
              <span className="text-gray-900">45%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">ML Model</span>
              <span className="text-gray-900">v2.3.1</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Storage Used</span>
              <span className="text-gray-900">24.3 GB / 128 GB</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Runtime</span>
              <span className="text-gray-900">.NET Core 6.0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Wifi className="w-6 h-6 text-purple-600" />
              </div>
              Local WiFi Router
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Connected
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Network Type</span>
              <span className="text-gray-900">WiFi 6 (802.11ax)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Connected Devices</span>
              <span className="text-gray-900">3 devices</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Bandwidth</span>
              <span className="text-gray-900">1 Gbps</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Channel</span>
              <span className="text-gray-900">5 GHz Band</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-8 text-white hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <Cloud className="w-6 h-6" />
              </div>
              Azure IoT Hub
            </h3>
            <a
              href="https://portal.azure.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <span className="text-blue-100">Status</span>
              <span className="text-white">Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <span className="text-blue-100">Region</span>
              <span className="text-white">India</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <span className="text-blue-100">Messages Today</span>
              <span className="text-white">2.4M</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <span className="text-blue-100">Avg Latency</span>
              <span className="text-white">23ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Flow Animation */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-gray-900 mb-6">Real-Time Data Flow Pipeline</h3>
        <div className="flex items-center justify-between gap-4">
          <div className="text-center flex-1">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg transform hover:scale-110 transition-all">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <p className="text-sm text-gray-900">EEG Headbands</p>
            <p className="text-xs text-gray-500">50 Devices</p>
          </div>
          
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 rounded-full"
                style={{ width: `${dataFlow}%` }}
              />
            </div>
          </div>

          <div className="text-center flex-1">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg transform hover:scale-110 transition-all">
              <Bluetooth className="w-10 h-10 text-white" />
            </div>
            <p className="text-sm text-gray-900">BLE Gateway</p>
            <p className="text-xs text-gray-500">Cassia x2000</p>
          </div>

          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 rounded-full"
                style={{ width: `${(dataFlow + 20) % 100}%` }}
              />
            </div>
          </div>

          <div className="text-center flex-1">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg transform hover:scale-110 transition-all">
              <Database className="w-10 h-10 text-white" />
            </div>
            <p className="text-sm text-gray-900">IoT Edge</p>
            <p className="text-xs text-gray-500">Local ML</p>
          </div>

          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-1000 rounded-full"
                style={{ width: `${(dataFlow + 40) % 100}%` }}
              />
            </div>
          </div>

          <div className="text-center flex-1">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg transform hover:scale-110 transition-all">
              <Cloud className="w-10 h-10 text-white" />
            </div>
            <p className="text-sm text-gray-900">Azure Cloud</p>
            <p className="text-xs text-gray-500">IoT Hub</p>
          </div>
        </div>
      </div>
    </div>
  );
}
