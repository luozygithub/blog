<template>
    <nav class="pagination">
      <div class="prev" @touchstart="pageToPrev" v-if="currentPage>1">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="page-number" @touchstart="pageToPrev" v-if="currentPage>1">{{currentPage-1}}</div>

      <span class="page-number current">{{currentPage}}</span>
      <div class="page-number" @touchstart="pageToNext" v-if="currentPage < pages">{{currentPage+1}}</div>

      <div class="next"  @touchstart="pageToNext" v-if="currentPage < pages">
        <i class="fa fa-angle-right"></i>
      </div>
    </nav>
</template>
<script>
export default {
    props: ['currentPage','pages'],
    data:function(){
        return {

        }
    },
    craeted(){
    },
    methods:{
        pageToPrev(){
            console.log("prev")
            this.$emit('selectContent',this.currentPage - 1)
        },
        // 跳到下一页
        pageToNext(){
            console.log("next")
            this.$emit('selectContent',this.currentPage+ 1)
        },
    }
}
</script>
<style  lang="scss" scoped>

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
