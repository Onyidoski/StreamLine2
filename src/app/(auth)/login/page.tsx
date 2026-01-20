'use client'

import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/app/(auth)/actions'
import { loginSchema } from '@/lib/schemas'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Link from 'next/link'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const res = await login(values)
      if (res?.error) {
        toast.error("Error signing in", {
          description: res.error,
        })
      } else {
        toast.success("Signed in successfully")
      }
    })
  }

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center bg-white px-8 py-12 lg:w-1/2 lg:px-20 xl:px-32">
        <div className="mb-12 flex items-center gap-2">
          <div className="flex items-center gap-2 font-bold text-xl text-[#00334E]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00334E]">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>StreamLine</span>
          </div>
        </div>

        <div className="w-full">
          <h1 className="mb-2 text-3xl font-semibold text-gray-900">Welcome back</h1>
          <p className="mb-8 text-gray-500">Please enter your details.</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your mail" className="bg-gray-50 border-gray-100 h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="bg-gray-50 border-gray-100 h-11 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm font-medium text-[#00334E] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00334E] hover:bg-[#00263a] h-11 text-[15px]"
                disabled={isPending}
              >
                {isPending ? "Signing in..." : "Log in"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500 text-sm">Or</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="h-11 border-gray-200 text-gray-700 font-normal hover:bg-gray-50">
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="h-11 border-gray-200 text-gray-700 font-normal hover:bg-gray-50">
                  <svg className="mr-2 h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.66-2.797 3.592v1.403h3.404l-1.36 3.667h-2.044v7.98H9.101Z" />
                  </svg>
                  Facebook
                </Button>
              </div>

            </form>
          </Form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-[#00334E] hover:underline">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Visuals (IDENTICAL TO REGISTER) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#00334E] relative flex-col items-center justify-center p-12 overflow-hidden">
        {/* Background Decorative Squares */}
        <div className="absolute top-0 right-0 p-8 grid grid-cols-3 gap-4 opacity-10">
          <div className="w-12 h-12 bg-white rounded-md"></div>
          <div className="w-12 h-12 bg-white rounded-md"></div>
          <div className="w-12 h-12 bg-white rounded-md"></div>
          <div className="w-12 h-12  rounded-md"></div>
          <div className="w-12 h-12 bg-white rounded-md"></div>
          <div className="w-12 h-12 bg-white rounded-md"></div>
        </div>

        {/* Dashboard Mockup Container */}
        <div className="relative w-full max-w-[500px] mb-16">

          {/* Main Card (Analytics) */}
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full relative z-10 bg-opacity-95 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-700">Analytics</h3>
              <div className="flex gap-2 text-xs">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">Weekly</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">Monthly</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-opacity-50">Yearly</span>
              </div>
            </div>
            {/* Chart Illustration (Simplified SVG) */}
            <div className="h-40 w-full relative">
              <svg viewBox="0 0 300 100" className="w-full h-full stroke-teal-700 max-h-[150px]" fill="none">
                <path d="M0 80 C 50 80, 50 30, 100 30 S 150 60, 200 60 S 250 40, 300 30" strokeWidth="2" strokeOpacity="0.5" />
                <path d="M0 60 C 40 70, 80 40, 120 40 S 180 80, 240 50 S 280 20, 300 20" stroke="#00334E" strokeWidth="2" />
                {/* Gradient Area under curve 1 */}
                <path d="M0 60 C 40 70, 80 40, 120 40 S 180 80, 240 50 S 280 20, 300 20 V 100 H 0 Z" fill="url(#gradient)" opacity="0.1" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00334E" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 uppercase">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
              </div>
            </div>
          </div>

          {/* Floating Card (Donut Chart) */}
          <div className="absolute -bottom-10 -right-4 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-5 w-48 z-20">
            <div className="relative w-32 h-32 mx-auto">
              {/* Donut Chart SVG */}
              <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                <path className="text-[#00334E]" strokeDasharray="42, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#00334E]">
                <span className="text-xs text-gray-500">Total</span>
                <span className="text-xl font-bold">42%</span>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center text-white max-w-md z-10 mt-12">
          <h2 className="text-2xl font-semibold mb-3">Maximize your efficiency</h2>
          <p className="text-blue-100/80 text-sm leading-relaxed">
            Welcome to StreamLine! The production ready CRM designed to help you organize data, manage relationships, and track success.
          </p>
        </div>

        {/* Decorative background blurs/elements */}
        <div className="absolute bottom-10 left-10 opacity-5">
          <div className="grid grid-cols-4 gap-4">
            <div className="w-8 h-8 rounded bg-white"></div>
            <div className="w-8 h-8 rounded bg-white"></div>
            <div className="w-8 h-8 rounded"></div>
            <div className="w-8 h-8 rounded bg-white"></div>
          </div>
        </div>

      </div>
    </div>
  )
}