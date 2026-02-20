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
import {
  changeLanguage,
  chnagefontSize,
  chnageTheme,
} from "@/redux/slice/editor/editor.slice";

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
  const editorLanguage = useAppSelector(
    (state) => state.editorSettings.language
  );
  const editorFontSize = useAppSelector(
    (state) => state.editorSettings.fontSize
  );
  const editorTheme = useAppSelector((state) => state.editorSettings.theme);
  const dispatch = useAppDispatch();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Editor Settings</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Select
            value={editorLanguage}
            onValueChange={(value) => {
              console.log("the value is ", value);
              dispatch(changeLanguage(value));
              console.log("New Value", editorLanguage);
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
            value={String(editorFontSize)}
            onValueChange={(value) => {
              console.log("The Font size Chnaged->", value);
              dispatch(chnagefontSize(Number(value)));
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
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="17">17</SelectItem>
                <SelectItem value="18">18</SelectItem>
                <SelectItem value="19">19</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={editorTheme}
            onValueChange={(value) => {
              console.log("Theme Chnaged->", value);
              dispatch(chnageTheme(value));
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
                <SelectItem value="vs-dark">VS Code Dark</SelectItem>
                <SelectItem value="active4d">Active4D</SelectItem>
                <SelectItem value="allHallowseve">All Hallows Eve</SelectItem>
                <SelectItem value="amy">Amy</SelectItem>
                <SelectItem value="birdsofParadise">
                  Birds of Paradise
                </SelectItem>
                <SelectItem value="blackboard">Blackboard</SelectItem>
                <SelectItem value="brillianceBlack">
                  Brilliance Black
                </SelectItem>
                <SelectItem value="brillianceDull">Brilliance Dull</SelectItem>
                <SelectItem value="chromeDevtools">Chrome DevTools</SelectItem>
                <SelectItem value="cloudsMidnight">Clouds Midnight</SelectItem>
                <SelectItem value="clouds">Clouds</SelectItem>
                <SelectItem value="cobalt">Cobalt</SelectItem>
                <SelectItem value="cobalt2">Cobalt2</SelectItem>
                <SelectItem value="dawn">Dawn</SelectItem>
                <SelectItem value="dracula">Dracula</SelectItem>
                <SelectItem value="dreamweaver">Dreamweaver</SelectItem>
                <SelectItem value="eiffel">Eiffel</SelectItem>
                <SelectItem value="espressoLibre">Espresso Libre</SelectItem>
                <SelectItem value="githubDark">GitHub Dark</SelectItem>
                <SelectItem value="githubLight">GitHub Light</SelectItem>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="idle">IDLE</SelectItem>
                <SelectItem value="katzenmilch">Katzenmilch</SelectItem>
                <SelectItem value="kuroirTheme">Kuroir Theme</SelectItem>
                <SelectItem value="lazy">LAZY</SelectItem>
                <SelectItem value="magicwbAmiga">MagicWB (Amiga)</SelectItem>
                <SelectItem value="merbivoreSoft">Merbivore Soft</SelectItem>
                <SelectItem value="merbivore">Merbivore</SelectItem>
                <SelectItem value="monokaiBright">Monokai Bright</SelectItem>
                <SelectItem value="monokai">Monokai</SelectItem>
                <SelectItem value="nightOwl">Night Owl</SelectItem>
                <SelectItem value="nord">Nord</SelectItem>
                <SelectItem value="oceanicNext">Oceanic Next</SelectItem>
                <SelectItem value="pastelsOnDark">Pastels on Dark</SelectItem>
                <SelectItem value="slushAndPoppies">
                  Slush and Poppies
                </SelectItem>
                <SelectItem value="solarizedDark">Solarized-dark</SelectItem>
                <SelectItem value="solarizedLight">Solarized-light</SelectItem>
                <SelectItem value="spacecadet">SpaceCadet</SelectItem>
                <SelectItem value="sunburst">Sunburst</SelectItem>
                <SelectItem value="textmateMacClassic">
                  Textmate (Mac Classic)
                </SelectItem>
                <SelectItem value="tomorrowNightBlue">
                  Tomorrow-Night-Blue
                </SelectItem>
                <SelectItem value="tomorrowNightBright">
                  Tomorrow-Night-Bright
                </SelectItem>
                <SelectItem value="tomorrowNightEighties">
                  Tomorrow-Night-Eighties
                </SelectItem>
                <SelectItem value="tomorrowNight">Tomorrow-Night</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="twilight">Twilight</SelectItem>
                <SelectItem value="upstreamSunburst">
                  Upstream Sunburst
                </SelectItem>
                <SelectItem value="vibrantInk">Vibrant Ink</SelectItem>
                <SelectItem value="xcodeDefault">Xcode_default</SelectItem>
                <SelectItem value="zenburnesque">Zenburnesque</SelectItem>
                <SelectItem value="iplastic">iPlastic</SelectItem>
                <SelectItem value="idlefingers">idleFingers</SelectItem>
                <SelectItem value="krtheme">krTheme</SelectItem>
                <SelectItem value="monoindustrial">monoindustrial</SelectItem>

                <SelectItem value="vs">VS Code Light</SelectItem>
                <SelectItem value="hc-black">High Contrast</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
