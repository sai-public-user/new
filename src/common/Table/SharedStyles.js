import React from 'react';
import styled from 'styled-components';

const TableHeader =  styled.div `
min-height: 28px;
max-height: 52px;
border-radius: 4px;
background-color: #3c65ab;
color: white;
text-transform: uppercase;
padding: 1rem;
display: flex;
flex-wrap: wrap;
`;

const Headername = styled.span `
    font-weight: 650;
`;

const CompareIcon = styled.span `
    align-content: center;
    margin-right: 0.5rem;
    margin-top: 10px;
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

const TableFilters = styled.div `
    margin-top: 1rem;
`;

const MaindataContainer = styled.div `
    z-index: 10;
    position: absolute;
    max-width: 99vw;
    margin-top: 96px;
    padding-left: 28px;
    padding-right: 28px;
    width: 97%;
`;

const RowCheckbox = styled.div `
    background-color: #fff;
    background-clip: border-box;
    border-radius: 0.25rem;
    padding: 0.5rem;
    margin: 0;
    align-content: center;
    display: flex;
    flex-wrap: wrap;
`;

const FirstCell = styled.span `
    border-left: 6px solid skyblue;
`;

const TableRow = styled.div `
    min-height: 52px;
    max-height: 52px;
    border-radius: 4px;
    font-weight: 400;
    text-transform: capitalize !important;
    margin-top: 1rem !important;
    margin-left: 0.25rem !important;
    margin-right: 0.25rem !important;
    display: flex;
    flex-wrap: wrap;
`;

const TableRowCell = styled.div `
    background-color: #fff;
    background-clip: border-box;
    border-radius: 0.25rem;
    padding-left: 0.5rem !important;
    padding: 0 !important;
    margin: 0 !important;
    align-content: center !important;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const SwitchText = styled.div `
    color: #fff !important;
    font-weight: 500;
`;

export default {
    TableHeader,
    Headername,
    CompareIcon,
    HeaderCell,
    HeaderPin,
    Header,
    MaindataContainer,
    RowCheckbox,
    FirstCell,
    TableRow,
    TableRowCell,
    TableFilters,
    SwitchText,
};
