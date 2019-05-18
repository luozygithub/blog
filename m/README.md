# blog

> 偏重心于前端的校园博客框架

# VUE

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# EXPRESS

1、首先运行mongodb：mongod --dbpath=D:

开启mongodb服务

2、然后再到service下运行node index.js开启后端服务；



## 博客简介

> 移动端blog后台
>
> express 后台框架
>
> cors实现跨域
>
> boder-parser处理数据
>
> 后台端口 地址http://localhost:8088/
>
> 前端端口 地址 http://localhost:8080/#/
>
> 
>
> control： express + nodejs操控mongodb将前端通过api传输过来的数据做处理，借助mongoose 请求mongodb里面的数据。操控mongodb
>
> module：mongodb ：scheme生成collection集合结构=》在module下通过mongoose.model生成对应结构集合
>
> view：vue3.0 作为视图框架展现，通过vue-router路由跳转页面实现SPA单页面web应用，借助axios去请求api获取/传递数据
>
> ，mint-ui作为ui组件库加快开发