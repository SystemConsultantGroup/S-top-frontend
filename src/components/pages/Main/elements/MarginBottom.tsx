import { ReactNode } from "react";

interface IMarginBottom {
  mb?: number | string;
  children: ReactNode;
}

export function MarginBottom({ mb, children }: IMarginBottom) {
  const MB = typeof mb === "number" ? `${mb}px` : mb;
  return <div style={{ marginBottom: MB }}>{children}</div>;
}
