import * as React from 'react';
import * as classNames from 'classnames';
import Icon from '../Icon';

interface CheckboxProps extends BizuiProps{
    name?:string,
    disabled?:boolean,
    checked?:boolean,
    onChange?:(boolean, string?)=>any,
    label?: string | React.ReactNode,
    labelPosition? : 'left' | 'right',
    checkedIcon? : React.ReactNode,
    uncheckedIcon? : React.ReactNode,
    value?: string,
    defaultChecked?: boolean
}

export default class Checkbox extends React.Component<CheckboxProps, any> {
    static defaultProps = {
        prefixCls: 'biz-checkbox',
        className: '',
        disabled: false,
        defaultChecked: false,
        onChange: ()=> {
        },
        label: '',
        labelPosition: 'right',
        checkedIcon: <Icon type='check-square'/>,
        uncheckedIcon: <Icon type='square-o'/>,
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
        if (!this.props.disabled) {
            const checked = !this.state.checked;
            typeof this.props.checked !== 'boolean' && this.setState({checked: checked});
            this.props.onChange(checked, value);
        }
    }

    render() {
        const {prefixCls, className, style, name, disabled, onChange, label, labelPosition, checkedIcon, uncheckedIcon, value} = this.props;
        const checkboxClass = classNames({
            [`${prefixCls}`]: true,
            [className]: true,
            [`${prefixCls}-disabled`]: disabled,
        })
        const inputDisabled = disabled ? {disabled: 'disabled'} : '';
        const icon = this.state.checked ? checkedIcon: uncheckedIcon;
        return (
            <div style={style} className={checkboxClass} onTouchTap={(e)=>this.touchTap(e, value)}>
                <input
                    style={{display: 'none'}}
                    type="checkbox"
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