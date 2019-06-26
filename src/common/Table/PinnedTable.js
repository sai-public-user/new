import React, { Component, Fragment } from 'react';
import Header from './header';
import Row from './row';
import './table.css';
import * as Styles from '../../common/Table/SharedStyles';

const {
    Rows,
    HeaderData,
    CustomTable,
} = Styles.default;

function PinnedTable(props) {
    const {
        pinnedHeaders,
        sortedCol,
        onCellClick,
        compareClicked,
        hasPinnedColumns,
        pinned,
        pinnedRow,
        isPinned,
        rows,
        checked,
        rowCheckBoxChange,
    } = props;
    return (
        <div style={{ width: `${(pinnedHeaders.length * 18) + pinnedHeaders.length}%` }}>
            <CustomTable>
              <HeaderData><Header sortedCol={sortedCol} onCellClick={onCellClick} headers={pinnedHeaders} compare={compareClicked} hasPinnedColumns={hasPinnedColumns} pinned={pinned} pinnedRow={pinnedRow} isPinned={isPinned} /></HeaderData>
            </CustomTable>
            <CustomTable>
              <Rows style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
                  {Array.isArray(rows) && rows.map((row, i) => <Row checked={checked} pinnedRow pinned={pinned} checkBoxChange={rowCheckBoxChange} row={row} key={i} headers={pinnedHeaders} />)}
              </Rows>
            </CustomTable>
        </div>
    );
}

export default PinnedTable;