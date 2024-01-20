"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
})

export default function FormModel() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
  }

  const providers = [
    { name: "Facebook", icon: Facebook },
    { name: "Linkedin", icon: Linkedin },
    { name: "Instagram", icon: Instagram },
    { name: "Twitter", icon: Twitter}
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4 w-[260px]">
        <h1 className="text-center text-xl text-[#DF0000] font-bold ">Welcome</h1>
        <div className="flex justify-evenly ">
        <Button variant="ghost">Login</Button>
        <Button variant="ghost">Sign up</Button>
        </div>
        <p>Log in using any of these providers</p>
        
        <div className="flex space-x-4">
          {providers.map((provider) => (
            <Button key={provider.name} type="button">
              <provider.icon className="w-5 h-5" />
            </Button>
          ))}
          
        </div>
        <p className="text-center"><b>Or</b></p>
        <p className="text-center">Log in with your username</p>
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
