import { Layout, Menu, Icon } from 'antd';
import * as React from 'react';
import './App.css'
import 'antd/dist/antd.css';
import { Link, BrowserRouter ,Switch,Route} from 'react-router-dom'
import {OrderListPage} from'./OrderListPage'
import {UserListPage} from './UserListPage'
import { UserDetailPage } from './UserDetailPage';


const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">订单列表</span>
              <Link to="/order/list"/>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">用户列表</span>
              <Link to="/user/list"/>
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              <Switch>
                <Route path="/order/list" component={OrderListPage} />
                <Route path="/user/list" component={UserListPage} />
                <Route path="/user/detail/:username" component={UserDetailPage} />
              </Switch>
            </div>
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      </BrowserRouter>
    );
  }
}



export default App;
