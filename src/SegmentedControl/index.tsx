import * as React from 'react';
import * as classNames from 'classnames';
import * as objectAssign from 'object-assign';

interface SegmentedControlProps extends BizuiProps{
    color?: string;
    disabled?: boolean;
    selectedIndex?: number;
    values?: Array<string>;
    onChangeIndex?: (x:number, y:number)=>void,
    defaultIndex?: number,
}

export default class SegmentedControl extends React.Component<SegmentedControlProps, any>{
    static defaultProps = {
        prefixCls: 'biz-segmented',
        className: '',
        onChangeIndex:()=>{},
        values: [],
        style: {},
        disabled: false,
        defaultIndex: 0,
    };
    state = {selectedIndex: this.props.defaultIndex};
    tabsCompontent=null;
    componentWillMount(){
        const {defaultIndex, selectedIndex} = this.props
        if(defaultIndex !== selectedIndex && typeof selectedIndex === 'number') {
            this.setState({
                selectedIndex: selectedIndex
            });
        }
    }
    componentWillReceiveProps(newProps) {
        const selectedIndex = newProps.selectedIndex;
        if(typeof selectedIndex === 'number' && selectedIndex !== this.state.selectedIndex){
            this.setState({
                selectedIndex: selectedIndex
            })
        }
    }
    onTouchTap = (e, index, value)=> {
        const {onChangeIndex, disabled} = this.props;
        const fromIndex = this.state.selectedIndex;
        if(!disabled){
            onChangeIndex(index, fromIndex);
            if(index !== fromIndex) {
                this.setState({selectedIndex: index});
            }
        }
    }
    
    render() {
        const {prefixCls, className, onChangeIndex, disabled, values, color, style} = this.props;
        const segmentedClass = classNames({
            [`${prefixCls}`]: true,
            [className]: true,
        });
        const selectedIndex= this.state.selectedIndex;
        const tabs = values.map((value, index) => {
            const tabCls = classNames({
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-item-active`]: index === selectedIndex,
            });
            return (
                <div
                    className={tabCls}
                    key={index}
                    ref={(c)=>this['_tab_'+index]=c}
                    onTouchTap={(e) => this.onTouchTap(e, index, value)}
                    style={{
                        color: index === selectedIndex ? '' : color,
                        borderRightColor: color,
                        backgroundColor: index === selectedIndex ? color : '',
                    }}
                >
                    {value}
                </div>
            );
        });
        this.tabsCompontent = tabs;
        const segmentedStyle = objectAssign({}, style, {
            opacity: disabled ? 0.5 : 1,
            borderColor: color,
        });
        return (
            <div className={segmentedClass} style={segmentedStyle}>
                {tabs}
            </div>
        )
    }
}