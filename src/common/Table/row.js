import React, { Fragment } from 'react';
import Cell from './cell';

function Row(props) {
    const { row = {}, headers = null , pinned = [] } = props;
    const headerVals = Array.isArray(headers) && headers.map(({ value ='' }) => value) || [];
    return (
        <div className="tablee_row text-capitalize row mt-2">
            {row && row !== null && Array.isArray(headerVals) && headerVals.map((keyVal, i) => (
                <Cell data={row[keyVal]} isPinnedVal={pinned.includes(keyVal)} endPosition={ i === 0 || i === headerVals.length - 1 ? i : -1 } />
            ))}
        </div>
    );
}

export default Row;