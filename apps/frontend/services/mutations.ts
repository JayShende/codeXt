import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRoom,
  deleteRoom,
  logOut,
  signIn,
  signInBody,
  signUp,
  signUpBody,
} from "./api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { error } from "console";

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
      toast.success("Login SuccessFull !");
      toast.success("Welcome too CodeXt App 🚀");
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

export interface deleteRoomProps {
  roomId: string;
  roomSlug: string;
}

export function useDeleteRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: deleteRoomProps) => deleteRoom(data),
    onSettled: async (error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["User_All_Room_Data"],
      });
    },
    onSuccess: () => {
      toast.success("Room Deleted successfully!");
    },
    onMutate: () => {
      console.log("Mutatted");
    },
    onError: () => {
      toast.error("Error in Deleting Room, Try Again !!");
    },
  });
}

export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roomName: string) => createRoom(roomName),
    onSettled: async (error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["User_All_Room_Data"],
      });
    },
    onSuccess: () => {
      toast.success("Room Created Successfully!");
    },
    onMutate: () => {
      console.log("Mutatted");
    },
    onError: () => {
      toast.error("Error in Creating Room, Try Again !!");
    },
  });
}
