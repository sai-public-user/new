import React from 'react';
import * as Styles from './SharedStyles';

const {
    TableRowCell,
} = Styles.default;

function Cell(props) {
    const { data = null, endPosition = -1, name, title } = props;
    return (
        <TableRowCell title={title} className={`${endPosition > 0 ? ' last_cell' : ''}`} name={name}>
            {data !== null && (data.length > 0 || typeof data === 'number') ? data : '-'}
        </TableRowCell>
    )
}

export default Cell;

//${isPinnedVal ? ' pinned_cell' : ''}