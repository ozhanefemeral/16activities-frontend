import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home';
import Blogs from '../views/Blogs';
import Panel from "../views/Panel";
import CreateQuiz from "../views/CreateQuiz";
import CreateActivity from "../views/CreateActivity";
import CreateBlog from "../views/CreateBlog";
import Activity from "../views/Activity";
import ViewBlog from '../views/ViewBlog';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/activities',
    name: 'Activity',
    component: Activity
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/panel',
    name: 'Panel',
    component: Panel
  },
  {
    path: '/panel/create-test',
    name: 'CreateQuiz',
    component: CreateQuiz
  },
  {
    path: '/panel/create-activity',
    name: 'CreateActivity',
    component: CreateActivity
  },
  {
    path: '/panel/create-blog',
    name: 'CreateBlog',
    component: CreateBlog
  },
  {
    path: '/blog/:blogName',
    name: 'ViewBlog',
    component: ViewBlog,
  },
]

const router = new VueRouter({
  routes
})

export default router
