<template>
  <div class="app-container">

    <div>
      <el-button type="primary"
        size="mini"
        @click="onSubmit">保存</el-button>
      <el-button size="mini"
        @click="$router.back()">取消</el-button>
    </div>

    <div class="form_content">

      <el-form ref="form"
        label-position="left"
        :model="form"
        :rules="rules"
        label-width="100px"
        style="width:460px;">

        <el-form-item label="用户名称"
          prop="userName">
          <el-input v-model="form.userName"
            readonly="readonly" />
        </el-form-item>

        <el-form-item label="手机号码"
          prop="mobile">
          <el-input v-model="form.mobile" />
        </el-form-item>

        <el-form-item label="身份证号码"
          prop="idCard">
          <el-input v-model="form.idCard" />
        </el-form-item>

        <el-form-item label="用户状态"
          prop="status">

          <el-select v-model="form.status"
            class="filter-item">
            <el-option v-for="item in statusOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key" />
          </el-select>

        </el-form-item>

        <el-form-item label="用户类别"
          prop="userType">

          <el-select v-model="form.userType"
            class="filter-item">
            <el-option v-for="item in userTypeOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key" />
          </el-select>

        </el-form-item>

        <el-form-item label="用户描述"
          prop="description">
          <el-input type="textarea"
            v-model="form.description" />
        </el-form-item>

        <el-form-item label="所属角色"
          prop="roles">

          <el-checkbox-group v-model="form.roleIds">
            <el-checkbox v-for="role in roles"
              :label="role.roleId"
              :key="role.roleId">{{role.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
    </div>

    <div>
      <el-button type="primary"
        size="mini"
        @click="onSubmit">保存</el-button>
      <el-button size="mini"
        @click="$router.back()">取消</el-button>
    </div>

  </div>

</template>

<script>
import { fetchRoleAll } from "@/api/role";
import { updateUser, fetchUser } from "@/api/user";

export default {
  data() {
    return {
      form: {
        userId: this.$route.params.id,
        userName: null,
        mobile: null,
        idCard: null,
        status: null,
        userType: null,
        description: null,
        roleIds: []
      },
      roles: null,
      statusOptions: [{ key: "1", label: "正常" }, { key: "0", label: "禁用" }],
      userTypeOptions: [
        { key: "0", label: "内部用户" },
        { key: "1", label: "外部用户" }
      ],

      rules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        status: [
          { required: true, message: "请选择用户状态", trigger: "blur" }
        ],
        userType: [
          { required: true, message: "请选择用户类别", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入用户描述", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            message: "密码格式不正确",
            pattern: /^[a-zA-Z0-9]+$/,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.listLoading = true;
          updateUser(this.form).then(response => {
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
    fetchRoles() {
      this.listLoading = true;
      fetchRoleAll().then(response => {
        this.listLoading = false;
        if (response.code === 0) {
          this.roles = response.data;
        }
      });
    },
    fetchUser() {
      this.listLoading = true;
      fetchUser(this.form.userId).then(response => {
        this.listLoading = false;
        if (response.code === 0) {
          this.form = response.data;
        }
      });
    }
  },
  created() {
    this.fetchRoles();
    this.fetchUser();
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

