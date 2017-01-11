/// <reference types="jest" />
/// <reference types="node" />

import 'jsdom-global/register'
import * as React from 'react'
import {snap} from 'tscomp'
import {StatelessDateTimePicker} from './datetime-picker'

xdescribe('DatePicker', () => {
  process.env.TZ = 'Europe/Amsterdam'

  const defaultProps = {
    picker: 'time',
    label: 'Starttid',
    error: null,
    onChange: () => {},
    onBlur: () => {},
    value: '2016-12-09T15:16:19.506Z',
    setPicker: () => {},
    tmpValue: null,
    setTmpValue: () => {},
    DatePicker: 'date-picker',
    TimePicker: 'time-picker',
  }

  it('should render date picker when picker is date', () => {
    snap(<StatelessDateTimePicker {...defaultProps} picker='date' />)
  })

  it('should render time picker when picker is time', () => {
    snap(<StatelessDateTimePicker {...defaultProps} picker='time' />)
  })

  it('should render errors', () => {
    snap(<StatelessDateTimePicker {...defaultProps} error='Invalid date' />)
  })
})
