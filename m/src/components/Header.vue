<template>
    <header class="animated pulse" :style="{backgroundImage: 'url(' + headerBG  + ')'}">
        <!--头部导航-->
        <nav>
            <!--头部导航brand-->
            <div class="navbar-brand">
                <router-link to="/">LD Tech</router-link>
            </div>
            <!--头部导航按钮-->
            <button-set/>

        </nav>
        <!--signature-->
        <div class="signature">
            <div class="container">
                <h1>{{title}}</h1>
                <div class="subheading">
                    {{subContent}}
                    <br/>
                    <div class="author">{{author}}</div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    import "../../utils/animate.css";
    import ButtonSet from "./ButtonSet.vue";

    export default {
        name: "Header",
        components: {
            ButtonSet
        },
        props:["subContent","author","headerBG","title"],
        data:function(){
            return {

            }
        },
        methods:{
        }
    }
</script>

<style scoped lang="scss">
[v-cloak]{
    display: none
}
header {
    overflow: hidden;
    min-height: 2.50rem;
    background-size:100% 100%;
    background-repeat:no-repeat;
    /*导航*/
    nav{
        display: flex;
        justify-content:space-between;
        .navbar-brand{
            padding: 0.26rem;
            a{
                font-weight: bold;
                font-size: 20px;
                color:white
            }
        }
    }
    /*header sig*/
    .signature{
        .container{
            color:white;
            h1{
                text-align: center;
            }
            .subheading{
                padding:0.1rem 0.3rem;
                text-indent: 30px;
                font-size:18px;
                .author{
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }

}
</style>