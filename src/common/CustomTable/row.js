import React, { Fragment } from 'react';
import Cell from './cell';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as Styles from './SharedStyles';

const {
    RowCheckbox,
    FirstCell,
    TableRow,
} = Styles.default;

function Row(props) {
    const {
        row = {}, headers = null , pinned = [],
        checked = [], checkBoxChange, pinnedRow,
        name, noCompare,
    } = props;
    const headerVals = Array.isArray(headers) && headers.map(({ value ='' }) => value) || [];
    return (
        <TableRow>
            {(Array.isArray(pinned) && pinned.length > 0 && pinnedRow) || (!pinnedRow && Array.isArray(pinned) && pinned.length === 0) && !noCompare ? (
              <RowCheckbox>
                  <FirstCell><Checkbox checked={checked.includes(row.id)} onChange={checkBoxChange} name={`${row.id}`} /></FirstCell>
              </RowCheckbox>
            ) : null}
            {row && row !== null && Array.isArray(headerVals) && headerVals.map((keyVal, i) => (
              <Cell data={row[keyVal]} title={keyVal} isPinnedVal={pinned.includes(keyVal)} name={keyVal} endPosition={ i === 0 || i === headerVals.length - 1 ? i : -1 } />
            ))}
        </TableRow>
    );
}

export default Row;