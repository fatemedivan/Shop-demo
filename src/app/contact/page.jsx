'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = () => {
    toast.success('Your message has been sent successfully!')
    reset();
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Enter at least 2 characters' },
            })}
            className="w-full p-2 border rounded"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            className="w-full p-2 border rounded"
            placeholder="you@example.com"
            type="email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            {...register('message', {
              required: 'Message is required',
              minLength: { value: 10, message: 'Enter at least 10 characters' },
            })}
            className="w-full p-2 border rounded"
            rows={5}
            placeholder="Your message..."
          />
          {errors.message && (
            <p className="text-red-600 text-sm">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
