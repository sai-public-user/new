import React, {Component} from 'react';
import DataTables from 'material-ui-datatables';

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
  },
];

const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
  },
];

class MuiDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <DataTables
              selectable={false}
              showRowHover={true}
              columns={TABLE_COLUMNS}
              data={TABLE_DATA}
              page={1}
              count={100}
              title="Benefits Structure"
            />
         );
    }
}
 
export default MuiDataTable;