import { useMutation } from "@tanstack/react-query";
import { logOut, signIn, signInBody, signUp, signUpBody } from "./api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useSignUp() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: signUpBody) => signUp(data),

    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        // Better Auth usually sends the message in error.response.data
        // You don't usually need JSON.parse(error.request.response) because Axios does it for you
        const message =
          error.response?.data?.message || "An auth error occurred";
        toast.error(message);

        console.log("Status:", error.response?.status);
        console.log("Body:", error.response?.data);
      } else {
        // Handle non-axios errors (like code crashes)
        toast.error(error.message);
      }
    },
  });
}

export function useSignIn() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: signInBody) => signIn(data),

    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        // Better Auth usually sends the message in error.response.data
        // You don't usually need JSON.parse(error.request.response) because Axios does it for you
        const message =
          error.response?.data?.message || "An auth error occurred";
        toast.error(message);

        console.log("Status:", error.response?.status);
        console.log("Body:", error.response?.data);
      } else {
        // Handle non-axios errors (like code crashes)
        toast.error(error.message);
      }
    },
  });
}

export function useLogOut() {
  const router = useRouter();
  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.success("Log-out successfully!");
      router.push("/auth/sign-in");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        // Better Auth usually sends the message in error.response.data
        // You don't usually need JSON.parse(error.request.response) because Axios does it for you
        const message =
          error.response?.data?.message || "An auth error occurred";
        toast.error(message);

        console.log("Status:", error.response?.status);
        console.log("Body:", error.response?.data);
      } else {
        // Handle non-axios errors (like code crashes)
        toast.error(error.message);
      }
    },
  });
}
