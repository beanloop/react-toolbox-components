import * as React from 'react'
import {ReactChild, StatelessComponent} from 'react'
import Dialog from 'react-toolbox/lib/dialog'

type Props = {
  open: boolean
  onConfirm: () => void
  onClose: () => void
  onConfirmLabel: string
  onCloseLabel: string
  type?: string
  title: string
}

type PrivateProps = {
  intl: any
  children: ReactChild
}

export const ConfirmationDialog = ({
  onConfirm, onClose,
  onConfirmLabel, onCloseLabel,
  title, open, children, intl,
}: Props & PrivateProps) =>
  <Dialog
    title={title}
    active={open}
    type='small'
    onEscKeyDown={onClose}
    onOverlayClick={onClose}
    actions={[
      {label: onCloseLabel, onClick: onClose},
      {label: onConfirmLabel, onClick: onConfirm},
    ]}
    children={children}
  />
