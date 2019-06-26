import React, { Component, Fragment } from 'react';
import Table from '../../common/Table/table';
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
            <Fragment>
                <Table ref="table" hasPinnedColumns days={days} Data={Data} order={order} exclude={exclude} />
            </Fragment>
         );
    }
}
 
export default BenefitStructure;