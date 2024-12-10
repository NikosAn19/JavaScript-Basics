import { PropsWithChildren } from "react";
import Header from "../Header/Header";

export default function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
