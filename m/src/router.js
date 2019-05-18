import Vue from 'vue'
import Router from 'vue-router'
//引入 单页面组件
import Home from './views/main/Home.vue'
import About from './views/main/About.vue'
import Archives from './views/main/Archives.vue'
import Categories from './views/main/Categories.vue'
import Article from './views/main/Article.vue'
import ArticleList from './views/main/ArticleList.vue'
import Featured from './views/main/Featured.vue'
Vue.use(Router)

export default new Router({
  routes: [
    //  主页
    {
      path: '/',
      name: 'home',
      component: Home
    },
    //  关于页面
    {
      path: '/about',
      name: 'about',
      component: About
    },
    //  归档页面
    {
      path: '/archives',
      name: 'archives',
      component: Archives
    },
    //  分类页面
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    //  文章详情
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    // 分类下文章
    {
      path: '/articleList',
      name: 'articleList',
      component: ArticleList
    },
    // 精选文章
    {
      path: '/featured',
      name: 'featured',
      component: Featured
    },
  ]
})
