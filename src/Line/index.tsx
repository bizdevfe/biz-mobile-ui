import * as React from 'react';
import * as classNames from 'classnames';

type LineType = "across" | "vertical";
interface LinePropType {
    prefixCls?: 'biz-line',
    type?: LineType,
    className?: string,
    style?: React.CSSProperties,
}

export default class Line extends React.Component<LinePropType, any> {
    static defaultProps = {
        prefixCls: 'biz-line',
        type: 'across',
        className: ''
    };
    render() {
        const {prefixCls, type, className, style } = this.props;
        const lineClass = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${type}`]: true,
            [className]: true,
        })
        return (
            <div className={lineClass} style={style}></div>
        );
    }
}

