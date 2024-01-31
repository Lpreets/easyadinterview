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
import { useAuth } from '@/hooks/auth'

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a proper email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function FormModel() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
    mode: "onSubmit",
  });
  
  const router = useRouter();
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("login");

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
})

const { register } = useAuth({
  middleware: 'guest',
  redirectIfAuthenticated: '/dashboard',
})

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setShowResetMessage(false);
    
    if (activeButton === "login") {
      login({
        email: values.email,
        password: values.password,
    })
    
    } else if (activeButton === "signup") {
      register({
        email: values.email,
        password: values.password,
    })
      
    }
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      setShowResetMessage(false);
    } else if (form.formState.submitCount > 0 && activeButton === "login") {
      setShowResetMessage(true);
    }
  }, [form.formState, activeButton]);


  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    form.reset({
      password: "",
      email: "",
    });
    if (button === 'signup') {
      setShowResetMessage(false);
    }
  };

  const providers = [
    { name: "Facebook", icon: Facebook, link: "https://facebook.com", aria: "facebook" },
    { name: "Linkedin", icon: Linkedin, link: "https://linkedin.com", aria: "linkedin"},
    { name: "Instagram", icon: Instagram, link: "https://instagram.com", aria: "instagram"},
    { name: "Twitter", icon: Twitter, link: "https://twitter.com", aria: "twitter"},
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
        aria-label="Login button"
            type="button"
            variant={activeButton === 'login' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('login')}
            
          >
            Login
          </Button>
          <Button 
          aria-label="Sign up button"
            type="button"
            variant={activeButton === 'signup' ? 'default' : 'ghost'}
            onClick={() => handleButtonClick('signup')}
          >
            Sign up
          </Button>
        </div>
        <div className="space-y-4 text-center">
        {activeButton === 'login' ? (
            <p>Log in using any of these providers</p>
          ) : (
            <p>Sign up using any of these providers</p>
          )}
        <div className="flex space-x-4">
          {providers.map((provider) => (
            <Link href={activeButton == "signup" ? provider.link : "/dashboard"} key={provider.name}>
            <Button key={provider.name} type="button" aria-label={provider.aria}>
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
            <p>Log in with your email</p>
          ) : (
            <p>Sign up with your email</p>
          )}
          </div>
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email..." {...field} />
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
         <Button type="submit" className="mr-16" aria-label="Submit form button">Submit</Button>
          {showResetMessage && (
          <Button variant="link" type="button" size="sm" aria-label="Reset password button" >Reset password?</Button>
      )}
      </div>
      </form>
    </Form>
  );
}

