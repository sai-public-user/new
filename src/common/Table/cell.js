import React, { Fragment } from 'react';

function Cell(props) {
    const { data = '', isPinnedVal = false, endPosition = -1 } = props;
    return (
        <div className={`row table_cell col m-0 p-0 pl-2 align-content-center${isPinnedVal ? ' pinned_cell' : ''}${endPosition > 0 ? ' last_cell' : ''}`} name={data}>
            {data}
        </div>
    )
}

export default Cell;