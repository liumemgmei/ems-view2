// import mock from './mock';
import mock from './mock';
import createServices from '../../public/js/createServices';
export default createServices({
  login: '/path/login:post',
  ...mock,
});