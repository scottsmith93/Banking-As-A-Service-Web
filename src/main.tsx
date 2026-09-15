import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import GlobalStyle from "carbon-react/lib/style/global-style";
import TokensWrapper from "carbon-react/lib/components/tokens-wrapper";
import "carbon-react/lib/style/fonts.css";
import "./fonts.css";
import "./index.css";
import App from "./App";
import UIForkDevTools from "./components/dev-tools/UIForkDevTools";
import "./i18n";

// NOTE: Keep StrictMode disabled here.
// Carbon overlay components (e.g. Sidebar/Dialog/Confirm/ActionPopover)
// fail to mount correctly in this playground when StrictMode is enabled.
createRoot(document.getElementById('root')!).render(
  <>
    <CarbonProvider>
      <GlobalStyle />
      <TokensWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TokensWrapper>
    </CarbonProvider>
    <UIForkDevTools />
  </>
)
