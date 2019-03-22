<style lang="scss" scoped>
.api-list-table /deep/ {
  .ant-table-thead {
    th[key='1'] {
      display: none;
    }
  }
}

.project-card /deep/ {
  .ant-input-group-addon {
    width: 100px;
  }
}
</style>

<template>
  <section class="container">
    <a-row
      class="project-header"
      type="flex"
      justify="space-between"
    >
      <a-col class="project-header-title">
        <a-icon
          type="gitlab"
          theme="filled"
          class="project-header-icon"
        />项目
        <!-- <p class="project-header-description">包含个人及团队项目</p> -->
      </a-col>
      <a-col>
        <a-button
          ghost
          type="primary"
          icon="home"
        >
          <nuxt-link to="/">
            项目列表
          </nuxt-link>
        </a-button>
      </a-col>
    </a-row>

    <a-tabs
      type="card"
      default-active-key="1"
    >
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="bars" />
          创建项目
        </span>
        <a-row type="flex">
          <a-col :span="24">
            <a-form>
              <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="归属 / 项目名"
                validate-status="error"
                help="项目名不能为空"
              >
                <a-input
                  id="error"
                  disabled
                  addon-before="5c47f3ae9f1c8a370307b142/"
                  default-value=""
                  placeholder="请输入"
                />
              </a-form-item>

              <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="项目基础 URL"
                validate-status="error"
                help="项目基础 URL 不能为空"
              >
                <a-input
                  id="warning"
                  addon-before="/"
                  placeholder="请输入"
                />
              </a-form-item>

              <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="项目描述"
                validate-status="error"
                help="项目描述不能为空"
              >
                <a-input
                  id="warning"
                  type="textarea"
                  placeholder="请输入"
                />
              </a-form-item>

              <a-divider>Swagger Docs API (可选)</a-divider>

              <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="方式"
              >
                <a-select default-value="1">
                  <a-select-option value="1">
                    URL
                  </a-select-option>
                  <a-select-option value="2">
                    Upload
                  </a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="URL"
              >
                <a-input placeholder="http://example.com/swagger.json" />

                <div slot="extra">
                  如果后台有提供 Swagger 文档（并且没有验证授权的问题）, 于是我们可以在此处填写 Swagger 的接口地址, BUMBLEBEE 会自动基于此接口创建 Mock 接口.
                </div>
              </a-form-item>

              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button
                  block
                  type="primary"
                  html-type="submit"
                >
                  保存
                </a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </section>
</template>

<script>
const data = [
  {
    key: '1',
    method: 'get',
    env: 'dev',
    url: {
      mock: '/mock/tvs1',
      dev: '/dev/tvs1',
      prod: '/prod/tvs1',
      daily: '/daily/tvst1',
      prepub: '/prepub/tvst1'
    },
    description: '电视列表接口'
  },
  {
    key: '2',
    method: 'post',
    env: 'prod',
    url: {
      mock: '/mock/tvs2',
      dev: '/dev/tvs2',
      prod: '/prod/tvs2',
      daily: '/daily/tvst2',
      prepub: '/prepub/tvst2'
    },
    description: '电视列表接口2'
  },
  {
    key: '11',
    method: 'get',
    env: 'dev',
    url: {
      mock: '/mock/tvs11',
      dev: '/dev/tvs11',
      prod: '/prod/tvs11',
      daily: '/daily/tvst11',
      prepub: '/prepub/tvst11'
    },
    description: '电视列表接口11'
  },
  {
    key: '3',
    method: 'put',
    env: 'daily',
    url: {
      mock: '/mock/tvs3',
      dev: '/dev/tvs3',
      prod: '/prod/tvs3',
      daily: '/daily/tvst3',
      prepub: '/prepub/tvst3'
    },
    description: '电视列表接口3'
  },
  {
    key: '4',
    method: 'delete',
    env: 'prepub',
    url: {
      mock: '/mock/tvs4',
      dev: '/dev/tvs4',
      prod: '/prod/tvs4',
      daily: '/daily/tvst4',
      prepub: '/prepub/tvst4'
    },
    description: '电视列表接口4'
  }
]

export default {
  components: {},
  data() {
    return {
      collapsed: false,
      data,
      selectedRowKeys: [],
      filteredInfo: null,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      editorVisible: false,
      editorData: {
        key: '1',
        method: 'get',
        env: 'dev',
        url: {
          mock: '/mock/tvs1',
          dev: '/dev/tvs1',
          prod: '/prod/tvs1',
          daily: '/daily/tvst1',
          prepub: '/prepub/tvst1'
        },
        description: '电视列表接口',
        code: `
        {
          a: 1
        }`
      }
    }
  },
  computed: {
    rowSelection() {
      // const { selectedRowKeys } = this

      return {
        onChange: (selectedRowKeys, selectedRows) => {
          /* console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          ) */
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  },
  methods: {
    handleMenuClick(e, row) {
      // this.editorData = row
      // this.editorVisible = true

      return false
    },
    handleCodeEdit(record) {
      this.editorData = record
      this.editorVisible = true
    },
    onSelectChange(selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleMethodFilter(value, record) {
      return record.method === value
    },
    handleMethodSorter(rowA, rowB) {
      let res = 0

      if (rowA.method < rowB.method) {
        res = -1
      } else {
        res = 1
      }

      return res
    },
    handleEnvFilter(value, record) {
      return record.env === value
    },
    handleEnvSorter(rowA, rowB) {
      let res = 0

      if (rowA.env < rowB.env) {
        res = -1
      } else {
        res = 1
      }

      return res
    }
  }
}
</script>
