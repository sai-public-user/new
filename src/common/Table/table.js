import React, { Component, Fragment } from 'react';
import Header from './header';
import Row from './row';

import Data from './SampleData';

import './table.css';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headers: [],
            rows: [],
            pinned: [],
            checked: [],
        };
    }

    componentDidMount() {
        const { headers, rows } = Data;
        this.setState({ headers, rows });
    }

    isPinned = (e) => {
        let { pinned = [] } = this.state;
        if (pinned.includes(e.currentTarget.getAttribute('name'))) {
            pinned = pinned.filter(one => one != e.currentTarget.getAttribute('name'))
        } else {
            pinned.push(e.currentTarget.getAttribute('name'));
        }
        this.setState({ pinned });
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

    // getRows = () => {

    // }

    getHeaders = (tableCols, days = [], order = '') => {
        if(tableCols.length > 0) {
            const headers = tableCols.filter(({ name, value }) => {
                if (order === 'Retail Order' && name.indexOf('30 Days') > -1 && days.length === 0) {
                    return value.indexOf(order) > -1;
                } else if (name.indexOf('Days') > -1) {
                    return name === '30 Days' && days.includes('30') || name === '90 Days' && days.includes('90');
                } else return true;
            });
            return headers;
        }
    }

    // prepeareTableData = () => {
    //     //get data from backend
    //     const { headers = null, rows = null } = Data;
    //     if (headers !== null) {
    //         const headersData = headers.map(({ name, value }) => {
    //             if(typeof value === 'object') {
    //                 const orderArray = this.getHeaders(name, value);
    //                 return ({ name, value: orderArray })
    //             } else {
    //                 return ({ name, value });
    //             }
    //         })
    //     }
    // }

    render() {
        const { pinned, headers, rows, checked } = this.state;
        const { days = [], order =  '' } = this.props;
        return (
            <Fragment>
                <Header headers={this.getHeaders(headers, days, order)} pinned={pinned} isPinned={this.isPinned} />
                { Array.isArray(rows) && rows.map((row, i) => <Row checked={checked} checkBoxChange={this.rowCheckBoxChange} row={row} key={i} headers={this.getHeaders(headers, days, order)} pinned={pinned} />)}
            </Fragment>
        );
    }
}
 
export default Table;