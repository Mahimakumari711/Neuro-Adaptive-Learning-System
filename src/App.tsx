import { useState } from "react";
import { SystemDashboard } from "./components/SystemDashboard";
import { TeacherTablet } from "./components/TeacherTablet";
import { PowerBIDashboard } from "./components/PowerBIDashboard";
import { EdgeGatewayMonitor } from "./components/EdgeGatewayMonitor";
import {
  Monitor,
  Tablet,
  BarChart3,
  Server,
  Brain,
  Sparkles,
  ExternalLink,
} from "lucide-react";

type ViewType = "system" | "teacher" | "powerbi" | "edge";

export default function App() {
  const [currentView, setCurrentView] =
    useState<ViewType>("system");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-white mb-1 flex items-center gap-2">
                  Real-Time Student Engagement System
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </h1>
                <p className="text-blue-100 text-sm">
                  Powered by Microsoft Azure IoT & Power BI Analytics
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://portal.azure.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all border border-white/30"
              >
                <ExternalLink className="w-4 h-4" />
                Azure Portal
              </a>
              <a
                href="https://app.powerbi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-all shadow-lg"
              >
                <ExternalLink className="w-4 h-4" />
                Power BI
              </a>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setCurrentView("system")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all transform hover:scale-105 ${
                currentView === "system"
                  ? "bg-white text-blue-600 shadow-xl"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
              }`}
            >
              <Monitor className="w-5 h-5" />
              System Overview
            </button>
            <button
              onClick={() => setCurrentView("teacher")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all transform hover:scale-105 ${
                currentView === "teacher"
                  ? "bg-white text-blue-600 shadow-xl"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
              }`}
            >
              <Tablet className="w-5 h-5" />
              Teacher's Tablet
            </button>
            <button
              onClick={() => setCurrentView("powerbi")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all transform hover:scale-105 ${
                currentView === "powerbi"
                  ? "bg-white text-blue-600 shadow-xl"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Power BI Dashboard
            </button>
            <button
              onClick={() => setCurrentView("edge")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all transform hover:scale-105 ${
                currentView === "edge"
                  ? "bg-white text-blue-600 shadow-xl"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
              }`}
            >
              <Server className="w-5 h-5" />
              Azure IoT Edge
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === "system" && <SystemDashboard />}
        {currentView === "teacher" && <TeacherTablet />}
        {currentView === "powerbi" && <PowerBIDashboard />}
        {currentView === "edge" && <EdgeGatewayMonitor />}
      </div>

      {/* Footer */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2024 Real-Time Student Engagement System - Microsoft Technology Stack</p>
            <div className="flex gap-4">
              <a
                href="https://azure.microsoft.com/en-us/products/iot-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                Azure IoT Hub <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://powerbi.microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                Power BI <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
