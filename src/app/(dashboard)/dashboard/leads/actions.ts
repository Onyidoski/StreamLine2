'use server'

import { z } from "zod"
import { leadSchema } from "@/lib/schemas"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createLead(values: z.infer<typeof leadSchema>) {
  const supabase = await createClient()

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to create a lead" }
  }

  const { error } = await supabase
    .from('leads')
    .insert({
      ...values,
      user_id: user.id, // Securely attach the user ID
    })

  if (error) {
    console.error(error)
    return { error: "Failed to create lead" }
  }

  revalidatePath('/dashboard/leads')
  return { success: true }
}