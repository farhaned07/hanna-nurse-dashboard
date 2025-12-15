import { Activity, ShieldCheck } from 'lucide-react'

export default function SystemVigilanceState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-200">
            <div className="relative mb-6">
                {/* Radar Ping Animation */}
                <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-20 animate-ping"></div>
                <div className="relative bg-white p-4 rounded-full shadow-sm border border-emerald-100">
                    <Activity className="h-12 w-12 text-emerald-500" />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                All Patients Stable
            </h2>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 font-medium">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Monitoring Active
            </div>

            <p className="max-w-xs text-center text-xs text-gray-400 mt-4 leading-relaxed">
                OneBrain Engine is analyzing incoming signals.
                Any vitals or voice abnormalities will trigger an immediate alert.
            </p>
        </div>
    )
}
