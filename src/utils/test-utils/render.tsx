import { render as testingLibraryRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { AppTheme, resolver } from "@/theme/AppTheme";

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={AppTheme} cssVariablesResolver={resolver}>
        {children}
      </MantineProvider>
    ),
  });
}
