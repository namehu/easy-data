export default [
  {
    path: '/',
    name: 'home',
    component:  r => { require(['@/components/Home'], r) },
  },
  {
    path: '/Project/:projectId',
    name: 'project',
    component: r => { require(['@/components/Project'], r) },
  },
]