"use client";

import { createTheme, CSSVariablesResolver } from "@mantine/core";
import { Pretendard } from "./fonts";

export const AppTheme = createTheme({
  fontFamily: `${Pretendard.fontFamily}, sans-sarif`,
  black: "#333",
  headings: {
    fontFamily: "inherit",
  },
  lineHeights: {
    xs: "1",
    sm: "1",
    md: "1",
    lg: "1",
    xl: "1",
  },
  other: {
    fontWeights: {
      regular: 400,
      semibold: 600,
      bold: 700,
    },
    // 피그마 기준 색상 설정
    light: {
      primary: "#36618E",
      surfaceTint: "#36618E",
      onPrimary: "#FFFFFF",
      primaryContainer: "#D1E4FF",
      onPrimaryContainer: "#001D36",
      secondary: "#4A672D",
      onSecondary: "#FFFFFF",
      secondaryContainer: "#CBEEA5",
      onSecondaryContainer: "#0E2000",
      tertiary: "#6B5778",
      onTertiary: "#FFFFFF",
      tertiaryContainer: "#F3DAFF",
      onTertiaryContainer: "#251431",
      error: "#BA1A1A",
      onError: "#FFFFFF",
      errorContainer: "#FFDAD6",
      onErrorContainer: "#410002",
      background: "#F8F9FF",
      onBackground: "#191C20",
      surface: "#F8F9FF",
      onSurface: "#191C20",
      surfaceVariant: "#DFE2EB",
      onSurfaceVariant: "#43474E",
      outline: "#73777F",
      outlineVariant: "#C3C6CF",
      shadow: "#000000",
      scrim: "#000000",
      inverseSurface: "#2E3135",
      inverseOnSurface: "#EFF0F7",
      inversePrimary: "#A1CAFD",
      primaryFixed: "#D1E4FF",
      onPrimaryFixed: "#001D36",
      primaryFixedDim: "#A1CAFD",
      onPrimaryFixedVariant: "#1A4975",
      secondaryFixed: "#CBEEA5",
      onSecondaryFixed: "#0E2000",
      secondaryFixedDim: "#AFD18C",
      onSecondaryFixedVariant: "#334E17",
      tertiaryFixed: "#F3DAFF",
      onTertiaryFixed: "#251431",
      tertiaryFixedDim: "#D7BEE4",
      onTertiaryFixedVariant: "#523F5F",
      surfaceDim: "#D8DAE0",
      surfaceBright: "#F8F9FF",
      surfaceContainerLowest: "#FFFFFF",
      surfaceContainerLow: "#F2F3FA",
      surfaceContainer: "#ECEEF4",
      surfaceContainerHigh: "#E6E8EE",
      surfaceContainerHighest: "#E1E2E8",
      tableRow: "#EFEFEF",
      inputBorder: "#191C20",
      inputBorderFocus: "#228BE6",
      inputSurface: "#FFFFFF",
      inputSurfaceHover: "#F8F9FF",
    },
    dark: {
      primary: "#A1CAFD",
      surfaceTint: "#A1CAFD",
      onPrimary: "#003259",
      primaryContainer: "#1A4975",
      onPrimaryContainer: "#D1E4FF",
      secondary: "#AFD18C",
      onSecondary: "#1D3702",
      secondaryContainer: "#334E17",
      onSecondaryContainer: "#CBEEA5",
      tertiary: "#D7BEE4",
      onTertiary: "#3B2948",
      tertiaryContainer: "#523F5F",
      onTertiaryContainer: "#F3DAFF",
      error: "#FFB4AB",
      onError: "#690005",
      errorContainer: "#93000A",
      onErrorContainer: "#FFDAD6",
      background: "#111418",
      onBackground: "#E1E2E8",
      surface: "#111418",
      onSurface: "#E1E2E8",
      surfaceVariant: "#43474E",
      onSurfaceVariant: "#C3C6CF",
      outline: "#8D9199",
      outlineVariant: "#43474E",
      shadow: "#000000",
      scrim: "#000000",
      inverseSurface: "#E1E2E8",
      inverseOnSurface: "#2E3135",
      inversePrimary: "#36618E",
      primaryFixed: "#D1E4FF",
      onPrimaryFixed: "#001D36",
      primaryFixedDim: "#A1CAFD",
      onPrimaryFixedVariant: "#1A4975",
      secondaryFixed: "#CBEEA5",
      onSecondaryFixed: "#0E2000",
      secondaryFixedDim: "#AFD18C",
      onSecondaryFixedVariant: "#334E17",
      tertiaryFixed: "#F3DAFF",
      onTertiaryFixed: "#251431",
      tertiaryFixedDim: "#D7BEE4",
      onTertiaryFixedVariant: "#523F5F",
      surfaceDim: "#111418",
      surfaceBright: "#36393E",
      surfaceContainerLowest: "#2E2E2E",
      surfaceContainerLow: "#191C20",
      surfaceContainer: "#1D2024",
      surfaceContainerHigh: "#272A2F",
      surfaceContainerHighest: "#32353A",
      tableRow: "#3E3E3E",
      inputBorder: "#424242",
      inputBorderFocus: "#228BE6",
      inputSurface: "#2E2E2E",
      inputSurfaceHover: "#36393E",
    },
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-other-font-weights-regular": theme.other.fontWeights.regular,
    "--mantine-other-font-weights-semibold": theme.other.fontWeights.semibold,
    "--mantine-other-font-weights-bold": theme.other.fontWeights.bold,
  },
  dark: {
    "--mantine-color-main-background": theme.colors.gray[7],
    "--mantine-color-dimmed-border": theme.colors.gray[9],
    "--color-primary": theme.other.dark.primary,
    "--color-surfaceTint": theme.other.dark.surfaceTint,
    "--color-onPrimary": theme.other.dark.onPrimary,
    "--color-primaryContainer": theme.other.dark.primaryContainer,
    "--color-onPrimaryContainer": theme.other.dark.onPrimaryContainer,
    "--color-secondary": theme.other.dark.secondary,
    "--color-onSecondary": theme.other.dark.onSecondary,
    "--color-secondaryContainer": theme.other.dark.secondaryContainer,
    "--color-onSecondaryContainer": theme.other.dark.onSecondaryContainer,
    "--color-tertiary": theme.other.dark.tertiary,
    "--color-onTertiary": theme.other.dark.onTertiary,
    "--color-tertiaryContainer": theme.other.dark.tertiaryContainer,
    "--color-onTertiaryContainer": theme.other.dark.onTertiaryContainer,
    "--color-error": theme.other.dark.error,
    "--color-onError": theme.other.dark.onError,
    "--color-errorContainer": theme.other.dark.errorContainer,
    "--color-onErrorContainer": theme.other.dark.onErrorContainer,
    "--color-background": theme.other.dark.background,
    "--color-onBackground": theme.other.dark.onBackground,
    "--color-surface": theme.other.dark.surface,
    "--color-onSurface": theme.other.dark.onSurface,
    "--color-surfaceVariant": theme.other.dark.surfaceVariant,
    "--color-onSurfaceVariant": theme.other.dark.onSurfaceVariant,
    "--color-outline": theme.other.dark.outline,
    "--color-outlineVariant": theme.other.dark.outlineVariant,
    "--color-shadow": theme.other.dark.shadow,
    "--color-scrim": theme.other.dark.scrim,
    "--color-inverseSurface": theme.other.dark.inverseSurface,
    "--color-inverseOnSurface": theme.other.dark.inverseOnSurface,
    "--color-inversePrimary": theme.other.dark.inversePrimary,
    "--color-primaryFixed": theme.other.dark.primaryFixed,
    "--color-onPrimaryFixed": theme.other.dark.onPrimaryFixed,
    "--color-primaryFixedDim": theme.other.dark.primaryFixedDim,
    "--color-onPrimaryFixedVariant": theme.other.dark.onPrimaryFixedVariant,
    "--color-secondaryFixed": theme.other.dark.secondaryFixed,
    "--color-onSecondaryFixed": theme.other.dark.onSecondaryFixed,
    "--color-secondaryFixedDim": theme.other.dark.secondaryFixedDim,
    "--color-onSecondaryFixedVariant": theme.other.dark.onSecondaryFixedVariant,
    "--color-tertiaryFixed": theme.other.dark.tertiaryFixed,
    "--color-onTertiaryFixed": theme.other.dark.onTertiaryFixed,
    "--color-tertiaryFixedDim": theme.other.dark.tertiaryFixedDim,
    "--color-onTertiaryFixedVariant": theme.other.dark.onTertiaryFixedVariant,
    "--color-surfaceDim": theme.other.dark.surfaceDim,
    "--color-surfaceBright": theme.other.dark.surfaceBright,
    "--color-surfaceContainerLowest": theme.other.dark.surfaceContainerLowest,
    "--color-surfaceContainerLow": theme.other.dark.surfaceContainerLow,
    "--color-surfaceContainer": theme.other.dark.surfaceContainer,
    "--color-surfaceContainerHigh": theme.other.dark.surfaceContainerHigh,
    "--color-surfaceContainerHighest": theme.other.dark.surfaceContainerHighest,
    "--color-tableRow": theme.other.dark.tableRow,
    "--color-inputBorder": theme.other.dark.inputBorder,
    "--color-inputBorderFocus": theme.other.dark.inputBorderFocus,
    "--color-inputSurface": theme.other.dark.inputSurface,
    "--color-inputSurfaceHover": theme.other.dark.inputSurfaceHover,
  },
  light: {
    "--mantine-color-main-background": "#FAFAFA",
    "--mantine-color-dimmed-border": theme.colors.gray[1],
    "--color-primary": theme.other.light.primary,
    "--color-surfaceTint": theme.other.light.surfaceTint,
    "--color-onPrimary": theme.other.light.onPrimary,
    "--color-primaryContainer": theme.other.light.primaryContainer,
    "--color-onPrimaryContainer": theme.other.light.onPrimaryContainer,
    "--color-secondary": theme.other.light.secondary,
    "--color-onSecondary": theme.other.light.onSecondary,
    "--color-secondaryContainer": theme.other.light.secondaryContainer,
    "--color-onSecondaryContainer": theme.other.light.onSecondaryContainer,
    "--color-tertiary": theme.other.light.tertiary,
    "--color-onTertiary": theme.other.light.onTertiary,
    "--color-tertiaryContainer": theme.other.light.tertiaryContainer,
    "--color-onTertiaryContainer": theme.other.light.onTertiaryContainer,
    "--color-error": theme.other.light.error,
    "--color-onError": theme.other.light.onError,
    "--color-errorContainer": theme.other.light.errorContainer,
    "--color-onErrorContainer": theme.other.light.onErrorContainer,
    "--color-background": theme.other.light.background,
    "--color-onBackground": theme.other.light.onBackground,
    "--color-surface": theme.other.light.surface,
    "--color-onSurface": theme.other.light.onSurface,
    "--color-surfaceVariant": theme.other.light.surfaceVariant,
    "--color-onSurfaceVariant": theme.other.light.onSurfaceVariant,
    "--color-outline": theme.other.light.outline,
    "--color-outlineVariant": theme.other.light.outlineVariant,
    "--color-shadow": theme.other.light.shadow,
    "--color-scrim": theme.other.light.scrim,
    "--color-inverseSurface": theme.other.light.inverseSurface,
    "--color-inverseOnSurface": theme.other.light.inverseOnSurface,
    "--color-inversePrimary": theme.other.light.inversePrimary,
    "--color-primaryFixed": theme.other.light.primaryFixed,
    "--color-onPrimaryFixed": theme.other.light.onPrimaryFixed,
    "--color-primaryFixedDim": theme.other.light.primaryFixedDim,
    "--color-onPrimaryFixedVariant": theme.other.light.onPrimaryFixedVariant,
    "--color-secondaryFixed": theme.other.light.secondaryFixed,
    "--color-onSecondaryFixed": theme.other.light.onSecondaryFixed,
    "--color-secondaryFixedDim": theme.other.light.secondaryFixedDim,
    "--color-onSecondaryFixedVariant": theme.other.light.onSecondaryFixedVariant,
    "--color-tertiaryFixed": theme.other.light.tertiaryFixed,
    "--color-onTertiaryFixed": theme.other.light.onTertiaryFixed,
    "--color-tertiaryFixedDim": theme.other.light.tertiaryFixedDim,
    "--color-onTertiaryFixedVariant": theme.other.light.onTertiaryFixedVariant,
    "--color-surfaceDim": theme.other.light.surfaceDim,
    "--color-surfaceBright": theme.other.light.surfaceBright,
    "--color-surfaceContainerLowest": theme.other.light.surfaceContainerLowest,
    "--color-surfaceContainerLow": theme.other.light.surfaceContainerLow,
    "--color-surfaceContainer": theme.other.light.surfaceContainer,
    "--color-surfaceContainerHigh": theme.other.light.surfaceContainerHigh,
    "--color-surfaceContainerHighest": theme.other.light.surfaceContainerHighest,
    "--color-tableRow": theme.other.light.tableRow,
    "--color-inputBorder": theme.other.light.inputBorder,
    "--color-inputBorderFocus": theme.other.light.inputBorderFocus,
    "--color-inputSurface": theme.other.light.inputSurface,
    "--color-inputSurfaceHover": theme.other.light.inputSurfaceHover,
  },
});
