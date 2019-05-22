import React, { Fragment } from 'react';
import * as Styles from './SharedStyles';

const {
    TableRowCell,
} = Styles.default;

function Cell(props) {
    const { data = '', isPinnedVal = false, endPosition = -1 } = props;
    return (
        <TableRowCell className={`${isPinnedVal ? ' pinned_cell' : ''}${endPosition > 0 ? ' last_cell' : ''}`} name={data}>
            {data}
        </TableRowCell>
    )
}

export default Cell;