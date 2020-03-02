<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索栏 -->
      <el-input
        :placeholder="$t('roleMgr.roleName')"
        v-model="listQuery.roleName"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        :placeholder="$t('roleMgr.selectSort')"
        @change="handleFilter"
      >
        <el-option
          :key="'+roleName'"
          :label="$t('roleMgr.roleNameAsc')"
          :value="'+roleName'"
        />
        <el-option
          :key="'-roleName'"
          :label="$t('roleMgr.roleNameDesc')"
          :value="'-roleName'"
        />
      </el-select>

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >{{ $t('common.search') }}</el-button
      >

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="$router.push('/system/role/add')"
        >{{ $t('common.add') }}</el-button
      >

    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column :label="$t('roleMgr.roleName')">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('roleMgr.roleDescription')">
        <template slot-scope="scope">
          {{ scope.row.roleDescription }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('roleMgr.roleStatus')"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.status | statusFilter }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('common.operate')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
            >{{ $t('common.edit') }}</el-button
          >

          <el-button
            v-if="scope.row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(scope.row)"
            >{{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { fetchRoleList, deleteRole } from '@/api/role'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'tableList',
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
        { label: this.$t('roleMgr.roleNameAsc'), key: '+roleName' },
        { label: this.$t('roleMgr.roleNameDesc'), key: '-roleName' }
      ],
      downloadLoading: false,
      showReviewer: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchRoleList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.totalCount
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleCreate() {},
    handleDownload() {},
    handleModifyStatus(rowItem) {
      this.listLoading = true
      const roleIds = [rowItem.roleId]
      deleteRole(roleIds).then(() => {
        this.listLoading = false
        this.fetchData()
      })
    },
    handleUpdate(rowItem) {
      this.$router.push('/system/role/edit/' + rowItem.roleId)
    }
  },
  filters: {
    statusFilter: function(value) {
      let statusDesc = '未知'
      if (value == '0') {
        statusDesc = '禁用'
      } else if (value == 1) {
        statusDesc = '启用'
      }
      return statusDesc
    }
  }
}
</script>
