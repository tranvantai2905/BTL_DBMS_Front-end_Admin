import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReloadContext from "@/context/ReloadContext";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
    }
  }, [reload]);
  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
      <Component {...pageProps} />
    </ReloadContext.Provider>
  );
}
