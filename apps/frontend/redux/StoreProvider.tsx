"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store/store";
import { setAuthSession } from "./slice/auth/session.slice";

// import { initializeCount } from '../lib/features/counter/counterSlice'

export default function StoreProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.dispatch(setAuthSession(session));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
