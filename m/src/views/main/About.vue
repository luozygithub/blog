<template>
    <div class="about">
        <!--头部-->
        <Header :author="author" :subContent="subContent" :headerBG="headerBG" title="About"></Header>
        <main></main>
        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
    //引入组件
    import Header from '@/components/Header.vue'
    import Footer from "../../components/Footer"
    //引入图片资源
    import headerBG from '../../assets/Iron-Man-3.jpg'
    export default {
        name: "About.vue",
        //引入组件
        components: {
            Header,
            Footer
        },
        //数据
        data(){
            return {
                //头部信息
                subContent:`Beauty at low temperatures is beauty `,
                author:`——Joseph Brodsky`,
                headerBG: headerBG
            }
        },
    }
</script>

<style scoped lang="scss">
    .about{
        main{
             min-height: 3.6rem;
        }
    }
    /*不用scope 修改mint-ui样式*/
    /*搜索部分*/
    .mint-searchbar{
        background-color: rgba(99, 99, 99, 0.11) !important;
    }
    .mint-searchbar-cancel{
        color:#666!important;
    }
    /*把遮挡取消*/
    .mint-search-list{
        position: static!important;
        overflow: visible!important;
    }
</style>