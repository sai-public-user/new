import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import * as Styles from '../../common/Table/SharedStyles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import {
  manageDays,
  getData,
  setFilters,
} from '../../actions/getAllData';

import PageHeader from './PageHeader';
import Table from '../../common/Table/table';
import ColumnFilter from './columnFilter';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

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
            selectedTab: 0,
        }
    }

    componentDidMount() {
      this.props.getData();
      this.props.setFilters(this.getFilterHeaders().map(({name}) => name))
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
      // let filterHeaderNames = []
      const { excludeHeaders } = this.state;
      const { Data: { headers = [] } } = this.props || {};
      const filterHeaders = Array.isArray(headers) ? [...headers] : [];
      return filterHeaders;
      // return JSON.parse(JSON.stringify(filterHeaderNames).replace(/PT:/g, 'Preferred Tier ').replace(/ST:/g, 'Standard Tier '));
    }

    // onDownloadClick() {
    //   console.log(this);
    //   this.setState({ isDownload: !this.state.isDownload });
    // }

    onSwipeApply = (data, type) => {
      if (type === 'column') {
        this.props.setFilters(data);
      }
    }

    onTabChange = (e, selectedTab) => {
      this.setState({ selectedTab });
    }

    getAllRowsData = () => {
      const { filterType, order } = this.state;
      const { Data } = this.props;
      const headers = this.getFilterHeaders();
      return (
        <div>
          <PageHeader onSwitchChange={this.handleSwitchChange} days={Data.days} onTableToggle={this.toggleTableFilter} />
          <MaindataContainer>
            <TableContainer>
              <Table ref="table" order={order} />
            </TableContainer>
          </MaindataContainer>
          <ColumnFilter
            filterType={filterType}
            columns={headers}
            toggleTableFilter={this.toggleTableFilter}
            setColumnFilter={this.onSwipeApply}
          />
        </div>
      );
    }

    render() {
        const { selectedTab: tab = 0 } = this.state;
        return ( 
            <Fragment>
               <AppBar position="static">
                <Tabs value={tab} style={{ backgroundColor: '#678bca' }}  onChange={this.onTabChange} aria-label="simple tabs example">
                  <Tab label="Item One" id="0" />
                  <Tab label="Item Two" id="1" />
                  <Tab label="Item Three" id="2" />
                </Tabs>
                {tab === 0 ? this.getAllRowsData() : null}
                {tab === 1 ? 'Tab two' : null}
                {tab === 2 ? 'Tab three' : null}
              </AppBar>
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