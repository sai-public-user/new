import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import GenericTable from '../../common/GenericTable/index';
import DataTable from '../../common/GenericTable/NewDataTable';
import MuiDataTable from '../../common/GenericTable/MuiDataTable';
import Table from '../../common/Table/table';

import './styles.css';

class BenefitStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                { name: 'county', id: 'county' },
                { name: 'plan', id: 'plan' },
                { name: 'organization', id: 'organization' },
                { name: 'plancode', id: 'plancode' },
                { name: <div className="row d-flex justify-content-center m-0">
                <div className="">product type</div>
                <div className="ml-2 col-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#6669dd" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                </div>
            </div>, id: 'product_type', options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return value;
                    }
                  }
                },
                { name: 'monthly premium', id: 'monthly_premium' },
                { name: 'annual drug deductable', id: 'annual_drug_deuctable' },
                { name: 'drug count', id: 'drug_count' },
                { name: 'current enrollees', id: 'current_enrollees' },
                { name: 'gain/loss', id: 'gain_loss' },
                { name: 'annual drug deductable', id: 'annual_drug_deuctable' },
                { name: 'drug count', id: 'drug_count' },
                { name: 'current enrollees', id: 'current_enrollees' },
                { name: 'gain/loss', id: 'gain_loss' },
            ],
            rows: [],
            tabSelected: 0,
        };
    }

    componentDidMount() {
        //send raw data from api
        const sampleData = [
            {
                monthly_premium: '1_monthly_premium',
                annual_drug_deuctable: '1_annual_drug_deuctable',
                drug_count: '1_drug_count',
                current_enrollees: '1_current_enrollees',
                gain_loss: '1_gain_loss',
                annual_drug_deuctable: '1_annual_drug_deuctable',
                drug_count: '1_drug_count',
                current_enrollees: '1_current_enrollees',
                gain_loss: '1_gain_loss',
                county: '1_county',
                plan: '1_HMO',
                organization: '1_organization',
                plancode: '1_plancode',
                product_type: '1_product_type',
            },
            {
                county: '2_county',
                plan: '2_HMO',
                organization: '2_organization',
                plancode: '2_plancode',
                product_type: '2_product_type',
                monthly_premium: '2_monthly_premium',
                annual_drug_deuctable: '2_annual_drug_deuctable',
                drug_count: '2_drug_count',
                current_enrollees: '2_current_enrollees',
                gain_loss: '2_gain_loss',
                annual_drug_deuctable: '2_annual_drug_deuctable',
                drug_count: '2_drug_count',
                current_enrollees: '2_current_enrollees',
                gain_loss: '2_gain_loss',
            },
            {
                county: '3_county',
                plan: '3_HMO',
                organization: '3_organization',
                plancode: '3_plancode',
                product_type: '3_product_type',
                monthly_premium: '3_monthly_premium',
                annual_drug_deuctable: '3_annual_drug_deuctable',
                drug_count: '3_drug_count',
                current_enrollees: '3_current_enrollees',
                gain_loss: '3_gain_loss',
                annual_drug_deuctable: '3_annual_drug_deuctable',
                drug_count: '3_drug_count',
                current_enrollees: '3_current_enrollees',
                gain_loss: '3_gain_loss',
            },
        ]
        this.prepareRowData(sampleData);
    }

    prepareRowData = (rawRowData = []) => {
        const { headers = [] } = this.state;
        const rows = Array.isArray(rawRowData) && rawRowData.map((row, row_id) => {
            const oneRow = [];
            Array.isArray(headers) && headers.map(({ id = null, options = null }) => {
                // oneRow[id] = row[id];
                oneRow.push(row[id]);
            });
            return oneRow;
        });
        this.setState({ rows });
    }

    tabChange = (event, tabSelected) => {
      this.setState({ tabSelected });
    };
    
    render() {
        const { headers, rows, tabSelected } = this.state;
        const Ptires = [
            { name: 'Preferred Tire', value: 10 },
            { name: 'Preferred Tire', value: 10 },
            { name: 'Preferred Tire', value: 10 },
            { name: 'Preferred Tire', value: 10 },
            { name: 'Preferred Tire', value: 10 },
            { name: 'Preferred Tire', value: 10 },
            // { name: 'Preferred Tire', value: 10 },
            // { name: 'Preferred Tire', value: 10 },
            // { name: 'Preferred Tire', value: 10 },
            // { name: 'Preferred Tire', value: 10 },
            // { name: 'Preferred Tire', value: 10 },
            // { name: 'Preferred Tire', value: 10 },
        ];
        const Stires = [
            { name: 'Standard Tire', value: 10 },
            { name: 'Standard Tire', value: 10 },
            { name: 'Standard Tire', value: 10 },
            { name: 'Standard Tire', value: 10 },
            { name: 'Standard Tire', value: 10 },
            { name: 'Standard Tire', value: 10 },
            // { name: 'Standard Tire', value: 10 },
            // { name: 'Standard Tire', value: 10 },
            // { name: 'Standard Tire', value: 10 },
            // { name: 'Standard Tire', value: 10 },
            // { name: 'Standard Tire', value: 10 },
            // { name: 'Standard Tire', value: 10 },
        ];
        const options = {
            // expandableRows: true,
            fixedHeader: false,
            print: false,
            search: false,
            filter: false,
            resizableColumns: true,
            selectableRows: 'none',
            pagination: false,
            sort: false,
            responsive: "scroll",
            // renderExpandableRow: (rowData, rowMeta) => {
            //     return (
            //     <TableRow id="expanded_row">
            //         <TableCell colSpan={rowData.length}>
            //             <div className="">
            //                 <Tabs
            //                   value={tabSelected}
            //                   onChange={this.tabChange}
            //                   indicatorColor="primary"
            //                   textColor="primary"
            //                   variant="scrollable"
            //                   scrollButtons="auto"
            //                 >
            //                   <Tab label="Mail Order" />
            //                   <Tab label="Retail" />
            //                 </Tabs>
            //                 {tabSelected === 0 && (<div>
            //                     {Ptires.map(({ name = '', value = null }, id) => (<div>{`${name} - ${value}`}</div>))}
            //                 </div>)}
            //                 {tabSelected === 1 && (<div>
            //                     {Stires.map(({ name = '', value = null }, id) => (<div>{`${name} - ${value}`}</div>))}
            //                 </div>)}
            //             </div>
            //         </TableCell>
            //     </TableRow>)
            // }
        };
        return ( 
            <Fragment>
                {/* {Array.isArray(rows) && rows.length > 0 && <GenericTable classes={{}} headers={headers} rows={rows} />} */}
                {/* {(
                    <DataTable
                        columns={headers.map(({ name = '', options = {} }) => ({ name, options }))}
                        title={"Benefit Structures"}
                        data={rows}
                        options={options}
                    />
                )} */}
                <Table />
                {/* <MuiDataTable /> */}
            </Fragment>
         );
    }
}
 
export default BenefitStructure;