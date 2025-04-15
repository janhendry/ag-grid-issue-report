import type { IServerSideDatasource, IServerSideGetRowsParams, IServerSideGetRowsRequest } from "ag-grid-community";
import type { IOlympicData } from "./IOlympicData.js";

export class ServerDatasource<TData> implements IServerSideDatasource<TData> {
  private cachedData: TData[] | null = null;
  private dataUrl: string;

  constructor(dataUrl: string) {
    this.dataUrl = dataUrl;
  }

  public getRows(params: IServerSideGetRowsParams<TData>): void {
    console.log("[Datasource] - ", params.request);

    if (!this.cachedData) {
      fetch(this.dataUrl)
        .then((response) => response.json())
        .then((data: TData[]) => {
          this.cachedData = data;
          this.sliceRows(params);
        })
    } else {
      this.sliceRows(params);
    }
  }

  private sliceRows(params: {
    request: IServerSideGetRowsRequest;
    success: (params: { rowData: TData[] }) => void;
    fail: () => void;
  }): void {
    if (!this.cachedData) {
      params.fail();
      return;
    }
    const { startRow, endRow } = params.request;
    const rowsThisPage = this.cachedData.slice(startRow, endRow);

    setTimeout(() => {
      params.success({ rowData: rowsThisPage as TData[] });
    }, 2000);
  }
}

export const olympicDatasource = new ServerDatasource<IOlympicData>("https://www.ag-grid.com/example-assets/olympic-winners.json")
