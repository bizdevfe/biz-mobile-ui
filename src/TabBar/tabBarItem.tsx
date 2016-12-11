import * as React from 'react';
import * as classNames from 'classnames';
import Badge from '../Badge';
interface TabBarItemProps extends BizuiProps{
    label? : string,
    icon? : React.ReactNode,
    key?: number,
    index?: number,
    selected?: boolean,
    handleChange?: (x:number, y: React.SyntheticEvent) => any,
    badgeContent?: string | React.ReactNode,
}
export default class TabBarItem extends React.Component<TabBarItemProps, any>{
    static defaultProps = {
        prefixCls: 'biz-tabBarItem',
        className: '',
        badgeContent: null,
    };
    render() {
        const {prefixCls, className,index, label, key, icon, selected, handleChange, badgeContent, style} = this.props;
        const tabClass = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-active`]: selected,
            [className]: true,
        });

        return (
            <div className={tabClass} onTouchTap={(e)=>handleChange(index, e)} style={style}>
                <div className={`${prefixCls}-badge`}>
                    {icon}
                    {typeof badgeContent === 'string' ?
                        <Badge content={badgeContent}/>
                        :null
                    }
                </div>
                {label}
            </div>
        )
    }
}