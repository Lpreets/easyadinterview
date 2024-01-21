"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function FormModel() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    form.reset({
      username: "",
      password: "",
    });
  };

  const providers = [
    { name: "Facebook", icon: Facebook },
    { name: "Linkedin", icon: Linkedin },
    { name: "Instagram", icon: Instagram },
    { name: "Twitter", icon: Twitter },
  ];

  const [activeButton, setActiveButton] = useState<string>('login');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-[272px]"
      >
        <h2 className="text-center text-xl text-[#DF0000] font-bold mb-4">
          Welcome
        </h2>
        <div className="flex justify-evenly">
        <Button 
            type="button"
            variant={activeButton === 'login' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('login')}
            
          >
            Login
          </Button>
          <Button 
            type="button"
            variant={activeButton === 'signup' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('signup')}
          >
            Sign up
          </Button>
        </div>
        <div className="space-y-4">
        {activeButton === 'login' ? (
            <p>Log in using any of these providers</p>
          ) : (
            <p>Sign up using any of these providers</p>
          )}
        <div className="flex space-x-4">
          {providers.map((provider) => (
            <Button key={provider.name} type="button">
              <provider.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
        </div>
        <div className="text-center space-y-2">
        <p>
          <b>Or</b>
        </p>
          {activeButton === 'login' ? (
            <p>Log in with your username</p>
          ) : (
            <p>Sign up with your username</p>
          )}
          </div>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
