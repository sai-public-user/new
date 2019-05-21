import React, { Fragment } from 'react';
import Cell from './cell';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import * as Styles from './SharedStyles';

// const {
    
// } = Styles.default;

function Row(props) {
    const {
        row = {}, headers = null , pinned = [],
        checked = [], checkBoxChange,
    } = props;
    const headerVals = Array.isArray(headers) && headers.map(({ value ='' }) => value) || [];
    return (
        <div className="table_row text-capitalize row mt-3 ml-1 mr-1">
            <div className="row table_cell  m-0 p-2 align-content-center row-checkbox">
                <span className="first_cell"><Checkbox checked={checked.includes(row.id)} onChange={checkBoxChange} name={row.id} /></span>
            </div>
            {row && row !== null && Array.isArray(headerVals) && headerVals.map((keyVal, i) => (
                <Cell data={row[keyVal]} isPinnedVal={pinned.includes(keyVal)} endPosition={ i === 0 || i === headerVals.length - 1 ? i : -1 } />
            ))}
        </div>
    );
}

export default Row;