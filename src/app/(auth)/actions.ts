'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { loginSchema, signupSchema } from '@/lib/schemas' // <--- Import from lib

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

export async function signup(formData: z.infer<typeof signupSchema>) {
  const supabase = await createClient()

  const result = signupSchema.safeParse(formData)
  if (!result.success) {
    return { error: "Invalid data" }
  }

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        full_name: result.data.fullName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}