import { TableAction, TableActionTypes, TableState } from "../../types/table"

const initialState: TableState = {
    tables: [],
    loading: false,
    error: null,
    maxSize: 0
}

export const tableReducer = (state = initialState, action: TableAction): TableState => {
    switch (action.type) {
        case TableActionTypes.FETCH_TABLES:
            return { loading: true, error: null, tables: [], maxSize: 0 }
        case TableActionTypes.FETCH_TABLES_SUCCESS:
            return { loading: false, error: null, tables: action.payload, maxSize: action.payloadSize }
        case TableActionTypes.FETCH_TABLES_ERROR:
            return { loading: false, error: action.payload, tables: [], maxSize: 0 }
        default:
            return state
    }
}