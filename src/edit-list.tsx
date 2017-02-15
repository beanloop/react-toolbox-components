import {ReactChild} from 'react'
import {FieldConfig, FormHelper} from 'react-form-helper'
import {getValue} from 'react-form-helper/dist/src/helpers'
import {IconButton} from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {removeIn, updateIn} from 'redux-decorated'
import {Row} from 'styled-material/dist/src/layout'
import {Menu} from './menu'
import {Table, TableCell, TableHeader, TableRow} from './table'

export const ToolboxInput = ({required: _, ...props}) => <Input {...props} />

const CellInput = props => <TableCell><ToolboxInput {...props} /></TableCell>

type Props = {
  /**
   * The object the form will manage
   */
  value: any
  /**
   * Optionally pass an array of fields that should be editable
   *
   * [
   *   {
   *     path: ['username'],
   *     required: true,
   *   },
   *   {
   *     path: ['password'],
   *     required: true,
   *   }
   * ]
   */
  editFields?: Array<FieldConfig>
  /**
   * Optionally pass a function that will be able to modify the fields
   * before rendering
   */
  mapFields?: (fields: Array<FieldConfig>, value) => Array<FieldConfig>
  /**
   * Labels to show in the list
   *
   * [
   *   {
   *     label: 'Username',
   *     path: ['username']
   *   },
   *   {
   *     label: 'Password',
   *     path: ['password']
   *   },
   * ]
   */
  labels: Labels
  /**
   * Callback when any field in the form is modified.
   * If this property is set, the form becomes a controlled component and the value
   * prop must be maintained externally.
   *
   * This is useful if you nest multiple FormHelpers or need to restrict user input
   * before it appear on the screen.
   */
  onChange: (updatedList) => void
  /**
   * The object being edited
   */
  edit: any
  setEdit: Function
  /**
   * Set to true to only show error messages for fields that have been touched
   */
  errorOnTouched?: boolean
  /**
   * Caption for the edit menu item
   */
  editCaption?: ReactChild
  /**
   * Caption for the delete menu item
   */
  deleteCaption?: ReactChild
}

type Labels = Array<{
  label: ReactChild
  /**
   * Path to control in the object passed on to FormHelper
   */
  path: Array<string|number>
}>

const enhance = compose(
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps.edit == null) {
        if (nextProps.mapFields) {
          for (const value of nextProps.value) {
            const fields = nextProps.mapFields(nextProps.editFields, value)

            if (fields.some(field => field.validationError)) {
              nextProps.setEdit(value)
            }
          }
        }
      }
    }
  })
)

/**
 * Component for displaying a list of items, which handles editing and removal.
 *
 * const enhance = compose(
 *   withState('user', 'setUser', [{username: 'test', password: 'test'}]),
 *   withState('editUser', 'setEditUser', null),
 * )
 *
 * export const EditUser = enhance(({editUser, setEditUser, user, setUser}) =>
 *   <EditList
 *     value={user}
 *     labels={[
 *       {
 *         label: 'Username',
 *         path: ['username']
 *       },
 *       {
 *         label: 'Password',
 *         path: ['password']
 *       },
 *     ]}
 *     onChange={setUser}
 *     editFields={[
 *       {
 *         path: ['username'],
 *         required: true,
 *       },
 *       {
 *         path: ['password'],
 *         required: true,
 *       }
 *     ]}
 *     edit={editUser}
 *     setEdit={setEditUser}
 *   />
 */
export const EditList = enhance(({
  value: list, onChange, labels, editFields, mapFields, edit, setEdit,
  editCaption = 'Edit', deleteCaption = 'Delete',
  errorOnTouched,
}: Props) =>
  <Table>
    <TableRow>
      {list.length > 0 && labels.map((label, i) => <TableHeader key={i}>{label.label}</TableHeader>)}
    </TableRow>
    {list.map((value, i) =>
      editFields && edit === value
        ? <FormHelper
            key={i}
            errorOnTouched={errorOnTouched}
            formComponent={TableRow}
            inputComponent={CellInput}
            value={value}
            onChange={updatedObject => {
              onChange(updateIn(i, updatedObject, list))
              setEdit(updatedObject)
            }}
            fields={mapFields ? mapFields(editFields, value) : editFields}
            buttonComponent={({disabled}) => <TableCell><Row horizontal='flex-end'>
              <IconButton icon='check' disabled={disabled} onClick={() => setEdit(null)} />
              <IconButton icon='delete' onClick={() => {
                setEdit(null)
                onChange(removeIn(i, list))
              }} />
            </Row></TableCell>}
            saveButton={true}
          />
        : <TableRow key={i}>
            {labels.map((label, i) => {
              const labelValue = getValue(label.path, value)

              return <TableCell key={i}>
                <span>{labelValue}</span>
              </TableCell>
            })}
            <TableCell>
              <Menu position='topRight' menuRipple items={[
                {value: 'edit', icon: 'edit', caption: editCaption, onClick() {
                  setEdit(value)
                }},
                {value: 'delete', icon: 'delete', caption: deleteCaption, onClick() {onChange(removeIn(i, list))}},
              ]} />
            </TableCell>
          </TableRow>
    )}
  </Table>
)
