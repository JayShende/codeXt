"use client";

import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import "dotenv/config";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface editorProps {
  roomId: string;
  token: string;
}

const EditorPage = ({ roomId, token }: editorProps) => {
  //   const [code, setCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const isRemoteUpdateRef = useRef(false);
  const wsRef = useRef<WebSocket | null>(null);
  const monacoRef = useRef<any>(null);

  const [language, setLanguage] = useState("typescript");
  useEffect(() => {
    const wsUrl = `ws://localhost:8080?token=${token}`;
    console.log(wsUrl);

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

    monacoRef.current.editor.setModelLanguage(model, language);
  }, [language]);

  return (
    <>
      <div style={{ height: "60vh", borderRadius: "8px", overflow: "hidden" }}>
        <Editor
          height="100%"
          defaultLanguage={language}
          defaultValue="// Start coding in Codext 🚀"
          //   value={code}
          theme="vs-dark" // built-in theme (dark mode)
          options={{
            fontSize: 14,
            minimap: { enabled: false }, // hide minimap for cleaner UI
            wordWrap: "on",
            automaticLayout: true, // responsive resizing
          }}
          //   onChange={(value) => {
          //     console.log("Code changed:", value);
          //     console.log("Code :", code);
          //   }}
          onMount={(editor, monaco) => {
            editorRef.current = editor;
            monacoRef.current = monaco;
            editor.onDidChangeModelContent(() => {
              if (isRemoteUpdateRef.current) return;
              const c = editor.getValue();
              console.log("New Value", c);
              const messageBody = {
                type: "chat",
                roomId: roomId,
                message: c,
              };
              wsRef.current?.send(JSON.stringify(messageBody));
            });
          }}
        />
      </div>
      <div className="p-5 flex justify-between">
        <Input placeholder="Text Here" className="w-xs" ref={inputRef} />
        <Button
          variant="outline"
          onClick={() => {
            const codeValue = inputRef.current?.value || "";
            editorRef.current?.setValue(codeValue);
          }}
        >
          Chnage Code
        </Button>
        <Button
          onClick={() => {
            const code = editorRef.current?.getValue();
            console.log("Send Code:", code);
            const messageBody = {
              type: "chat",
              roomId: roomId,
              message: code,
            };
            wsRef.current?.send(JSON.stringify(messageBody));
            // send to backend
            // run compiler
            // save to DB
          }}
        >
          Send Code
        </Button>
      </div>
      <div className="p-6">
        <Select onValueChange={setLanguage}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="text">text</SelectItem>
              <SelectItem value="c++">C++</SelectItem>
              <SelectItem value="typescript">Typescript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="p-6">
        <Select onValueChange={setLanguage}>
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
    </>
  );
};

export default EditorPage;
