<template>
  <div class="footer">
    <div class="link">
      <a class="link-icon" href="https://github.com/luozygithub">
        <img src="../assets/github.png" alt>
      </a>
      <a class="link-icon" href="https://gitee.com/luozyfun/projects">
        <img src="../assets/mayun.png" alt>
      </a>
    </div>
    <div class="copyright">
      COPYRIGHT 2019
      <a href="http://tianjie.fun/">LUOZY</a>. ALL RIGHTS RESERVED.
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.footer{
  width: 100%;
  height: 0.6rem;
  background: #333;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
  .link{
    .link-icon{
      margin-left: 8px;
    }
    .link-icon img{
      width: 20px;
    }
  }
  .copyright{
    font-size: 12px;
    color: #777;
  }
  .copyright a{
    font-size: 12px;
    color: #aaa
  }
}
</style>
