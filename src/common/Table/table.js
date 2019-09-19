import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Row from './row';
import './table.css';
import * as Styles from '../../common/Table/SharedStyles';
import * as CSS from '../../common/Table/TableStyles';
import PropTypes from 'prop-types';
import {
    CircularProgress,
    TableBody,
    Chip,
} from '@material-ui/core';
import Done from '@material-ui/icons/Done';


import PinnedTable from './PinnedTable';
import DialogTable from './DialogTable';

const {
    Rows,
    HeaderData,
    CustomTable,
} = Styles.default;

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headers: [],
            rows: [],
            pinned: [],
			checked: [],
            maxPinnedcols: 5,
            pinnedHeaders: [],
            compareLimit: 5,
            compareRows: [],
            showCmpDialog: false,
            sortedCol: {},
            headerCheck: false,
            showBenchmark: true,
        };
    }

    componentDidMount() {
    }

    // isPinned = (e) => {
    //     const { pinned = [], maxPinnedcols, headers } = this.state;
    //     let newPinned = pinned.map(o => o);
    //     if (newPinned.includes(e.currentTarget.getAttribute('name'))) {
    //         newPinned = newPinned.filter(one => one != e.currentTarget.getAttribute('name'))
    //     } else {
    //         newPinned.push(e.currentTarget.getAttribute('name'));
    //     }
    //     if (Array.isArray(newPinned) && newPinned.length > maxPinnedcols) return;
    //     this.setState({ pinned: newPinned }, () => {
    //         const pinnedHeaders = Array.isArray(newPinned) && headers.filter(one => newPinned.includes(one.value));
    //         this.setState({ pinnedHeaders });
    //     });
    // }

    // rowCheckBoxChange = ({ target: { name = "" } = {} }) => {
    //     let { checked = [], compareLimit = 2 } = this.state;
    //     if (checked.includes(Number(name))) {
    //         checked = checked.filter(one => one != Number(name))
    //     } else {
    //         checked.push(Number(name));
    //     }
    //     if( checked.length > compareLimit ) return;
    //     this.setState({ checked });
    // }

    getHeaders = (tableCols, days = [], order = '') => {
		const { exclude } = this.props.Data;
        // const { pinned } = this.state;
        // if (Array.isArray(pinned) && pinned.includes(value)) return false;
        // const valueData = name.indexOf(' - ') > -1 ? name.split(' - ')[0] : value;
        // const tier = Array.isArray(name.split(' - ')) && name.split(' - ').length > 1 ? (name.split(' - ')[1]).replace('30 Days', '').replace('90 Days', '').trim() : '';
        // const valueIfDays = name.replace(valueData, '').length > 0 ? name.replace(valueData, '').replace(tier,'').replace('-','').trim() : name;
        // //name.indexOf(' - ') > -1 ? (name.split(' - ')[1]).replace('30 Days', '').replace('90 Days', '').trim() : 
        // console.log(exclude, value);
        // if(Array.isArray(exclude) && exclude.includes(value)) return false;
        // if (Array.isArray(days) && days.includes(valueIfDays) && days.includes(valueData)) {
        //     return name.indexOf(order) > -1;
        // } else if(name.indexOf('Days') === -1) return true;
        if(tableCols.length > 0) {
            const headers = tableCols.filter(({ value }) => !exclude.includes(value));
            return headers;
        }
    }

    // compareClicked = () => {
    //     const { checked, rows } = this.state;
    //     const compareRows = rows.filter(({ id }) => checked.includes(id));
    //     this.setState({ compareRows, showCmpDialog: true })
    // }

    sortOrder = (row1, row2, type, value) => {
        if (type === 'asc') {
            if (row1[value] < row2[value]) return -1;
            else if(row1[value] > row2[value]) return 1;
            return 0;
        }
        else {
            if (row1[value] > row2[value]) return -1;
            else if(row1[value] < row2[value]) return 1;
            return 0;
        }
    }

    onCellClick = (value, { target }) => {
        const name = target.getAttribute('name');
        if (name === 'pin_value') return;
        let { sortedCol = {}, rows } = this.state;
        if (sortedCol && Object.keys(sortedCol).length > 0 && !sortedCol.hasOwnProperty(value)) sortedCol = {};
        if (sortedCol.hasOwnProperty(value) && sortedCol[value] === 'asc') sortedCol[value] = 'desc'
        else sortedCol[value] = 'asc';
        rows.sort((row1, row2) => this.sortOrder(row1, row2, sortedCol[value], value));
        this.setState({ sortedCol, rows });
    }

    // closeDialog = () => this.setState({ showCmpDialog: false });

    // scrollInterval = 0;
    // scrollTable = '';

    // scrolled = (scrollTop, name) => {
    //     let scrollVal = scrollTop;
    //     if(this.scrollInterval < (Date.now() - 150)) {
    //         this.scrollInterval = Date.now();
    //         this.scrollTable = name;
    //     }
    //     if(this.scrollTable === 'main' && this.refs.pinned) 
    //     this.refs.pinned.refs.tbody.scrollTo(0, scrollVal);
    //     if (this.scrollTable === 'pinned')
    //     this.refs.tbody.scrollTo(0, scrollVal); //.scrollTop = scrollVal;
    // }

    // headerCheckBoxChange = (e) => {
    //     let { headerCheck = false } = this.state;
    //     const { rows } = this.state;
    //     let checked = [];
    //     headerCheck =  !headerCheck;
    //     if (headerCheck === false) {
    //         return this.setState({ headerCheck, checked });
    //     }
    //     checked = rows.map((_, i) => i);
    //     this.setState({ headerCheck, checked });
    // }

    handleBenchmark = () => {
        const { showBenchmark } = this.state;
        this.setState({ showBenchmark: !showBenchmark })
    }

    render() {
        const {
            pinned, checked,
            pinnedHeaders,
            compareRows,
            showCmpDialog,
            sortedCol,
            Table,
            headerCheck,
            showBenchmark = false,
        } = this.state;
        const { days = [], hasPinnedColumns } = this.props;
        const { headers, rows: rawRows = [], normalize } = this.props.Data;
        const filteredHeaders = this.getHeaders(headers, days);
        const rows = Array.isArray(rawRows)&& rawRows.map(row => {
            const rawRow = {...row, ...row[normalize]};
            delete rawRow.normalizedMetrics;
            delete rawRow.nonNormalizedMetrics;
            return rawRow;
        });

        const mainRows = [...rows];
        mainRows.splice(0,1);

        // const compareHeaders = Array.isArray(filteredHeaders) && Array.isArray(pinnedHeaders) ? filteredHeaders.concat(pinnedHeaders) : [];
        return (
            <Fragment>
                {/* {hasPinnedColumns && pinnedHeaders.length > 0 && (
                    <PinnedTable
                        pinnedHeaders={pinnedHeaders}
                        sortedCol={sortedCol}
                        onCellClick={this.onCellClick}
                        compareClicked={this.compareClicked}
                        hasPinnedColumns
                        pinned={pinned}
                        pinnedRow
                        isPinned={this.isPinned}
                        rows={rows}
                        checked={checked}
                        rowCheckBoxChange={this.rowCheckBoxChange}
                        onScroll={this.scrolled}
                        checkBoxChange={this.headerCheckBoxChange}
                        checkBox={headerCheck}
                        ref="pinned"
                    />)} */}
                <div style={{ width: `${100 - (pinnedHeaders.length * 18 + pinnedHeaders.length)}%`, overflowX: 'scroll', overflowY: 'hidden', position: 'relative' }}>
                    <CSS.StyledTable>
                        <CSS.StyledTableHead>
                            {/* compare={this.compareClicked} hasPinnedColumns pinned={pinned} isPinned={this.isPinned} checkBoxChange={this.headerCheckBoxChange} checkBox={headerCheck} */}
                            <Header sortedCol={sortedCol} onCellClick={this.onCellClick} headers={filteredHeaders} noCompare />
                        </CSS.StyledTableHead>
                        {showBenchmark && (<Row noCompare row={rows[0]} headers={filteredHeaders} />)}
                        <div style={{ marginBottom: 20, marginTop: 20, justifyContent: 'center', display: 'flex' }}>
                            {/* <Chip size="small" label="Benchmark" style={{ padding: '1rem', position: 'absolute' }} deleteIcon={<Done />} onDelete={this.handleBenchmark} />
                            <hr/> */}
                            <div onClick={this.handleBenchmark} style={{ width: 'fit-content', background: '#ccc', padding: 3, broderRadius: '12px' }}>Benchmark -</div>
                        </div>
                        <TableBody ref="tbody">
                            {/*style={{ overflowY: 'scroll' }} checkBoxChange={this.rowCheckBoxChange} checked={checked} pinned={pinned} onScroll={() => this.scrolled(this.refs.tbody.scrollTop, 'main')}*/}
                            {Array.isArray(mainRows) && mainRows.length > 0 ? mainRows.map(
                                (row, i) => <Row noCompare row={row} key={i} headers={filteredHeaders} />
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress disableShrink />
                                    <span>Loading Data...</span>
                                </div>
                            )}
                        </TableBody>
			        </CSS.StyledTable>
                </div>
            </Fragment>
        );
    }
}

Table.propTypes = {
    days: PropTypes.array,
    hasPinnedColumns: PropTypes.bool,
    Data: PropTypes.array.isRequired,
    order: PropTypes.any,
    exclude: PropTypes.array,
}
 
const mapStateToProps = (state) => ({
    Data: state.data,
})

export default connect(mapStateToProps)(Table);