import { useState } from 'react'
import { X, Save, AlertCircle } from 'lucide-react'

export default function ResolutionModal({ task, onClose, onSubmit }) {
    const [outcome, setOutcome] = useState('')
    const [nextAction, setNextAction] = useState('none')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!outcome) {
            setError('Please select a clinical outcome.')
            return
        }
        onSubmit({ outcome, nextAction, notes })
    }

    return (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Log Clinical Resolution</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">TICKET #{task.id.slice(0, 8)}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {/* Patient Context */}
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-6 text-sm text-blue-900 flex gap-3 items-start">
                        <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
                        <div>
                            <span className="font-bold block text-blue-700">ALERT CONTEXT</span>
                            <span className="block mt-1">
                                Patient <span className="font-bold">{task.chronic_patients?.name}</span> triggered alert due to:
                                <span className="font-medium"> "{task.reason}"</span>
                            </span>
                        </div>
                    </div>

                    <form id="resolution-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* 1. OUTCOME */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Clinical Outcome <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2">
                                {[
                                    { val: 'called_stable', label: 'Patient Contacted - Stable' },
                                    { val: 'escalated_dr', label: 'Escalated to Doctor' },
                                    { val: 'sent_er', label: 'Sent to Emergency Room' },
                                    { val: 'false_alarm', label: 'False Alarm / System Error' },
                                    { val: 'no_answer', label: 'No Answer - Protocol Initiated' }
                                ].map(opt => (
                                    <label key={opt.val} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${outcome === opt.val ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="outcome"
                                            value={opt.val}
                                            checked={outcome === opt.val}
                                            onChange={e => { setOutcome(e.target.value); setError('') }}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                        />
                                        <span className="ml-3 text-sm font-medium text-gray-900">{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                            {error && <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {error}</p>}
                        </div>

                        {/* 2. NEXT ACTION */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Follow-up Action</label>
                            <select
                                value={nextAction} onChange={e => setNextAction(e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border bg-gray-50"
                            >
                                <option value="none">None - Close Ticket</option>
                                <option value="snooze_2h">Snooze 2 Hours (Re-check)</option>
                                <option value="check_tmr">Add to Tomorrow's Watchlist</option>
                            </select>
                        </div>

                        {/* 3. NOTES */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Clinical Notes</label>
                            <textarea
                                value={notes} onChange={e => setNotes(e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border min-h-[100px]"
                                placeholder="Describe interaction, vitals taken, and instructions given..."
                            />
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="resolution-form"
                        className="inline-flex items-center px-6 py-2 text-sm font-bold text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Log & Close
                    </button>
                </div>
            </div>
        </div>
    )
}
