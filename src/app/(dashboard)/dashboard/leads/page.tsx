import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Search, Filter, Inbox, FileText } from "lucide-react"
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
        <div className="flex flex-col h-full w-full space-y-8">
            {/* Page Header - No border line as requested */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight text-[#00334E]">Leads</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your sales pipeline and track potential clients.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="hidden sm:flex">
                        <FileText className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <LeadSheet />
                </div>
            </div>

            {/* Main Content Card */}
            <Card className="flex-1 flex flex-col border shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b px-6 py-5 space-y-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <CardTitle>All Leads</CardTitle>
                            <CardDescription>
                                A list of all your leads and their current status.
                            </CardDescription>
                        </div>

                        {/* Search & Filter Controls */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                {/* Icon pushed further right (left-4) and perfectly centered vertically */}
                                {/* <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
                                {/* Padding increased (pl-12) to give space between icon and text */}
                                <Input
                                    placeholder="Filter leads..."
                                    className="pl-12 bg-background"
                                />
                            </div>
                            <Button variant="outline" size="icon" className="shrink-0">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0 flex-1">
                    {/* Desktop Table Header */}
                    <div className="hidden md:grid md:grid-cols-12 gap-4 border-b bg-muted/40 px-6 py-3 text-xs font-medium uppercase text-muted-foreground tracking-wider">
                        <div className="col-span-4 pl-2">Lead Details</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-4">Contact Info</div>
                        <div className="col-span-2 text-right pr-2">Est. Value</div>
                    </div>

                    {/* Leads List */}
                    <div className="divide-y divide-border">
                        {leads && leads.length > 0 ? (
                            leads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/30 transition-colors group cursor-pointer"
                                >
                                    {/* Lead Details (Name & Company) */}
                                    <div className="col-span-2 md:col-span-4 flex items-center gap-3 min-w-0 pl-2">
                                        <div className="h-9 w-9 rounded-full bg-[#00334E]/10 flex items-center justify-center text-[#00334E] font-medium text-xs shrink-0">
                                            {lead.first_name[0]}{lead.last_name[0]}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <p className="font-medium text-sm text-foreground truncate">
                                                {lead.first_name} {lead.last_name}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {lead.company || "No Company"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="col-span-2 md:col-span-2 flex items-center md:justify-start">
                                        <StatusBadge status={lead.status} />
                                    </div>

                                    {/* Contact Info (Desktop Only) */}
                                    <div className="hidden md:flex md:col-span-4 flex-col justify-center min-w-0">
                                        <p className="text-sm text-foreground truncate">{lead.email}</p>
                                        {lead.phone && (
                                            <p className="text-xs text-muted-foreground truncate">{lead.phone}</p>
                                        )}
                                    </div>

                                    {/* Value */}
                                    <div className="col-span-2 md:col-span-2 flex flex-col justify-center items-end pr-2">
                                        <span className="font-semibold text-sm text-foreground">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: lead.currency || 'USD' }).format(lead.value || 0)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in-50">
                                <div className="bg-muted/50 border-2 border-dashed border-muted p-6 rounded-full mb-4">
                                    <Inbox className="h-10 w-10 text-muted-foreground/50" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-1">No leads found</h3>
                                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                                    Your pipeline is currently empty. Add a new lead to start tracking your sales opportunities.
                                </p>
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
        'New': 'bg-blue-100 text-blue-700 border-blue-200',
        'Contacted': 'bg-indigo-100 text-indigo-700 border-indigo-200',
        'Qualified': 'bg-purple-100 text-purple-700 border-purple-200',
        'Proposal': 'bg-amber-100 text-amber-700 border-amber-200',
        'Closed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    }

    const defaultStyle = 'bg-gray-100 text-gray-700 border-gray-200'

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || defaultStyle}`}>
            {status}
        </span>
    )
}