import * as React from 'react';

import { Pagination,Table, Button,Divider, Tag, Drawer,Row,Col} from 'antd';
import {DrawerProps} from 'antd/lib/drawer'
import {ColumnProps,TableProps} from 'antd/lib/table'
import Column from 'antd/lib/table/Column';
import { throws } from 'assert';
import { HttpClient } from './common/HttpClient';

interface IOrderRecord{
  orderNo: string,
  userName: string,
  createTime: string,
  address: string,
  expressCompany: string,
  phoneNo: string
}

interface IPageProps extends ColumnProps<any> {
  items: any[],
  currentItem: any,
}

interface IPageState extends DrawerProps {
  pageNo: number,
  pageSize: number,
  totalCount: number,
  items: IOrderRecord[],
  currentOrder: IOrderRecord,
  lastPageSize: number,
  lastPageNo: number,
  lastTotalCount: number,
}

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

export class OrderListPage extends React.Component<IPageProps,IPageState>{

  constructor(){
    super({items:null,currentItem:{}})
    this.state = {
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      lastPageSize: 0,
      lastPageNo: 0, 
      lastTotalCount: 0,
      visible: false,
      items:[],
      currentOrder:{ 
        orderNo: "",
        userName: "",
        createTime: "",
        address: "",
        expressCompany: "",
        phoneNo: ""
      }
    }
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.showDetail = this.showDetail.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
    
  }

  public componentDidMount(){
    console.log("componentDidMount is called")
  }

  public onPageChange(page: number, pageSize?: number){
    console.log("on page change invoked")
    this.changePageInfo(page,pageSize)
  }

  public onShowSizeChange(c :number, p :number) {
    console.log("on show size change invoked")
    this.changePageInfo(c,p)
  }

  public changePageInfo(current :number, pageSize? :number){
    console.log(current, pageSize);
    Object.assign({},this.state)
    this.setState({
      pageNo: current,
      pageSize: pageSize || 10
    })
    
  }

  public onRowClick(record: IOrderRecord, index: number, event: Event){
    console.log(record,index,event)
  }

  public showDetail(event:any){
    const orderNo : string = (event.target.attributes.href.textContent as string).substr(1)
    
    // for (const d of data){

    //   if(orderNo === d.orderNo){
        
    //     this.setState({
    //       visible : true,
    //       currentOrder : d,
    //     })
    //     break;
    //   }
    // }
    
  }

  public renderColumn(text: any, record: IOrderRecord, index: number) {
    return <span>
            <a href={"#"+record.orderNo} onClick={this.showDetail}>详情</a>
            <Divider type="vertical" />
            <a href={"#"+record.orderNo} >编辑</a>
            <Divider type="vertical" />
            <a href={"#"+record.orderNo} >新增</a>
            <Divider type="vertical" />
            <a href={"#"+record.orderNo} >删除</a>
          </span>
  }

  public onDrawerClose = () =>{
    this.setState({
      visible: false,
    });
  }

  public checkPageStateChange():boolean {
    if( this.state.lastPageNo === this.state.pageNo 
      && this.state.lastPageSize === this.state.lastPageSize){
        console.log("page state didn't changed")
        return false
    }
    console.log("page state has changed")
    return true;
    
  }

  public render(){

    console.log("render() is invoked ")
    // console.log(this.state);
    // console.log(this.total)
    // console.log(this.items)
    if(this.checkPageStateChange()){
        const json = {"orderNo":"OrderNo123","phoneNo":"18911792314","pageNo":this.state.pageNo,"pageSize":this.state.pageSize}
        HttpClient.PostJson("http://localhost:8090/manage/sale/order/list",json)
        .then(response => {
          if(response.headers.get("content-type") === "application/json;charset=UTF-8") {
            return response.json().then(JsonData => {
              this.setState({
                items: JsonData.data.items,
                totalCount: JsonData.data.total,
                lastPageNo: this.state.pageNo,
                lastPageSize: this.state.pageSize
              })
            });
          } else {
            console.log("Oops, we haven't got JSON!");
            return null
          }
        })
        .catch(

        )
        
    }
        
    return (
    <div>
      <Table pagination={false} dataSource={this.state.items} rowKey="orderNo">
        <Column title="订单编号" dataIndex="orderNo" key="orderNo"/>
        <Column title="下单时间" dataIndex="createTime" key="createTime"/>
        <Column title="配送地址" dataIndex="address" key="address"/>
        <Column title="快递公司" dataIndex="expressCompany" key="expressCompany"/>
        <Column title="手机号" dataIndex="phoneNo" key="phoneNo"/>
        <Column title="联系人" dataIndex="userName" key="userName"/>
        <Column title="详情" dataIndex="detail" key="detail" render={this.renderColumn}/>
      </Table>
      <Pagination style={{marginTop:10}} 
        showSizeChanger={true} 
        onShowSizeChange={this.onShowSizeChange} 
        onChange={this.onPageChange}
        current={this.state.pageNo}
        total={this.state.totalCount} />
        <Drawer
          title={`订单${this.state.currentOrder.orderNo}明细`}
          placement="right"
          closable={false}
          onClose={this.onDrawerClose}
          visible={this.state.visible}
          width={640}
        >
          <Row>
            <Col span={12}>
              <DescriptionItem title="订单编号" content={this.state.currentOrder.orderNo} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="联系人" content={this.state.currentOrder.userName} />
            </Col>
          </Row>
        </Drawer>
    </div>
    )
  }
}