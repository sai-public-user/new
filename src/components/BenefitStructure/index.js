import React, { Component, Fragment } from 'react';
import Table from '../../common/Table/table';

import './styles.css';

class BenefitStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { days, order } = this.props;
        return ( 
            <Fragment>
                <Table ref="table" days={days} order={order} />
            </Fragment>
         );
    }
}
 
export default BenefitStructure;