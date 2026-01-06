import { Wifi, Cloud, Server, TrendingUp } from 'lucide-react';

interface SystemStatusProps {
  activeDevices: number;
  totalDevices: number;
  avgEngagement: number;
  isConnected: boolean;
}

export function SystemStatus({ activeDevices, totalDevices, avgEngagement, isConnected }: SystemStatusProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Azure IoT Hub Status */}
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Azure IoT Hub</div>
            <div className="text-2xl text-gray-900 mt-1">
              {isConnected ? 'Connected' : 'Offline'}
            </div>
          </div>
          <Cloud className={`size-8 ${isConnected ? 'text-blue-600' : 'text-gray-400'}`} />
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Edge Gateway: Active
        </div>
      </div>

      {/* Active Devices */}
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-600">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Active Devices</div>
            <div className="text-2xl text-gray-900 mt-1">
              {activeDevices}/{totalDevices}
            </div>
          </div>
          <Wifi className="size-8 text-green-600" />
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Cassia x2000 Gateway
        </div>
      </div>

      {/* Average Engagement */}
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-600">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
            <div className="text-2xl text-gray-900 mt-1">
              {avgEngagement}%
            </div>
          </div>
          <TrendingUp className="size-8 text-purple-600" />
        </div>
        <div className="mt-2 text-xs text-gray-500">
          ML Model Analysis
        </div>
      </div>

      {/* Edge Processing */}
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-600">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Edge Processing</div>
            <div className="text-2xl text-gray-900 mt-1">
              Active
            </div>
          </div>
          <Server className="size-8 text-orange-600" />
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Local SSMC Storage
        </div>
      </div>
    </div>
  );
}
