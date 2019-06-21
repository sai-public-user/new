import React, { Component, Fragment } from 'react';
import BenefitStructure from '../BenefitStructure/index';
import './styles.css';
import * as Styles from '../../common/Table/SharedStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    colorSwitchBase: {
      color: '#0cb1c3',
      '&$colorChecked': {
        color: '#0cc324',
        '& + $colorBar': {
          backgroundColor: '#ffffff',
        },
      },
    },
    colorBar: {},
    colorChecked: {},
});

const {
    Header,
    MaindataContainer,
    TableFilters,
    SwitchText,
    TableFilterIcon,
    FilterContent,
    FilterContentBlock,
    FilterCell,
    FilterHeaderPaper,
    TableContainer,
    SwitchDrawerText,
    HeaderCheck,
} = Styles.default;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [ 'Retail Order', '30 Days' ],
            filterType: '',
            excludeHeaders: [],
            exHeadersNames: [],
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
      const { benifit: { refs: { table: { state: { pinned = [] } = {} } = {} } = {} } = {} } = this.refs || {};
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
        const { days = [], filterType, excludeHeaders, exHeadersNames } = this.state;
        const { classes } = this.props;
        const { benifit: { refs: { table: { state: { headers = [], pinned = [] } = {} } = {} } = {} } = {} } = this.refs || {};
        let filterHeaderNames = [];
        const filterHeaders = headers.filter(({ name, value }) => {
          if (value.indexOf(' - ') > -1) {
            const tierType = value.split(' - ')[1];
            if (filterHeaderNames.includes(tierType)) return false;
            else filterHeaderNames.push(value.split(' - ')[1]);
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
                <Header>
                    <span><h1>Benefits Structures</h1></span>
                    <TableFilters>
                        <FormGroup row>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={days.includes("30 Days")}
                                  onChange={this.handleSwitchChange}
                                  value="30 Days"
                                  classes={{
                                    switchBase: classes.colorSwitchBase,
                                    checked: classes.colorChecked,
                                    bar: classes.colorBar,
                                  }}
                                />
                              }
                              label={<SwitchText>30 Days</SwitchText>}
                            />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={days.includes("90 Days")}
                                  onChange={this.handleSwitchChange}
                                  value="90 Days"
                                  classes={{
                                    switchBase: classes.colorSwitchBase,
                                    checked: classes.colorChecked,
                                    bar: classes.colorBar,
                                  }}
                                />
                              }
                              label={<SwitchText>90 Days</SwitchText>}
                            />
                        </FormGroup>
                        <TableFilterIcon onClick={() => this.toggleTableFilter('column')}><i class="fa fa-table fa-lg" aria-hidden="true"></i></TableFilterIcon>
                    </TableFilters>
                </Header>
                <MaindataContainer>
                  <TableContainer>
                    <BenefitStructure ref="benifit" days={days} exclude={excludeHeaders} />
                  </TableContainer>
                </MaindataContainer>
                <SwipeableDrawer
                  anchor="right"
                  open={filterType !== ''}
                  onClose={() => this.toggleTableFilter('')}
                >
                  <FilterContent>
                    {filterType === 'column' && (
                      <FilterContentBlock>
                        <FormGroup row>
                          <FormGroup column>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={days.includes("30 Days")}
                                    onChange={this.handleSwitchChange}
                                    value="30 Days"
                                    classes={{
                                      switchBase: classes.colorSwitchBase,
                                      checked: classes.colorChecked,
                                      bar: classes.colorBar,
                                    }}
                                  />
                                }
                                label={<SwitchDrawerText>30 Days</SwitchDrawerText>}
                              />
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={days.includes("90 Days")}
                                    onChange={this.handleSwitchChange}
                                    value="90 Days"
                                    classes={{
                                      switchBase: classes.colorSwitchBase,
                                      checked: classes.colorChecked,
                                      bar: classes.colorBar,
                                    }}
                                  />
                                }
                                label={<SwitchDrawerText>90 Days</SwitchDrawerText>}
                              />
                          </FormGroup>
                          <FormGroup column>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={days.includes("Mail Order")}
                                    onChange={this.handleSwitchChange}
                                    value="Mail Order"
                                    classes={{
                                      switchBase: classes.colorSwitchBase,
                                      checked: classes.colorChecked,
                                      bar: classes.colorBar,
                                    }}
                                  />
                                }
                                label={<SwitchDrawerText>Mail Order</SwitchDrawerText>}
                              />
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={days.includes("Retail Order")}
                                    onChange={this.handleSwitchChange}
                                    value="Retail Order"
                                    classes={{
                                      switchBase: classes.colorSwitchBase,
                                      checked: classes.colorChecked,
                                      bar: classes.colorBar,
                                    }}
                                  />
                                }
                                label={<SwitchDrawerText>Retail</SwitchDrawerText>}
                              />
                          </FormGroup>
                        </FormGroup>
                        <b>Table Columns Selection</b>
                        <FilterHeaderPaper>
                          <Paper style={{ padding: '0.5rem', marginTop: 10, width: '15.5vw' }}>
                            {
                              Array.isArray(filterLeft) && filterLeft.map(name =>
                                <FilterCell name={name} onClick={this.filterHeaderClick} style={{ color: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '#777': 'black'}`, cursor: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '' : 'pointer'}` }}>
                                  <div>{name}</div>
                                  {!exHeadersNames.includes(name) &&
                                  <HeaderCheck>
                                    <i className="fa fa-check" aria-hidden="true" />
                                  </HeaderCheck>}
                                </FilterCell>
                              )
                            }
                          </Paper>
                          <Paper style={{ padding: '0.5rem', marginTop: 10, width: '15.5vw' }}>
                            {
                              Array.isArray(filterRight) && filterRight.map(name => 
                                <FilterCell name={`${Array.isArray(days) && days.length < 2 ? null : name}`} onClick={this.filterHeaderClick} className={`${Array.isArray(days) && days.length < 2 ? 'disabled' : ''}`} style={{ color: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '#777': 'black'}`, cursor: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '' : 'pointer'}` }}>
                                  <div>{name}</div>
                                    {!exHeadersNames.includes(name) && (Array.isArray(days) && days.length >= 2) &&
                                    <HeaderCheck>
                                      <i className="fa fa-check" aria-hidden="true" />
                                    </HeaderCheck>}
                                </FilterCell>
                              )
                            }
                          </Paper>
                        </FilterHeaderPaper>
                      </FilterContentBlock>
                    )}
                    {filterType === 'search' && (
                      <FilterContentBlock>
                        data comes here
                      </FilterContentBlock>
                    )}
                  </FilterContent>
                </SwipeableDrawer>
            </Fragment>
        );
    }
}
 
export default withStyles(styles)(Home);
