"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr:false to avoid "window is not defined" crash
// caused by Sidebar's useWindowSize accessing window at module level.
// This is a workaround — the root cause is in @rhinolabs/react-hooks.
const PlaygroundClient = dynamic(() => import("./playground-client"), {
  ssr: false,
  loading: () => <p style={{ padding: 24 }}>Loading playground...</p>,
});

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
