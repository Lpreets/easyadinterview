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
      username: "",
      password: "",
      email: "",
    },
    mode: "onSubmit",
  });
  
  const router = useRouter();
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("login");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setShowResetMessage(false);
    
    if (activeButton === "login") {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        // credentials: 'include',
      });
      
      if (response.ok) {
        router.push("/dashboard");
      } else {
        const error = await response.text();
        console.log(error);
      }
    
    } else if (activeButton === "signup") {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        //credentials: 'include',
      });
  
      console.log(response)
  
      if (response.ok) {
        setActiveButton("login");
      } else {
        const error = await response.text();
        console.log(error);
      }
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
      username: "",
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
        {activeButton === 'signup' && (
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
        )}
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

