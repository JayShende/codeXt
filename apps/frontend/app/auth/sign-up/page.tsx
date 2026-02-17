import { SignupForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-sm pb-0">
        <CardHeader>
          <CardTitle className="flex flex-col items-center justify-center">
            <Image
              src="/asset/images/codext_new_light.png"
              width={60}
              height={40}
              alt="logo"
              priority={true}
              className="my-3"
            />
            Sign Up to CodeXt
          </CardTitle>
          <CardDescription className="text-center">
            Welcome! Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="bg-muted justify-center">
          <div className="p-3">
            <p className="text-accent-foreground text-center text-sm">
              Already have an account ?
              <Button asChild variant="link" className="text-secondary px-2">
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
