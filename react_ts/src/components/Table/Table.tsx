import './table.css'
import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface Props {
    onTableHead: (title: string, type: string) => void;
}

const Table: React.FC<Props> = ({ onTableHead }) => {
    const { tables, loading, error } = useTypedSelector(state => state.tables)

    

    if (loading) {
        return <>Идет загрузка...</>
    }

    if (error) {
        return <>{error}</>
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Дата</th>
                        <th onClick={() => onTableHead('title', 'string')}>Заголовок</th>
                        <th onClick={() => onTableHead('count', 'number')}>Количество</th>
                        <th onClick={() => onTableHead('distance', 'number')}>Растояние</th>
                    </tr>
                    {tables.map(table =>
                        <tr key={table.id}>
                            <td>{table.date}</td>
                            <td>{table.title}</td>
                            <td>{table.count}</td>
                            <td>{table.distance}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
        </>
    )
}

export default Table
