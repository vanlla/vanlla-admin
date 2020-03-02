<template>
  <div class="app-container">
    <div>
      <el-button type="primary" size="mini" @click="onSubmit">保存</el-button>
      <el-button size="mini" @click="$router.back()">取消</el-button>
    </div>

    <div class="form_content">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        :rules="rules"
        label-width="80px"
        style="width:460px;"
      >
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="form.name" readonly="readonly" />
        </el-form-item>

        <el-form-item label="任务描述" prop="description">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>

        <el-form-item label="类名" prop="className">
          <el-input v-model="form.className" readonly="readonly" />
        </el-form-item>

        <el-form-item label="指定IP" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入执行该任务机器的IP" />
        </el-form-item>

        <el-form-item label="执行计划" prop="cronExpression">
          <el-input
            v-model="form.cronExpression"
            placeholder="请输入cron表达式"
            @focus="showDialog"
          />
        </el-form-item>

        <el-form-item label="是否启用" prop="enable">
          <el-radio-group v-model="form.enable">
            <el-radio :label="0" disabled>关闭</el-radio>
            <el-radio :label="1" disabled>启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <!--生产cron 表达式 -->
    <el-dialog title="生成 cron" :visible.sync="showCron">
      <vcrontab
        @hide="showCron = false"
        @fill="crontabFill"
        :expression="form.cronExpression"
      ></vcrontab>
    </el-dialog>

    <div>
      <el-button type="primary" size="mini" @click="onSubmit">保存</el-button>
      <el-button size="mini" @click="$router.back()">取消</el-button>
    </div>
  </div>
</template>

<script>
import { updateJob, fetchJob, hasClassName } from '@/api/job'
import vcrontab from 'vcrontab'

export default {
  components: { vcrontab },
  data() {
    let checkClassName = (fule, value, callback) => {
      if (!value) {
        return callback(new Error('类名不能为空'))
      }
      setTimeout(() => {
        this.hasClassName(callback)
      }, 1000)
    }

    return {
      form: {
        id: this.$route.params.id,
        name: null,
        description: null,
        enable: null,
        className: null,
        ip: null,
        cronExpression: null
      },
      showCron: false,
      jobStatusOptions: [
        { key: 1, label: '启用' },
        { key: 0, label: '禁用' }
      ],

      rules: {
        name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        enable: [
          { required: true, message: '请选择是否启用', trigger: 'blur' },
          { type: 'number', message: '必须时数值类型', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入任务描述', trigger: 'blur' }
        ],
        className: [
          { required: true, message: '请输入类名', trigger: 'blur' },
          { validator: checkClassName, trigger: 'blur' }
        ],
        cronExpression: [
          { required: true, message: '请输入cron表达式', trigger: 'blur' }
        ]
      },
      defaultProps: {
        isLeaf: 'isLeaf',
        label: 'name'
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.listLoading = true
          updateJob(this.form).then(response => {
            this.listLoading = false
            if (response.code === 0) {
              this.$message({ message: '保存成功!', type: 'success' })
              this.$router.back()
            }
          })
        } else {
          this.$message({ message: '表单格式不正确!', type: 'error' })
          return false
        }
      })
    },

    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchJob() {
      this.listLoading = true
      fetchJob(this.form.id).then(response => {
        this.form = response.data
        this.listLoading = false
      })
    },
    crontabFill(value) {
      //确定后回传的值
      this.form.cronExpression = value
    },
    showDialog() {
      //this.form.cronExpression = this.input //传入的 cron 表达式，可以反解析到 UI 上
      this.showCron = true
    },
    hasClassName(callback) {
      this.listLoading = true
      hasClassName({ className: this.form.className }).then(response => {
        if (!response.data) {
          callback(new Error('该类名不存在'))
        } else {
          callback()
        }
      })
    }
  },
  created() {
    this.fetchJob()
  }
}
</script>

<style scoped>
.heightItem {
  height: 150px;
  overflow-y: auto;
}
</style>
