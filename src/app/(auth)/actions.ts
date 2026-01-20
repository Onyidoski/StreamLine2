'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { loginSchema, signupSchema } from '@/lib/schemas'

// Login remains the same (it should redirect)
export async function login(formData: z.infer<typeof loginSchema>) {
  const supabase = await createClient()
  const result = loginSchema.safeParse(formData)
  
  if (!result.success) {
    return { error: "Invalid data" }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// UPDATE THIS FUNCTION
export async function signup(formData: z.infer<typeof signupSchema>) {
  const supabase = await createClient()

  const result = signupSchema.safeParse(formData)
  if (!result.success) {
    return { error: "Invalid data" }
  }

  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        full_name: result.data.fullName,
      },
      // IMPORTANT: This tells Supabase where to send the user after they click the link
      // Make sure your site URL is set correctly in Supabase settings
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`, 
    },
  })

  if (error) {
    return { error: error.message }
  }

  // STOP: Do not redirect here. 
  // If email confirmation is on, data.session will be null.
  // We return success: true to tell the frontend to show the toast.
  return { success: true } 
}