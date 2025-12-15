import { useEffect, useState } from 'react'
import { AlertTriangle, Clock, ChevronDown, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

// Clinical Components
import EmergencySection from './EmergencySection'
import PatientCard from './PatientCard'
import ResolutionModal from './ResolutionModal'
import SystemVigilanceState from './SystemVigilanceState'

export default function TaskQueue() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [resolvingTask, setResolvingTask] = useState(null)
    const [acknowledgedTasks, setAcknowledgedTasks] = useState(new Set())
    const [expandedHigh, setExpandedHigh] = useState(true)
    const [expandedRoutine, setExpandedRoutine] = useState(false)

    useEffect(() => {
        fetchTasks()
        const interval = setInterval(fetchTasks, 5000)
        return () => clearInterval(interval)
    }, [])

    const fetchTasks = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || '';
            const token = import.meta.env.VITE_NURSE_TOKEN;

            const res = await fetch(`${apiUrl}/api/nurse/tasks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!res.ok) throw new Error('Auth or Network Error');
            const data = await res.json();
            if (data) setTasks(data);
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleAcknowledge = (task) => {
        setAcknowledgedTasks(prev => new Set(prev).add(task.id))
    }

    const handleResolveInit = (task) => {
        setResolvingTask(task)
    }

    const handleResolveSubmit = async (formData) => {
        if (!resolvingTask) return

        try {
            const apiUrl = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${apiUrl}/api/nurse/tasks/${resolvingTask.id}/resolve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_NURSE_TOKEN}`
                },
                body: JSON.stringify({
                    nurseId: 'Nurse_Station_A', // Static for now, consistent with spec
                    actionType: 'resolve',
                    ...formData
                })
            })
            if (res.ok) {
                setTasks(prev => prev.filter(t => t.id !== resolvingTask.id))
                setResolvingTask(null)
            } else {
                alert('Failed to resolve task - Check Network')
            }
        } catch (error) {
            console.error('Error resolving task:', error)
        }
    }

    // Partition Data
    const criticalTasks = tasks.filter(t => t.priority === 'critical')
    const highTasks = tasks.filter(t => t.priority === 'high')
    const routineTasks = tasks.filter(t => ['medium', 'low', 'normal'].includes(t.priority))

    if (loading) return <div className="p-12 text-center text-gray-400">Loading System...</div>

    return (
        <div className="space-y-6">

            {/* 1. EMERGENCY CHANNEL (Always Visible) */}
            <EmergencySection
                tasks={criticalTasks}
                onResolve={handleResolveInit}
                onAcknowledge={handleAcknowledge}
                acknowledgedTasks={acknowledgedTasks}
            />

            {/* 2. EMPTY STATE (Vigilance) */}
            {tasks.length === 0 && (
                <SystemVigilanceState />
            )}

            {/* 3. HIGH PRIORITY */}
            {highTasks.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden">
                    <button
                        onClick={() => setExpandedHigh(!expandedHigh)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-orange-50 text-orange-800 hover:bg-orange-100 transition-colors"
                    >
                        <div className="flex items-center gap-2 font-bold text-sm">
                            {expandedHigh ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            <AlertTriangle className="h-4 w-4" />
                            HIGH PRIORITY QUEUE
                        </div>
                        <span className="bg-orange-200 text-orange-900 px-2 py-0.5 rounded text-xs font-bold">
                            {highTasks.length} Pending
                        </span>
                    </button>

                    {expandedHigh && (
                        <ul className="divide-y divide-gray-100">
                            {highTasks.map(task => (
                                <PatientCard
                                    key={task.id}
                                    task={task}
                                    isCritical={false}
                                    onResolve={handleResolveInit}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* 4. ROUTINE WATCHLIST */}
            {routineTasks.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <button
                        onClick={() => setExpandedRoutine(!expandedRoutine)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-2 font-medium text-sm">
                            {expandedRoutine ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            <Clock className="h-4 w-4" />
                            ROUTINE WATCHLIST
                        </div>
                        <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">
                            {routineTasks.length} Monitoring
                        </span>
                    </button>

                    {expandedRoutine && (
                        <ul className="divide-y divide-gray-100">
                            {routineTasks.map(task => (
                                <PatientCard
                                    key={task.id}
                                    task={task}
                                    isCritical={false}
                                    onResolve={handleResolveInit}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* RESOLUTION MODAL */}
            {resolvingTask && (
                <ResolutionModal
                    task={resolvingTask}
                    onClose={() => setResolvingTask(null)}
                    onSubmit={handleResolveSubmit}
                />
            )}
        </div>
    )
}
