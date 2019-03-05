// require component
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'

// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/eclipse.css'

export default {
  name: 'editor',
  components: {
    codemirror
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      codeEditorValue: this.data.code,
      cmOptions: {
        tabSize: 4,
        mode: 'text/html',
        theme: 'eclipse',
        lineNumbers: true,
        line: true
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cm.codemirror
    }
  },
  watch: {
    'data.code'(newVal) {
      this.codeEditorValue = newVal
    },
    dialogVisible(newVal) {
      if (newVal) {
        // 手动刷新 codemirror 解决 el-dialog 中代码不更新问题
        this.$nextTick(() => {
          if (this.codemirror) {
            this.codemirror.refresh()
          }
        })
      }
    }
  },
  methods: {
    onCmReady(/* cm */) {},
    onCmFocus(/* cm */) {},
    onCmCodeChange(newCode) {
      this.codeEditorValue = newCode
    },
    handleOk() {
      this.$emit('update:visible', false)
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
