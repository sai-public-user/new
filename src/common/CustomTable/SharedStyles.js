import React from 'react';
import styled from 'styled-components';

const TableHeader =  styled.tr `
min-height: 54px;
max-height: 54px;
padding-left: 0.5rem;
background-color: #3c65ab;
color: white;
text-transform: uppercase;
display: flex;
flex-wrap: wrap;
max-width: 99vw !important;
flex-direction: column;
`;

const Headername = styled.span `
    font-weight: 650;
`;

const CompareIcon = styled.th `
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    cursor: pointer;
`;

const HeaderCell = styled.th `
    padding-left: 0.5rem;
    padding: 0;
    margin: 0;
    align-content: center;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 262px;
    position: relative;
    width: 262px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    min-height: 52px;
    background-color: #3c65ab;
    &:hover {
        background: #6f97db;
    }
`;

const HeaderPin = styled.div `
    color: #fff;
    margin-left: 0.5rem;
    align-items: center;
    display: flex;
`;

const Header = styled.div `
    color: white;
    background-color: #678bca;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    position: absolute;
    width: 99.1%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const RowCheckbox = styled.td `
    background-color: #fff;
    background-clip: border-box;
    border-radius: 0.25rem;
    margin: 0;
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    min-height: 52px;
    padding-left: 0.25rem;
`;

const FirstCell = styled.span `
    border-left: 6px solid skyblue;
`;

const TableRow = styled.tr `
    max-height: 54px;
    border-radius: 4px;
    font-weight: 400;
    text-transform: capitalize !important;
    margin-top: 0.5rem !important;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 0.25rem;
`;

const TableRowCell = styled.td `
    align-content: center !important;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 260px;
    position: relative;
    width: 260px;
    display: flex;
    flex-wrap: wrap;
    min-height: 52px;
    justify-content: center;
    background-color: #fff;
    &:hover {
        background: #e8eff2;
    }
`;

const SwitchText = styled.div `
    color: #fff !important;
    font-weight: 500;
`;

const SwitchDrawerText = styled.div `
    color: #000 !important;
    font-weight: 500;
`;

//overflow: scroll !important;

const HeaderParent = styled.div `
    font-size: 10px;
`;

const Rows = styled.tbody `
    height: 84vh;
`;

const HeaderData = styled.thead `
    border-radius: 4px;
`;

const HeaderCheck = styled.div `
`;

const SortIcon = styled.div `
    margin-left: 0.5rem;
    align-items: center;
    display: flex;
`;

const CustomTable = styled.table `
    width: 100%;
`;

const TableContainer = styled.div `
    flex-wrap: wrap;
    display: flex;
`;

export default {
    TableHeader,
    Headername,
    CompareIcon,
    HeaderCell,
    HeaderPin,
    Header,
    RowCheckbox,
    FirstCell,
    TableRow,
    TableRowCell,
    SwitchText,
    HeaderParent,
    SwitchDrawerText,
    Rows,
    HeaderData,
    SortIcon,
    CustomTable,
    TableContainer,
};
