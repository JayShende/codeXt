"use client";

import "dotenv/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeLanguage } from "@/redux/slice/editor/language.slice";
import { setRoomSlug } from "@/redux/slice/app/roomSlug.slice";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditorComponent from "./editor-component";
import { setInitialCode } from "@/redux/slice/editor/initCode.slice";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { toggleSidebar } from "@/redux/slice/sidebar/sideBarToggle.slice";
interface mainPageProps {
  roomSlug: string;
  token: string;
  initialCode: string;
}

const MainPage = ({ roomSlug, token, initialCode }: mainPageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const isRemoteUpdateRef = useRef(false);
  const wsRef = useRef<WebSocket | null>(null);
  const monacoRef = useRef<any>(null);
  const initialCodeRef = useRef<string | undefined>("");

  const lang2 = useAppSelector((state) => state.language);
  const roomSlugHook = useAppSelector((state) => state.roomSlug);
  const initialCodeHook = useAppSelector((state) => state.initcode);
  const dispatch = useAppDispatch();
  // const [isOpen,setIsopen]=useState(false);
  const isOpen = useAppSelector((state) => state.sidebarToggle);
  // const setIsopen=useAppDispatch

  function toggleDispatch() {
    dispatch(toggleSidebar());
  }
  // WebSocket
  useEffect(() => {
    const wsUrl = `ws://localhost:8080?token=${token}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connection Established");
    };
    ws.onerror = (error) => {
      console.log("Error", error);
    };

    ws.onclose = () => {
      console.log("Connection Closed");
    };

    ws.onmessage = (event) => {
      const newMessage = event.data;
      const parsedMessage = JSON.parse(newMessage);
      if (parsedMessage.type == "chat") {
        isRemoteUpdateRef.current = true;
        editorRef.current?.setValue(parsedMessage.message);
        isRemoteUpdateRef.current = false;
      }
    };
    return () => ws.close();
  }, [token]);

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    monacoRef.current.editor.setModelLanguage(model, lang2);
  }, [lang2]);

  // set the store Variables
  useEffect(() => {
    dispatch(setRoomSlug(roomSlug));
    dispatch(setInitialCode(initialCode));
  }, [roomSlug, initialCode, dispatch]);

  useEffect(() => {
    console.log("Redux UPDATED:", roomSlugHook, initialCodeHook);
  }, [roomSlugHook, initialCodeHook]);
  const isDataReady =
    roomSlugHook === roomSlug && initialCodeHook === initialCode;
  // return (
  //   <>
  //     <div className="flex justify-between p-5">
  //       <Input placeholder="Text Here" className="w-xs" ref={inputRef} />
  //       <Button
  //         variant="outline"
  //         onClick={() => {
  //           const codeValue = inputRef.current?.value || "";
  //           editorRef.current?.setValue(codeValue);
  //         }}
  //       >
  //         Chnage Code
  //       </Button>
  //       <Button
  //         onClick={() => {
  //           const code = editorRef.current?.getValue();
  //           console.log("Send Code:", code);
  //           const messageBody = {
  //             type: "chat",
  //             roomId: roomSlug,
  //             message: code,
  //           };
  //           wsRef.current?.send(JSON.stringify(messageBody));
  //           // send to backend
  //           // run compiler
  //           // save to DB
  //         }}
  //       >
  //         Button
  //       </Button>
  //     </div>
  //     <div className="h-full p-4 pt-0">
  //       {isDataReady ? (
  //         <EditorComponent
  //           editorRef={editorRef}
  //           monacoRef={monacoRef}
  //           isRemoteUpdateRef={isRemoteUpdateRef}
  //           wsRef={wsRef}
  //         />
  //       ) : (
  //         <div className="flex h-125 items-center justify-center">
  //           <p>Loading Workspace... hello</p>
  //         </div>
  //       )}
  //     </div>
  //     <div className="p-6">
  //       <Select
  //         onValueChange={(value) => {
  //           console.log("the value is ", value);
  //           dispatch(changeLanguage(value));
  //           console.log(lang2);
  //         }}
  //       >
  //         <SelectTrigger className="w-45">
  //           <SelectValue placeholder="Select Language" />
  //         </SelectTrigger>

  //         <SelectContent>
  //           <SelectGroup>
  //             {/* Plain text */}
  //             <SelectItem value="plaintext">Plain Text</SelectItem>

  //             {/* Web */}
  //             <SelectItem value="javascript">JavaScript</SelectItem>
  //             <SelectItem value="typescript">TypeScript</SelectItem>
  //             <SelectItem value="html">HTML</SelectItem>
  //             <SelectItem value="css">CSS</SelectItem>
  //             <SelectItem value="scss">SCSS</SelectItem>
  //             <SelectItem value="less">LESS</SelectItem>
  //             <SelectItem value="json">JSON</SelectItem>
  //             <SelectItem value="markdown">Markdown</SelectItem>

  //             {/* Backend / Systems */}
  //             <SelectItem value="python">Python</SelectItem>
  //             <SelectItem value="java">Java</SelectItem>
  //             <SelectItem value="c">C</SelectItem>
  //             <SelectItem value="cpp">C++</SelectItem>
  //             <SelectItem value="csharp">C#</SelectItem>
  //             <SelectItem value="go">Go</SelectItem>
  //             <SelectItem value="rust">Rust</SelectItem>
  //             <SelectItem value="php">PHP</SelectItem>
  //             <SelectItem value="ruby">Ruby</SelectItem>
  //             <SelectItem value="kotlin">Kotlin</SelectItem>
  //             <SelectItem value="swift">Swift</SelectItem>
  //             <SelectItem value="scala">Scala</SelectItem>
  //             <SelectItem value="dart">Dart</SelectItem>

  //             {/* Shell / scripting */}
  //             <SelectItem value="shell">Shell</SelectItem>
  //             <SelectItem value="bash">Bash</SelectItem>
  //             <SelectItem value="powershell">PowerShell</SelectItem>

  //             {/* Data / config */}
  //             <SelectItem value="yaml">YAML</SelectItem>
  //             <SelectItem value="xml">XML</SelectItem>
  //             <SelectItem value="toml">TOML</SelectItem>
  //             <SelectItem value="ini">INI</SelectItem>
  //             <SelectItem value="sql">SQL</SelectItem>

  //             {/* Others */}
  //             <SelectItem value="dockerfile">Dockerfile</SelectItem>
  //             <SelectItem value="graphql">GraphQL</SelectItem>
  //             <SelectItem value="lua">Lua</SelectItem>
  //             <SelectItem value="perl">Perl</SelectItem>
  //             <SelectItem value="r">R</SelectItem>
  //             <SelectItem value="objective-c">Objective-C</SelectItem>
  //             <SelectItem value="objective-cpp">Objective-C++</SelectItem>
  //             <SelectItem value="haskell">Haskell</SelectItem>
  //             <SelectItem value="clojure">Clojure</SelectItem>
  //             <SelectItem value="fsharp">F#</SelectItem>
  //             <SelectItem value="vb">VB</SelectItem>
  //             <SelectItem value="bat">Batchfile</SelectItem>
  //           </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //     </div>
  //   </>
  // );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>

        <div className="h-full p-4 pt-0">
          {isDataReady ? (
            <EditorComponent
              editorRef={editorRef}
              monacoRef={monacoRef}
              isRemoteUpdateRef={isRemoteUpdateRef}
              wsRef={wsRef}
            />
          ) : (
            <div className="flex h-125 items-center justify-center">
              <p>Loading Workspace... hello</p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainPage;
