import React, { useEffect, useState } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import FormTable from './Form/FormTable'
import Table from './Table'

const TablePage: React.FC = () => {
    const [page, setPage] = useState<number>(1)
    const [size, setSize] = useState<number>(2)
    const [sort, setSort] = useState<boolean>(false)
    const [fieldSort, setFieldSort] = useState<string>('')
    const [fieldFilter, setFieldFilter] = useState<string>('')
    const [operation, setOperation] = useState<string>('')
    const [text, setText] = useState<string>('')

    const { fetchTable } = useActions()

    const onChangeField = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFieldFilter(event.currentTarget.value)
    }

    const onChangeOperation = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOperation(event.currentTarget.value)
    }

    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }

    const onFilter = () => {
        // fetchTable(page, size, sort, fieldSort, "count", "11", "меньше")
        // fetchTable(page, size, 'sort', 'count', "title", "заголово", "like")
        // fetchTable(page, size, sort, 'count', fieldFilter, text, operation)
        fetchTable(page, size, sort, fieldSort, fieldFilter, text, operation)
    }

    const onSort = (field: string) => {
        setFieldSort(field)
        const sortChange = !sort
        setSort(sortChange)
    }

    const onPagination = (pag: number) => {
        setPage(pag)
    }

    const onChangeSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sizeChange = parseInt(event.currentTarget.value)
        setSize(sizeChange)
    }

    useEffect(() => {
        onFilter()
    }, [sort, fieldSort, page, size])

    const { maxSize } = useTypedSelector(state => state.tables)

    const pagination = Math.ceil(maxSize / size);
    let pages: number[] = []
    for (let i = 1; i <= pagination; i++) {
        pages.push(i)
    }

    return (
        <div>
            <p>
                <FormTable fieldFilter={fieldFilter} operation={operation} text={text}
                    onChangeField={onChangeField} onChangeOperation={onChangeOperation}
                    onChangeText={onChangeText} onFilter={onFilter} />
            </p>
            <p>
                Количество на странице
                <select value={size} onChange={onChangeSize}>
                    <option value='2'>2</option>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                </select>
            </p>
            <ul className="pagination">
                {pages.map((p, i) =>
                    (p === page)
                        ? <li key={p}><span onClick={() => onPagination(p)} className="active">{p}</span></li>
                        : <li key={p}><span onClick={() => onPagination(p)}>{p}</span></li>
                )}
            </ul>
            <Table onTableHead={onSort} />
        </div>
    )
}

export default TablePage
