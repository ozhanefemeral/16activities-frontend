import Vue from 'vue'
import VueRouter from 'vue-router'
import Memes from '../views/Memes';
import Blogs from '../views/Blogs';
import Panel from "../views/Panel";
import CreateQuiz from "../views/CreateQuiz";
import CreateActivity from "../views/CreateActivity";
import CreateBlog from "../views/CreateBlog";
import CreateMeme from "../views/CreateMeme";
import Activity from "../views/Activity";
import ViewBlog from '../views/ViewBlog';
import TypeSelect from '../views/TypeSelect';
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/type-select',
    name: 'TypeSelect',
    component: TypeSelect
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
    path: '/memes',
    name: 'Memes',
    component: Memes
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
    path: '/panel/create-meme',
    name: 'CreateMeme',
    component: CreateMeme
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

const types = [
  "ENTP", "ENTJ", "INTJ", "INTP", "ESTP", "ESTJ", "ISTP", "ISTJ", "ISFJ", "ISFP", "ESFP", "ESFJ", "ENFJ", "INFJ", "INFP", "ENFP"
]

router.beforeEach((to, from, next) => {
  if (to.name !== 'TypeSelect' && !types.includes(store.state.type)) next({ name: 'TypeSelect' })
  else next()
})

export default router
