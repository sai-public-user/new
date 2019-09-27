import React, { Fragment, Component } from 'react';
import * as Styles from '../../common/Table/SharedStyles';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
    FormControlLabel,
    Checkbox,
    SwipeableDrawer,
    Paper,
    Button,
 } from '@material-ui/core';
 import { connect } from 'react-redux';

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
            selectedCols: []
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

    render() { 
        const {
            filterType,
            toggleTableFilter,
            columns,
        } = this.props || {};
        console.log(columns, filterType);
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
                    data comes here
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