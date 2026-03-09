import { AppTheme, resolver } from "@/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@/theme/global.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/common/Auth";
import { SWRProvider } from "@/components/common/SWRProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "S-TOP 기술교류회",
  description: "S-TOP 기술교류회",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const domain = headersList.get("host");
  const isProdDomain = domain === "s-top.cs.skku.edu";

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      {isProdDomain && (
        <>
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
        </>
      )}
      <body>
        <SWRProvider>
          <MantineProvider
            theme={AppTheme}
            cssVariablesResolver={resolver}
            defaultColorScheme="auto"
          >
            <AuthProvider>{children}</AuthProvider>
          </MantineProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
