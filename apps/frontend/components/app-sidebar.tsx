"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Terminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeLanguage } from "@/redux/slice/editor/language.slice";
import Image from "next/image";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const lang2 = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <div>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg border p-0.5">
              <Image
                src="/asset/images/codext_new.png"
                width={32}
                height={32}
                alt="logo"
              />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">CodeXt</span>
              <span className="text-[10px]">Share Code on The Go</span>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <div className="hidden p-6">
          <Select
            onValueChange={(value) => {
              console.log("the value is ", value);
              dispatch(changeLanguage(value));
              console.log(lang2);
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {/* Plain text */}
                <SelectItem value="plaintext">Plain Text</SelectItem>

                {/* Web */}
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="scss">SCSS</SelectItem>
                <SelectItem value="less">LESS</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>

                {/* Backend / Systems */}
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="scala">Scala</SelectItem>
                <SelectItem value="dart">Dart</SelectItem>

                {/* Shell / scripting */}
                <SelectItem value="shell">Shell</SelectItem>
                <SelectItem value="bash">Bash</SelectItem>
                <SelectItem value="powershell">PowerShell</SelectItem>

                {/* Data / config */}
                <SelectItem value="yaml">YAML</SelectItem>
                <SelectItem value="xml">XML</SelectItem>
                <SelectItem value="toml">TOML</SelectItem>
                <SelectItem value="ini">INI</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>

                {/* Others */}
                <SelectItem value="dockerfile">Dockerfile</SelectItem>
                <SelectItem value="graphql">GraphQL</SelectItem>
                <SelectItem value="lua">Lua</SelectItem>
                <SelectItem value="perl">Perl</SelectItem>
                <SelectItem value="r">R</SelectItem>
                <SelectItem value="objective-c">Objective-C</SelectItem>
                <SelectItem value="objective-cpp">Objective-C++</SelectItem>
                <SelectItem value="haskell">Haskell</SelectItem>
                <SelectItem value="clojure">Clojure</SelectItem>
                <SelectItem value="fsharp">F#</SelectItem>
                <SelectItem value="vb">VB</SelectItem>
                <SelectItem value="bat">Batchfile</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
