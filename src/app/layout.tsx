import { AppTheme, resolver } from "@/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@/theme/global.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/common/Auth";

export const metadata: Metadata = {
  title: "S-TOP 기술교류회",
  description: "S-TOP 기술교류회",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={AppTheme} cssVariablesResolver={resolver} defaultColorScheme="auto">
          <AuthProvider>{children}</AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
