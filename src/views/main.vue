<style lang="less" scoped>
  @import './main.less';

</style>

<template>
  <div class="main">
    <div class="main-sidebar">
      <div class="sidebar-header">
        <div class="sidebar-header__icon">
          <img src="../images/U8+.png" alt="">
        </div>
        <p class="sidebar-header__uf-acct-no">
          {{this.$store.state.user.uf_acct.acct_no}}
        </p>
        <p class="sidebar-header__uf-acct-name">
          {{this.$store.state.user.uf_acct.acct_name}}
        </p>
      </div>
      <div class="sidebar-menu">
        <Menu ref="sideMenu" width="auto" @on-select="handleMenuSelect" theme="dark">
          <template v-for="item in menuList">
            <Submenu v-if="item.children.length >= 1" :name="item.name" :key="item.id">
              <template slot="title">
                <Icon :type="item.icon"></Icon>
                <span>{{item.meta.title}}</span>
              </template>
              <template v-for="child in item.children">
                <MenuItem :name="child.name" :key="child.id">
                <Icon :type="child.icon"></Icon>
                <span>{{ child.meta.title}}</span>
                </MenuItem>
              </template>
            </Submenu>
          </template>
        </Menu>
      </div>
    </div>
    <div class="main-header">
      <div class="main-header__breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem v-for="item in $store.state.app.current_path" :href="item.path" :key="item.name">
            {{item.title}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div class="main-header__user-centre">
        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
          <a href="javascript:void(0)">
            <span class="main-user-name">{{ this.$store.state.user.user_name }}</span>
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="changePwd">修改密码</DropdownItem>
            <DropdownItem name="logout" divided>退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Avatar icon="person" style="background: #619fe7;margin-left: 10px;"></Avatar>
      </div>

    </div>
    <div class="main-view">
      <div class="view-page">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>

    <template>
      <Modal v-model="logoutConfirm" @on-ok="handleLogoutOK" width="300">
        <p>确认退出登录吗？</p>
      </Modal>
    </template>
  </div>
</template>

<script>
  import util from '@/libs/util';

  export default {
    data() {
      return {
        menuList: this.$store.getters.menu_list,
        logoutConfirm: false,
      }
    },
    computed: {

    },
    methods: {
      init() {
        util.setCurrentPath(this, this.$route.name);
      },
      handleMenuSelect(active) {
        this.$router.push({
          name: active
        });
      },
      handleClickUserDropdown(name) {
        if (name === "changePwd") {

        } else if (name === "logout") {
          this.logoutConfirm = true;
        }
      },
      handleLogoutOK() {
        this.$store.dispatch('UserLogout');
        this.$router.push({
          replace: true,
          name: 'login'
        });
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      '$route' (to) {
        console.log('to');


        util.setCurrentPath(this, to.name);
        this.$store.state.app.current_path.forEach(item => {
          console.log(item.title);
        })
      }
    }
  }

</script>
