import React, { Component, Fragment } from 'react';
import Table from '../../common/Table/table';
import FormGroup from '@material-ui/core/FormGroup';
import Data from '../../common/Table/SampleData';

import './styles.css';

class BenefitStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { days, order, exclude } = this.props;
        return ( 
            <FormGroup>
                {/* <Table ref="pintable" /> */}
                <Table ref="table" days={days} Data={Data} order={order} exclude={exclude} />
            </FormGroup>
         );
    }
}
 
export default BenefitStructure;