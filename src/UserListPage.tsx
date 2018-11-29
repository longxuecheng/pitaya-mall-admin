import * as React from 'react';

import { Pagination,Table, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';

const columns = [{
  dataIndex: 'name',
  key: 'name',
  
  render: (text :any )=> <a href="javascript:;">{text}</a>,
  
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: (tags :any) => (
    <span>
      {tags.map((tag :any) => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (record :any) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      {/* <a href="">Delete</a> */}
      <Link to={"/user/detail/"+record.name}>详情</Link>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

interface IListState {
  pageSize: number,
  totalPage: number,
  totalCount: number,
  offset: number,
  currentPage: number
}

export class UserListPage extends React.Component<{},IListState>{

  constructor(){
    super({})
    this.state = {
      pageSize:10,
      totalPage:0,
      totalCount:100,
      offset:0,
      currentPage:1
    }
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  public componentDidMount(){
    console.log("Now state [currentPage] :"+this.state.currentPage+" [Page size]:"+this.state.pageSize);
  }

  public onChange(page: number, pageSize?: number){
    console.log(page,pageSize)
    this.changePageInfo(page,pageSize)
  }

  public onShowSizeChange(c :number, p :number) {
    console.log(c, p);
    this.changePageInfo(c,p)
  }

  public changePageInfo(c :number, p? :number){
    this.setState({
      currentPage: c,
      pageSize: p || 10
    })
    console.log("this.state = "+this.state)
  }

  public render(){

    return (
    <div>

      <Table pagination={false} columns={columns} dataSource={data} />
      <Pagination style={{marginTop:10}} 
        showSizeChanger={true} 
        onShowSizeChange={this.onShowSizeChange} 
        onChange={this.onChange}
        defaultCurrent={this.state.currentPage} 
        total={this.state.totalCount} />
    </div>
    )
  }
}