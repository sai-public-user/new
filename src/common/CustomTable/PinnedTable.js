import React, { Component } from 'react';
import Header from './header';
import Row from './row';
import './table.css';
import * as Styles from '../../common/Table/SharedStyles';

const {
    Rows,
    HeaderData,
    CustomTable,
} = Styles.default;

class PinnedTable extends Component {

    onScroll = () => {
        this.props.onScroll(this.refs.tbody.scrollTop, 'pinned');
    }
    
    render() {
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
        } = this.props;
        return (
            <div style={{ width: `${(pinnedHeaders.length * 18) + pinnedHeaders.length}%` }}>
                <CustomTable>
                  <HeaderData><Header sortedCol={sortedCol} onCellClick={onCellClick} headers={pinnedHeaders} compare={compareClicked} hasPinnedColumns={hasPinnedColumns} pinned={pinned} pinnedRow={pinnedRow} isPinned={isPinned} /></HeaderData>
                </CustomTable>
                <CustomTable>
                  <Rows style={{ overflowY: 'auto', overflowX: 'hidden' }} ref="tbody" onScroll={this.onScroll}>
                      {Array.isArray(rows) && rows.map((row, i) => <Row checked={checked} pinnedRow pinned={pinned} checkBoxChange={rowCheckBoxChange} row={row} key={i} headers={pinnedHeaders} />)}
                  </Rows>
                </CustomTable>
            </div>
        );
    }
}
 
export default PinnedTable;