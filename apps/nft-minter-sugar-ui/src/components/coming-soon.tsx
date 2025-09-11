'use client'

import React from 'react'
import { AppLayout } from './app-layout'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'
import { ArrowLeft, Clock, CalendarDays, Bell } from 'lucide-react'
import { motion } from 'motion/react'

interface ComingSoonProps {
  title: string
  description: string
  estimatedDate?: string
  features?: string[]
}

export function ComingSoon({ 
  title, 
  description, 
  estimatedDate = 'Q3 2025', 
  features = [] 
}: ComingSoonProps) {
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your API
    console.log('Notify email:', email)
    setSubmitted(true)
    setEmail('')
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col justify-center">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold font-syne bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-4"
          >
            {title} Coming Soon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-outfit"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center">
            <Clock className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 font-syne">In Development</h3>
            <p className="text-gray-600 dark:text-gray-400 font-outfit">
              Our team is working hard to bring you an amazing experience.
            </p>
          </div>

          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center">
            <CalendarDays className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 font-syne">Estimated Launch</h3>
            <p className="text-gray-600 dark:text-gray-400 font-outfit">{estimatedDate}</p>
          </div>

          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center">
            <Bell className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 font-syne">Get Notified</h3>
            <p className="text-gray-600 dark:text-gray-400 font-outfit">
              Sign up below to be the first to know when we launch.
            </p>
          </div>
        </motion.div>

        {features.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-center font-syne">Planned Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="flex items-start p-4 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-lg"
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <p className="font-outfit">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-md mx-auto"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-center mb-4 font-syne">Get Notified When We Launch</h3>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-l-lg border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 font-outfit"
                  required
                />
                <Button
                  type="submit"
                  className="rounded-r-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  Notify Me
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center font-outfit">
                We&apos;ll never share your email with anyone else.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center"
            >
              <p className="text-green-800 dark:text-green-400 font-medium font-outfit">
                Thanks! We&apos;ll notify you when we launch.
              </p>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-12 text-center">
          <Button variant="ghost" asChild>
            <Link href="/" className="inline-flex items-center font-outfit">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
