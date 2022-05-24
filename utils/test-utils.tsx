import { ReactNode, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import Theme from "../styles/theme";

type Props = {
  children: ReactNode;
};

function AllTheProviders({ children }: Props) {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
