import React, { Component, Fragment } from 'react';
import BenefitStructure from '../BenefitStructure/index';
import './styles.css';

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
    }

    render() {
        // const { env = null } = givenData;
        // let data = null;
        // data = env.filter(({ envName = 'null' }) => envName === 'unit');
        // const { datapowerboxes = null } = Array.isArray(data) ?  data[0] : [];
        // const domainList = datapowerboxes.map(({ domainList = null }) => domainList.map(({ serviceList = null }) => serviceList));
        // const allServices = [].concat.apply([], [].concat.apply([], domainList));
        return ( 
            <Fragment>
                <h1 id="header_comp" className="pb-3 mb-0 pl-3 pt-3">Benefits Structures</h1>
                <div className="mainContainer"><BenefitStructure /></div>
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
 
export default Home;