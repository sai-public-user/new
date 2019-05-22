import React, { Component, Fragment } from 'react';
import BenefitStructure from '../BenefitStructure/index';
import './styles.css';
import * as Styles from '../../common/Table/SharedStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    colorSwitchBase: {
      color: '#0cb1c3',
      '&$colorChecked': {
        color: '#0cc324',
        '& + $colorBar': {
          backgroundColor: '#ffffff',
        },
      },
    },
    colorBar: {},
    colorChecked: {},
});

const {
    Header,
    MaindataContainer,
    TableFilters,
    SwitchText,
} = Styles.default;



// const givenData = {
//     "env": [
//       {
//         "envName": "unit",
//         "datapowerboxes": [
//           {
//             "datapowerboxName": "UnitDatapowerBox",
//             "domainList": [
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               }
//             ]
//           },
//           {
//             "datapowerboxName": "UnitDatapowerBox",
//             "domainList": [
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "envName": "Test",
//         "datapowerboxes": [
//           {
//             "datapowerboxName": "UnitDatapowerBox",
//             "domainList": [
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "envName": "Stage",
//         "datapowerboxes": [
//           {
//             "datapowerboxName": "UnitDatapowerBox",
//             "domainList": [
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "envName": "Prod",
//         "datapowerboxes": [
//           {
//             "datapowerboxName": "UnitDatapowerBox",
//             "domainList": [
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               },
//               {
//                 "domainName": "unitDomainName",
//                 "serviceList": [
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   },
//                   {
//                     "domainName": "Gateway",
//                     "serviceName": "ateWayService"
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   };

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [],
        }
    }

    handleSwitchChange = ({ target: { value } }) => {
        let { days = [] } = this.state;
        if (days.includes(value)) {
            days = days.filter(one => one !== value)
        } else {
            days.push(value);
        }
        this.setState({ days });
    }

    render() {
        const { days = [] } = this.state;
        console.log(this.props);
        const { classes } = this.props;
        return ( 
            <Fragment>
                <Header>
                    <span><h1>Benefits Structures</h1></span>
                    <TableFilters>
                        <FormGroup row>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={days.includes("30")}
                                  onChange={this.handleSwitchChange}
                                  value="30"
                                  classes={{
                                    switchBase: classes.colorSwitchBase,
                                    checked: classes.colorChecked,
                                    bar: classes.colorBar,
                                  }}
                                />
                              }
                              label={<SwitchText>30 Days</SwitchText>}
                            />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={days.includes("90")}
                                  onChange={this.handleSwitchChange}
                                  value="90"
                                  classes={{
                                    switchBase: classes.colorSwitchBase,
                                    checked: classes.colorChecked,
                                    bar: classes.colorBar,
                                  }}
                                />
                              }
                              label={<SwitchText>90 Days</SwitchText>}
                            />
                        </FormGroup>
                    </TableFilters>
                </Header>
                <MaindataContainer>
                    <BenefitStructure />
                </MaindataContainer>
                {/* <div className="row">
                {
                    allServices.map(({ domainName = null, serviceName = null }) => (
                        <div className="card m-3 text-center p-3" style={{ maxWidth: '350px', minWidth: '220px' }}>
                            <div className="font-weight-bold">{domainName}</div>
                            <div>{serviceName}</div>
                        </div>
                    ))
                }
                </div> */}
            </Fragment>
        );
    }
}
 
export default withStyles(styles)(Home);