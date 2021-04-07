import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      authPage: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      authPage: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const isLoggedIn = () => {
  if (localStorage.getItem("token")) return true;
  return false;
};

router.beforeEach((to, from, next) => {
  if (!to.meta.authPage && !isLoggedIn()) {
    next({
      path: "/register",
    });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.authPage && isLoggedIn()) {
    next({
      path: "/",
    });
  } else {
    next();
  }
});

export default router
