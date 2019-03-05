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
        />Prime
        <!-- <p class="project-header-description">包含个人及团队项目</p> -->
      </a-col>
    </a-row>

    <a-tabs
      type="card"
      default-active-key="1"
    >
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="bars" />
          接口列表
        </span>
        <a-row type="flex">
          <a-col :span="24">
            <a-card
              hoverable
              class="project-card"
              :style="{ 'margin-bottom': '16px' }"
            >
              <a-row
                type="flex"
                justify="space-between"
              >
                <a-col :span="24">
                  <p>运营平台相关接口</p>
                  <p>
                    <a-input
                      disabled
                      addon-before="Base URL"
                      default-value="https://easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api"
                    />
                  </p>
                  <p style="margin-bottom: 0;">
                    <a-input
                      disabled
                      addon-before="Project ID"
                      default-value="5c47f3ae9f1c8a370307b142"
                    />
                  </p>
                </a-col>
              </a-row>
              <template
                slot="actions"
                class="ant-card-actions"
              >
                <span>
                  <a-icon type="plus" />
                  创建接口
                </span>
                <span>
                  <a-icon type="laptop" />
                  工作台
                </span>
                <span>
                  <a-icon type="sync" />
                  同步 Swagger
                </span>
                <span>
                  <a-icon type="cloud-download" />
                  打包下载
                </span>
              </template>
            </a-card>
          </a-col>
        </a-row>
        <a-table
          class="api-list-table"
          :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :data-source="data"
          :locale="{
            filterConfirm: '确定',
            filterReset: '重置', 
            emptyText: '暂无数据'
          }"
        >
          <a-table-column-group>
            <a-table-column
              key="url"
              title="URL"
              data-index="url"
              :width="300"
            >
              <template slot-scope="url">
                {{ url.mock }}
              </template>
            </a-table-column>
            <a-table-column
              key="method"
              title="Method"
              data-index="method"
              :width="100"
              :filters="[
                { text: 'GET', value: 'get' }, 
                { text: 'POST', value: 'post' }, 
                { text: 'PUT', value: 'put' }, 
                { text: 'DELETE', value: 'delete' }, 
                { text: 'PATCH', value: 'patch' }
              ]"
              :sorter="handleMethodSorter"
              @filter="handleMethodFilter"
            >
              <template slot-scope="method">
                <a-tag
                  color="#108ee9"
                  style="width: 75px; text-align: center;"
                >
                  {{ method.toUpperCase() }}
                </a-tag>
              </template>
            </a-table-column>
            <a-table-column
              key="env"
              title="环境"
              data-index="env"
              :width="100"
              :filters="[
                { text: '开发', value: 'dev' }, 
                { text: '日常', value: 'daily' },
                { text: '预发', value: 'prepub' },
                { text: '生产', value: 'prod' }
              ]"
              :sorter="handleEnvSorter"
              @filter="handleEnvFilter"
            >
              <template slot-scope="env">
                <a-tag color="blue">
                  {{ { 'dev': '开发', 'daily': '日常', 'prepub': '预发', 'prod': '生产' }[env] }}
                </a-tag>
              </template>
            </a-table-column>
            <a-table-column
              key="description"
              title="描述"
              data-index="description"
            >
              <template slot-scope="description">
                {{ description }}
              </template>
            </a-table-column>
            <a-table-column
              key="operation"
              title="操作"
              :width="160"
            >
              <template slot-scope="record">
                <a-button-group style="margin-right: 5px;">
                  <a-button
                    size="small"
                    title="预览"
                    @click="preview(record.url[record.env])"
                  >
                    <a-icon type="eye" />
                  </a-button>
                  <a-button
                    size="small"
                    title="编辑"
                    @click="handleCodeEdit(record, record.url[record.env])"
                  >
                    <a-icon type="edit" />
                  </a-button>
                  <a-button
                    size="small"
                    title="复制接口地址"
                    @click="preview(record.url[record.env])"
                  >
                    <a-icon type="link" />
                  </a-button>
                </a-button-group>
                <a-dropdown>
                  <a-menu
                    slot="overlay"
                    @click="handleMenuClick($event, record)"
                  >
                    <a-menu-item key="copy">
                      <a-icon type="copy" />
                      克隆
                    </a-menu-item>
                    <a-menu-item key="download">
                      <a-icon type="cloud-download" />
                      下载
                    </a-menu-item>
                    <a-menu-item key="remove">
                      <a-icon type="delete" />
                      删除
                    </a-menu-item>
                  </a-menu>
                  <a-button size="small">
                    <a-icon type="ellipsis" />
                  </a-button>
                </a-dropdown>
              </template>
            </a-table-column>
          </a-table-column-group>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="setting" />
          接口设置
        </span>
        Tab 2
      </a-tab-pane>
    </a-tabs>

    <editor
      :data.sync="editorData"
      :visible.sync="editorVisible"
    />
  </section>
</template>

<script>
import Editor from '~/components/editor'

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
  components: {
    Editor
  },
  data() {
    return {
      collapsed: false,
      data,
      selectedRowKeys: [],
      filteredInfo: null,
      editorVisible: true,
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

<style lang="scss" scoped>
</style>
