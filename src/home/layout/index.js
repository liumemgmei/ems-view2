import React from 'react';
import Layout from './components/Layout';
import effects from './effects';
import services from './services';
export default {
  state: {},
  effects: {
    $getInfo() {
      console.log('this',this,this.updateState);
      // const data = await services.getInfo();
      // this.updateState(data);
    }
  },
  render() {
    return <Layout />;
  },
  onInit() {
    //获取用户的登录信息
    this.store.dispatch({
      type: '$getInfo',
    })
  },
};