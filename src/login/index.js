import React from 'react';
import Layout from './components/Layout';
import services from './services';
import { router } from 'nuomi';

export default {
  id: 'login',
  state: {
    username: '',
    password: ''
  },
  effects:{
    async $login() {
      try {
        const { username, password } = this.getState();
        await services.login({ username, password });
        sessionStorage.setItem('isLogin', 1);
        router.location('/home');
      } catch (e) {
        if (e.status === 300) {
          window.alert(e.message);
        }
      }
    }
  },
  render() {
    return <Layout />;
  },
  onInit() {},
};