import React, { useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

interface Props {
    fieldFilter: string,
    operation: string,
    text: string,
    onChangeField: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    onChangeOperation: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    onChangeText: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    onFilter: () => void;
}

const FormTable: React.FC<Props> = ({ fieldFilter, operation, text, onChangeField, onChangeOperation, onChangeText, onFilter }) => {
    return (
        <>
            <select value={fieldFilter} onChange={onChangeField}>
                <option value=''>-</option>
                <option value='title'>Название</option>
                <option value='count'>Количество</option>
                <option value='distance'>Расстояние</option>
            </select>
            <select value={operation} onChange={onChangeOperation}>
                <option value=''>-</option>
                <option value='='>равно</option>
                <option value='like'>содержит</option>
                <option value='>'>больше</option>
                <option value='<'>меньше</option>
            </select>
            <input value={text} onChange={onChangeText} />
            <button onClick={onFilter}>Фильтр</button>
        </>
    )
}

export default FormTable
