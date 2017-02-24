import * as React from 'react'
import {StatelessComponent} from 'react'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import styled from 'styled-components'
import {fadeIn} from 'styled-material/dist/src/animation'
import {normalizeColor} from 'styled-material/dist/src/colors'

const SpinnerContainer: StatelessComponent <{
  center?: boolean
  style?: any
}> = styled.div`
  ${({center}) => center && `
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `}

  animation: ${fadeIn};
  animation-fill-mode: backwards;
`

const StyledProgressBar: any = styled(ProgressBar)`
  ${({size, type}) => type === 'circular' && `
    width: ${size}px !important;
    height: ${size}px !important;
  `}
`

export type Props = {
  center?: boolean
  size?: number
  /**
   * If true, the circular progress bar will be changing its color.
   */
  multicolor?: boolean
  background?: boolean|string
  /**
   * Type of the progress bar, it can be circular or linear.
   * @default linear
   */
  type?: 'linear'|'circular'
  /**
   * Mode of the progress bar, it can be determinate or indeterminate.
   * @default indeterminate
   */
  mode?: 'determinate'|'indeterminat'
  /**
   * Maximum value permitted.
   * @default 100
   */
  max?: number
  /**
   * Minimum value permitted.
   * @default 0
   */
  min?: number
  /**
   * Value of the current progress.
   * @default 0
   */
  value?: number
  /**
   * Milliseconds to wait before the spinner is shown
   * @default 300
   */
  timeout?: number|false
}

export type PrivateProps = {
  visible: boolean
  setVisible: any
}

export const enhance = compose(
  withState('visible', 'setVisible', false),
  lifecycle({
    componentDidMount() {
      const {timeout} = this.props

      if (timeout !== false) {
        this.timeout = setTimeout(() => {
          this.props.setVisible(true)
        }, timeout === undefined ? 300 : timeout)
      }
    },

    componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }
  })
)

export const StatelessSpinner = ({
  size = 28,
  background = false,
  center,
  timeout,
  visible,
  ...props,
}: Props & PrivateProps) =>
  <SpinnerContainer center={center} style={background && {
    backgroundColor: background === true ? 'white' : normalizeColor(background),
  } || {}}>
    {(timeout === false || visible) &&
      <StyledProgressBar {...props} size={size} />
    }
  </SpinnerContainer>

export const Spinner: StatelessComponent<Props> = enhance(StatelessSpinner)
