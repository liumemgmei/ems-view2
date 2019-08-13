// import mock from './mock';
import mock from './mock';
import createServices from '../../public/js/createServices';
export default createServices({
  login: 'http://ems.wankeauto.com/node/login/captcha:get',
  // ...mock,
});