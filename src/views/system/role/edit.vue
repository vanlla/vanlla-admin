<template>
  <div class="app-container">

    <div>
      <el-button type="primary"
        size="mini"
        @click="onSubmit">{{$t('common.save')}}</el-button>
      <el-button size="mini"
        @click="$router.back()">{{$t('common.cancel')}}</el-button>
    </div>

    <div class="form_content">

      <el-form ref="form"
        label-position="left"
        :model="form"
        :rules="rules"
        label-width="auto"
        style="width:460px;">

        <el-form-item :label="$t('roleMgr.roleName')"
          prop="roleName">
          <el-input v-model="form.roleName" />
        </el-form-item>

        <el-form-item :label="$t('roleMgr.roleDescription')"
          prop="roleDescription">
          <el-input v-model="form.roleDescription" />
        </el-form-item>

        <el-form-item :label="$t('roleMgr.roleStatus')"
          prop="status">

          <el-select v-model="form.status"
            class="filter-item">
            <el-option v-for="item in roleStatusOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key" />
          </el-select>

        </el-form-item>

        <el-form-item :label="$t('roleMgr.rolePerms')"
          class="heightItem">

          <el-tree :data="treeData"
            show-checkbox
            node-key="id"
            ref="menuTree"
            highlight-current
            :props="defaultProps">
          </el-tree>

        </el-form-item>

      </el-form>

    </div>

    <div>
      <el-button type="primary"
        size="mini"
        @click="onSubmit">{{$t('common.save')}}</el-button>
      <el-button size="mini"
        @click="$router.back()">{{$t('common.cancel')}}</el-button>
    </div>

  </div>
</template>

<script>
import { updatRole, fetchRole } from "@/api/role";
import { getTree } from "@/api/menu";

export default {
  data() {
    return {
      form: {
        roleId: this.$route.params.id,
        roleName: null,
        roleDescription: null,
        status: null,
        menuIds: null
      },
      treeData: [],
      roleStatusOptions: [{ key: 1, label: "启用" }, { key: 0, label: "禁用" }],

      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        status: [
          { required: true, message: "请输入排序", trigger: "blur" },
          { type: "number", message: "必须时数值类型", trigger: "blur" }
        ],
        roleDescription: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      defaultProps: {
        label: "name",
        isLeaf: "isLeaf",
        children: "children"
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.getSelectMenuIds();
          this.listLoading = true;
          updatRole(this.form).then(response => {
            this.listLoading = false;
            if (response.code === 0) {
              this.$message({ message: "保存成功!", type: "success" });
              this.$router.back();
            }
          });
        } else {
          this.$message({ message: "表单格式不正确!", type: "error" });
          return false;
        }
      });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },

    getSelectMenuIds() {
      this.form.menuIds = this.$refs.menuTree
        .getCheckedKeys(false)
        .concat(this.$refs.menuTree.getHalfCheckedKeys());
      return this.form.menuIds;
    },
    fetchRole() {
      this.listLoading = true;
      fetchRole(this.form.roleId).then(response => {
        this.form = response.data;
        this.listLoading = false;
        this.setNodeChecked();
      });
    },
    getTree() {
      this.listLoading = true;
      getTree().then(response => {
        this.listLoading = false;
        if (response.code === 0) {
          this.treeData = response.data;
          this.setNodeChecked();
        }
      });
    },
    setNodeChecked() {
      let checkedKeys = [];
      if (this.treeData.length) {
        for (let i = 0; i < this.treeData.length; i++) {
          let firstLevel = this.treeData[i];
          for (let j = 0; j < firstLevel.children.length; j++) {
            let secondLevel = firstLevel.children[j];
            for (let k = 0; k < secondLevel.children.length; k++) {
              let thirdLevel = secondLevel.children[k];
              if (
                thirdLevel.isLeaf &&
                this.form.menuIds.indexOf(thirdLevel.id) > -1
              ) {
                checkedKeys.push(thirdLevel.id);
              }
            }
          }
        }
      }
      this.$refs.menuTree.setCheckedKeys(checkedKeys, true);
    }
  },

  created() {
    this.fetchRole();
    this.getTree();
  }
};
</script>


<style scoped>
.heightItem {
  height: 150px;
  overflow-y: auto;
}
</style>