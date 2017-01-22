import * as React from 'react';
import * as classNames from 'classnames';
import Icon from '../Icon';

interface RadioProps extends BizuiProps{
    name?:string,
    disabled?:boolean,
    checked?:boolean,
    defaultChecked?: boolean,
    onChange?:(string)=>any,
    label?: string | React.ReactNode,
    labelPosition? : 'left' | 'right',
    value?: string,
    isGroupRadio?: boolean,
}

export default class Radio extends React.Component<RadioProps, any> {
    static defaultProps = {
        prefixCls: 'biz-radio',
        className: '',
        name: '',
        disabled: false,
        defaultChecked: false,
        onChange: ()=> {
        },
        label: '',
        labelPosition: 'right',
        value: '',
    }
    state = {checked: this.props.defaultChecked};

    componentWillMount(){
        this.updateState(this.props.checked)
    }

    componentWillReceiveProps(newProps) {
        this.updateState(newProps.checked)
    }
    updateState(checked) {
        if(checked !== this.state.checked && typeof checked === 'boolean') {
            this.setState({
                checked: checked
            });
        }
    }

    touchTap(e, value) {
        const {disabled, checked, isGroupRadio} = this.props
        if (!disabled && !this.state.checked  && typeof checked === 'boolean') {
            !isGroupRadio && this.setState({checked: true});
            this.props.onChange(value);
        }
    }

    render() {
        const {prefixCls, className, style, name, disabled, onChange, label, labelPosition, value} = this.props;
        const radioClass = classNames({
            [`${prefixCls}`]: true,
            [className]: true,
            [`${prefixCls}-disabled`]: disabled,
        })
        const inputDisabled = disabled ? {disabled: 'disabled'} : '';
        const icon = this.state.checked ? <span className={prefixCls + "-circle-checked"}></span> : <span className={prefixCls + "-circle"}></span>;
        return (
            <div style={style} className={radioClass} onTouchTap={(e)=>this.touchTap(e, value)}>
                <input
                    style={{display: 'none'}}
                    className={`${prefixCls}-checkbox`}
                    type="radio"
                    checked={this.state.checked}
                    name={name}
                    {...inputDisabled}
                    onChange={()=>{}}
                    value={value}
                />
                {labelPosition === 'right' ? icon : null}
                <div className={`${prefixCls}-label`}>{label}</div>
                {labelPosition === 'left' ? icon : null}
            </div>
        );
    }
}