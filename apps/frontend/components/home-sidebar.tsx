import { House, Settings } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import ProCard from "./pro-card";

const HomeSidebar = () => {
  return (
    <div className="bg-card flex w-[15%] flex-col justify-between px-3 py-4">
      <div>
        <div className="flex items-center gap-2">
          <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg border p-0">
            <Image
              src="/asset/images/codext_new.png"
              width={32}
              height={32}
              alt="logo"
              priority={true}
              className="bg-muted"
            />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">CodeXt</span>
            <span className="text-[10px]">Share Code on The Go</span>
          </div>
        </div>
        <div className="px-3 py-6">
          <div className="text-secondary flex items-center gap-x-4 py-3">
            <Button variant="outline" className="w-full">
              <House className="h-4 w-4 shrink-0" />
              <span className="text-base leading-none">Home </span>
            </Button>
          </div>
          <div className="text-secondary flex items-center gap-x-4 py-3">
            <Button variant="outline" className="w-full" disabled>
              <Settings className="h-4 w-4 shrink-0" />
              <span className="text-base leading-none">Settings </span>
            </Button>
          </div>
        </div>
      </div>
      <ProCard />
    </div>
  );
};

export default HomeSidebar;
