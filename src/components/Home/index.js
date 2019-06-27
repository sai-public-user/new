import React, { Component, Fragment } from 'react';
import './styles.css';
import * as Styles from '../../common/Table/SharedStyles';

import PageHeader from './PageHeader';
import Table from '../../common/Table/table';
import Data from '../../common/Table/SampleData';
import TableFilter from './TableFilter';

const {
    MaindataContainer,
    TableContainer,
} = Styles.default;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [ 'Retail Order', '30 Days' ],
            filterType: '',
            excludeHeaders: [],
            exHeadersNames: [],
            order: '',
        }
    }

    handleSwitchChange = ({ target: { value } }) => {
        let { days = [] } = this.state;
        if (days.includes(value)) {
            days = days.filter(one => one !== value)
        } else {
            days.push(value);
        }
        this.setState({ days, order: '' });
    }


    toggleTableFilter = (filterType) => {
      this.setState({
        filterType,
      });
    };

    filterHeaderClick = ({ currentTarget } = {}) => {
      let name = currentTarget.getAttribute('name');
      const { table: { state: { headers = [], pinned = [] } = {} } = {} } = this.refs || {};
      if (name !== null) {
        if (pinned.includes(name.toLowerCase().replace(/ /g,'_'))) return;
        let { excludeHeaders = [], exHeadersNames = [] } = this.state;
        if (exHeadersNames.includes(name)) exHeadersNames = exHeadersNames.filter(one => one !== name);
        else exHeadersNames.push(name);
        if(name.indexOf('Preferred Tier ') > -1) name = name.replace('Preferred Tier ', 'PT:');
        else if(name.indexOf('Standard Tier ') > -1) name = name.replace('Standard Tier ', 'ST:');
        else name = name.toLowerCase().replace(/ /g, '_');
        if (excludeHeaders.includes(name)) excludeHeaders = excludeHeaders.filter(one => one !== name);
        else excludeHeaders.push(name);
        this.setState({ excludeHeaders, exHeadersNames });
      }
    }

    render() {
        const { days = [], filterType, excludeHeaders, exHeadersNames, order } = this.state;
        const { table: { state: { headers = [], pinned = [] } = {} } = {} } = this.refs || {};
        let filterHeaderNames = [];
        const filterHeaders = headers.filter(({ name, value }) => {
          if (name.indexOf(' - ') > -1) {
            const tierType = (name.split(' - ')[1]).replace('30 Days', '').replace('90 Days', '');
            if (filterHeaderNames.includes(tierType)) return false;
            else filterHeaderNames.push(tierType);
            return true;
          } else filterHeaderNames.push(name); 
          return true;
        });

        filterHeaderNames = JSON.parse(JSON.stringify(filterHeaderNames).replace(/PT:/g, 'Preferred Tier ').replace(/ST:/g, 'Standard Tier '));
        let filterLeft = filterHeaderNames.map(one=>one);
        filterLeft = filterHeaderNames.length > 10 && filterLeft.splice(0,10);
        let filterRight = filterHeaderNames.map(one=>one);
        filterRight = filterHeaderNames.length > 10 && filterRight.splice(10);

        return ( 
            <Fragment>
              <PageHeader onSwitchChange={this.handleSwitchChange} days={days} onTableToggle={this.toggleTableFilter} />
              <MaindataContainer>
                <TableContainer>
                  <Table ref="table" hasPinnedColumns days={days} Data={Data} order={order} exclude={excludeHeaders} />
                </TableContainer>
              </MaindataContainer>
              <TableFilter
                filterType={filterType}
                days={days}
                filterLeft={filterLeft}
                filterRight={filterRight}
                handleSwitchChange={this.handleSwitchChange}
                toggleTableFilter={this.toggleTableFilter}
                filterHeaderClick={this.filterHeaderClick}
                pinned={pinned}
                exHeadersNames={exHeadersNames}
              />
            </Fragment>
        );
    }
}
 
export default Home;