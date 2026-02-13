"use client";
import { Button } from "@/components/ui/button";
import { logOut } from "@/services/api";
import { useLogOut } from "@/services/mutations";
import { useGetSession } from "@/services/queries";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const session = useGetSession();
  const logOutMutation = useLogOut();
  const router = useRouter();
  
  return (
    <div>
      Hello Ji This is Dashboard
      <pre>{JSON.stringify(session.data, null, 2)}</pre>
      <Button
        variant="destructive"
        // onClick={() => {
        //   logOutMutation.mutate(undefined, {
        //     onSuccess: () => {
        //       toast.success("Log-out successfully!");
        //       router.push("/auth/sign-in");
        //     },
        //     onError: (error) => {
        //       if (axios.isAxiosError(error)) {
        //         // Better Auth usually sends the message in error.response.data
        //         // You don't usually need JSON.parse(error.request.response) because Axios does it for you
        //         const message =
        //           error.response?.data?.message || "An auth error occurred";
        //         toast.error(message);

        //         console.log("Status:", error.response?.status);
        //         console.log("Body:", error.response?.data);
        //       } else {
        //         // Handle non-axios errors (like code crashes)
        //         toast.error(error.message);
        //       }
        //     },
        //   });
        // }}
        onClick={() => {
          logOutMutation.mutate();
        }}
        disabled={logOutMutation.isPending}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Page;
