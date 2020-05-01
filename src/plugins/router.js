import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Foo = { template: '<div><h1>FOO</h1></div>' }
const Bar = { template: '<div><h1>BAR</h1></div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
})

export default router;