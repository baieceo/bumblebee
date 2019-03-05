<template>
  <section class="container">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        v-model="collapsed"
        :trigger="null"
        collapsed-width="120"
        collapsible
      >
        <div class="logo">
          BUMBLEBEE
        </div>
        <a-menu
          theme="dark"
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="user" />项目</span>
            <a-menu-item key="1">
              个人
            </a-menu-item>
            <a-menu-item key="2">
              团队
            </a-menu-item>
          </a-sub-menu>
          <!-- <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="laptop" />控制台
            </span>
          </a-sub-menu> -->
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="file" />文档
            </span>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
          <div class="layout-topbar-avatar">
            <span
              class="layout-topbar-avatar__img"
              :style="{ 'background-image': 'url(' + 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551690952341&di=442ba5ffcad869a3b83fe9b26e527905&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F015eae5541eb9700000115416eba80.jpg%401280w_1l_2o_100sh.png' + ')' }"
            />
          </div>
        </a-layout-header>
        <a-layout-content
          class="layout-content"
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <nuxt-child />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      collapsed: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" src="./global.scss">
</style>

<style lang="scss" scoped>
#components-layout-demo-custom-trigger {
  height: 100vh;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
}

.layout-topbar-avatar {
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 16px;

  &__img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f5f5f5;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
}

.layout-content {
  height: auto;
  flex: none;
}
</style>
