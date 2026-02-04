"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { signUpFormSchema } from "@/schema/signUp.schema";
import z from "zod";
import { useState } from "react";
import { useSignUp } from "@/services/mutations";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

export const SignupForm = () => {
  const [isPending, setIsPending] = useState(false);
  const signUpMutation = useSignUp();
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmitFun(values: z.infer<typeof signUpFormSchema>) {
    // console.log("Response Recived");
    // console.log(values);
    // toast("You Have Sent The Following Data", {
    //   description: () => (
    //     <div className="text-emerald-400">{JSON.stringify(values)}</div>
    //   ),
    //   closeButton: true,
    // });
    // signUpMutation.mutateAsync(values, {
    //   onSuccess: () => {
    //     toast.success("Account created successfully!");
    //     router.push("/dashboard");
    //   },
    //   onError: (error) => {
    //     if (axios.isAxiosError(error)) {
    //       // Better Auth usually sends the message in error.response.data
    //       // You don't usually need JSON.parse(error.request.response) because Axios does it for you
    //       const message =
    //         error.response?.data?.message || "An auth error occurred";
    //       toast.error(message);

    //       console.log("Status:", error.response?.status);
    //       console.log("Body:", error.response?.data);
    //     } else {
    //       // Handle non-axios errors (like code crashes)
    //       toast.error(error.message);
    //     }
    //   },
    // });
    signUpMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitFun)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" type="text" />
                </FormControl>
                <FormDescription>Enter Your Full Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="joe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormDescription>Enter Your Login Email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="*******" type="password" />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={signUpMutation.isPending}
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
