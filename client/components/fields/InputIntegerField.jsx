import React from 'react'

export class InputIntegerField extends React.Component {
    focus() {
        this.refs.number.focus()
    }
    render() {
        const { input, label, text, meta: { touched, error, warning } } = this.props

        return (
            <span>
                {label && <label>{label}</label>}
                <input {...input} type="number" min="1" ref="number"/>
                {text && <span>{text}</span>}
                {touched && ((error && <span className="error-block"><br/>{error}</span>) ||
                (warning && <span className="help-block"><br/>{warning}</span>))}
            </span>
        )
    }
}

InputIntegerField.propTypes = {
    input: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    text: React.PropTypes.string,
    meta: React.PropTypes.object.isRequired,
}
