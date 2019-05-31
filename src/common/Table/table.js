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
        };
    }

    componentDidMount() {
        const { headers, rows } = this.props.Data;
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

    getHeaders = (tableCols, days = [], order = '') => {
        if(tableCols.length > 0) {
            const headers = tableCols.filter(({ name, value }) => {
                const valueData = value.indexOf(' - ') > -1 ? value.split(' - ')[0] : value;
                if (Array.isArray(days) && days.includes(name) && days.includes(valueData)) {
                    return value.indexOf(order) > -1;
                } else if(name.indexOf('Days') === -1) return true;
            });
            return headers;
        }
    }

    render() {
        const { pinned, headers, rows, checked } = this.state;
        const { days = [] } = this.props;
        return (
            <Fragment>
                <Header headers={this.getHeaders(headers, days)} pinned={pinned} isPinned={this.isPinned} />
                { Array.isArray(rows) && rows.map((row, i) => <Row checked={checked} checkBoxChange={this.rowCheckBoxChange} row={row} key={i} headers={this.getHeaders(headers, days)} pinned={pinned} />)}
            </Fragment>
        );
    }
}
 
export default Table;