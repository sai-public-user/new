import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import GenericTable from '../../common/GenericTable/index';
import DataTable from '../../common/GenericTable/NewDataTable';
import MuiDataTable from '../../common/GenericTable/MuiDataTable';
import Table from '../../common/Table/table';

import './styles.css';

{/* <div className="row d-flex justify-content-center m-0">
                <div className="">product type</div>
                <div className="ml-2 col-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#6669dd" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                </div>
            </div>, */}

class BenefitStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.prepareRowData(sampleData);
    }

    // prepareRowData = (rawRowData = []) => {
    //     const { headers = [] } = this.state;
    //     const rows = Array.isArray(rawRowData) && rawRowData.map((row, row_id) => {
    //         const oneRow = [];
    //         Array.isArray(headers) && headers.map(({ id = null, options = null }) => {
    //             // oneRow[id] = row[id];
    //             oneRow.push(row[id]);
    //         });
    //         return oneRow;
    //     });
    //     this.setState({ rows });
    // }
    
    render() {
        return ( 
            <Fragment>
                <Table  ref="table" />
            </Fragment>
         );
    }
}
 
export default BenefitStructure;