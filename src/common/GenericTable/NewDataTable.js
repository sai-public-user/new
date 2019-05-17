import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // getMuiTheme = () => createMuiTheme({
    //     overrides: {
    //       MUIDataTableBodyCell: {
    //         root: {
    //           borderShadow: '0px 2px 10px 5px rgba(0,0,0,0.31)',
    //         }
    //       },
    //       MUIDataTable: {
    //         responsiveScroll: {
    //           maxHeight: 'none',
    //         },
    //       },
    //     }
    //   })

    getMuiTheme = () => createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
          },
          paper: {
            boxShadow: "none",
          }
        },
        MUIDataTableBodyRow: {
          root: {
            '&:nth-child(odd)': { 
              
            }
          }
        },
        MUIDataTableBodyCell: {
        }
      }
    })
    
    render() {
        const { columns, data, title, options } = this.props;
        console.log(columns, data, title, options);
        return (
            <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title={title}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>
        );
    }
}
 
export default DataTable;