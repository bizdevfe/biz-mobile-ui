import * as React from 'react';
import * as classNames from 'classnames';
import Checkbox from '../Checkbox';
interface HeaderTrProps extends BizuiProps {
    key?:string,
    colSpan?:number,
    rowSpan?:number,
    selectable?:boolean,
    selected?:boolean,
    onRowSelection?:Function,
    align?: string,
    width?: string,
    content?: Function,
    title: string,
    field?: string,
    attr?: Object
}
interface DataAttr {

}
interface TableProps extends BizuiProps {
    columns?:Array<HeaderTrProps | Array<HeaderTrProps>>,
    fixedHeader?:boolean,
    selectable?:boolean,
    multiSelectable?:boolean,
    selectedChange?: Function,
    dataSource?:Array<Object>,
    dataSourceField?:Array<HeaderTrProps>,
    height?:string,
    width?: string,
}
function getStyles(props){
    return {

    }
}
class Table extends React.Component<TableProps, any> {
    static defaultProps = {
        prefixCls: 'biz-table',
        className: '',
        columns: [],
        fixedHeader: false,
        selectable: false,
        multiSelectable: true,
        dataSource: [],
        height: 'auto',
        selectedChange: ()=>{},
    }
    state = {
        rowsStatus: [],
    };
    componentWillMount() {
        this.setState({rowsStatus: this.getRowsStatus(this.props)});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({rowsStatus: this.getRowsStatus(nextProps)});
    }
    getRowsStatus(props) {
        const rowsStatus = [];
        const {dataSource, selectable, multiSelectable} = props;
        let selectedNums = 0;
        if(selectable) {
            for(let i = 0, rowsLen = dataSource.length; i < rowsLen; i++) {
                let dataItem = dataSource[i];
                dataItem.attr = Object.assign({}, {selected: false, selectable: true}, dataItem.attr);
                if(dataItem.attr.selected) {
                    selectedNums++;
                }
                rowsStatus.push(dataItem.attr);
            }
            if(!multiSelectable && selectedNums > 1) {
                console.error('multiSelectable为false时, 不允许出现多个行被默认选中!');
            }
        }
        return rowsStatus;
    }
    selectedChange = (row, checked, e) => {
        let newStatus = [];
        if(row === 'all') {
            newStatus = this.setSelectedFalse(checked);
        } else {
            newStatus = [...this.state.rowsStatus];
            if(!this.props.multiSelectable){
                newStatus = this.setSelectedFalse(false);
            }
            newStatus[row].selected = checked;
        }
        this.props.selectedChange(row, checked);
        this.setState({rowsStatus: newStatus});
    }
    setSelectedFalse(checked){
        const newStatus = [];
        for(let i = 0, rowsLen = this.state.rowsStatus.length; i < rowsLen; i++) {
            let status = this.state.rowsStatus[i];
            if(status.selectable){
                status.selected = checked;
            }
            newStatus.push(status);
        }
        return newStatus;
    }
    getSelectedRows() {
        const selectedRows = [];
        for(let i = 0, rowsLen = this.state.rowsStatus.length; i < rowsLen; i++) {
            let status = this.state.rowsStatus[i];
            if(status.selected){
                selectedRows.push(i);
            }
        }
        return selectedRows;
    }
    getHeader() {
        const {columns,dataSource, selectable, multiSelectable, prefixCls} = this.props;
        let tempColumns = [];
        if (!columns[0]) {
            return null;
        } else if (Array.isArray(columns[0])) {
            tempColumns = [...columns];
        } else {
            tempColumns[0] = [...columns];
        }
        const headerTr = [];
        let selectableAll = true;
        if(this.state.rowsStatus.length > 0) {
            for(let i = 0, rowsLen = this.state.rowsStatus.length; i < rowsLen; i++) {
                let status = this.state.rowsStatus[i];
                if(status.selectable && !status.selected){
                    selectableAll = false;
                    break;
                }
            }
        } else {
            selectableAll = false;
        }
        for (let i = 0, trLen = tempColumns.length; i < trLen; i++) {
            let headerTh = [];
            //全选
            if(i === 0 && selectable) {
                headerTh.push(<th key={'th-checkbox-all'} className={`${prefixCls}-checkbox`} rowSpan={tempColumns.length}><Checkbox onChange={(checked, e)=>this.selectedChange('all', checked, e)} checked={selectableAll} disabled={!multiSelectable}/></th>);
            }
            for (let j = 0, thLen = tempColumns[i].length; j < thLen; j++) {
                let thData = tempColumns[i][j];
                thData.attr = thData.attr || {};
                headerTh.push(<th key={'th-' + j} style={{textAlign: thData.align, width: thData.width}} colSpan={thData.colSpan} data-attr={JSON.stringify(thData.attr)}>{thData.title}</th>);
            }
            headerTr.push(<tr key={'tr-'+i}>{headerTh}</tr>);
        }
        return (
            <thead>
            {headerTr}
            </thead>
        )
    }

    getTbody() {
        const {columns, dataSource, selectable, multiSelectable, prefixCls} = this.props;
        let dataSourceField = this.props.dataSourceField;
        if (!dataSourceField) {
            if (Array.isArray(columns[0])) {
                dataSourceField = columns[columns.length - 1] as Array<HeaderTrProps>;
            } else {
                dataSourceField = columns as Array<HeaderTrProps>;
            }
        }
        const tbodyTr = [];
        for (let i = 0, dataLen = dataSource.length; i < dataLen; i++) {
            let tempData = dataSource[i];
            tempData['attr'] = tempData['attr'] || {};
            let tbodyTd = [];
            if(selectable) {
                let tdSelectable = this.state.rowsStatus[i].selectable;
                let tdSelected = this.state.rowsStatus[i].selected;
                tbodyTd.push(<td key={'td-checkbox-'+i} className={`${prefixCls}-checkbox`}><Checkbox onChange={(checked, e)=>this.selectedChange(i, checked, e)} checked={tdSelected} disabled={!tdSelectable}/></td>)
            }
            for (let j = 0, indexLen = dataSourceField.length; j < indexLen; j++) {
                let field = dataSourceField[j].field;
                let content = dataSourceField[j].content as Function || function (item, index, field) {
                            return item[field];
                        }
                tbodyTd.push(<td key={'td-' + j} data-attr={JSON.stringify(tempData['attr'])}>{content(tempData, i, field)}</td>);
            }
            tbodyTr.push(<tr key={'tr-'+i}>{tbodyTd}</tr>);
        }
        return (
            <tbody>
            {tbodyTr}
            </tbody>
        )

    }

    render() {
        const {prefixCls, className, fixedHeader, style, width, height} = this.props;
        const tableClass = classNames({
            [`${prefixCls}`]: true,
            [className]: true,
        })
        const header = this.getHeader();
        const tbody = this.getTbody();
        return (
            <div className={tableClass} style={Object.assign({},style, {height: height})}>
                {fixedHeader ?
                    <div style={{width: width}}>
                        <table>
                            {header}
                        </table>
                        <div>
                            <table>
                                {tbody}
                            </table>
                        </div>
                    </div>
                    :
                    <table style={{width: width}}>
                        {header}
                        {tbody}
                    </table>
                }
            </div>
        )
    }
}

export default Table;