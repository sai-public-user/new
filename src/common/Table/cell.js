import React from 'react';
import * as Styles from './SharedStyles';

const {
    TableRowCell,
} = Styles.default;

function Cell(props) {
    const { data = '', isPinnedVal = false, endPosition = -1, name, title } = props;
    return (
        <TableRowCell title={title} className={`${isPinnedVal ? ' pinned_cell' : ''}${endPosition > 0 ? ' last_cell' : ''}`} name={name}>
            {data}
        </TableRowCell>
    )
}

export default Cell;