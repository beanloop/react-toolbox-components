import * as React from 'react'
import {ComponentClass, ReactType, StatelessComponent} from 'react'
import {themr} from 'react-css-themr'
import {IconButton} from 'react-toolbox/lib/button'
import calendarFactory from 'react-toolbox/lib/date_picker/Calendar'
import datePickerDialogFactory from 'react-toolbox/lib/date_picker/DatePickerDialog'
import dateTheme from 'react-toolbox/lib/date_picker/theme.scss'
import Dialog from 'react-toolbox/lib/dialog'
import {DATE_PICKER, TIME_PICKER} from 'react-toolbox/lib/identifiers'
import Input from 'react-toolbox/lib/input'
import timePickerDialogFactory from 'react-toolbox/lib/time_picker/TimePickerDialog'
import timeTheme from 'react-toolbox/lib/time_picker/theme.scss'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

const Calendar = calendarFactory(IconButton)
const ThemedDatePickerDialog = themr(DATE_PICKER, dateTheme)(datePickerDialogFactory(Dialog, Calendar))
const ThemedTimePickerDialog = themr(TIME_PICKER, timeTheme, {withRef: true})(timePickerDialogFactory(Dialog))

const enhance = compose(
  withState('picker', 'setPicker', null),
  withState('tmpValue', 'setTmpValue', null),
) as any

function isoFormat(date: Date) {
  return date.toISOString()
}

export const StatelessDateTimePicker = ({
  picker, setPicker, tmpValue, setTmpValue, DatePicker, TimePicker,
  onChange, value,
  locale, sundayFirstDayOfWeek, cancelLabel, disabledDates, enabledDates, maxDate, minDate,
  timeFormat,
  label, onBlur, inputClassName, disabled, inputFormat = isoFormat, error
}: DateTimePickerProps & {
  picker: string
  setPicker: (value: string) => void
  tmpValue: Date
  setTmpValue: (value: Date) => void
  DatePicker: ReactType
  TimePicker: ReactType
}) => {
  const dateValue = typeof value === 'string' ? new Date(value) : (value || new Date())
  dateValue.setSeconds(0)
  let timePicker

  return (
    <div>
      <DatePicker
        active={picker === 'date'}
        value={dateValue}
        onDismiss={() => setPicker(null)}
        onEscKeyDown={() => setPicker(null)}
        onOverlayClick={() => setPicker(null)}
        onSelect={value => {
          setPicker('time')
          setTmpValue(value)
          timePicker.handleClockChange(value)
        }}
        locale={locale}
        sundayFirstDayOfWeek={sundayFirstDayOfWeek}
        cancelLabel={cancelLabel}
        disabledDates={disabledDates}
        enabledDates={enabledDates}
        maxDate={maxDate}
        minDate={minDate}
      />
      <TimePicker
        ref={t => timePicker = t && t.refs.wrappedInstance}
        active={picker === 'time'}
        onDismiss={() => setPicker(null)}
        onEscKeyDown={() => setPicker(null)}
        onOverlayClick={() => setPicker(null)}
        onSelect={value => {
          onChange(value.toISOString())
          setPicker(null)
          setTmpValue(null)
        }}
        value={tmpValue || dateValue}
        format={timeFormat}
      />
      <Input
        className={inputClassName}
        label={label}
        error={error}
        disabled={disabled}
        onFocus={() => setPicker('date')}
        onBlur={onBlur}
        value={value && inputFormat(dateValue)}
      />
    </div>
  )
}

export type DateTimePickerProps = {
  label: string
  onChange: (value: string) => void
  value?: Date|string
  error?: string
  onBlur?: (value: UIEvent) => void
  locale?: string|{
    months: Array<string>
    monthsShort: Array<string>
    weekdays: Array<string>
    weekdaysShort: Array<string>
    weekdaysLetter: Array<string>
  }
  sundayFirstDayOfWeek?: boolean
  cancelLabel?: string
  disabledDates?: Array<Date>
  enabledDates?: Array<Date>
  maxDate?: Date
  minDate?: Date
  timeFormat?: '24hr'|'ampm'
  inputClassName?: string
  disabled?: boolean
  inputFormat?: (value: Date) => string
}

export const DateTimePicker: ComponentClass<DateTimePickerProps> = enhance(props =>
  <StatelessDateTimePicker {...props}
    DatePicker={ThemedDatePickerDialog}
    TimePicker={ThemedTimePickerDialog}
  />
)
