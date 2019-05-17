import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import { TableRow, TableCell } from '@material-ui/core/Table';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 480,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });

function ExpandableTableRow (props) {
    const { classes, row } = props;
    console.log(props);
      
    return (
        <div className={classes.root}>
            <ExpansionPanel>                    
                <ExpansionPanelSummary>
                    <TableRow>
                      {Object.keys(row).length > 0 && Object.keys(row).map((key, i) => {
                        console.log(key, row[key]);
                        return (
                          <TableCell component="th" key={`${key}_${i}`} scope="row">
                            <Collapse hidden={!open} in={open}>
                               {
                                 <ItemComponent/>
                               }
                            </Collapse>
                          </TableCell>);}
                      )}
                    </TableRow>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Expansion panel expanded
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

export default withStyles(styles)(ExpandableTableRow);

