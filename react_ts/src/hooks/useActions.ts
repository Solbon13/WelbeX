import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as TableActionCreators from '../store/action-creators/table'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(TableActionCreators, dispatch)
}