import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "./header";
import { ChevronRight, CirclePlay } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section className="to-muted from-background relative overflow-hidden bg-linear-to-b">
          <div className="py-36">
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
              <div className="md:w-1/2">
                <div>
                  <h1 className="max-w-md text-5xl font-medium text-balance md:text-6xl">
                    Share Code on the <br /> Go
                  </h1>
                  <p className="text-muted-foreground my-8 max-w-2xl text-xl text-balance">
                    Introducing CodeXt an Realtime Tool Where You Can Share Code
                    Snippets and Work and Collborate On File in Real Time
                  </p>

                  <div className="flex items-center gap-3">
                    <Button asChild size="lg" className="pr-4.5">
                      <Link href="/dashboard">
                        <span className="text-nowrap">Get Started</span>
                        <ChevronRight className="opacity-50" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 translate-x-12 perspective-near md:absolute md:top-40 md:-right-6 md:bottom-16 md:left-1/2 md:mt-0 md:translate-x-0">
              <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:top-0 before:bottom-7 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border">
                <div className="bg-background shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden rounded-(--radius) border border-transparent shadow-md ring-1">
                  <Image
                    src="/asset/images/app_screen.png"
                    alt="app screen"
                    width="2880"
                    height="1842"
                    className="size-full object-cover object-top-left"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
