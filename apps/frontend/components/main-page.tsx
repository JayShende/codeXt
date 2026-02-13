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
import { Spinner } from "./ui/spinner";
import RoomInfo from "./room-info";
interface mainPageProps {
  roomSlug: string;
  token: string;
  initialCode: string;
  initialLanguage: string;
}

const MainPage = ({
  roomSlug,
  token,
  initialCode,
  initialLanguage,
}: mainPageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const isRemoteUpdateRef = useRef(false);
  const isRemoteLanguageUpdateRef = useRef(false);
  const wsRef = useRef<WebSocket | null>(null);
  const monacoRef = useRef<any>(null);

  const lang2 = useAppSelector((state) => state.language);
  const roomSlugHook = useAppSelector((state) => state.roomSlug);
  const initialCodeHook = useAppSelector((state) => state.initcode);
  const userAuthSession = useAppSelector((state) => state.authSession);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebarToggle);
  // WebSocket
  // dispatch(changeLanguage(initialLanguage));
  useEffect(() => {
    const wsUrl = `ws://localhost:8080?token=${token}`;

    const ws = new WebSocket(wsUrl);
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
    };

    ws.onmessage = (event) => {
      const newMessage = event.data;
      const parsedMessage = JSON.parse(newMessage);
      console.log("Parsed Message is ", parsedMessage);
      if (parsedMessage.type == "chat") {
        isRemoteUpdateRef.current = true;
        editorRef.current?.setValue(parsedMessage.message);
        isRemoteUpdateRef.current = false;
      }
      if (parsedMessage.type == "update_editor_settings") {
        isRemoteLanguageUpdateRef.current = true;
        console.log("inside");
        dispatch(changeLanguage(parsedMessage.language));
        isRemoteLanguageUpdateRef.current = false;
      }
    };
    return () => ws.close();
  }, [token]);

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    // the below changes the current editor language
    monacoRef.current.editor.setModelLanguage(model, lang2);
    console.log("here hu", lang2);
    // // to chnage and sync language changes across editors send a message
    const messageBody = {
      type: "update_editor_settings",
      roomId: roomSlug,
      language: lang2,
    };
    console.log(JSON.stringify(messageBody));
    wsRef.current?.send(JSON.stringify(messageBody));
  }, [lang2]);

  // set the store Variables
  useEffect(() => {
    dispatch(setRoomSlug(roomSlug));
    dispatch(setInitialCode(initialCode));
    dispatch(changeLanguage(initialLanguage));
  }, [roomSlug, initialCode, dispatch, initialLanguage]);

  // useEffect(() => {
  //   console.log("Redux UPDATED:", roomSlugHook, initialCodeHook);
  // }, [roomSlugHook, initialCodeHook]);

  const isDataReady =
    roomSlugHook === roomSlug && initialCodeHook === initialCode;

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
