import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {LineInput, Label} from './';
import './style.scss';
import {debounce} from 'lodash';

export class TextAreaInput extends React.Component {
    constructor(props) {
        super(props);
        this.dom = {input: null};
        this.autoResize = this.autoResize.bind(this);
        this.onChange = this.onChange.bind(this);
        this.delayedResize = null;
    }

    componentDidMount() {
        if (this.props.autoHeight) {
            this.autoResize();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value && this.props.autoHeight) {
            this.autoResize(nextProps.value);
        }
    }

    autoResize(value = null) {
        if (this.dom.input) {
            if (value !== null) {
                this.dom.input.value = value;
            }

            // This is required so that when the height is reduced, the scrollHeight
            // is recalculated based on the new height, otherwise it will not
            // shrink the height back down
            this.dom.input.style.height = '5px';

            // Now set the height to the scrollHeight value to display the entire
            // text content
            this.dom.input.style.height = `${this.dom.input.scrollHeight}px`;
        }
    }

    onChange(event) {
        if (this.props.nativeOnChange) {
            this.props.onChange(event);
        } else {
            this.props.onChange(this.props.field, event.target.value);
        }

        if (this.props.autoHeight) {
            if (!this.delayedResize) {
                this.delayedResize = debounce(this.autoResize, this.props.autoHeightTimeout);
            }

            this.delayedResize();
        }
    }

    render() {
        const {field, label, value, autoHeight, readOnly, placeholder, ...props} = this.props;

        return (
            <LineInput {...props} readOnly={readOnly}>
                <Label text={label}/>
                <textarea
                    ref={(node) => this.dom.input = node}
                    className={classNames(
                        'sd-line-input__input',
                        {'sd-line-input__input--auto-height': autoHeight}
                    )}
                    value={value}
                    name={field}
                    onChange={readOnly ? null : this.onChange}
                    disabled={readOnly}
                    placeholder={readOnly ? '' : placeholder}
                />
            </LineInput>
        );
    }
}

TextAreaInput.propTypes = {
    field: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,

    hint: PropTypes.string,
    message: PropTypes.string,
    required: PropTypes.bool,
    invalid: PropTypes.bool,
    readOnly: PropTypes.bool,
    boxed: PropTypes.bool,
    noMargin: PropTypes.bool,
    autoHeight: PropTypes.bool,
    autoHeightTimeout: PropTypes.number,
    nativeOnChange: PropTypes.bool,
    placeholder: PropTypes.string,
};

TextAreaInput.defaultProps = {
    required: false,
    invalid: false,
    readOnly: false,
    boxed: false,
    noMargin: false,
    autoHeight: true,
    autoHeightTimeout: 50,
    nativeOnChange: false,
};
