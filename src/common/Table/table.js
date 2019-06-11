import React, { Component, Fragment } from 'react';
import Header from './header';
import Row from './row';
import './table.css';
import * as Styles from '../../common/Table/SharedStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog'

const {
    Rows,
    HeaderData,
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
        };
    }

    componentDidMount() {
        const { headers, rows } = this.props.Data;
        this.setState({ headers, rows });
    }

    isPinned = (e) => {
		let { pinned = [], maxPinnedcols, headers } = this.state;
        if (pinned.includes(e.currentTarget.getAttribute('name'))) {
            pinned = pinned.filter(one => one != e.currentTarget.getAttribute('name'))
        } else {
            pinned.push(e.currentTarget.getAttribute('name'));
		}
		if (Array.isArray(pinned) && pinned.length > maxPinnedcols) return;
        this.setState({ pinned }, () => {
            const pinnedHeaders = Array.isArray(pinned) && headers.filter(one => pinned.includes(one.value));
            this.setState({ pinnedHeaders });
        });
    }

    rowCheckBoxChange = ({ target: { name = "" } = {} }) => {
        let { checked = [], compareLimit = 2 } = this.state;
        if (checked.includes(Number(name))) {
            checked = checked.filter(one => one != Number(name))
        } else {
            checked.push(Number(name));
        }
        if( checked.length > compareLimit ) return;
        this.setState({ checked });
    }

    getHeaders = (tableCols, days = [], order = '') => {
		const { exclude } = this.props;
		const { pinned } = this.state;
        if(tableCols.length > 0) {
            const headers = tableCols.filter(({ name, value }) => {
								if (Array.isArray(pinned) && pinned.includes(value)) return false;
                const valueData = value.indexOf(' - ') > -1 ? value.split(' - ')[0] : value;
                if(exclude.includes(value.indexOf(' - ') > -1 ? value.split(' - ')[1] : value)) return false;
                if (Array.isArray(days) && days.includes(name) && days.includes(valueData)) {
                    return value.indexOf(order) > -1;
                } else if(name.indexOf('Days') === -1) return true;
						});
            return headers;
        }
    }

    compareClicked = () => {
        const { checked, rows } = this.state;
        const compareRows = rows.filter(({ id }) => checked.includes(id));
        console.log(compareRows);
        this.setState({ compareRows, showCmpDialog: true })
    }

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

    onCellClick = (value) => {
        let { sortedCol = {}, rows } = this.state;
        if (sortedCol && Object.keys(sortedCol).length > 0 && !sortedCol.hasOwnProperty(value)) sortedCol = {};
        if (sortedCol.hasOwnProperty(value) && sortedCol[value] === 'asc') sortedCol[value] = 'desc'
        else sortedCol[value] = 'asc';
        rows.sort((row1, row2) => this.sortOrder(row1, row2, sortedCol[value], value));
        this.setState({ sortedCol, rows });
    }

    render() {
        const {
            pinned, headers,
            rows, checked,
            pinnedHeaders, compareRows,
            showCmpDialog,
            sortedCol,
        } = this.state;
        const { days = [], hasPinnedColumns } = this.props;
        return (
            <div style={{	display: 'flex', flexWrap: 'wrap', maxHeight: '100vh'}}>
                {hasPinnedColumns && pinnedHeaders.length > 0 && (
                    <div style={{ minWidth: `${pinnedHeaders.length * 15}%` }}>
                      <Fragment><Header sortedCol={sortedCol} onCellClick={this.onCellClick} headers={pinnedHeaders} compare={this.compareClicked} hasPinnedColumns pinned={pinned} pinnedRow isPinned={this.isPinned} /></Fragment>
                      <Fragment>
                          {Array.isArray(rows) && rows.map((row, i) => <Row checked={checked} pinnedRow pinned={pinned} checkBoxChange={this.rowCheckBoxChange} row={row} key={i} headers={pinnedHeaders} />)}
                      </Fragment>
                  	</div>
			    )}
			    <div className="mainTable" style={{ minWidth: `${100 - pinnedHeaders.length * 15}%`, overflowX: 'scroll' }}>
                    <Fragment><Header sortedCol={sortedCol} onCellClick={this.onCellClick} headers={this.getHeaders(headers, days)} compare={this.compareClicked} hasPinnedColumns pinned={pinned} isPinned={this.isPinned} /></Fragment>
			    	<Fragment>{ Array.isArray(rows) && rows.map((row, i) => <Row checked={checked} checkBoxChange={this.rowCheckBoxChange} row={row} key={i} headers={this.getHeaders(headers, days)} pinned={pinned} />)}</Fragment>
			    </div>
                <Dialog open={showCmpDialog} onClose={() => this.setState({ showCmpDialog: false })} >
                    <DialogTitle id="simple-dialog-title">Comparison View</DialogTitle>
                    <div style={{ padding: '1rem' }}>
                        {
                            compareRows.map(one=><div style={{ marginBottom: '0.5rem' }}>{JSON.stringify(one)}</div>)
                        }
                    </div>
                </Dialog>
            </div>
        );
    }
}
 
export default Table;