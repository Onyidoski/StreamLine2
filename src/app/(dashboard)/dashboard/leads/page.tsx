import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Inbox } from "lucide-react"
import { Input } from "@/components/ui/input"
import { LeadSheet } from "@/components/leads/lead-sheet"

export default async function LeadsPage() {
    const supabase = await createClient()

    // Fetch leads from Supabase
    const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching leads:", error)
    }

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#00334E]">Leads</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage and track your potential clients.
                    </p>
                </div>
                <div className="self-end sm:self-auto">
                    <LeadSheet />
                </div>
            </div>

            {/* Main Content Card */}
            <Card className="flex-1 flex flex-col border shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b bg-gray-50/40 px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-base font-semibold text-gray-800 whitespace-nowrap">
                            All Leads
                        </CardTitle>

                        {/* Search & Filter Controls */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-72">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name or company..."
                                    className="pl-9 bg-white border-gray-200 focus:border-[#00334E] focus:ring-[#00334E]"
                                />
                            </div>
                            <Button variant="outline" size="icon" className="border-gray-200 text-gray-600 hover:bg-gray-50 shrink-0">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0 flex-1">
                    {/* Desktop Table Header - Grid Layout */}
                    <div className="hidden md:grid md:grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50/50 px-6 py-3 text-xs font-medium uppercase text-gray-500 tracking-wider">
                        <div className="col-span-4">Name & Company</div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-3">Email</div>
                        <div className="col-span-2 text-right">Value</div>
                    </div>

                    {/* Leads List */}
                    <div className="divide-y divide-gray-100">
                        {leads && leads.length > 0 ? (
                            leads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50/30 transition-colors group cursor-pointer"
                                >
                                    {/* Name & Company (Mobile: Col 1, Desktop: Col 1-4) */}
                                    <div className="col-span-1 md:col-span-4 flex flex-col justify-center min-w-0">
                                        <p className="font-semibold text-sm text-gray-900 truncate">
                                            {lead.first_name} {lead.last_name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                            {lead.company || "No Company"}
                                        </p>

                                        {/* Mobile Status Badge */}
                                        <div className="md:hidden mt-2">
                                            <StatusBadge status={lead.status} />
                                        </div>
                                    </div>

                                    {/* Status (Desktop Only: Col 5-7) */}
                                    <div className="hidden md:flex md:col-span-3 items-center">
                                        <StatusBadge status={lead.status} />
                                    </div>

                                    {/* Email (Desktop Only: Col 8-10) */}
                                    <div className="hidden md:flex md:col-span-3 items-center text-sm text-gray-500 truncate">
                                        {lead.email}
                                    </div>

                                    {/* Value (Mobile: Col 2, Desktop: Col 11-12) */}
                                    <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-end">
                                        <span className="font-semibold text-sm text-gray-900">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: lead.currency || 'USD' }).format(lead.value || 0)}
                                        </span>
                                        <span className="text-[10px] text-gray-400 md:hidden uppercase tracking-wide mt-0.5">Value</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            /* Professional Empty State */
                            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                                <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-6 rounded-full mb-4">
                                    <Inbox className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">No leads found</h3>
                                <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
                                    You haven't added any leads yet. Start by creating a new lead to populate your sales pipeline.
                                </p>
                                {/* We reuse the LeadSheet button here for convenience if desired, or keep it top-only */}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// Helper component for consistent status badges
function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        'New': 'bg-blue-50 text-blue-700 border-blue-200',
        'Contacted': 'bg-indigo-50 text-indigo-700 border-indigo-200',
        'Qualified': 'bg-purple-50 text-purple-700 border-purple-200',
        'Proposal': 'bg-amber-50 text-amber-700 border-amber-200',
        'Closed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    }

    const defaultStyle = 'bg-gray-50 text-gray-700 border-gray-200'

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || defaultStyle}`}>
            {status}
        </span>
    )
}