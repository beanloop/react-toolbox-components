import {StatelessComponent} from 'react'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import styled from 'styled-components'
import {normalizeColor} from 'styled-material/dist/src/colors'

const SpinnerContainer: StatelessComponent <{
  style?: any
}> = styled.div `
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  animation: fade-in .2s .2s;
  animation-fill-mode: backwards;
`

const StyledProgressBar: any = styled(ProgressBar) `
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
`

export type Props = {
  size?: number
  singleColor?: boolean
  background?: boolean|string
  type?: string
}

export const Spinner = ({size = 28, singleColor = false, background = false, type}: Props) =>
  <SpinnerContainer style={background && {
    backgroundColor: background === true ? 'white' : normalizeColor(background),
  } || {}}>
    <StyledProgressBar type={type} size={size} multicolor={!singleColor} />
  </SpinnerContainer>
