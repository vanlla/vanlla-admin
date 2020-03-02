<template>
  <el-menu class="navbar"
    mode="horizontal">
    <hamburger :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container" />
    <breadcrumb />
    <div class="right-menu">
      <template>
        <lang-select class="international right-menu-item" />
      </template>

      <el-dropdown class="avatar-container"
        trigger="click">
        <div class="avatar-wrapper">
          <img :src="headImg"
            class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown"
          class="user-dropdown">
          <router-link class="inlineBlock"
            to="/">
            <el-dropdown-item>
              {{ $t('navbar.home') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;"
              @click="logOut">{{
              $t('navbar.logOut')
            }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import LangSelect from "@/components/LangSelect";
import headImg from "@/assets/images/avatar.png";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect
  },
  data() {
    return {
      headImg: headImg
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logOut() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
