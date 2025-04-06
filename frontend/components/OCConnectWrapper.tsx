"use client";

import { OCConnect } from "@opencampus/ocid-connect-js";

export default function OCConnectWrapper({
  children,
  opts,
  sandboxMode,
}: {
  children: React.ReactNode;
  opts: any;
  sandboxMode: boolean;
}) {
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}
