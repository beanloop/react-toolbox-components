# DateTime Picker

A [dialog](https://material.google.com/components/pickers.html) datetime picker is used to select a single date and time. The selected day is indicated by a filled circle. The current day is indicated by a different color and type weight.
After a date has been selected the time picker will open where the selected time is indicated by the filled circle at the end of the clock hand.

<!-- example -->
```jsx
import {DateTimePicker} from 'react-toolbox-components/dist/src/datetime-picker'

class DateTimePickerTest extends React.Component {
  state = {};

  handleChange = date => this.setState({date})

  render () {
    return (
      <section>
        <DateTimePicker label='Birthdate' onChange={this.handleChange} value={this.state.date} />
      </section>
    )
  }
}
```

If you want to provide a theme via context, the component keys are `RTDatePicker` and `RTTimePicker`.

## Properties

| Name            | Type            | Default       | Description |
|:-----|:-----|:-----|:-----|
| `cancelLabel`   | `String`        | `'Cancel'`    | Label used for cancel button on date picker dialog. |
| `disabledDates`     | `Array`        |               | An array of date objects which will be disabled in the calendar. All other dates will be enabled.|
| `enabledDates`     | `Array`        |               | An array of date objects which will be enabled in the calendar. All other dates will be disabled.|
| `inputClassName`| `String`        |               | This class will be applied to `Input` component of `DatePicker`. |
| `inputFormat`   | `Function`      |               | Function to format the date displayed on the input. |
| `label`         | `String`        |               | The text string to use for the floating label element in the input component.|
| `error`         | `String`        |               | The text string to use for the error element in the input component.|
| `locale`        | `String` or `Object` | `'en'`     | Set the locale for the date picker dialog ('de','no','en','es','af','ar','be','bg','bn','bo','br','bs','ca','gl','eu','pt','it','fr','ru','ua'). Object is supported too (see example in [react-toolbox](http://react-toolbox.com/#/components/date_picker)). |
| `maxDate`       | `Date`          |               | Date object with the maximum selectable date. |
| `minDate`       | `Date`          |               | Date object with the minimum selectable date. |
| `onChange`      | `Function`      |               | Callback called when the picker value is changed.|
| `onBlur`       | `Function`      |               | Callback fired on Input blur.|
| `disabled`      | `Boolean`       |               | The input element will be disabled.|
| `sundayFirstDayOfWeek` | `Boolean`| `false`       | Set week's first day to Sunday. Default week's first day is Monday ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Week_dates)). |
| `value`         | `Date` or `String` |               | Date object with the currently selected date. |
| `timeFormat`         | `String`        | `24hr`        | Format to display the clock. It can be 24hr or ampm. |

## Theme
For theming, see the documentation on [date-picker](http://react-toolbox.com/#/components/date_picker) and 
[time-picker](http://react-toolbox.com/#/components/time_picker)
