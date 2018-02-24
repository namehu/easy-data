<template>
    <div class="layout" id="app">
        <Layout>
            <Header>
              <Icon 
                @click.native="collapsedSider" 
                :class="rotateIcon" 
                type="navicon-round" 
                size="35"
                color="#FFFFFF">
              </Icon>
              <div class="title">
                Awsome Mock -- 数据模拟系统
              </div>
            </Header>
            <Layout>
                <Sider 
                  :style="{background: '#fff'}" 
                  breakpoint="md"
                  collapsible 
                  :collapsed-width="80"
                  hide-trigger
                  ref="SLIDER"
                  v-model="isCollapsed"
                  >
                    <Menu 
                      active-name="project" 
                      theme="light" 
                      width="auto" 
                      :class="menuitemClasses">
                      <MenuItem name="project">
                        <Icon type="cube"></Icon>
                        <span>项目概况</span>
                      </MenuItem>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '15px'}">
                    <!-- <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb> -->
                     <Content>
                        <transition name="fade" mode="out-in">
                          <router-view :key="key"></router-view>
                        </transition>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>

export default {
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : ''];
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
    },
    contentHeight() {
      return window.innerHeight - 95;
    },
    key() {
      return this.$route.path.replace(/\//g, '_');
    },
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    collapsedSider() {
      this.$refs.SLIDER.toggleCollapse();
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
@import 'scss/core.scss';
@import 'scss/config.scss';
#app {
  height: 100%
}

.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  // overflow: hidden;

  .title {
    display: inline-block;
    font-size: 30px;
    float: right;
    color: #ffffff;
  }
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}

.rotate-icon {
  transform: rotate(-90deg);
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-icon {
  margin: 20px 0 0;
  position: relative;
  left: -25px;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
