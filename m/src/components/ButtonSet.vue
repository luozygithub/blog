<template>
    <div class="navbar-toggle">
        <button class="menu"  @click="menuBtn">
            <img src="../assets/menu.png" height="20" width="20" slot="icon">
        </button>
        <!--menu-->

        <div  v-show="!hideMenu" :class='{menuList:true,animated:true,zoomInLeft:isMenuList,zoomOutRight:!isMenuList}  '>
            <router-link to="/"><b class="menuItem">HOME</b></router-link>
            <router-link to="/about"><b class="menuItem">ABOUT</b></router-link>
            <router-link to="/archives"><b class="menuItem">ARCHIVES</b></router-link>
            <router-link to="/categories"><b class="menuItem">CATEGORIES</b></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ButtonSet",
        data:function(){
            return {
                //memu是否显示
                isMenuList:false,
                //开始menu不显示
                hideMenu:true
            }
        },
        methods:{
            menuBtn:function(){
                this.isMenuList = !this.isMenuList;
                this.hideMenu = false;
            }
        },
        // mounted(){
        //     this.menuBtn.bind(this)
        // }
    }
</script>

<style scoped lang="scss">
    .navbar-toggle{
        position: relative;
        padding: 0.08rem;
        button{
            position: relative;
            border-color: transparent;
            padding: 19px 16px;
            border-radius: 50%;
            border: 1px solid transparent;
            background-color: inherit;
            cursor: pointer;
        }
        button:focus {
            outline: 0;
        }
        button::selection {
            color: white;
            text-shadow: none;
            background: #0085a1;
        }
        /*menu*/
        .menuList{
            width: 1.4rem;
            height: 1.6rem;
            position: absolute;
            z-index: 10;
            top: 0.6rem;
            right: 0.24rem;
            background: rgba(253, 253, 253, 0.9);
            text-align: center;
            border-radius: 5px;
            padding-top: 0.1rem;
            .menuItem{
                display: block;
                font-size:16px;
                padding-top:0.08rem;
                padding-bottom: 0.08rem;
            }
        }
    }
</style>