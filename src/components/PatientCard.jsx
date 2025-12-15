import { Clock, Phone, CheckCircle, AlertOctagon, FileText, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

export default function PatientCard({ task, isCritical, onResolve, onAcknowledge, acknowledged }) {
    // Calculate Time Decay
    const created = new Date(task.created_at)
    const now = new Date()
    const diffMins = Math.floor((now - created) / 60000)

    // Urgency Visuals
    const isStale = diffMins > 60 // 1 hour
    const isUrgent = diffMins > 15 // 15 mins (Pulse)

    return (
        <li className={clsx(
            "p-4 border-b border-gray-100 transition-all",
            isCritical ? "bg-red-50/30 hover:bg-red-50" : "hover:bg-gray-50",
            isUrgent && isCritical && "animate-pulse-slow border-l-4 border-l-red-500", // Custom slow pulse
            isStale && "bg-yellow-50/30"
        )}>
            <div className="flex flex-col md:flex-row gap-4">

                {/* ZONE 1: WHO (Patient ID) */}
                <div className="w-full md:w-1/4 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                        {isCritical && <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-600 text-white tracking-wider">CRITICAL</span>}
                        {isStale && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-800">STALE (+1h)</span>}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 leading-tight">
                        {task.chronic_patients?.name || 'Unknown Patient'}
                    </h4>
                    <div className="text-sm text-gray-500 mt-0.5">
                        {task.chronic_patients?.age}y • {task.chronic_patients?.condition || 'N/A'}
                    </div>
                    <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-gray-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-gray-300">|</span>
                        <span>+{diffMins}m</span>
                    </div>
                </div>

                {/* ZONE 2: WHY (trigger & Context) */}
                <div className="flex-1 border-l border-gray-100 md:pl-4 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="mb-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                            <AlertTriangle className="h-3 w-3" />
                            Clinical Trigger
                        </div>
                        <div className="text-base font-semibold text-gray-900 bg-white border border-gray-200 rounded p-2 shadow-sm inline-block">
                            {task.reason}
                        </div>
                    </div>

                    {/* Context (Placeholder for now, but ready structure) */}
                    <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Latest Input</div>
                        <div className="text-sm text-gray-600 italic border-l-2 border-gray-300 pl-3 py-0.5">
                            "Patient reported symptoms via Voice/Text..."
                            {/* In future: task.context_summary */}
                        </div>
                    </div>
                </div>

                {/* ZONE 3: ACTIONS */}
                <div className="w-full md:w-auto flex flex-row md:flex-col gap-2 justify-start md:justify-center border-t md:border-t-0 pt-3 md:pt-0 pl-0 md:pl-4 border-l-0 md:border-l border-gray-100">

                    <button className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-xs font-bold rounded text-indigo-600 bg-white hover:bg-indigo-50 shadow-sm transition-colors min-w-[120px]">
                        <Phone className="h-3.5 w-3.5 mr-2" /> CALL
                    </button>

                    {isCritical && !acknowledged ? (
                        <button
                            onClick={() => onAcknowledge(task)}
                            className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2 border border-transparent text-xs font-bold rounded text-white bg-red-600 hover:bg-red-700 shadow-sm min-w-[120px] animate-pulse"
                        >
                            ACKNOWLEDGE
                        </button>
                    ) : (
                        <button
                            onClick={() => onResolve(task)}
                            className={clsx(
                                "flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2 border text-xs font-bold rounded shadow-sm min-w-[120px] transition-colors",
                                isCritical
                                    ? "border-red-600 text-red-600 bg-white hover:bg-red-50"
                                    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                            )}
                        >
                            <CheckCircle className="h-3.5 w-3.5 mr-2" /> RESOLVE
                        </button>
                    )}
                </div>
            </div>
        </li>
    )
}
