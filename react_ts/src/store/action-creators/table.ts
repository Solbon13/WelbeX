import axios from "axios"
import { Dispatch } from "redux"
import { TableAction, TableActionTypes } from "../../types/table"

export const fetchTable = (page: number, size: number, sort: boolean, fieldSort: string, fieldFilter: string, text: string, operation: string) => {
    return async (dispatch: Dispatch<TableAction>) => {
        try {
            dispatch({type: TableActionTypes.FETCH_TABLES})
            let params = {params: {
                page: page,
                size: size,
                sort: sort,
                fieldSort: fieldSort,
                fieldFilter: fieldFilter,
                text: text,
                operation: operation
              }}
            const response = await axios.get('http://localhost:5000', params)
            dispatch({type: TableActionTypes.FETCH_TABLES_SUCCESS, payload: response.data.tables, payloadSize: response.data.max_size})
        } catch (e) {
            dispatch({type: TableActionTypes.FETCH_TABLES_ERROR, payload: 'Произошла ошибка при загрузке таблицы'})
        }
    }
}