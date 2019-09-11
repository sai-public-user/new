import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import * as Styles from '../../common/Table/SharedStyles';

import {
  manageDays,
  getData,
  setFilters,
} from '../../actions/getAllData';

import PageHeader from './PageHeader';
import Table from '../../common/Table/table';
import TableFilter from './TableFilter';

const {
    MaindataContainer,
    TableContainer,
} = Styles.default;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterType: '',
            excludeHeaders: ['select_all'],
            exHeadersNames: ['Select All'],
            order: '',
            fileType: '',
            isDownload: false,
        }
    }

    componentDidMount() {
      this.props.getData();
    }

    // onFileTypeChange = ({ target: { value } }) => {
    //   console.log(value);
    // }

    // handleSwitchChange = ({ target: { value } }) => {
    //     let { days = [] } = this.props;
    //     if (days.includes(value)) {
    //         days = days.filter(one => one !== value)
    //     } else {
    //         days.push(value);
    //     }
    //     this.props.manageDays(days);
    //     this.setState({ order: '' });
    // }


    toggleTableFilter = (filterType, isDownload) => {
      this.setState({
        filterType,
        isDownload,
      });
    };

    filterHeaderClick = ({ currentTarget } = {}) => {
      let name = currentTarget.getAttribute('name');
      const { table: { state: { headers = [], pinned = [] } = {} } = {} } = this.refs || {};
      let { excludeHeaders = [], exHeadersNames = [], days = [] } = this.state;
      if (name !== null) {
        if (name === 'Select All') {
          if (excludeHeaders.includes('select_all')) {
            excludeHeaders = this.getFilterHeaders();
            excludeHeaders = excludeHeaders.map(one => one.toLowerCase().replace(/ /g, '_'));
            exHeadersNames = this.getFilterHeaders();
            days = [];
          } else {
            excludeHeaders = ['select_all'];
            exHeadersNames = ['Select All'];
            // days = [ 'Retail Order', '30 Days', 'Mail Order', '90 Days' ];
          }
          return this.setState({ excludeHeaders, exHeadersNames, days });
        }
        // if (pinned.includes(name.toLowerCase().replace(/ /g,'_'))) return;
        const posName = exHeadersNames.indexOf(name);
        if (posName > -1) exHeadersNames.splice(posName, 1);
        else exHeadersNames.push(name.trim());
        // if(name.indexOf('Preferred Tier ') > -1) name = name.replace('Preferred Tier ', 'PT:');
        // else if(name.indexOf('Standard Tier ') > -1) name = name.replace('Standard Tier ', 'ST:');
        // else 
        name = name.toLowerCase().replace(/ /g, '_');
        const posHead = excludeHeaders.indexOf(name);
        if (posHead > -1) excludeHeaders.splice(posHead, 1);
        else excludeHeaders.push(name.trim());
        this.props.setFilters(excludeHeaders);
        return this.setState({ excludeHeaders, exHeadersNames, days });
      }
    }

    getFilterHeaders = () => {
      // let filterHeaderNames = [];
      const { Data: { headers = [] } } = this.props || {};
      const filterHeaders = Array.isArray(headers) ? headers.map(({ name, value }) => {
        return name;
      }) : [];
      return filterHeaders;
      // return JSON.parse(JSON.stringify(filterHeaderNames).replace(/PT:/g, 'Preferred Tier ').replace(/ST:/g, 'Standard Tier '));
    }

    // onDownloadClick() {
    //   console.log(this);
    //   this.setState({ isDownload: !this.state.isDownload });
    // }

    render() {
        const {
          filterType, excludeHeaders,
          exHeadersNames, order, fileType,
          isDownload,
        } = this.state;
        const { Data } = this.props;
        // const { table: { state: { headers = [], pinned = [] } = {} } = {} } = this.refs || {};
        const headers = this.getFilterHeaders();
        let filterLeft = [...headers];
        filterLeft = headers.length > 10 ? filterLeft.splice(0,10) : [...filterLeft];
        let filterRight = headers.map(one=>one);
        filterRight = headers.length > 10 ? filterRight.splice(10) : [];
        return ( 
            <Fragment>
              <PageHeader onSwitchChange={this.handleSwitchChange} days={Data.days} onTableToggle={this.toggleTableFilter} />
              <MaindataContainer>
                <TableContainer>
                  <Table ref="table" order={order} />
                </TableContainer>
              </MaindataContainer>
              <TableFilter
                filterType={filterType}
                days={Data.days}
                filterLeft={filterLeft}
                filterRight={filterRight}
                handleSwitchChange={this.handleSwitchChange}
                toggleTableFilter={this.toggleTableFilter}
                filterHeaderClick={this.filterHeaderClick}
                // pinned={pinned}
                exHeadersNames={exHeadersNames}
                fileType={fileType}
                isDownload={isDownload}
                onFileTypeChange={this.onFileTypeChange}
              />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
  Data: state.data,
})

const dispatchToProps = {
  manageDays,
  getData,
  setFilters,
}
 
export default connect(mapStateToProps, dispatchToProps)(Home);