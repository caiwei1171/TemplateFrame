import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Layout from '../layout'
const CouponOrder = () => import(/* wepackChunkName: "CouponOrder" */ '../views/order/CouponOrder.vue')

// 防止点击侧边栏报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 使用路由
Vue.use(VueRouter)

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */

const asyncRoutes = [
    {
        path:'',
        name:'OrderMangement',
        component:Layout,
        redirect:'/orderMangement/couponOrder',
        meta:{
            title: '订单管理',
            icon: 'el-icon-s-order'
        },
        children:[
            {path:'/orderMangement/couponOrder',name:'CouponOrder',meta:{title:'代金券订单列表'},component:CouponOrder},
        ]
    }
]

const router = new VueRouter({
    // base:'./',
    // mode:'history',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: asyncRoutes
  })
  
  export default router