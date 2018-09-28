<template>
  <el-aside :width="asideWidth" >
    <el-menu
      :collapse="collapse"
      :default-active="onRoutes"
      @open="handleOpen"
      @select="handleSelect"
      unique-opened>
      <el-menu-item index="/index">
        <i class="el-icon-t-home"></i><span slot="title">系统首页</span>
      </el-menu-item>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu
            :index="item.index"
            :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-menu-item
                :index="subItem.index"
                :key="subItem.index">
                <i :class="subItem.icon"></i><span slot="title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-t-user"></i>
          <span slot="title">我的</span>
        </template>
        <el-menu-item index="user_info">
          <i class="el-icon-t-edit"></i>
          <span slot="title">我的信息</span>
        </el-menu-item>
        <el-menu-item index="logout">
          <i class="el-icon-t-logout"></i>
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="#" @click="toggleCollapse">
        <template v-if="collapse">
          <i class="el-icon-t-verticalleft"></i>
          <span slot="title">展开菜单</span>
        </template>
        <template  v-else>
          <i class="el-icon-t-verticalright"></i>
          <span slot="title">收起菜单</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      items: [
        {
          icon: 'el-icon-t-reconciliation',
          index: 'order',
          title: '订单管理',
          subs: [
            {
              index: 'create',
              icon: 'el-icon-t-file-add',
              title: '创建订单'
            },
            {
              index: 'man',
              title: '管理订单',
              icon: 'el-icon-t-diff'
            }
          ]
        }
      ],
      collapse: false
    }
  },
  computed: {
    asideWidth: function () {
      return this.collapse ? '70px' : '205px'
    },
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    toggleCollapse () {
      this.collapse = !this.collapse
    },
    handleOpen (key, keyPath) {
      console.log('open ', key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(keyPath.join('/'))
      if (keyPath) {
        this.$router.push({path: keyPath.join('/')})
      }
    }
  }
}
</script>

<style scoped>

</style>
