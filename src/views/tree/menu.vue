<template>
  <div class="app-container">

    <el-container class="content">
      <el-aside width="230px"
        class="content_left">

        <el-row style="margin-bottom:15px;">

          <el-col :span="18">

            <el-input v-model="filterText"
              size="small"
              placeholder="请输入搜索内容">
              <el-button slot="append"
                size="small"
                icon="el-icon-search"></el-button>
            </el-input>
          </el-col>

          <el-col :span="6">
            <el-dropdown trigger="click"
              style="margin-left:8px;">
              <el-button type="text"
                size="medium">+新增</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>目录</el-dropdown-item>
                <el-dropdown-item>菜单</el-dropdown-item>
                <el-dropdown-item>按钮</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>

        <el-row>
          <el-tree ref="tree2"
            :data="data2"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :icon-class="'el-icon-arrow-right'"
            class="filter-tree"
            default-expand-all />
        </el-row>

      </el-aside>
      <el-main>

        <el-row>
          <h4 class="content_header">目录</h4>
        </el-row>

        <el-row style="padding-bottom:20px">
          <el-button size="small">编辑</el-button>
          <el-button size="small">删除</el-button>
        </el-row>

        <el-row class="menuDetail">

          <div class="contentItem">
            <span>类型：</span>
            <span>目录</span>
          </div>

          <div class="contentItem">
            <span>类型：</span>
            <span>目录</span>
          </div>

          <div class="contentItem">
            <span>类型：</span>
            <span>目录</span>
          </div>

        </el-row>

      </el-main>
    </el-container>

  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: "",
      data2: [
        {
          id: 1,
          label: "Level one 1",
          children: [
            {
              id: 4,
              label: "Level two 1-1",
              children: [
                {
                  id: 9,
                  label: "Level three 1-1-1"
                },
                {
                  id: 10,
                  label: "Level three 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "Level one 2",
          children: [
            {
              id: 5,
              label: "Level two 2-1"
            },
            {
              id: 6,
              label: "Level two 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "Level one 3",
          children: [
            {
              id: 7,
              label: "Level two 3-1"
            },
            {
              id: 8,
              label: "Level two 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>

<style>
.content_left {
  left: 0;
  overflow-y: hidden;
  height: 100%;
  padding: 10px 2px 0;
  border-right: 1px solid #ddd;
}
.content {
  height: 100%;
}

.content_header {
  color: #2c5081;
  text-align: left;
  margin-top: 0px;
}
.menuDetail {
  border-top: 1px solid #ddd;
}

.contentItem {
  padding-top: 20px;
}
</style>

