import React from 'react'


export default class Hero extends React.Component<{ additionalClassNames?: string }> {
  render(): JSX.Element {
    return (
      <div className={`hero ${this.props.additionalClassNames || ''}`}>
        {this.props.children}
      </div>
    )
  }
}
