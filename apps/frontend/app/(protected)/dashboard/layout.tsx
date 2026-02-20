import { Metadata } from "next";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "CodeXt | Dashboard ",
};

const Layout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default Layout;
