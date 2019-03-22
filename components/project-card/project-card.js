export default {
  name: 'project-card',
  data() {
    return {
      visible: false,
      loading: false,
      projectName: ''
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleCopyLink() {
      this.$message.destroy()
      this.$message.success('项目地址已复制到剪贴板')
    },
    openRemoveModal() {
      this.projectName = ''
      this.visible = true
    },
    handleRemoveConfirm() {
      if (!this.projectName) {
        this.$message.destroy()

        this.$message.error('请输入项目名')
      } else {
        this.loading = true

        setTimeout(() => {
          this.visible = false
          this.loading = false
          this.$message.success('项目已成功删除')
        }, 2000)
      }
    },
    handleCancel() {
      this.visible = false
    },
    handleToEdit() {
      this.$router.push(`/project/1`)
    }
  }
}
