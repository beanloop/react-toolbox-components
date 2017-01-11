import styled from 'styled-components'

export const Table = styled.div`
  display: table;
  width: 100%;
`

export const TableRow = styled.div`
  display: table-row;
`

export const TableCell = styled.div`
  display: table-cell;
  padding-top: 8px;
  padding-bottom: 8px;
`

export const TableHeader = styled(TableCell)`
  color: rgba(0, 0, 0, 0.54);
  font-size: 1.2rem;
`
