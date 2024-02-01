"use client"

import React from 'react'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { usePathname } from 'next/navigation';

const resetPasswordSchema = z.object({
    email: z.string().email({
        message: "Email must be a proper email address.",
      }),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    password_confirmation: z.string().min(8, 'Password confirmation must be at least 8 characters long'),
  })

  interface FormValues {
    email: string;
    password: string;
    password_confirmation: string;
  }

const FormReset = () => {

    const pathname = usePathname();
    const token = pathname.split('/')[2];

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const form = useForm<FormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
        email: "",
          password: "",
          password_confirmation: "",
        },
        mode: "onSubmit",
      })

      const onSubmitResetPassword = async (values: FormValues) => {
        resetPassword({
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
            setErrors,
            setStatus,
            token: token,
        })
    }


      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitResetPassword)} className="space-y-2 w-[272px]">
            <h2 className="text-center text-xl text-[#DF0000] font-bold mb-4">
              Reset Password
            </h2>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="email..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            >

            </FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="confirm..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row">
              <Button
                type="submit"
                className="mr-16"
                aria-label="Submit form button"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )
    }

export default FormReset