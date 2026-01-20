import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

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
    <div className="flex-1 space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-[#00334E]">Leads Management</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-[#00334E] hover:bg-[#00263a]">
            <Plus className="mr-2 h-4 w-4" /> Add New Lead
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col border-none shadow-sm bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-700">All Leads</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search leads..." className="pl-8 bg-gray-50 border-gray-200" />
              </div>
              <Button variant="outline" size="icon" className="border-gray-200 text-gray-500">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1">
            {/* Simple Table Header */}
            <div className="grid grid-cols-5 gap-4 border-y border-gray-100 bg-gray-50/50 px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                <div className="col-span-2">Name & Company</div>
                <div>Status</div>
                <div>Email</div>
                <div className="text-right">Value</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
                {leads && leads.length > 0 ? (
                    leads.map((lead) => (
                        <div key={lead.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors">
                            <div className="col-span-2">
                                <p className="font-medium text-sm text-[#00334E]">{lead.first_name} {lead.last_name}</p>
                                <p className="text-xs text-gray-400">{lead.company || "No Company"}</p>
                            </div>
                            <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {lead.status}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 truncate">{lead.email}</div>
                            <div className="text-right text-sm font-medium text-gray-700">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: lead.currency || 'USD' }).format(lead.value || 0)}
                            </div>
                        </div>
                    ))
                ) : (
                     <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-gray-50 p-4 rounded-full mb-3">
                             <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No leads found</h3>
                        <p className="text-sm text-gray-500 max-w-sm mt-1 mb-4">
                            You haven't added any leads yet. Start by creating a new lead to track your sales pipeline.
                        </p>
                     </div>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}