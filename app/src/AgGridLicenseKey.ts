import { LicenseManager } from "ag-grid-enterprise"

const AgGridLicenseKey = import.meta.env.AG_GRID_KEY

LicenseManager.setLicenseKey(AgGridLicenseKey)
