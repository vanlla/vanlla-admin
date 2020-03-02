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
              @command="handleAdd"
              style="margin-left:8px;">
              <el-button type="text"
                size="medium">+新增</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">目录</el-dropdown-item>
                <el-dropdown-item command="1">菜单</el-dropdown-item>
                <el-dropdown-item command="2">按钮</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>

        <el-row>
          <el-tree :props="defaultProps"
            :data="treeData"
            node-key="id"
            :filter-node-method="filterNode"
            :icon-class="'el-icon-arrow-right'"
            class="filter-tree"
            @node-click="handleNodeClick"
            :renderContent="renderContent"
            :expand-on-click-node="false" />
        </el-row>

      </el-aside>
      <el-main>

        <div v-show="showEdit">

          <el-row>
            <h4 class="content_header">{{typeName}}</h4>
          </el-row>

          <el-row>

            <div>
              <el-button type="primary"
                @click="saveOrUpdate"
                size="mini">保存</el-button>
              <el-button @click="hideAll"
                size="mini">取消</el-button>
            </div>

            <div class="form_content">
              <el-form ref="form"
                label-position="left"
                label-width="100px"
                style="width:460px"
                :model="form">

                <el-form-item label="名称："
                  prop="name">
                  <el-input v-model="form.name" />
                </el-form-item>

                <el-form-item label="上级菜单："
                  prop="parentId">
                  <el-select v-model="form.parentId"
                    clearable
                    placeholder="请选择上级菜单">
                    <el-option v-for="item in pMenuList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id" />
                  </el-select>
                </el-form-item>

                <el-form-item label="菜单URL："
                  v-show="showURL"
                  prop="url">
                  <el-input v-model="form.url" />
                </el-form-item>

                <el-form-item label="权限："
                  v-show="showPerms"
                  prop="perms">
                  <el-input v-model="form.perms" />
                </el-form-item>

                <el-form-item label="排序："
                  v-show="showOrder"
                  prop="orderNo">
                  <el-input type="number"
                    v-model="form.orderNo" />
                </el-form-item>

                <el-form-item label="ICON："
                  v-show="showIcon"
                  prop="icon">
                  <el-input v-model="form.icon" />
                </el-form-item>

                <el-form-item label="标题："
                  v-show="showIcon"
                  prop="title">
                  <el-input v-model="form.title" />
                </el-form-item>

                <el-form-item label="读写权限："
                  v-show="showAccess"
                  prop="rwAccess">
                  <el-radio-group v-model="form.rwAccess">
                    <el-radio label="0">读数据</el-radio>
                    <el-radio label="1">读写数据</el-radio>
                  </el-radio-group>
                </el-form-item>

              </el-form>
            </div>

            <div>
              <el-button type="primary"
                @click="saveOrUpdate"
                size="mini">保存</el-button>
              <el-button @click="hideAll"
                size="mini">取消</el-button>
            </div>

          </el-row>
        </div>

        <div v-show="showDetail">

          <el-row>
            <h4 class="content_header">{{typeName}}</h4>
          </el-row>

          <div>
            <el-button type="primary"
              @click="editMenu"
              size="mini">编辑</el-button>
            <el-button @click="deleteMenu"
              size="mini">删除</el-button>
          </div>

          <div class="form_content"
            style="padding-bottom: 10px;">
            <el-row>

              <el-row class="contentItem">
                <el-col :span="3">类型：</el-col>
                <el-col :span="21">{{typeName}}</el-col>
              </el-row>

              <el-row class="contentItem">
                <el-col :span="3">名称：</el-col>
                <el-col :span="21">{{form.name}}</el-col>
              </el-row>

              <el-row class="contentItem">
                <el-col :span="3">上级菜单：</el-col>
                <el-col :span="21">{{form.parentName}}</el-col>
              </el-row>

              <el-row class="contentItem"
                v-show="showPerms">
                <el-col :span="3">权限标识：</el-col>
                <el-col :span="21">{{form.perms}}</el-col>
              </el-row>

              <el-row class="contentItem"
                v-show="showAccess">
                <el-col :span="3">权限类型：</el-col>
                <el-col :span="21">{{form.rwAccess}}</el-col>
              </el-row>

              <el-row class="contentItem"
                v-show="showOrder">
                <el-col :span="3">排序号：</el-col>
                <el-col :span="21">{{form.orderNo}}</el-col>
              </el-row>

              <el-row class="contentItem"
                v-show="showURL">
                <el-col :span="3">菜单URL：</el-col>
                <el-col :span="21">{{form.url}}</el-col>
              </el-row>

              <el-row class="contentItem"
                v-show="showIcon">
                <el-col :span="3">ICON：</el-col>
                <el-col :span="21">{{form.icon}}</el-col>
              </el-row>

              <el-row class="contentItem"
                v-show="showIcon">
                <el-col :span="3">标题：</el-col>
                <el-col :span="21">{{form.title}}</el-col>
              </el-row>

            </el-row>
          </div>

          <div>
            <el-button type="primary"
              @click="editMenu"
              size="mini">编辑</el-button>
            <el-button @click="deleteMenu"
              size="mini">删除</el-button>
          </div>

        </div>

      </el-main>
    </el-container>

  </div>
</template>

<script>
import {
  findByType,
  saveMenu,
  fetchMenu,
  updateMenu,
  deleteMenu,
  getTree
} from "@/api/menu";

export default {
  data() {
    return {
      typeName: "目录",
      showDetail: false,
      showEdit: false,
      showOrder: false,
      showAccess: true,
      showURL: false,
      showIcon: true,
      showPerms: true,
      form: {
        menuId: null,
        parentId: null,
        parentName: null,
        type: null,
        name: null,
        url: null,
        perms: null,
        title: null,
        icon: null,
        isLeaf: null,
        orderNo: null,
        rwAccess: "1",
        isSysmenu: "1"
      },
      pMenuList: [{ id: 0, name: "一级菜单" }],
      filterText: "",
      treeData: [],
      defaultProps: {
        label: "name",
        isLeaf: "isLeaf"
      },
      currentNode: null,
      currentData: null
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
    },
    handleAdd(command) {
      this.showDetail = false;
      this.showEdit = true;
      this.form = {};
      this.form.type = command;
      this.form.parentId = null;
      this.pMenuList = [];
      this.handleShowDetail(command, "新增");
      this.findByType(command);
    },
    findByType(type) {
      if (type == 0) {
        this.pMenuList.push({ id: 0, name: "一级菜单" });
      } else {
        this.listLoading = true;
        findByType(type - 1).then(response => {
          this.listLoading = false;
          if (response.code === 0) {
            this.pMenuList = response.data;
          }
        });
      }
    },
    saveOrUpdate() {
      this.listLoading = true;
      if (this.form.menuId) {
        updateMenu(this.form).then(response => {
          this.listLoading = false;
          if (response.code === 0) {
            this.currentData.name = this.form.name;
            this.$message({ message: "保存成功!", type: "success" });
            this.showDetailDiv();
          }
        });
      } else {
        saveMenu(this.form).then(response => {
          this.listLoading = false;
          if (response.code === 0) {
            this.form = response.data;
            this.$message({ message: "新增成功!", type: "success" });
            this.showDetailDiv();
            this.getTree();
          }
        });
      }
    },
    findById(id) {
      this.listLoading = true;
      fetchMenu(id).then(response => {
        this.listLoading = false;
        if (response.code === 0) {
          this.form = response.data;
          this.handleShowDetail(this.form.type, "");
          if (this.form.parentId == 0) {
            this.form.parentName = "一级菜单";
          }
        }
      });
    },
    handleShowDetail(type, operate) {
      if (type == 2) {
        this.typeName = operate + "按钮";
        this.showOrder = false;
        this.showAccess = true;
        this.showURL = false;
        this.showPerms = true;
        this.showIcon = false;
        this.form.isLeaf = true;
      } else if (type == 1) {
        this.typeName = operate + "菜单";
        this.showOrder = true;
        this.showAccess = false;
        this.showURL = true;
        this.showPerms = true;
        this.showIcon = true;
        this.form.isLeaf = false;
      } else if (type == 0) {
        this.typeName = operate + "目录";
        this.showOrder = true;
        this.showAccess = false;
        this.showURL = false;
        this.showPerms = false;
        this.form.isLeaf = false;
        this.showIcon = true;
      }
    },
    //eslint-disable-next-line
    handleNodeClick(data, node, _this) {
      this.currentData = data;
      this.currentNode = node;
      this.showDetail = true;
      this.showEdit = false;
      this.findById(data.id);
    },
    editMenu() {
      this.showDetail = false;
      this.showEdit = true;
      this.findByType(this.form.type);
    },
    showDetailDiv() {
      this.showDetail = true;
      this.showEdit = false;
    },
    hideAll() {
      if (this.form.menuId) {
        this.showDetailDiv();
      } else {
        this.showDetail = false;
        this.showEdit = false;
      }
    },
    deleteMenu() {
      this.listLoading = true;
      deleteMenu([this.form.menuId]).then(response => {
        this.listLoading = false;
        if (response.code === 0) {
          this.$message({ message: "删除成功!", type: "success" });
          this.form.menuId = null;
          this.getTree();
          this.hideAll();
        }
      });
    },
    getTree() {
      this.listLoading = true;
      getTree().then(response => {
        this.listLoading = false;
        if (response.code === 0) {
          this.treeData = response.data;
        }
      });
    },
    renderContent(h, { node }) {
      return (
        <span class="custom-tree-node">
          <svg-icon icon-class="tree" />
          <span style="margin-left:5px;">{node.label}</span>
        </span>
      );
    }
  },
  created() {
    this.getTree();
  }
};
</script>

<style>
.content_left {
  left: 0;
  overflow-y: auto;
  overflow-x: auto;
  height: 100%;
  padding: 10px 2px 0;
  border-right: 1px solid #ddd;
}
.content {
  height: 100%;
  border: 1px solid #ddd;
}

.content_header {
  color: #2c5081;
  text-align: left;
  margin-top: 0px;
}
.contentItem {
  padding-bottom: 20px;
}
</style>

