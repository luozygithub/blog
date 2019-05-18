<template>
    <div class="categories">
        <Header :author="author" :subContent="subContent" :headerBG="headerBG" title="Categories"></Header>
        <div class="content">
            <section  class="category-list">
                <!-- 精选 -->
                <router-link :to="{path:'/featured'}">
                    <div class="category-item">
                        精选
                    </div>
                </router-link>
                <!-- 其他分类 -->
                <router-link :to="{path:'/articleList',query: {id: category._id}}" v-for="category in categoriesList">
                    <div class="category-item">
                        {{category.name}}
                    </div>
                </router-link>
            </section>
        </div>
        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
    //引入组件
    import Header from '@/components/Header.vue'
    import Footer from "../../components/Footer"
    //引入图片资源
    import headerBG from '../../assets/tag-bg-lite.jpeg'
    export default {
        name: "Categories",
        //引入组件
        components: {
            Header,
            Footer
        },
        data(){
            return {
                //头部信息
                subContent:`apply to get into your life. `,
                author:``,
                headerBG: headerBG,
                // 页面信息
                categoriesList:[],
            }
        },
        methods:{
            //获取分类数据
            getCategories(){
                this.$http.get('http://localhost:8088/categories/')
                    .then((response) => {
                        let res = response.data
                        console.log("find categories success")
                        console.log(res)
                        this.categoriesList = res.categories;

                    })
                    .catch((reject) => {
                        console.log('error')
                        console.log(reject)
                    })
            }
        },
        created(){
            this.getCategories();
        }
    }
</script>

<style scoped lang="scss">
    .categories .content{
        display: flex;
        justify-content: center;
        min-height: 3.6rem;//撑起高度
    }
    .categories .content .category-list{
        padding: 0.2rem 0.3rem 0;
        width: 3rem;
    }
    .categories .content .category-list .category-item{
        float: left;
        font-size:16px;
        color:#555;
        padding: 8px 14px;
        box-shadow:1px 1px 5px #666;
        margin-right: 10px;
        margin-top:14px;
    }
    .categories .content .category-list .category-item:hover{
        color: #111;
        box-shadow:1px 1px 5px #111;
    }
</style>