import React from 'react';
import * as Styles from '../../common/Table/SharedStyles';

const {
    Header,
    TableFilters,
    TableFilterIcon,
} = Styles.default;


function PageHeader(props) {
    return (
        <Header>
            <span><h1>Benefits Structures</h1></span>
            <TableFilters>
                <TableFilterIcon onClick={() => props.onTableToggle('search', false)}><i title="Search" class="fa fa-search fa-lg" aria-hidden="true" /></TableFilterIcon>
                <TableFilterIcon onClick={() => props.onTableToggle('column', false)}><i title="Column Filter" class="fa fa-table fa-lg" aria-hidden="true" /></TableFilterIcon>
            </TableFilters>
        </Header>
    )
}

export default PageHeader;