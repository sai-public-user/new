import React, { Component, Fragment } from 'react';
import Header from './header';
import Row from './row';

import './table.css';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headers: [
                { name: 'County', value: 'county' },
                { name: 'County fir', value: 'county_fir' },
                { name: 'County Sec', value: 'county_sec' },
                { name: 'County Thi', value: 'county_thi' },
                { name: 'County For', value: 'county_for' },
                { name: 'County Fiv', value: 'county_fiv' },
                { name: 'County Six', value: 'county_six' },
                { name: 'County Sev', value: 'county_sev' },
            ],
            rows: [
                {
                    county: 'zero',
                    county_fir: 'first',
                    county_sec: 'second',
                    county_thi: 'third',
                    county_for: 'four',
                    county_fiv: 'five',
                    county_six: 'six',
                    county_sev: 'seven',
                }, {
                    county: 'zero',
                    county_fir: 'first',
                    county_sec: 'second',
                    county_thi: 'third',
                    county_for: 'four',
                    county_fiv: 'five',
                    county_six: 'six',
                    county_sev: 'seven',
                }, {
                    county: 'zero',
                    county_fir: 'first',
                    county_sec: 'second',
                    county_thi: 'third',
                    county_for: 'four',
                    county_fiv: 'five',
                    county_six: 'six',
                    county_sev: 'seven',
                }, {
                    county: 'zero',
                    county_fir: 'first',
                    county_sec: 'second',
                    county_thi: 'third',
                    county_for: 'four',
                    county_fiv: 'five',
                    county_six: 'six',
                    county_sev: 'seven',
                }, {
                    county: 'zero',
                    county_fir: 'first',
                    county_sec: 'second',
                    county_thi: 'third',
                    county_for: 'four',
                    county_fiv: 'five',
                    county_six: 'six',
                    county_sev: 'seven',
                }, {
                    county: 'zero',
                    county_fir: 'first',
                    county_sec: 'second',
                    county_thi: 'third',
                    county_for: 'four',
                    county_fiv: 'five',
                    county_six: 'six',
                    county_sev: 'seven',
                },
            ],
            pinned: [],
        };
    }

    isPinned = (e) => {
        const { pinned = [] } = this.state;
        console.log(e.currentTarget.getAttribute('name'), 'is pinned');
        if (pinned.includes(e.currentTarget.getAttribute('name'))) {
            pinned = pinned.filter(one => one != e.currentTarget.getAttribute('name'))
        } else {
            pinned.push(e.currentTarget.getAttribute('name'));
        }
        console.log('all pinned columns ==> ', pinned);
        this.setState({ pinned });
    }

    render() {
        const { pinned, headers, rows } = this.state;
        return (
            <Fragment>
                <Header headers={headers} pinned={pinned} isPinned={this.isPinned} />
                { Array.isArray(rows) && rows.map((row, i) => <Row row={row} key={i} headers={headers} pinned={pinned} />)}
            </Fragment>
        );
    }
}
 
export default Table;