<template>
    <div class="layout">
        <Layout>
            <Header>
              <Icon 
                @click.native="collapsedSider" 
                :class="rotateIcon" 
                :style="{margin: '20px 20px 0'}" 
                type="navicon-round" size="24">
              </Icon>
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
                    <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']" :class="menuitemClasses">
                       <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>Option 1</span>
                      </MenuItem>
                      <MenuItem name="1-2">
                          <Icon type="search"></Icon>
                          <span>Option 2</span>
                      </MenuItem>
                      <MenuItem name="1-3">
                          <Icon type="settings"></Icon>
                          <span>Option 3</span>
                      </MenuItem>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
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
};
</script>
<style scoped>
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
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

 .rotate-icon{
        transform: rotate(-90deg);
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>