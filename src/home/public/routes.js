export default [
  {
    path:'/home/customer',
    async: () => import('../pages/customer'),
  },
  {
    path:'/home/ledger',
    async: () => import('../pages/ledger'),
  },
]