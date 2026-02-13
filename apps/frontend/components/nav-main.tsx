"use client";

import {
  ChevronRight,
  House,
  Palette,
  Type,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const lang2 = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Editor Settings</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Select
            value={lang2}
            onValueChange={(value) => {
              console.log("the value is ", value);
              dispatch(changeLanguage(value));
              console.log("New Value", lang2);
            }}
          >
            <SidebarMenuButton tooltip="Editor Language" asChild>
              <div className="flex w-full items-center gap-2">
                <SquareTerminal className="h-4 w-4 shrink-0" />
                <SelectTrigger className="focus-visible:border-primary h-8 flex-1 border-0 focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
              </div>
            </SidebarMenuButton>

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

          <Select
            value="3"
            disabled
            onValueChange={(value) => {
              console.log("The Font size Chnaged->", value);
            }}
          >
            <SidebarMenuButton tooltip="Font Size" asChild>
              <div className="flex w-full items-center gap-2">
                <Type className="h-4 w-4 shrink-0" />
                <SelectTrigger className="focus-visible:border-primary h-8 flex-1 border-0 focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
              </div>
            </SidebarMenuButton>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="scss">SCSS</SelectItem>
                <SelectItem value="less">LESS</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value="vscode_dark"
            disabled
            onValueChange={(value) => {
              console.log("The Font size Chnaged->", value);
            }}
          >
            <SidebarMenuButton tooltip="Editor Theme" asChild>
              <div className="flex w-full items-center gap-2">
                <Palette className="h-4 w-4 shrink-0" />
                <SelectTrigger className="focus-visible:border-primary h-8 flex-1 border-0 focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
              </div>
            </SidebarMenuButton>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="vscode_dark">VS Code Dark</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="scss">SCSS</SelectItem>
                <SelectItem value="less">LESS</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
