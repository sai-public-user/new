import React from 'react';
import styled from 'styled-components';

const TableHeader =  styled.div `
min-height: 52px;
max-height: 52px;
border-radius: 4px;
background-color: #3c65ab;
color: white;
text-transform: uppercase;
padding: 1rem;
margin-left: 0.25rem;
margin-right: 0.25rem;
display: flex;
flex-wrap: wrap;
`;

const Headername = styled.span `
    font-weight: 650;
`;

const CompareIcon = styled.span `
    align-content: center;
    margin-right: 0.5rem;
`;

const HeaderCell = styled.div `
    padding-left: 0.5rem;
    padding: 0;
    margin: 0;
    align-content: center;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const HeaderPin = styled.div `
    color: #fff;
    margin-left: 0.5rem;
`;

// const Row = styled.div `
//     min-height: 52px;
//     max-height: 52px;
//     border-radius: 4px;
//     font-weight: 400;
// `;

// .row-checkbox {
// }


// /* .pinned_cell {
//     position: fixed;
//     z-index: 9999;
//     left: 38px;
//     width: 295px;
//     height: 52px;
// } */

// .table_cell {
//     background-color: #fff;
//     background-clip: border-box;
//     border-radius: 0.25rem;
// }

// .table_cell:hover {
//     background-color: #e8eff2;
// }

// .header_cell:hover {
//     background-color: #6f97db;
// }

// .first_cell {
//     border-left: 6px solid skyblue;
// }

export default {
    TableHeader,
    Headername,
    CompareIcon,
    HeaderCell,
    HeaderPin,
};
