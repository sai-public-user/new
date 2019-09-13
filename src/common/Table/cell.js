import React from 'react';
import * as Styles from './SharedStyles';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);
  

const {
    TableRowCell,
} = Styles.default;

function Cell(props) {
    const { data = null, endPosition = -1, name, title } = props;
    let cellData = (
        <TableRowCell title={title} className={`${endPosition > 0 ? ' last_cell' : ''}`} name={name}>
            {data !== null && (data.length > 0 || typeof data === 'number') ? data : '-'}
        </TableRowCell>
    );
    if (title === 'prescriberName' && data !== null && data.length > 0 && typeof data === 'string') {
        cellData = (
            <TableRowCell title={title} className={`${endPosition > 0 ? ' last_cell' : ''}`} name={name}>
                <div>
                    <div>{data.split('#')[0]}</div>
                    <div>#{data.split('#')[1]}</div>
                </div>
            </TableRowCell>
        )
    }
    if(title === 'prescriberName') {
        return (
            <HtmlTooltip title={<Typography color="inherit"><h5>{title}</h5></Typography>}>
               {cellData}
            </HtmlTooltip>
        )
    }
    return (cellData);
}

Cell.propTypes = {
    data: PropTypes.any.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
}

export default Cell;

//${isPinnedVal ? ' pinned_cell' : ''}