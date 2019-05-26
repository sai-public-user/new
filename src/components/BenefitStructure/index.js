import React, { Component, Fragment } from 'react';
import Table from '../../common/Table/table';

import './styles.css';

class BenefitStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return ( 
            <Fragment>
                <Table  ref="table" />
            </Fragment>
         );
    }
}
 
export default BenefitStructure;