import { Global, ThemeProvider } from "@emotion/react";
import { GlobalResetStyle, GlobalTypographyStyle, theme } from "@/styles";
import { Router } from "@/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalResetStyle} />
        <Global styles={GlobalTypographyStyle} />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
