import { AlertOctagon, CheckCircle2 } from 'lucide-react'
import PatientCard from './PatientCard'

export default function EmergencySection({ tasks, onResolve, onAcknowledge, acknowledgedTasks }) {
    const hasTasks = tasks.length > 0

    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            {/* Header / Status Strip */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${hasTasks
                    ? 'bg-red-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 border-b-emerald-100'
                }`}>
                <div className="flex items-center gap-2">
                    {hasTasks ? (
                        <>
                            <AlertOctagon className="h-5 w-5 animate-pulse" />
                            <span className="font-bold tracking-wide">EMERGENCY CHANNEL ACTIVE</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-semibold tracking-normal">Emergency Channel Clear</span>
                        </>
                    )}
                </div>

                {hasTasks && (
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold text-white">
                        {tasks.length} CRITICAL
                    </span>
                )}
            </div>

            {/* Task List */}
            {hasTasks && (
                <ul className="divide-y divide-gray-100">
                    {tasks.map(task => (
                        <PatientCard
                            key={task.id}
                            task={task}
                            isCritical={true}
                            onResolve={onResolve}
                            onAcknowledge={onAcknowledge}
                            acknowledged={acknowledgedTasks.has(task.id)}
                        />
                    ))}
                </ul>
            )}

            {/* Empty State (Green Strip is enough, but we add accessible structure) */}
            {!hasTasks && (
                <div className="hidden">System Clear</div>
            )}
        </section>
    )
}
