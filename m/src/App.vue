<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view/>
  </div>
</template>

<style>
#app {

}
/*重置样式*/
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,p,form,input,textarea, button{
  margin: 0;
  padding: 0;
}

input,textarea,button,select{
  font-family: "Microsoft Yahei";
  outline: none;
  color: #333;
}

body{
  font-family: "Microsoft Yahei";
  font-size: 14px;
  color: #333;
}

ul,ol,li{
  list-style: none;
}

img{
  border: none;
}

a{
  text-decoration: none;
}

a:focus{
  outline: none;
}

table{
  border-collapse:collapse;
}

.clearfix{
  zoom: 1;
}

.clearfix:after{
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.tl {
  text-align: left;
}

.tc {
  text-align: center;
}

.tr {
  text-align: right;
}

</style>
