import React, { useState, useEffect} from 'react';
import {Link, Redirect, Route, connect} from 'nuomi';
import { Menu, Icon, Button } from 'antd';
import routes from '../../../public/routes';
const { SubMenu } = Menu;


const Layout = (props) => {
  let theme = localStorage.getItem('theme') || 'mint-green';
  const [show,setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(()=>{
    import('../../../../public/style/theme/'+theme).then(res=>{
      setShow(true);
    });
  },[theme]);
  const { username, loadings } = props;
  return  loadings.$getInfo === true ? (
    '正在初始化...'
  ) :(
    <div style={{display: show?'flex':'none'}} className="g-wh100">
      <div style={{flexBasis: '18.3em', flexShrink:0}} className="menucon">
      <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={[]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1">
            <Link to='/home/customer'>
              <Icon type="pie-chart" />
              <span>客户管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/home/ledger'>
              <Icon type="desktop" />
              <span>台账管理</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>电价管理</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>权限管理</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
      <div style={{flexGrow:'1', display:'flex', flexDirection:'column'}}>
        <div style={{flexBasis:'52px' }}>
            <div className="e-mt20 e-ml20">客户管理</div>
        </div>
        <div style={{flexGrow: 1}}>
            <div className='box'>
              {/* <Redirect to="/home/customer" /> */}
              {routes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};
export default connect(({ username, loadings }) => ({ username, loadings }))(Layout);
