<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索栏 -->
      <el-input :placeholder="'任务名称'"
        v-model="listQuery.name"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.sort"
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
        @click="$router.push('/system/job/add')">{{ '新增' }}</el-button>

    </div>

    <el-table v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="任务名称"
        width="150px">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="类名">
        <template slot-scope="scope">
          {{ scope.row.className }}
        </template>
      </el-table-column>

      <el-table-column label="是否启用"
        width="110"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.enable | enableFilter }}
        </template>
      </el-table-column>

      <el-table-column label="任务状态"
        width="110"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.status | statusFilter }}
        </template>
      </el-table-column>

      <el-table-column :label="'操作'"
        align="center"
        width="230"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary"
            size="mini"
            @click="updateEnable(scope.row)"
            v-if="scope.row.enable == 1">{{ '关闭' }}</el-button>
          <el-button type="primary"
            size="mini"
            @click="updateEnable(scope.row)"
            v-if="scope.row.enable == 0">{{ '启用' }}</el-button>

          <el-button type="primary"
            size="mini"
            @click="handleUpdate(scope.row)">{{ '编辑' }}</el-button>

          <el-button v-if="scope.row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(scope.row)">{{ '删除' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData" />
  </div>
</template>

<script>
import { fetchJobList, deleteJob, updateEnable } from "@/api/job";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

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
      sortOptions: [
        { label: "任务名称升序", key: "+name" },
        { label: "任务名称降序", key: "-name" }
      ],
      downloadLoading: false,
      showReviewer: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchJobList(this.listQuery).then(response => {
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
      const jobIds = [rowItem.id];
      deleteJob(jobIds).then(() => {
        this.listLoading = false;
        this.fetchData();
      });
    },
    handleUpdate(rowItem) {
      this.$router.push("/system/job/edit/" + rowItem.id);
    },
    updateEnable(rowItem) {
      this.listLoading = true;
      let enable = rowItem.enable == 0 ? 1 : 0;
      updateEnable(rowItem.id, enable).then(() => {
        this.listLoading = false;
        this.fetchData();
      });
    }
  },
  filters: {
    statusFilter: function(value) {
      let statusDesc = "未知";
      if (value == "0") {
        statusDesc = "待触发";
      } else if (value == 1) {
        statusDesc = "进行中";
      }
      return statusDesc;
    },
    enableFilter: function(value) {
      let statusDesc = "未知";
      if (value == "0") {
        statusDesc = "禁用";
      } else if (value == 1) {
        statusDesc = "启用";
      }
      return statusDesc;
    }
  }
};
</script>
