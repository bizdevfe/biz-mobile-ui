import * as attachFastClick from 'fastclick';
//attachFastClick['attach'](document.body);
import * as React from 'react';
import request from './request';
import {px2rem, deviceHeight, htmlFontSize} from '../../src/util/util';
import colors from '../../src/styles/colors';
import {
    Button,
    Alert,
    Icon,
    Line,
    Tabs,
    Tab,
    TabBar,
    TabBarItem,
    SegmentedControl,
    LinearProgress,
    Carousel,
    Badge,
    Message,
    Card,
    Switch,
    Checkbox,
    Ellipsis,
    Table,
    Arrow
} from '../../src/index.tsx';
interface AppProps {

}
const slideHeight = px2rem(100);
const styles = {
    tab: {
        backgroundColor: '#ddd',
        minHeight: deviceHeight / htmlFontSize - parseFloat(px2rem(88)) + 'rem',
        overflow: 'hidden',
    },
    seg: {
        width: '90%',
        margin: '20px auto 0',
    },
    slide1: {
        height: slideHeight,
        textAlign: 'center',
        backgroundColor: '#FEA900',
    },
    slide2: {
        height: slideHeight,
        textAlign: 'center',
        backgroundColor: '#B3DC4A',
    },
    slide3: {
        height: slideHeight,
        textAlign: 'center',
        backgroundColor: '#6AC0FF',
    },
    button: {
        marginTop: px2rem(10),
    }
}
export default class App extends React.Component<AppProps, any> {
    state = {selectIndex: 0, progress: 10}
    //isMounted = this.isMounted;
    componentDidMount() {
        let req = request('./getProduct.action').then((res)=> {
            //console.log(res.data, this.isMounted());
        });

    }

    showAlertWithTwoBtn(index, value) {
        Alert.alert({title: 'biz', message: value, buttons: [{text: '取消', color: 'grey'}, {text: '确定'}]});
    }

    showAlertWithThreeBtn() {
        Alert.alert({
            title: 'biz-kcfe',
            message:<span>hello bizmolejj<br/>快去更新!</span>,
            buttons: [{text: '取消'}, {text: '确定'}, {text: '吐槽', color: 'red'}]
        });
    }

    showAlertConfirm() {
        Alert.confirm({title: '请输入用户名', defaultValue: 'tjz', onTouchTap: this.showAlertWithTwoBtn});
    }

    onTabChange(index, fromIndex) {
        console.log(index, fromIndex);
    }

    changeTabsSelect = ()=> {
        this.setState({selectIndex: 0});
    }

    changeProgress(percent) {
        if (percent < 0) {
            percent = 0;
        } else if (percent > 100) {
            percent = 100;
        }
        this.setState({progress: percent});
    }

    showMessage = () => {
        const messge = Message.error('填写客户名称', 3, ()=> {
            this.changeProgress(80);
        });
    }
    switchChange = (checked) => {
        console.log(checked);
    }

    render() {
        const columns = [
            [
                {title: '实时消耗', colSpan: 10}
            ],
            [
                {title: '地区', field: 'area', width: px2rem(100), attr: {}},
                {title: '名称', field: 'name', width: px2rem(100),  attr: {}, content:
                    function (item, index, field) {
                        return <div>{item.area}<br/>{item.name}</div>;
                    }
                },
                {title: '消耗', field: 'cost',  attr: {test: 'cost',}, align: 'left'},
                {title: '环比', field: 'subCost',  attr: {test: 'subCost',}, align: 'left'},
                {title: '消耗', field: 'cost',  attr: {test: 'cost',}, align: 'left'},
                {title: '环比', field: 'subCost', attr: {test: 'subCost',}, align: 'left'},
                {title: '消耗', field: 'cost', width: px2rem(100),  attr: {test: 'cost',}, align: 'left'},
                {title: '环比', field: 'subCost', width: px2rem(100),  attr: {test: 'subCost',}, align: 'left'},
                {title: '消耗', field: 'cost', width: px2rem(100),  attr: {test: 'cost',}, align: 'left'},
                {title: '环比', field: 'subCost', width: px2rem(100),  attr: {test: 'subCost',}, align: 'left'}
            ]
        ];
        const data = [{
            area: '北京',
            name: '搜狗',
            cost: '1298,23',
            subCost: '-12',
            attr:{
                selected: true,
            }
        }, {
            area: '上海',
            name: '搜狐',
            cost: '90.23',
            subCost: '+98',
            attr:{
                selectable: false,
               // selected: true,
            }
        }, {
            area: '广州',
            name: '搜猫',
            cost: '1765,12.34983773666626227727',
            subCost: '--',
            attr:{
                selected: true,
            }
        },{
            area: '北京',
            name: '搜狗',
            cost: '1298,23',
            subCost: '-12',
            attr:{
                selected: true,
            }
        }];
        return (
            <TabBar selectedIndex={0} onChangeIndex={this.onTabChange}>
                <TabBarItem label="首页" icon={<Icon type="home" size="2x"/>} badgeContent={21}>
                    <Tabs selectedIndex={this.state.selectIndex} onChangeIndex={this.onTabChange} animation={true}>
                        <Tab label="旭日">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: colors.grey_200})}>
                                <Carousel onChangeIndex={this.onTabChange} autoplay={true} style={{height: 500}}>
                                    <div style={styles.slide1}>slide 1</div>
                                    <div style={styles.slide2}>slide 2</div>
                                    <div style={styles.slide3}>slide 3</div>
                                </Carousel>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    width="200%"
                                    height={px2rem(200)}
                                    selectable
                                />
                                <SegmentedControl onChangeIndex={this.onTabChange} style={styles.seg}
                                                  values={['详情','评论','相关']}/>
                                <SegmentedControl onChangeIndex={this.onTabChange} selectedIndex={1} tintColor='#8E24AA'
                                                  style={styles.seg} values={['详情','评论','相关']}/>
                                <SegmentedControl onChangeIndex={this.onTabChange}
                                                  style={Object.assign({},styles.seg, {width: '80%', height: px2rem(40)})}
                                                  values={['详情','评论']} enabled={false}/>
                                <LinearProgress style={styles.seg}/>
                                <LinearProgress style={Object.assign({},styles.seg,{height: px2rem(15)})}
                                                color="#8E24AA"
                                                fillColor="#FFF"/>
                                <LinearProgress style={styles.seg} mode="determinate" percent={this.state.progress}/>
                                <Button style={Object.assign({},styles.seg, {display: 'block'})}
                                        onTouchTap={()=>this.changeProgress(this.state.progress + 20)}
                                        size="small">+ 20</Button>
                                <Button style={Object.assign({},styles.seg, {display: 'block'})}
                                        onTouchTap={()=>this.changeProgress(this.state.progress - 10)}
                                        size="small">- 10</Button>
                                <Button style={Object.assign({},styles.seg, {display: 'block'})}
                                        onTouchTap={this.showMessage}>
                                    show info Message
                                </Button>
                                <Arrow direction="right"/>
                                <Arrow direction="left"/>
                                <Arrow direction="top"/>
                                <Arrow direction="bottom"/>
                                <Arrow direction="right" color={colors.blue_500} innerColor="#eee"/>
                                <Arrow direction="left" color={colors.blue_500} innerColor="#eee"/>
                                <Arrow direction="top" color={colors.blue_500} innerColor="#eee"/>
                                <Arrow direction="bottom" color={colors.blue_500} innerColor="#eee" size={px2rem(20)}
                                       lineThickness={px2rem(4)}/>
                                <Switch style={{marginTop: px2rem(10)}} onChange={this.switchChange}/>
                                <Switch style={{marginTop: px2rem(10)}} checked disabled onChange={this.switchChange}/>
                                <Checkbox style={{marginTop: px2rem(10)}}
                                          label={<Ellipsis text="你好hello World你好hello World你好hello World你好hello World你好hello World你好hello World你好hello World你好hello World"/>}
                                          disabled checked/>
                                <Checkbox style={{marginTop: px2rem(10)}}
                                          label={<Ellipsis line={2} text="你好hello World你好hello World你好hello World你好hello World你好hello World你好hello World你好hello World你好hello World"/>}/>
                                <Checkbox style={{marginTop: px2rem(10)}}
                                          label={<Ellipsis width={px2rem(200)} line={3} text="你好hello World你好hello World你好hello World你好hello World你好hello World你好hello World你好hello World你好hello World"/>}
                                          checked onChange={this.switchChange}/>

                                <Card style={{marginTop: px2rem(10)}}>
                                    hello World
                                </Card>
                                <Card style={{marginTop: px2rem(10)}} full={true}>
                                    你好
                                </Card>
                            </div>

                        </Tab>
                        <Tab label="晨星">
                            <div style={Object.assign({}, styles.tab)}>
                                <Button style={styles.button} onTouchTap={()=>this.showAlertWithTwoBtn(1,'hahah')}
                                        size="small"><Icon fixedWidth={true}
                                                           type="user-plus"/>showAlertWithTwoBtn</Button>
                                <Button style={styles.button} onTouchTap={this.showAlertConfirm} disabled={true}
                                        size="small"><Icon type="home"/>showAlertConfirm</Button><br/>

                                <Button style={styles.button} onTouchTap={this.showAlertWithThreeBtn}><Icon size="lg"
                                                                                                            type="book"/>showAlert with three button<Icon
                                    type="pencil"/></Button>
                                <Button style={styles.button} onTouchTap={this.showAlertConfirm.bind(this)}><Icon
                                    size="2x" spin={true} type="spinner"/>showAlertConfirm</Button>
                                <Button style={styles.button}
                                        onTouchTap={this.changeTabsSelect}>changeTabsSelect</Button>
                            </div>
                        </Tab>
                        <Tab label="品专">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#009688'})}>world3</div>
                        </Tab>
                        <Tab label="大竞价" badgeContent="99+">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#FFEB3B'})}>world4</div>
                        </Tab>
                        <Tab label="信息流" badgeContent="new">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#9E9E9E'})}>world5</div>
                        </Tab>
                        <Tab label="晨星">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#2196F3'})}>world6</div>
                        </Tab>
                        <Tab label="品专">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#009688'})}>world7</div>
                        </Tab>
                        <Tab label="大竞价">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#FFEB3B'})}>world8</div>
                        </Tab>
                        <Tab label="信息流">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#9E9E9E'})}>world9</div>
                        </Tab>
                    </Tabs>
                </TabBarItem>
                <TabBarItem label="设置" icon={<Icon type="cog" size="2x"/>}>
                    <Tabs selectedIndex={this.state.selectIndex} onChangeIndex={this.onTabChange} animation={true}>
                        <Tab label="旭日">
                            <div style={styles.tab}>world1</div>
                        </Tab>
                        <Tab label="晨星">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#2196F3'})}>world2</div>
                        </Tab>
                        <Tab label="CRM">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#2196F3'})}>world2</div>
                        </Tab>
                    </Tabs>
                </TabBarItem>
                <TabBarItem label="我的" icon={<Icon type="user" size="2x"/>}
                            badgeContent={<span>&sdot;&sdot;&sdot;</span>}>
                    <Tabs selectedIndex={this.state.selectIndex} onChangeIndex={this.onTabChange} animation={true}>
                        <Tab label="旭日">
                            <div style={styles.tab}>world1</div>
                        </Tab>
                        <Tab label="晨星星星星星星">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#2196F3'})}>world2</div>
                        </Tab>
                    </Tabs>
                </TabBarItem>
                <TabBarItem label="我的" icon={<Icon type="user" size="2x"/>} badgeContent="">
                    <Tabs selectedIndex={this.state.selectIndex} onChangeIndex={this.onTabChange} animation={true}>
                        <Tab label="旭日">
                            <div style={styles.tab}>world1</div>
                        </Tab>
                        <Tab label="晨星星星星星星">
                            <div style={Object.assign({}, styles.tab, {backgroundColor: '#2196F3'})}>world2</div>
                        </Tab>
                    </Tabs>
                </TabBarItem>
            </TabBar>
        );
    }
}

