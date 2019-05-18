<template>
    <div class="archives">
        <Header :author="author" :subContent="subContent" :headerBG="headerBG" title="Archives"></Header>
        <div class="content">
            <!--搜索功能-->
            <mt-search class="search" v-model="searchValue" @input="search"></mt-search>

            <div class="tianchong"></div>
            <!--是搜索过来的不显示这个-->
            <p class="count">共{{contentList.length}}篇文章</p>
            <section  v-for="(content,index) in contentList">
                <!-- 年份 -->
                <h2 v-if="content.year">{{content.year}}</h2>
                <!-- 每年下内容 -->
                <router-link :to="{path:'/article',query: {id: content._id}}">
                    <article class="active bounce">
                        <div class="artCon">
                            <span class="colInfo">{{myformatter(new Date(content.addTime))}}</span>
                            <span class="colTitle">{{content.title}}</span>
                        </div>
                    </article>
                </router-link>
            </section>
        </div>
        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
    //引入组件
    import { Search } from 'mint-ui';

    import Header from '@/components/Header.vue'
    import Footer from "../../components/Footer"
    //引入图片资源
    import headerBG from '../../assets/archive-bg-lite.jpeg'
    export default {
        name: "Archives.vue",
        //引入组件
        components: {
            Header,
            Search,
            Footer
        },
        data(){
            return {
                //头部信息
                subContent:`Don't let's ask for the moon.We have the stars. `,
                author:`——Now Voyager`,
                headerBG: headerBG,
                //搜索信息
                searchValue:'',
                // 本页面信息
                contentList:[]
            }
        },
        methods:{
            //获取文章
            getContent:function(){
                this.$http.get('http://localhost:8088/archives/')
                    .then((response) => {
                        let res = response.data
                        console.log("select content success")
                        console.log(res)
                        let addTime = '';
                        res.contents.forEach((item)=>{//根据年变化来定义不同年：每次出现新的年份赋值给头一个
                            // 数据库读取出来的时间格式不能直接操作，需要先转化成 字符串
                            let temp = new Date(item.addTime + '');
                            if(temp.getFullYear() != addTime){
                                item.year = temp.getFullYear();
                            }else{
                                item.year = '';
                            }
                            //获取年份
                            addTime =  temp.getFullYear();
                        })
                        this.contentList = res.contents;

                    })
                    .catch((reject) => {
                        console.log('error')
                        console.log(reject)
                    })
            },
            //搜索
            search(){
                let timer = {}
                clearTimeout(timer);
                timer= setTimeout(()=> {
                    this.$http.get('http://localhost:8088/archives/search',{
                        params:{
                            title: this.searchValue,
                        }
                    }).then((response) => {
                        let res = response.data
                        console.log("search content success")
                        console.log(res)
                        let addTime = '';
                        res.contents.forEach((item)=>{//根据年变化来定义不同年：每次出现新的年份赋值给头一个
                            // 数据库读取出来的时间格式不能直接操作，需要先转化成 字符串
                            let temp = new Date(item.addTime + '');
                            if(temp.getFullYear() != addTime){
                                item.year = temp.getFullYear();
                            }else{
                                item.year = '';
                            }
                            //获取年份
                            addTime =  temp.getFullYear();
                        })
                        this.contentList = res.contents;

                    }).catch((reject) => {
                        console.log('error')
                        console.log(reject)
                    })
                },800)
            },
            //    处理时间
            myformatter(date){
                // var strDate = date.getFullYear()+"-";
                var strDate = date.getMonth()+1+"-";
                strDate += date.getDate()+" ";
                // strDate += date.getHours()+":";
                // strDate += date.getMinutes()+":";
                // strDate += date.getSeconds();
                return strDate ;
            }
        },
        created(){
            this.getContent();
        }
    }
</script>

<style scoped lang="scss">
    .archives{
        /*内容部分*/
        .content{
            /*flex布局*/
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-bottom:0.7rem;//留出底部距离
            min-height: 3.2rem;//撑起高度
            /*搜索*/
            .search{
                width: 100%;
                height: 0.62rem;

            }
            /*内容*/
            section{
                width: 3rem;
                .count{
                    color:#555;
                }
                h2{

                }
                /*内容下每个*/
                article{
                    font-size:16px;
                    color:#555;
                    padding: 0.1rem 0.2rem;
                    margin-top:12px;
                    -webkit-box-shadow: 1px 1px 5px  #eee;
                    -moz-box-shadow: 1px 1px 5px  #eee;
                    box-shadow: 1px 1px 5px  #eee;
                    .artCon{
                        border-bottom: 1px dashed #999;
                        .colTitle{
                            padding-left:10px;
                        }
                    }
                }
                article:hover .artCon{
                    border-bottom: 1px dashed #000;
                }
            }
        }
    }
</style>