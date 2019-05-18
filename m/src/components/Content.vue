<template>
  <div class="content">
    <!-- 调用数据 -->
    <!--每篇文章预览-->
    <div class="post-preview">
      <router-link :to="{path:'/article',query: {id: content._id,fromFeature: fromFeature}}">
        <!--标题-->
        <h2 class="post-title">{{content.title}}</h2>
      </router-link>
      <!--文章 时间等信息-->
      <div class="post-preview-info">
        <span class="time">发布：{{content.addTime | dealTime}}</span>
        <span class="classify">分类：碎碎念</span>
        <span class>浏览：{{content.views}}</span>
      </div>
      <!--副标题-->
      <h4 class="subhead">{{content.description}}</h4>
      <!--内容预览 内容提取前一部分显示-->
      <div class="post-content-preview">
        <div class="content-pre">{{content.content}}</div>
      </div>
      <!-- 调用数据 -->
    </div>
     <div class="boxShadow"></div>
  </div>
 
</template>
<script>
export default {
  name: "Content",
  props: ["content","fromFeature"],
  filters: {
    dealTime: function(time) {
      return time.substring(0, 10);
    }
  },
  methods: {
    selectContent() {
      this.$http
        .post("http://localhost:8088/api/content/select")
        .then(response => {
          let res = response.data;
          console.log("select res");
          console.log(res);
          this.contents = res;
        })
        .catch(reject => {
          console.log(reject);
        });
    }
  },
  created() {
  }
};
</script>
<style scoped lang="scss">
/*内容部分*/
.content {
  /*每篇文章预览*/
  .post-preview {
    padding: 0.2rem 0.2rem;
    /*标题*/
    .post-title {
      padding: 0.1rem 0.05rem;
    }
    // 文章信息
    .post-preview-info {
      padding: 0.05rem 0.08rem;
    }
    // 副标题
    .subhead {
      padding: 5px;
      border-bottom: 0.3px solid rgba(67, 0, 155, 0.363);
    }
    // 文章预览
    .post-content-preview {
      padding-top: 6px;
      .content-pre {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 7;
        overflow: hidden;
      }
    }
  }
  border-bottom: 1px solid rgba(102, 102, 102, 0.014);
  .boxShadow {
    width: 100%;
    height: 1px;
    box-shadow: 3px 5px 5px rgba(1, 139, 202, 0.555);
  }
}
</style>
