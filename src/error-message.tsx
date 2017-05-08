import {StatelessComponent} from 'react'
import styled from 'styled-components'
import {materialColors} from 'styled-material/dist/src/colors'

export const ErrorMessage: StatelessComponent<{
  style?: any
}> = styled.div`
  color: ${materialColors['red-500']};
  font-size: 12px;
` as any
