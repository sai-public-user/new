import React, { Component, Fragment } from 'react';
import Header from './header';
import Row from './row';
import './table.css';
import * as Styles from '../../common/Table/SharedStyles';

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
            maxPinnedcols: 4,
            pinnedHeaders: [],
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
        let { checked = [] } = this.state;
        if (checked.includes(Number(name))) {
            checked = checked.filter(one => one != Number(name))
        } else {
            checked.push(Number(name));
        }
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

    render() {
        const { pinned, headers, rows, checked, pinnedHeaders } = this.state;
		const { days = [], hasPinnedColumns } = this.props;
        return (
            <div style={{	display: 'flex', flexWrap: 'wrap', maxHeight: '100vh'}}>
                {hasPinnedColumns && pinnedHeaders.length > 0 && (
                    <div style={{ minWidth: `${pinnedHeaders.length * 15}%` }}>
                      <Header headers={pinnedHeaders} hasPinnedColumns pinned={pinned} pinnedRow isPinned={this.isPinned} />
                      <Fragment>
                          {Array.isArray(rows) && rows.map((row, i) => <Row checked={checked} pinnedRow pinned={pinned} checkBoxChange={this.rowCheckBoxChange} row={row} key={i} headers={pinnedHeaders} />)}
                      </Fragment>
                  	</div>
			    )}
			    <div className="mainTable" style={{ minWidth: `${100 - pinnedHeaders.length * 15}%`, overflowX: 'scroll' }}>
                    <Header headers={this.getHeaders(headers, days)} hasPinnedColumns pinned={pinned} isPinned={this.isPinned} />
			    	{ Array.isArray(rows) && rows.map((row, i) => <Row checked={checked} checkBoxChange={this.rowCheckBoxChange} row={row} key={i} headers={this.getHeaders(headers, days)} pinned={pinned} />)}
			    </div>
            </div>
        );
    }
}
 
export default Table;