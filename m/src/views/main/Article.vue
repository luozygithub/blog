<template>
  <div class="article">
    <header>
      <div class="nav">
        <!--头部导航brand-->
        <div class="navbar-brand">
          <a href="/">LD Tech</a>
        </div>
        <ButtonSet></ButtonSet>
      </div>
      <!--标题-->
      <h1 class="title">{{article.title}}</h1>
    </header>
    <div class="content">
      <!--日期-->
      <div class="date animated bounceInLeft">
        {{article.addTime}}
        <!-- 作者 -->
        <div class="author" style="float:right">{{article.author?article.author.username:''}}</div>
      </div>
      <div class="articleContent">
        <mavonEditor
          style="z-index:0"
          :subfield="false"
          :toolbarsFlag="false"
          defaultOpen="preview"
          v-model="article.content"
        />
      </div>
    </div>
    <BackTop class="backtop"></BackTop>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 引入组件
import ButtonSet from "../../components/ButtonSet";
import BackTop from "../../components/BackTop";
import Footer from "../../components/Footer"
//引入markdown编译器
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "Article.vue",
  components: {
    ButtonSet,
    mavonEditor,
    BackTop,
    Footer
  },
  data() {
    return {
      article: ""
    };
  },
  methods: {
    changeMavon() {},
    $imgAdd() {},
    // 在内容表中搜索文章
    selectContent() {
      console.log(this.$route.query.id);
      this.$http
        .get("http://localhost:8088/selectOne", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(response => {
          let res = response.data;
          console.log("select res");
          console.log(res);
          this.article = res[0];
          this.article.addTime = this.article.addTime.substring(0, 10); //处理时间
        })
        .catch(reject => {
          console.log(reject);
        });
    },
     //在精选数据库表中 搜索文章
     selectFeatured() {
      console.log(this.$route.query.id);
      this.$http
        .get("http://localhost:8088/featured/selectOne", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(response => {
          let res = response.data;
          console.log("select res");
          console.log(res);
          this.article = res[0];
          this.article.addTime = this.article.addTime.substring(0, 10); //处理时间
        })
        .catch(reject => {
          console.log(reject);
        });
    }
  },
  created() {
    console.log(this.$route.query.fromFeature);
    let fromFeature = 0; //默认是来自主页home 需要单个页面
    if (this.$route.query.fromFeature)
      fromFeature = this.$route.query.fromFeature; //根据需要在那个数据表中搜索设定 判断标志位
    if (fromFeature == 0) {
      this.selectContent();
    }else if(fromFeature == 1){
      this.selectFeatured();
    }
  }
};
</script>

<style scoped lang="scss">
.article {
}
.article header {
  height: 2.3rem;
  background: #3f51b5;
  /*防止按钮动作价款width*/
  overflow: hidden;
  .nav {
    /*导航*/
    display: flex;
    justify-content: space-between;
    /*左侧图标*/
    .navbar-brand {
      padding: 0.26rem;
      a {
        font-weight: bold;
        font-size: 20px;
        color: white;
      }
    }
  }
  /*标题*/
  .title {
    text-align: center;
    margin-top: 0.3rem;
    color: #fff;
  }
}
.article .content {
  .articleContent {
    padding: 20px 8px;
  }
  .date {
    width: 3rem;
    padding: 12px 12px;
    color: #555;
    font-weight: bold;
    font-size: 18px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background: #fff;
    margin-top: -0.25rem;
    margin-left: 0.25rem; //3.5rem布局
    -webkit-box-shadow: 1px 1px 3px #bbb;
    -moz-box-shadow: 1px 1px 3px #bbb;
    box-shadow: 1px 1px 3px #bbb;
  }
}
// 返回顶部
.backtop {
  position: fixed;
  right: 0.3rem;
  bottom: 0.4rem;
}
</style>