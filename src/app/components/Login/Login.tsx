'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'

const loginSchema = z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type LoginFormInputs = z.infer<typeof loginSchema>

const Login = () => {
      const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
            resolver: zodResolver(loginSchema),
      })
      const [loading, setLoading] = useState(false)

      const onSubmit = async (data: LoginFormInputs) => {
            setLoading(true)
            try {
                  const response = await fetch('http://localhost:3000/api/users/login', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                  })

                  const result = await response.json()

                  if (!response.ok) {
                        toast.error(result.message || 'Login failed!')
                        return
                  }

                  toast.success('Login successful!')

            } catch (error) {
                  console.log('An unexpected error occurred.' + error)
                  toast.error('An unexpected error occurred.')
            } finally {
                  setLoading(false)
            }
      }

      return (
            <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-900 p-4"
            >
                  <motion.div
                        className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-xl"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                  >
                        <h2 className="text-3xl font-bold mb-6 text-center text-white">Inicio de sesión</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                              <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="email">
                                          Email
                                    </label>
                                    <div className="relative">
                                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                          <input
                                                type="email"
                                                id="email"
                                                {...register('email')}
                                                className={`pl-10 w-full p-3 bg-white bg-opacity-20 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                                                placeholder="Ingresá tu email"
                                          />
                                    </div>
                                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                              </div>
                              <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="password">
                                          Contraseña
                                    </label>
                                    <div className="relative">
                                          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                          <input
                                                type="password"
                                                id="password"
                                                {...register('password')}
                                                className={`pl-10 w-full p-3 bg-white bg-opacity-20 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.password ? 'border-red-500' : 'border-transparent'}`}
                                                placeholder="Ingresá tu contraseña"
                                          />
                                    </div>
                                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                              </div>
                              <motion.button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                              >
                                    <FaSignInAlt className="mr-2" />
                                    {loading ? 'Iniciando sesión...' : 'Inciar sesión'}
                              </motion.button>
                        </form>
                  </motion.div>
            </motion.div>
      )
}

export default Login