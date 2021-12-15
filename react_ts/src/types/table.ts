export interface TableState {
    tables: any[];
    loading: boolean,
    error: null | string,
    maxSize: number
}

export enum TableActionTypes {
    FETCH_TABLES = 'FETCH_TABLES',
    FETCH_TABLES_SUCCESS = 'FETCH_TABLES_SUCCESS',
    FETCH_TABLES_ERROR = 'FETCH_TABLES_ERROR',
}

interface FetchTablesAction {
    type: TableActionTypes.FETCH_TABLES;
}

interface FetchTablesSuccessAction {
    type: TableActionTypes.FETCH_TABLES_SUCCESS;
    payload: any[]
    payloadSize: number
}

interface FetchTablesErrorAction {
    type: TableActionTypes.FETCH_TABLES_ERROR;
    payload: string
}

export type TableAction = FetchTablesAction | FetchTablesErrorAction | FetchTablesSuccessAction
