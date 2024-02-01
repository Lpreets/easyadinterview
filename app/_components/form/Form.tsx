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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";

const formSchemaSignup = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({
    message: "Email must be a proper email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const formSchemaLogin = z.object({
  email: z.string().email({
    message: "Email must be a proper email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  remember: z.boolean().optional(),
});

const formSchemaForgotPassword = z.object({
  email: z.string().email({
    message: "Email must be a proper email address.",
  }),
});

export default function FormModel() {
  const router = useRouter();

  const [activeButton, setActiveButton] = useState<string>("login");
  const [errors, setErrors] = useState([]);
  const [shouldRemember, setShouldRemember] = useState(false);
  const [status, setStatus] = useState(null);

  const { login, register, forgotPassword } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  type FormData = {
    name?: string;
    email: string;
    password?: string;
    passwordConfirmation?: string;
    remember?: boolean;
  };

  const form = useForm<FormData>({
    resolver: zodResolver(
      activeButton === "login"
        ? formSchemaLogin
        : activeButton === "signup"
        ? formSchemaSignup
        : formSchemaForgotPassword
    ),
    defaultValues: {
      email: "",
      ...(activeButton === "signup" && {
        name: "",
        password: "",
        passwordConfirmation: "",
      }),
      remember: activeButton === "login" ? false : undefined,
    },
    mode: "onSubmit",
  });

  const onSubmitLogin = async (values: FormData) => {
    login({
      email: values.email,
      password: values.password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };

  const onSubmitSignup = async (values: FormData) => {
    register({
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
      setErrors,
    });
  };

  const onSubmitForgotPassword = async (values: FormData) => {
    forgotPassword({
      email: values.email,
      setErrors,
      setStatus,
    });
  };

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    form.reset({
      name: "",
      password: "",
      passwordConfirmation: "",
      email: "",
    });
  };

  const providers = [
    {
      name: "Facebook",
      icon: Facebook,
      link: "https://facebook.com",
      aria: "facebook",
    },
    {
      name: "Linkedin",
      icon: Linkedin,
      link: "https://linkedin.com",
      aria: "linkedin",
    },
    {
      name: "Instagram",
      icon: Instagram,
      link: "https://instagram.com",
      aria: "instagram",
    },
    {
      name: "Twitter",
      icon: Twitter,
      link: "https://twitter.com",
      aria: "twitter",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={
          activeButton === "login"
            ? form.handleSubmit(onSubmitLogin)
            : activeButton === "signup"
            ? form.handleSubmit(onSubmitSignup)
            : form.handleSubmit(onSubmitForgotPassword)
        }
        className="space-y-2 w-[272px]"
      >
        <h2 className="text-center text-xl text-[#DF0000] font-bold mb-4">
          Welcome
        </h2>
        <div className="flex justify-evenly">
          <Button
            aria-label="Login button"
            type="button"
            variant={activeButton === "login" ? "default" : "ghost"}
            onClick={() => handleButtonClick("login")}
          >
            Login
          </Button>
          <Button
            aria-label="Sign up button"
            type="button"
            variant={activeButton === "signup" ? "default" : "ghost"}
            onClick={() => handleButtonClick("signup")}
          >
            Sign up
          </Button>
        </div>
        <div className="space-y-4 text-center">
          {activeButton === "login" ? (
            <p>Log in using any of these providers</p>
          ) : (
            <p>Sign up using any of these providers</p>
          )}
          <div className="flex space-x-4">
            {providers.map((provider) => (
              <Link
                href={activeButton == "signup" ? provider.link : "/dashboard"}
                key={provider.name}
              >
                <Button
                  key={provider.name}
                  type="button"
                  aria-label={provider.aria}
                >
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
          <div className="text-center space-y-2">
            {activeButton === "login" && <p>Log in with your email</p>}
            {activeButton === "signup" && <p>Sign up with your email</p>}
            {activeButton === "forgotPassword" && (
              <p>Provide your email to reset password</p>
            )}
          </div>
        </div>
        {activeButton === "signup" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
        {activeButton !== "forgotPassword" && (
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
        )}

        {activeButton === "signup" && (
          <FormField
            control={form.control}
            name="passwordConfirmation"
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
        )}
        {activeButton === "login" && (
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={field.value ?? false}
                      onChange={field.onChange}
                    />
                    <span className="ml-2">Remember me</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex flex-row">
          <Button
            type="submit"
            className="mr-16"
            aria-label="Submit form button"
          >
            Submit
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => setActiveButton("forgotPassword")}
          >
            Reset Password?
          </Button>
        </div>
      </form>
    </Form>
  );
}
