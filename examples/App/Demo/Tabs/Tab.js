import * as React from 'react';
import * as classNames from 'classnames';
import Badge from '../Badge';
export default class Tab extends React.Component {
    constructor(...args) {
        super(...args);
        this._tab = null;
        this._tabContainer = null;
        this.tabRequestAnimation = null;
    }
    componentDidMount() {
        if (this.props.selected) {
            this.updateSelectedPos(this._tab.offsetLeft, this._tab.clientWidth, false);
        }
    }
    componentDidUpdate() {
        if (this.props.selected) {
            this.updateSelectedPos(this._tab.offsetLeft, this._tab.clientWidth, true);
        }
    }
    componentWillUnmount() {
        this.tabRequestAnimation && cancelAnimationFrame(this.tabRequestAnimation);
    }
    updateSelectedPos(tabOffsetLeft, tabWidth, animation) {
        this.tabRequestAnimation && cancelAnimationFrame(this.tabRequestAnimation);
        this._tabContainer = this._tab.parentNode;
        let containerWidth = this._tabContainer.clientWidth;
        let fromScrollLeft = this._tabContainer.scrollLeft;
        let toScrollLeft = tabOffsetLeft - containerWidth / 2 + tabWidth / 2;
        if (!animation) {
            this._tabContainer.scrollLeft = toScrollLeft;
        }
        if (animation && fromScrollLeft !== toScrollLeft) {
            let direction = fromScrollLeft < toScrollLeft ? 'fordward' : 'backward';
            let stepNum = (toScrollLeft - fromScrollLeft) / 20;
            this.tabRequestAnimation = requestAnimationFrame(() => this.stepScrollLeft(toScrollLeft, direction, stepNum));
        }
    }
    stepScrollLeft(toScrollLeft, direction, stepNum) {
        let fromScrollLeft = this._tabContainer.scrollLeft;
        this._tabContainer.scrollLeft += stepNum;
        let newFromScrollLeft = this._tabContainer.scrollLeft;
        if (fromScrollLeft != newFromScrollLeft && (direction === 'fordward' ? newFromScrollLeft < toScrollLeft : newFromScrollLeft > toScrollLeft)) {
            this.tabRequestAnimation = requestAnimationFrame(() => this.stepScrollLeft(toScrollLeft, direction, stepNum));
        }
    }
    render() {
        const { prefixCls, className, index, label, key, selected, handleChange, badgeContent, style } = this.props;
        const tabClass = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-active`]: selected,
            [className]: true,
        });
        return (React.createElement("div", {style: style, ref: (c) => this._tab = c, className: tabClass, onTouchTap: (e) => handleChange(index, e)}, label, badgeContent !== null ? React.createElement(Badge, {className: `${prefixCls}-badge`, content: badgeContent}) : null));
    }
}
Tab.defaultProps = {
    prefixCls: 'biz-tab',
    className: '',
    badgeContent: null,
};
