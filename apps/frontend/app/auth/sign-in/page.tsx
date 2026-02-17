import { SignInForm } from "@/components/signin-form";
import { Button } from "@/components/ui/button";
import {
  Card,
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
                Sign In to CodeXt
              </CardTitle>
              <CardDescription className="text-center">
                Welcome back! Sign in to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
            <CardFooter className="bg-muted justify-center">
              <div className="p-3">
                <p className="text-accent-foreground text-center text-sm">
                  Don't have an account ?
                  <Button asChild variant="link" className="px-2 text-secondary" >
                    <Link href="/auth/sign-up">Sign Up</Link>
                  </Button>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
  );
}
