import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import './styles.css';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#6669dd',
    color: theme.palette.common.white,
    maxWidth: 200,
  },
  body: {
    fontSize: 14,
    maxWidth: 200,
    paddingBottom: 10,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class GenericTable extends Component {

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  }

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    const { classes, headers = [], rows = [] } = this.props;

    return (
      <Paper className={`${classes.root} genericDataTable`}>
        <Table className="">
          <TableHead>
            <TableRow className="text-uppercase" id="tableRow">
                {Array.isArray(headers) && headers.map(({ name = '', id = '' }) => {return (
                  <CustomTableCell
                    className="font-weight-bold"
                    key={id}
                    // align={row.numeric ? 'right' : 'left'}
                    // padding={row.disablePadding ? 'none' : 'default'}
                    // sortDirection={orderBy === id ? order : false}
                  >
                    {name}
                  </CustomTableCell>      
                )})}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow className={`${classes.row}`} key={i} id="tableRow">
                {Object.keys(row).length > 0 && Object.keys(row).map((key, i) => (
                  <CustomTableCell component="th" className={`${i === 0 ? 'start' : ''}pt-2`} key={`${key}_${i}`} scope="row">
                    {row[key]}
                  </CustomTableCell>)
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
};

GenericTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenericTable);

// =========================================================================

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// import './styles.css';

// const CustomTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: '#6669dd',
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//     maxWidth: 200,
//   },
// }))(TableCell);

// // const CustomTableRow = withStyles(theme => ({
// //   body: {
// //     fontSize: 14,
// //     maxWidth: 200,
// //   },
// // }))(TableRow);

// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 480,
//   },
//   row: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.background.default,
//     },
//   },
// });

// function GenericTable(props) {
//   const { classes, headers = [], rows = [] } = props;
//   return (
//     <div className={`${classes.root} mt-0 genericDataTable`}>
//       <Table className="">
//         <TableHead>
//           <TableRow className="text-uppercase" id="tableRow">
//               {Array.isArray(headers) && headers.map(({ name = '', id = '' }) => (
//                 <CustomTableCell className="font-weight-bold" key={id}>{name}</CustomTableCell>      
//               ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, i) => (
//             <TableRow className={`${classes.row}`} key={i} id="tableRow">
//               {Object.keys(row).length > 0 && Object.keys(row).map((key, i) => (
//                 <CustomTableCell component="th" className="pt-2" key={`${key}_${i}`} scope="row">
//                   {row[key]}
//                 </CustomTableCell>)
//               )}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// GenericTable.propTypes = {
//   classes: PropTypes.object.isRequired,
//   headers: PropTypes.array.isRequired,
//   rows: PropTypes.array.isRequired,
// };

// export default withStyles(styles)(GenericTable);

// =====================================================================


// import { withStyles } from 'material-ui/styles';
// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
// import Paper from 'material-ui/Paper';
// import { styles } from './styles';
// import ExpandableTableRow from './ExpandableRow';

// class GenericTable extends Component {
//     render() {
//         const { classes, items, headItems } = this.props;
//         return (
//             <Paper className={classes.paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         {headItems.map((n, i) => {
//                             return <TableCell className={classes.column} key={i}>{n}</TableCell>
//                         })}
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {
//                         !items.length &&
//                         <TableRow>
//                             <TableCell colSpan={12} className={classes.center}>
//                                 <p>There is no data to display</p>
//                             </TableCell>
//                         </TableRow>
//                     }
//                     {items.map((item, i) => {
//                         return (
//                             <ExpandableTableRow key={i} item={item}/>
//                         );
//                     })}
//                 </TableBody>
//             </Table>
//             </Paper>
//         );
//     }
// }

// export default withStyles(styles)(GenericTable);