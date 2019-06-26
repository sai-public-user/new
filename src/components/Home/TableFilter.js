import React from 'react';
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
	FilterContent,
	FilterContentBlock,
	FilterCell,
	FilterHeaderPaper,
	SwitchDrawerText,
	HeaderCheck,
} = Styles.default;

function TableFilter(props) {
	const {
		classes = {},
		filterType,
		toggleTableFilter,
		days,
		handleSwitchChange,
		filterLeft,
		filterRight,
		filterHeaderClick,
		pinned,
		exHeadersNames,
	} = props || {};
    return (
      <SwipeableDrawer
        anchor="right"
        open={filterType !== ''}
        onClose={() => toggleTableFilter('')}
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
                          onChange={handleSwitchChange}
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
                          onChange={handleSwitchChange}
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
                          onChange={handleSwitchChange}
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
                          onChange={handleSwitchChange}
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
                      <FilterCell name={name} onClick={filterHeaderClick} style={{ color: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '#777': 'black'}`, cursor: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '' : 'pointer'}` }}>
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
                      <FilterCell name={`${Array.isArray(days) && days.length < 2 ? null : name}`} onClick={filterHeaderClick} className={`${Array.isArray(days) && days.length < 2 ? 'disabled' : ''}`} style={{ color: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '#777': 'black'}`, cursor: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '' : 'pointer'}` }}>
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
    );
}

export default withStyles(styles)(TableFilter);