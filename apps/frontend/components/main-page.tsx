"use client";

import "dotenv/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { toggleSidebar } from "@/redux/slice/sidebar/sideBarToggle.slice";
import Image from "next/image";

import { Badge } from "./ui/badge";
import { useGetRoomDetails } from "@/services/queries";
import RoomInfo from "./room-info";
import { Spinner } from "./ui/spinner";
import { CheckCheck, Copy } from "lucide-react";
import {
  changeLanguage,
  chnagefontSize,
  chnageTheme,
} from "@/redux/slice/editor/editor.slice";
interface mainPageProps {
  roomSlug: string;
  token: string;
  initialCode: string;
  initialLanguage: string;
  initialTheme: string;
  initialFontSize: number;
}

const MainPage = ({
  roomSlug,
  token,
  initialCode,
  initialLanguage,
  initialTheme,
  initialFontSize,
}: mainPageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const isRemoteUpdateRef = useRef(false);
  const isRemoteLanguageUpdateRef = useRef(false);
  const wsRef = useRef<WebSocket | null>(null);
  const monacoRef = useRef<any>(null);

  const editorLanguage = useAppSelector(
    (state) => state.editorSettings.language
  );
  const editorFontSize = useAppSelector(
    (state) => state.editorSettings.fontSize
  );
  const editorTheme = useAppSelector((state) => state.editorSettings.theme);
  const roomSlugHook = useAppSelector((state) => state.roomSlug);
  const initialCodeHook = useAppSelector((state) => state.initcode);
  const userAuthSession = useAppSelector((state) => state.authSession);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebarToggle);
  const [pressAction, setPressAction] = useState(false);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  // WebSocket
  useEffect(() => {
    const wsUrl = `ws://localhost:8080?token=${token}`;

    const ws = new WebSocket(wsUrl);
    console.log(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connection Established");
      toast.success("Connected To The Websocket Server.");
    };
    ws.onerror = (error) => {
      console.log("Error", error);
      toast.error("Websocket Error Check Console");
    };

    ws.onclose = () => {
      console.log("Connection Closed");
      toast.warning("Websocket Connection Closed.");
      toast.warning("Attempting To Reconnect.");
      console.log("Here");
      if (reconnectAttempt != 10) {
        setReconnectAttempt(reconnectAttempt + 1);
      }
    };
    if (reconnectAttempt == 10) {
      toast.warning("Reconnect Failed !");
    }
    ws.onmessage = (event) => {
      const newMessage = event.data;
      const parsedMessage = JSON.parse(newMessage);
      if (parsedMessage.type == "chat") {
        isRemoteUpdateRef.current = true;
        editorRef.current?.setValue(parsedMessage.message);
        isRemoteUpdateRef.current = false;
      }
      if (parsedMessage.type == "update_editor_settings") {
        isRemoteLanguageUpdateRef.current = true;
        dispatch(changeLanguage(parsedMessage.settings.language));
        dispatch(chnagefontSize(parsedMessage.settings.fontSize));
        dispatch(chnageTheme(parsedMessage.settings.theme));
        toast.info(`Editor Settings Updated`);
        isRemoteLanguageUpdateRef.current = false;
      }
    };
    return () => ws.close();
  }, [token, reconnectAttempt]);

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    // the below changes the current editor language
    monacoRef.current.editor.setModelLanguage(model, editorLanguage);
    monacoRef.current.editor.setTheme(editorTheme);
    editorRef.current.updateOptions({ fontSize: editorFontSize });

    // // to chnage and sync language changes across editors send a message
    const messageBody = {
      type: "update_editor_settings",
      roomId: roomSlug,
      settings: {
        language: editorLanguage,
        fontSize: editorFontSize,
        theme: editorTheme,
      },
    };
    wsRef.current?.send(JSON.stringify(messageBody));
  }, [editorLanguage, editorFontSize, editorTheme]);

  // set the store Variables
  useEffect(() => {
    dispatch(setRoomSlug(roomSlug));
    dispatch(setInitialCode(initialCode));
    dispatch(changeLanguage(initialLanguage));
    dispatch(chnageTheme(initialTheme));
    dispatch(chnagefontSize(initialFontSize));
  }, [
    roomSlug,
    initialCode,
    dispatch,
    initialLanguage,
    initialTheme,
    initialFontSize,
  ]);

  // useEffect(() => {
  //   console.log("Redux UPDATED:", roomSlugHook, initialCodeHook);
  // }, [roomSlugHook, initialCodeHook]);

  const isDataReady =
    roomSlugHook === roomSlug && initialCodeHook === initialCode;

  return (
    <>
      {/* <div>
      For Better Experience Use the Desktop View !!!
    </div> */}
      <SidebarProvider className=" ">
        <AppSidebar />
        <SidebarInset>
          <header className="mx-4 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Image
                src="/asset/images/codext_new_light.png"
                width={100}
                height={50}
                alt="logo_dark"
                className="-ml-2 w-20"
                priority={true}
              />
              <RoomInfo roomSlug={roomSlug} />
            </div>
            <Button
              className="mr-2 cursor-pointer"
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:3000/${roomSlug}`
                );
                setPressAction(true);
                setTimeout(() => {
                  setPressAction(false);
                }, 1000);
              }}
            >
              <div className="flex items-center gap-x-2">
                {pressAction ? <CheckCheck /> : <Copy />}
                {pressAction ? <span>Copied</span> : <span>Copy URL</span>}
              </div>
            </Button>
            <Button>Expires in 24 Hrs</Button>
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
                <Spinner className="size-8" />
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default MainPage;
