'use client'

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { leadSchema } from "@/lib/schemas"
import { createLead } from "@/app/(dashboard)/dashboard/leads/actions"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"

type LeadFormValues = z.infer<typeof leadSchema>

export function LeadSheet() {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema) as any,
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            company: "",
            status: "New",
            value: 0,
        },
    })

    function onSubmit(values: LeadFormValues) {
        startTransition(async () => {
            const res = await createLead(values)
            if (res?.error) {
                toast.error(res.error)
            } else {
                toast.success("Lead created successfully")
                setOpen(false)
                form.reset()
            }
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="bg-[#00334E] hover:bg-[#00263a]">
                    <Plus className="mr-2 h-4 w-4" /> Add New Lead
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Add New Lead</SheetTitle>
                    <SheetDescription>
                        Add a new potential client to your pipeline.
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">

                        <div className="grid grid-cols-2 gap-4">
                            <FormField<LeadFormValues, "first_name">
                                control={form.control as any}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField<LeadFormValues, "last_name">
                                control={form.control as any}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField<LeadFormValues, "email">
                            control={form.control as any}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField<LeadFormValues, "company">
                                control={form.control as any}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Acme Inc." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField<LeadFormValues, "phone">
                                control={form.control as any}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 234..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField<LeadFormValues, "value">
                                control={form.control as any}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lead Value ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="0.00" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<LeadFormValues, "status">
                                control={form.control as any}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="New">New</SelectItem>
                                                <SelectItem value="Contacted">Contacted</SelectItem>
                                                <SelectItem value="Qualified">Qualified</SelectItem>
                                                <SelectItem value="Proposal">Proposal</SelectItem>
                                                <SelectItem value="Closed">Closed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit" disabled={isPending} className="bg-[#00334E]">
                                {isPending ? "Creating..." : "Create Lead"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}