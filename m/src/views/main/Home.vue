<template>
  <div class="blog">
    <!--头部-->
    <Header :author="author" :subContent="subContent" :headerBG="headerBG" title="Home"></Header>
    <!--内容部分-->
    <!--内容部分-->
    <template v-for="(content,index) in contents" v-key="index">
      <Content :content="content" :class="{'post-preview':true, animated:true, bounceInLeft:animate,bounceInDown:!animate}" fromFeature="0"></Content>
    </template>
    <!-- 返回顶部 -->
    <BackTop class="backtop"></BackTop>
    <!-- 分页组件 传递当前是第几页，总页数；传递要执行的方法 -->
    <Pagination :currentPage="page" :pages="pages" v-on:selectContent="dealSelect"/>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
//引入组件
import Header from "@/components/Header.vue";
import Content from "@/components/Content.vue";
import BackTop from "../../components/BackTop";
import Pagination from "../../components/Pagination"
import Footer from "../../components/Footer"
//图片当做资源引入
import headerBG from "../../assets/home-bg-dark.jpeg";
export default {
  name: "Home.vue",
  components: {
    Header,
    Content,
    BackTop,
    Pagination,
    Footer
  },
  data() {
    return {
      //头部信息
      subContent: `Admire those who admire others`,
      author: `——Simon Sinek`,
      headerBG: headerBG,
      //内容部分
      contents: [],
      count:0,//共有多少文章
      page:0,//当前页 默认第一页开始
      pages:0,//总页数
      animate:true,//动作
    };
  },
  methods: {
    // 处理分页组件 触发方法
    dealSelect(page){
      this.animate = !this.animate
      this.$http
        .get("http://localhost:8088/select",{
          params:{
            page:page
          }
        })
        .then(response => {
          let res = response.data;
          console.log("select res");
          console.log(res);
          this.contents = res.content;
          this.page = res.page
          this.count = res.count;
          this.pages = res.pages
        })
        .catch(reject => {
          console.log(reject);
        });
    
    },
    // 一开始调用数据
    selectContent() {
      this.$http
        .get("http://localhost:8088/select",{
          params:{
            page:this.page
          }
        })
        .then(response => {
          let res = response.data;
          console.log("select res");
          console.log(res);
          this.contents = res.content;
          this.page = res.page
          this.count = res.count;
          this.pages = res.pages
        })
        .catch(reject => {
          console.log(reject);
        });
    }
  },
  mounted: function() {
    this.selectContent();
  }
};
</script>

<style scoped lang="scss">

.blog {
  overflow: hidden;
}
/*内容部分*/
.content {
  /*每篇文章预览*/
  .post-preview {
    padding: 0.2rem 0.2rem;
    /*标题*/
    .post-title {
      padding: 0.1rem 0.05rem;
    }
    .post-preview-info {
      padding: 0.05rem 0.08rem;
    }
  }
}
// 返回顶部
.backtop {
  position: fixed;
  right: 0.3rem;
  bottom: 0.4rem;
}
//翻頁
.pagination {
  margin: 30px 10px 0;
  padding-bottom: 30px;
  text-align: center;
  .prev,
  .next,
  .page-number {
    display: inline-block;
    margin-left: 10px;
    padding: 5px 10px;
    transition-property: border-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    margin-bottom: 10px;
    border-top: 0;
    border-bottom: 1px solid #eee;
  }
  .prev,
  .next {
    display: inline-block;
    font-size: 20px;
  }
  // 当前
  .current {
    background: #eee;
    color: white;
  }
}
</style>