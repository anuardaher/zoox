import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/estados'
  },
  {
    path: '/estados',
    name: 'Estados',
    component: Index,
    props: {path: 'estados'}
  },
  {
    path: '/estados/:action/:id?',
    name: 'Estado Detalhes',
    component: () => import('../views/Details.vue'),
    props: {path: 'estados'}
  },
  {
    path: '/cidades',
    name: 'Cidades',
    component: Index,
    props: {path: 'cidades'}
  },
  {
    path: '/cidades/:action/:id?',
    name: 'Cidade Detalhes',
    component: () => import('../views/Details.vue'),
    props: {path: 'cidades'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
