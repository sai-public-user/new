import styled from "styled-components";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox
} from "@material-ui/core";

export const StyledTable = styled(Table)`
  border-collapse: separate !important;
  border-spacing: 0 6px !important;
`;

export const StyledTableHead = styled(TableHead)`
  background-color: #257aa0;
  border-radius: 10px !important;
`;

export const StyledTableRow = styled(TableRow)`
  border-radius: 10px !important;
  border: 1px solid black !important;
`;

export const StyledTableCellBody = styled(TableCell)`
  background-color: #fff;
  border: none;
  text-align: left;
`;

export const StyledTableCellHead = styled(TableCell)`
  color: #fff;
  background-color: rgba(37, 122, 160);
  position: sticky;
  top: 0;
  z-index: 10;
  border: none;
  text-align: left;
  min-width: 160px;
  max-width: 200px;
  display: flex;
  flex-grow: 1;
  padding: 0px;
`;

export const FirstHeadCell = styled(TableCell)`
  color: #fff;
  background-color: rgba(37, 122, 160);
  position: sticky;
  top: 0;
  z-index: 10;
  border: none;
  text-align: left;
`;

export const StyledCheckbox = styled(Checkbox)`
  color: rgba(0, 0, 0, 0.54) !important;
  padding: 0px !important;
`;

export const MyTablesortLabel = styled(TableSortLabel)`
  justify-content: left !important;
`;

export const MyCompareCell = styled.span`
  padding-left: 15px;
`;
