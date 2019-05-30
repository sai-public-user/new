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
} = Styles.default;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [],
            filterType: '',
            order: 'Retail Order',
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

    render() {
        const { days = [], filterType, order } = this.state;
        const { classes } = this.props;
        const { benifit: { refs: { table: { state: { headers = [] } = {} } = {} } = {} } = {} } = this.refs || {};
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
                                  checked={days.includes("30")}
                                  onChange={this.handleSwitchChange}
                                  value="30"
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
                                  checked={days.includes("90")}
                                  onChange={this.handleSwitchChange}
                                  value="90"
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
                    <BenefitStructure ref="benifit" days={days} order={order} />
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
                        <b>Table Columns Selection</b>
                        <FilterHeaderPaper>
                          <Paper style={{ padding: '0.5rem', marginTop: 10, width: '15.5vw' }}>
                            {
                              Array.isArray(filterLeft) && filterLeft.map(name => <FilterCell>{name}</FilterCell>)
                            }
                          </Paper>
                          <Paper style={{ padding: '0.5rem', marginTop: 10, width: '15.5vw' }}>
                            {
                              Array.isArray(filterRight) && filterRight.map(name => <FilterCell>{name}</FilterCell>)
                            }
                          </Paper>
                        </FilterHeaderPaper>
                      </FilterContentBlock>
                    )}
                    {filterType === 'search' && (
                      <FilterContentBlock>
                        data come here
                      </FilterContentBlock>
                    )}
                  </FilterContent>
                </SwipeableDrawer>
            </Fragment>
        );
    }
}
 
export default withStyles(styles)(Home);