<template>
  <div class="app-container">

    <div class="filter-container">
      <!-- 搜索栏 -->
      <el-input :placeholder="'用户名称'"
        v-model="listQuery.userName"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.status"
        :placeholder="'用户状态'"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter">
        <el-option v-for="item in statusOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key" />
      </el-select>

      <el-select v-model="listQuery.userType"
        :placeholder="'用户类别'"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter">
        <el-option v-for="item in userTypeOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key" />
      </el-select>

      <el-select v-model="listQuery.sort"
        :placeholder="'排序'"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter">
        <el-option v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key" />
      </el-select>

      <el-button v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter">{{ '搜索' }}</el-button>

      <el-button class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="$router.push('/system/user/add')">{{ '新增' }}</el-button>

    </div>

    <el-table v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>

      <el-table-column label="用户名称">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>

      <el-table-column label="手机号码">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>

      <el-table-column label="用户状态"
        width="110"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.status|statusFilter }}
        </template>
      </el-table-column>

      <el-table-column label="用户类别"
        width="110"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.userType|userTypeFilter }}
        </template>
      </el-table-column>

      <el-table-column label="创建时间"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtCreated }}
        </template>
      </el-table-column>

      <el-table-column label="更新时间"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtModified }}
        </template>
      </el-table-column>

      <el-table-column label="操作人"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtAuthor }}
        </template>
      </el-table-column>

      <el-table-column label="最后登录IP"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.lastLoginIp }}
        </template>
      </el-table-column>

      <el-table-column label="最后登录时间"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.lastLoginTime }}
        </template>
      </el-table-column>

      <el-table-column :label="'操作'"
        align="center"
        width="270px"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary"
            size="mini"
            @click="handleUpdate(scope.row)">{{ '编辑' }}</el-button>

          <el-button size="mini"
            type="primary"
            @click="showUpdateDialog(scope.row)">{{ '更新密码' }}
          </el-button>

          <el-button size="mini"
            type="danger"
            @click="handleModifyStatus(scope.row)">{{ '删除' }}
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData" />

    <!-- 修改密码弹框 -->
    <el-dialog title="修改密码"
      :visible.sync="dialogPasswordFormVisible">
      <el-form :model="passwordForm"
        ref="passwordForm"
        :rules="rules"
        label-width="120px">

        <el-form-item label="新密码"
          prop="newPassword">
          <el-input v-model="passwordForm.newPassword"
            type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
          prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword"
            type="password"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="dialogPasswordFormVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="updatePassword">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchUserList, deleteUser, updatePassword } from "@/api/user";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import md5 from "js-md5";

export default {
  name: "tableList",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      passwordForm: {
        userId: null,
        newPassword: null,
        confirmPassword: null
      },
      dialogPasswordFormVisible: false,
      sortOptions: [
        { label: "用户名称升序", key: "+userName" },
        { label: "用户名称降序", key: "-userName" }
      ],
      statusOptions: [{ key: "0", label: "禁用" }, { key: "1", label: "正常" }],
      userTypeOptions: [
        { key: "0", label: "内部用户" },
        { key: "1", label: "外部用户" }
      ],
      downloadLoading: false,
      showReviewer: false,
      rules: {
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchUserList(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.totalCount;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    handleCreate() {},
    handleDownload() {},
    handleModifyStatus(rowItem) {
      this.listLoading = true;
      const userIds = [rowItem.userId];
      deleteUser(userIds).then(() => {
        this.listLoading = false;
        this.fetchData();
      });
    },
    handleUpdate(rowItem) {
      this.$router.push("/system/user/edit/" + rowItem.userId);
    },
    showUpdateDialog(rowItem) {
      this.dialogPasswordFormVisible = true;
      this.passwordForm.userId = rowItem.userId;
    },
    updatePassword() {
      if (this.passwordForm.newPassword != this.passwordForm.confirmPassword) {
        this.$message({ message: "两次密码输入不正确！", type: "error" });
        return;
      }

      this.$refs["passwordForm"].validate(valid => {
        if (valid) {
          this.passwordForm.newPassword = md5(this.passwordForm.newPassword);
          this.passwordForm.confirmPassword = md5(
            this.passwordForm.confirmPassword
          );
          this.listLoading = true;
          updatePassword(this.passwordForm).then(response => {
            this.listLoading = false;
            if (response.code === 0) {
              this.$message({ message: "更新成功!", type: "success" });
              this.dialogPasswordFormVisible = false;
            }
          });
        } else {
          this.$message({ message: "格式不正确!", type: "error" });
          return false;
        }
      });
    }
  },
  filters: {
    statusFilter: function(value) {
      let statusDesc = "未知";
      if (value == "0") {
        statusDesc = "禁用";
      } else if (value == 1) {
        statusDesc = "正常";
      }
      return statusDesc;
    },
    userTypeFilter: function(value) {
      let userTypeDesc = "未知";
      if (value == "0") {
        userTypeDesc = "内部用户";
      } else if (value == 1) {
        userTypeDesc = "外部用户";
      }
      return userTypeDesc;
    }
  }
};
</script>
