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
max-width: 99vw !important;
overflow-x: scroll;
overflow-y: hidden;
flex-direction: column;
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
    max-width: 13%;
    position: relative;
    width: 13%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
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
    margin-right: 1rem;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
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
    overflow-x: scroll;
    flex-direction: column;
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
    max-width: 13%;
    position: relative;
    width: 13%;
    display: flex;
    flex-wrap: wrap;
`;

const SwitchText = styled.div `
    color: #fff !important;
    font-weight: 500;
`;

const TableFilterIcon = styled.div `
    cursor: pointer;
`;

const FilterContent = styled.div `
    width: 37vw;
    padding: 1.5rem;
`;

const FilterHeaderPaper = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FilterContentBlock = styled.div `
    border-top: 6px solid lightgreen !important;
    padding: 1rem;
    border-radius: 6px;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
`;

const FilterCell = styled.div `
    padding: 6px;
    width: 15vw;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
        background: #b9e2f5;
    }
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
    TableFilterIcon,
    FilterContent,
    FilterContentBlock,
    FilterCell,
    FilterHeaderPaper,
};
