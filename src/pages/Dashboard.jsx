import TaskQueue from '../components/TaskQueue'
import { LayoutDashboard, Users, Activity, Settings, HeartPulse, Shield, Clock } from 'lucide-react'

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
                <div className="h-16 flex items-center px-6 font-bold text-xl tracking-wider text-white/90 border-b border-white/10">
                    HANNA<span className="text-indigo-400">.RN</span>
                </div>
                <nav className="flex-1 px-3 py-6 space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-600 rounded-md text-sm font-medium text-white shadow-sm">
                        <LayoutDashboard className="h-4 w-4" />
                        Mission Control
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-white/5 hover:text-white rounded-md text-sm font-medium transition-colors">
                        <Users className="h-4 w-4" />
                        Patient List
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-white/5 hover:text-white rounded-md text-sm font-medium transition-colors">
                        <Activity className="h-4 w-4" />
                        Clinical History
                    </a>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <a href="#" className="flex items-center gap-3 px-2 py-2 text-slate-400 hover:text-white text-sm transition-colors">
                        <Settings className="h-4 w-4" />
                        Station Settings
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 border-b border-gray-200 z-10">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Mission Control</h1>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                            STATION A
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* System Status */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">LIVE MONITORING</span>
                                <span className="text-[10px] text-gray-400 font-mono">Synced: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>

                        {/* Nurse Profile */}
                        <div className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm border border-slate-200">
                            RN
                        </div>
                    </div>
                </header>

                {/* Dashboard Operations */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">

                        {/* Task Queue (Main Focus) */}
                        <div className="xl:col-span-3 space-y-6">
                            <TaskQueue />
                        </div>

                        {/* Clinical Vitals (Side Panel) */}
                        <div className="space-y-6">

                            {/* Clinical Load Card */}
                            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <HeartPulse className="h-4 w-4" />
                                    Clinical Vitals
                                </h3>
                                <dl className="space-y-4">
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                                        <dt className="text-sm text-gray-600">Active Patients</dt>
                                        <dd className="text-lg font-bold text-gray-900">12</dd>
                                    </div>
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                                        <dt className="text-sm text-gray-600">Time to Action</dt>
                                        <dd className="text-lg font-bold text-emerald-600">~2m</dd>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <dt className="text-sm text-gray-600">Shift Coverage</dt>
                                        <dd className="text-lg font-bold text-gray-900">Full</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* AI Status Card (Safe Language) */}
                            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    AI Support System
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                                    <span className="text-sm font-bold text-slate-700">OneBrain Engine Active</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Continuous analysis of patient voice and vital patterns. Abnormalities will trigger an immediate alert for review.
                                </p>
                            </div>

                            {/* Updates Footer */}
                            <div className="text-center">
                                <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-400 px-3 py-1 bg-gray-100 rounded-full">
                                    <Clock className="h-3 w-3" />
                                    Real-time WebSocket Connection
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                {/* HIPPA/PDPA Footer */}
                <footer className="bg-white border-t border-gray-200 py-3 px-8 text-center">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                        Confidential Health Data • Authorized Personnel Only • System v1.0.4
                    </p>
                </footer>
            </div>
        </div>
    )
}
