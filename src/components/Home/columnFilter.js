import React, { Fragment, Component } from 'react';
import * as Styles from '../../common/Table/SharedStyles';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import moment from 'moment';
import {
    FormControlLabel,
    Checkbox,
    SwipeableDrawer,
    Paper,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    Switch,
 } from '@material-ui/core';
 import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
 import { connect } from 'react-redux';
 import MomentUtils from '@date-io/moment';

const {
  FilterContent,
  FilterContentBlock,
  FilterCell,
  FilterHeaderPaper,
} = Styles.default;

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

class ColumnFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCols: [],
            selectedSearchType: null,
            startDate: null,
            endDate: null,
        };
    }

    componentWillReceiveProps() {
        const { exclude: selectedCols } = this.props.Data;
        console.log(selectedCols);
        this.setState({ selectedCols });
    }

    onCheckBoxClick = ({ target : { value } }) => {
        console.log(value);
        const { selectedCols } = this.state;
        const pos = selectedCols.indexOf(value);
        if(pos > -1) selectedCols.splice(pos, 1);
        else selectedCols.push(value);
        this.setState({ selectedCols });
    }

    getColumn = (name) => {
        console.log(name);
        return (
    <FormControlLabel
      control={
        <GreenCheckbox
          checked={this.state.selectedCols.includes(name)}
          onChange={this.onCheckBoxClick}
          value={name}
        />
      }
      label={name}
    />)}

    onApply = () => {
       const { selectedCols } = this.state;
       this.props.setColumnFilter(selectedCols, 'column');
       this.props.toggleTableFilter('')
    }

    handleSearchChange = ({ target: { value } }) => {
      console.log(value);
      this.setState({ selectedSearchType: value });
    }

    handleDateChange = (value, name) => {
      console.log(value, ' <==> ', name);
      this.setState({ [name]: value })
    }

    handleSwitchChange = (data) => {
      console.log(data, 'normalize', !this.props.normalize);
      
    }

    render() { 
        const {
            filterType,
            toggleTableFilter,
            columns,
            normalize = false,
        } = this.props || {};
        console.log(columns, filterType);
        const { selectedSearchType, startDate, endDate } = this.state;
        return (
          <SwipeableDrawer
            anchor="right"
            open={filterType !== ''}
            onOpen={() => {}}
            onClose={() => toggleTableFilter('')}
          >
            <FilterContent>
                {filterType === 'column' && (<FilterContentBlock>
                  <b>Columns Selection</b>
                  <FilterHeaderPaper>
                    <Paper style={{ padding: '0.5rem', marginTop: 10, width: '15.5vw' }}>
                      {
                        <Fragment>
                          {/* <FilterCell name="Select All" onClick={filterHeaderClick}>
                            <div>{!exHeadersNames.includes('Select All') ? 'Select All' : 'Deselect All'}</div>
                          </FilterCell> */}
                          {Array.isArray(columns) && columns.map(({name}) =>
                            <FilterCell key={name} name={name} style={{ color: 'black', cursor: 'pointer' }}>
                                {this.getColumn(name)}
                            </FilterCell>
                          )}
                        </Fragment>
                      }
                    </Paper>
                  </FilterHeaderPaper>
                </FilterContentBlock>)}
                {filterType === 'search' && (
                  <FilterContentBlock>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={normalize}
                          onChange={this.handleSwitchChange}
                          value="normalize"
                          color="primary"
                        />
                      }
                      label="Non-Normalize"
                    />
                    <FormControl component="fieldset">
                    <FormLabel component="legend">Date Range</FormLabel>
                    <RadioGroup aria-label="search" name="search" value={selectedSearchType} onChange={this.handleSearchChange}>
                      <FormControlLabel value="last12" control={<Radio />} label="Last 12 Months" />
                      {selectedSearchType === 'last12' ? <div style={{ color: '#ccc' }}>{`${moment().subtract(1, 'year').format('MM/DD/YYYY')} - ${moment().format('MM/DD/YYYY')}`}</div> : null}
                      <FormControlLabel value="lastYear" control={<Radio />} label="Last Full Calender Year" />
                      {selectedSearchType === 'lastYear' ? <div style={{ color: '#ccc' }}>{`${moment(`1/1/${moment().year()}`).subtract(1, 'year').format('MM/DD/YYYY')} - ${moment(`1/1/${moment().year()}`).format('MM/DD/YYYY')}`}</div> : null}
                      <FormControlLabel value="ytd" control={<Radio />} label="Calender YTD" />
                      {selectedSearchType === 'ytd' ? <div style={{ color: '#ccc' }}>{`${moment(`1/1/${moment().year()}`).format('MM/DD/YYYY')} - ${moment().format('MM/DD/YYYY')}`}</div> : null}
                      <FormControlLabel value="dateSelection" control={<Radio />} label="Date Selection" />
                      {selectedSearchType === 'dateSelection' ? (
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <div style={{ display: 'flex', flex: 1, justifyContent:'space-between' }}>
                          <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            label="With keyboard"
                            format="MM/DD/YYYY"
                            value={startDate}
                            name="startDate"
                            InputAdornmentProps={{ position: "start" }}
                            onChange={date => this.handleDateChange(date, 'startDate')}
                          />
                          <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            label="With keyboard"
                            format="MM/DD/YYYY"
                            name="endDate"
                            value={endDate}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={date => this.handleDateChange(date, 'endDate')}
                          />
                          </div>
                        </MuiPickersUtilsProvider>
                      ) : null}
                    </RadioGroup>
                  </FormControl>
                  </FilterContentBlock>
                )}
                 <Button style={{ marginTop: '2rem' }} variant="contained" color="primary" onClick={this.onApply}>
                   Apply
                 </Button>
            </FilterContent>
          </SwipeableDrawer>
        );
    }
}
 
const mapStateToProps = (state) => ({
    Data: state.data,
})

export default connect(mapStateToProps)(ColumnFilter);