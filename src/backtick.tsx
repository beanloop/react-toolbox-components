import * as React from 'react'
import {StatelessComponent} from 'react'
import {TransitionMotion, spring} from 'react-motion'
import styled from 'styled-components'

export const StyledBacktick: StatelessComponent<{
  style?: any
  onClick: () => void
}> = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.54);
  will-change: opacity;
`

export const Backtick = ({open, onClick}) =>
  <TransitionMotion
    willLeave = {() => ({opacity: spring(0)})}
    defaultStyles = {[{key: 'backtick', style: {opacity: 0}}]}
    styles = {open ? [{key: 'backtick', style: {opacity: spring(1)}}] : []}
  >
    {interpolatedStyles =>
      <div>
        {interpolatedStyles.map(config =>
          <StyledBacktick onClick={onClick} key={config.key} style={config.style} />
        )}
      </div>
    }
  </TransitionMotion>
