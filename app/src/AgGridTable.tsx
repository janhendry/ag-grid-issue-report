import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { GridApi, GridOptions, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { IOlympicData } from "./IOlympicData";
import { olympicDatasource } from "./OlympiaDataSource";

export function Example() {
  const agGridRef = useRef<GridApi<IOlympicData> | null>(null);

  const onGridReady = (event: GridReadyEvent<IOlympicData>) => {
    agGridRef.current = event.api;
  };

  const onClick = () => {
    agGridRef.current?.refreshServerSide({ purge: true });
  };

  return (
    <div>
      <button onClick={onClick}>Refresh</button>
      <AgGridTable onGridReady={onGridReady} />
    </div>
  );
}

export type GridExampleProps = {
  onGridReady: (event: GridReadyEvent<IOlympicData>) => void;
};

export function AgGridTable({ onGridReady }: GridExampleProps) {
  const [gridOptions] = useState<GridOptions<IOlympicData>>({
    suppressContextMenu: true,
    columnDefs: [
      { field: "athlete" },
      { field: "country" },
      { field: "year" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
    ],
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      sortable: false,
    },
    rowModelType: "serverSide",
  });

  return (
    <div className="ag-theme-alpine" style={{ height: "600px", width: "100%" }}>
      <AgGridReact
        suppressContextMenu={true}
        serverSideDatasource={olympicDatasource}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
      />
    </div>
  );
}
