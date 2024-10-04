'use client'

// components/Register.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export const Register = () => {
      const { register, handleSubmit, formState: { errors }, /* watch */ } = useForm<RegisterFormInputs>({
            resolver: zodResolver(registerSchema),
            mode: 'onChange',
      });
      const router = useRouter();

      const onSubmit = async (data: RegisterFormInputs) => {
            try {
                  const response = await fetch('/api/users/create', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              email: data.email,
                              password: data.password,
                              confirmPassword: data.confirmPassword,
                              expiresInUnit: 'days',
                              expiresInValue: 7,
                        }),
                  });

                  const result = await response.json();

                  if (response.ok) {
                        toast.success('Registration successful!');
                        router.push('/login'); // Redirect to login page after successful registration
                  } else {
                        toast.error(result.message || 'Registration failed!');
                  }
            } catch (error) {
                  toast.error('An unexpected error occurred.');
            }
      };

      return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 w-full max-w-md mx-auto">
                  <h2 className="text-2xl text-black font-bold mb-4">Register</h2>
                  <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                              id="email"
                              type="email"
                              {...register('email')}
                              className={`mt-1 p-2 text-black border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                  <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                              id="password"
                              type="password"
                              {...register('password')}
                              className={`mt-1 p-2 text-black border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                  </div>
                  <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                              id="confirmPassword"
                              type="password"
                              {...register('confirmPassword')}
                              className={`mt-1 p-2 text-black border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                  </div>
                  <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                        Register
                  </button>
            </form>
      );
};
