"use client";

import React, { useEffect, useState } from "react";

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
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  
  const router = useRouter();
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [activeButton, setActiveButton] = useState<string>('login');

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setShowResetMessage(false);
    router.push('/dashboard');
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      setShowResetMessage(false);
    } else if (form.formState.submitCount > 0 && activeButton === 'login') {
      setShowResetMessage(true);
    }
  }, [form.formState, activeButton]);


  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    form.reset({
      username: "",
      password: "",
    });
    if (button === 'signup') {
      setShowResetMessage(false);
    }
  };

  const providers = [
    { name: "Facebook", icon: Facebook, link: "https://facebook.com" },
    { name: "Linkedin", icon: Linkedin, link: "https://linkedin.com"},
    { name: "Instagram", icon: Instagram, link: "https://instagram.com"},
    { name: "Twitter", icon: Twitter, link: "https://twitter.com"},
  ];


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
            <Link href={provider.link} key={provider.name}>
            <Button key={provider.name} type="button">
              <provider.icon className="w-5 h-5" />
            </Button>
            </Link>
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
        <div className="flex flex-row">
         <Button type="submit" className="mr-16">Submit</Button>
          {showResetMessage && (
          <Button variant="link" type="button" size="sm">Reset password?</Button>
      )}
      </div>
      </form>
    </Form>
  );
}
