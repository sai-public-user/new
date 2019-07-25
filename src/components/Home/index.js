import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import * as Styles from '../../common/Table/SharedStyles';

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
            days: [ 'Retail Order', '30 Days' ],
            filterType: '',
            excludeHeaders: ['select_all'],
            exHeadersNames: ['Select All'],
            order: '',
            // Data: '',
            fileType: '',
            isDownload: false,
        }
    }

    // componentDidMount() {
    //   axios.get('www.google.com').then((Data)=> {
    //     this.setState({ Data })
    //   })
    // }

    onFileTypeChange = ({ target: { value } }) => {
      console.log(value);
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
        if (pinned.includes(name.toLowerCase().replace(/ /g,'_'))) return;
        if (exHeadersNames.includes(name)) exHeadersNames = exHeadersNames.filter(one => one !== name);
        else exHeadersNames.push(name.trim());
        if(name.indexOf('Preferred Tier ') > -1) name = name.replace('Preferred Tier ', 'PT:');
        else if(name.indexOf('Standard Tier ') > -1) name = name.replace('Standard Tier ', 'ST:');
        else name = name.toLowerCase().replace(/ /g, '_');
        if (excludeHeaders.includes(name)) excludeHeaders = excludeHeaders.filter(one => one !== name);
        else excludeHeaders.push(name.trim());
        this.setState({ excludeHeaders, exHeadersNames });
      }
    }

    getFilterHeaders = () => {
      let filterHeaderNames = [];
      const { table: { state: { headers = [], pinned = [] } = {} } = {} } = this.refs || {};
        const filterHeaders = headers.filter(({ name, value }) => {
          if (name.indexOf(' - ') > -1) {
            const tierType = (name.split(' - ')[1]).replace('30 Days', '').replace('90 Days', '');
            if (filterHeaderNames.includes(tierType.trim())) return false;
            else filterHeaderNames.push(tierType.trim());
            return true;
          } else filterHeaderNames.push(name); 
          return true;
        });

        return JSON.parse(JSON.stringify(filterHeaderNames).replace(/PT:/g, 'Preferred Tier ').replace(/ST:/g, 'Standard Tier '));
    }

    onDownloadClick() {
      console.log(this);
      this.setState({ isDownload: !this.state.isDownload });
    }

    render() {
        const {
          days = [], filterType, excludeHeaders,
          exHeadersNames, order, fileType,
          isDownload,
        } = this.state;
        console.log(this.props);
        const { data: Data } = this.props;
        const { table: { state: { headers = [], pinned = [] } = {} } = {} } = this.refs || {};
        const filterHeaderNames = this.getFilterHeaders();
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
                fileType={fileType}
                isDownload={isDownload}
                onFileTypeChange={this.onFileTypeChange}
              />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
  data: state.data,
})
 
export default connect(mapStateToProps)(Home);