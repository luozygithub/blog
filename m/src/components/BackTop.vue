<template>
  <div  v-show="showTop" class="backtop" @click="toTop"></div>
</template>

<script>
export default {
  name: "BackTop",
  props: {
    msg: String
  },
  data:function(){
      return {
          showTop:false
      }
  },

  mounted() {
    window.addEventListener("scroll", this.getScrollTop);

  },
  methods: {
    toTop(e) {
      if (!!this.scrollState) {
        return;
      }
      this.scrollState = 1;
      e.preventDefault();
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      let _this = this;
      this.time = setInterval(function() {
        _this.gotoTop(_this.scrollTop - _this.dParams);
      }, 10);
    },
    gotoTop(distance) {
      this.dParams += 20;
      distance = distance > 0 ? distance : 0;
      document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
      if (this.scrollTop < 10) {
        clearInterval(this.time);
        this.dParams = 20;
        this.scrollState = 0;
      }
    },
    getScrollTop() {
        this.scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
        if(this.scrollTop > 300){
            this.showTop=true;
        }else{
            this.showTop=false;
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.backtop {
  width: 0.4rem;
  height: 0.4rem;
  opacity: 0.6;
  border-radius: 50%;
  background-image: url(../assets/backtop.jpg);
  background-size: cover;
}
</style>
