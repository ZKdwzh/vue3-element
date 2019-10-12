<!-- 组件说明 -->
<template>
  <div
    :class="classObj"
    class='app-wrapper'
  >
    <Sidebar class="sidebar-container" />
    <div
      :class="{tasTagsView:needTagsView}"
      class="main-container"
    >
      <div>
        <Navbar />
        <TagsView v-if="needTagsView" />
      </div>
      <AppMain />
    </div>

  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  data() {
    return {
      needTagsView: true
    }
  },
  components: {
    Sidebar,        //左导   
    Navbar,         //顶导
    TagsView,       //tabs切换
    AppMain         //主内容
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>