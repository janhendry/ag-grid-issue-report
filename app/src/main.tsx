import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Example } from "./AgGridTable";
import {
  ModuleRegistry,
  AllCommunityModule,
  provideGlobalGridOptions,
} from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";

import "./AgGridLicenseKey";

ModuleRegistry.registerModules([AllEnterpriseModule, AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Example />
  </StrictMode>
);
