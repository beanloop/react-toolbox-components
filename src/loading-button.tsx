import * as React from 'react'
import {Component} from 'react'
import Button from 'react-toolbox/lib/button/Button'
import {Spinner} from './spinner'

export type Props = {
  onClick?: (e: MouseEvent) => void|Promise<any>
  loading?: boolean

  disabled?: boolean
  [property: string]: any
}

export type State = {loading?: boolean}

export class LoadingButton extends Component<Props, State> {
  state: State = {}
  unmounted = false

  componentWillUnmount() {
    this.unmounted = true
  }

  setNotLoading() {
    if (!this.unmounted) {
      this.setState({loading: false})
    }
  }

  render() {
    const {loading: internalLoading} = this.state
    const {children, disabled, onClick, loading = internalLoading} = this.props
    const buttonProps = Object.assign({}, this.props)
    delete buttonProps.loading

    return (
      <Button {...buttonProps}  disabled={disabled || loading} onClick={onClick && (e => {
        const returnValue = onClick(e) as Promise<any>
        if (returnValue) {
          this.setState({loading: true})
          returnValue
            .then(() => this.setNotLoading())
            .catch(error => {
              this.setNotLoading()
              throw error
            })

        }
      })}>
        {children}
        {loading && <Spinner size={24} center type='circular' background='rgba(255, 255, 255, 0.5)' />}
      </Button>
    )
  }
}
