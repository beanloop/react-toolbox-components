import {ReactChild} from 'react'
import {FieldConfig, FormHelper} from 'react-form-helper'
import {getValue} from 'react-form-helper/dist/src/helpers'
import {IconButton} from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import {IconMenu, MenuItem} from 'react-toolbox/lib/menu'
import {withMedia} from 'react-with-media'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {removeIn, updateIn} from 'redux-decorated'
import {Row} from 'styled-material/dist/src/layout'
import {Table, TableCell, TableHeader, TableRow} from './table'

export const mediaMobile = '(max-width: 500px)'

export const ToolboxInput = ({required: _, ...props}) => <Input {...props} />

const CellInput = props => <TableCell><ToolboxInput {...props} /></TableCell>

const Menu = withMedia(mediaMobile)(({matches, items, ...props}) =>
  matches
    ?
      <IconMenu icon='more_vert' {...props}>
        {items.map(item =>
          <MenuItem key={item.value} {...item} />
        )}
      </IconMenu>
    : <Row horizontal='flex-end'>
        {items.map(item =>
          <IconButton key={item.value} icon={item.icon} onClick={item.onClick} />
        )}
      </Row>
)


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
}

type Labels = Array<{
  label: ReactChild
  /**
   * Path to control in the object passed on to FormHelper
   */
  path: Array<string|number>
}>

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
export const EditList = enhance(({value: list, labels, onChange, errorOnTouched, editFields, mapFields, edit, setEdit}: Props) =>
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
              <IconButton icon='delete' onClick={() => onChange(removeIn(i, list))} />
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
                {value: 'edit', icon: 'edit', caption: 'Edit', onClick() {
                  setEdit(value)
                }},
                {value: 'delete', icon: 'delete', caption: 'Delete', onClick() {onChange(removeIn(i, list))}},
              ]} />
            </TableCell>
          </TableRow>
    )}
  </Table>
)
