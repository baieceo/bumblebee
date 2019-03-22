<style lang="scss" src="./editor.scss">
</style>

<template>
  <div class="editor-container">
    <a-modal
      title="Basic Modal"
      class="editor-code-modal"
      width="100%"
      :style="{ position: 'absolute', top: 0, left: 0, bottom: 0, height: '100%', padding: 0 }"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="editor-code-wrapper">
        <div class="editor-code-mirror">
          <codemirror
            ref="cm"
            :value="codeEditorValue"
            :options="cmOptions"
            @ready="onCmReady"
            @focus="onCmFocus"
            @input="onCmCodeChange"
          />
        </div>
        <div class="editor-code-control">
          <h2 class="editor-code-title">
            编辑接口
          </h2>
          <div class="editor-code-form">
            <div class="editor-code-form-item">
              <label class="editor-code-form-item-label">
                Method
              </label>
              <div class="editor-code-form-item-content">
                <a-select
                  :default-value="data.method"
                  style="width: 120px"
                >
                  <a-select-option value="get">
                    GET
                  </a-select-option>
                  <a-select-option value="post">
                    POST
                  </a-select-option>
                  <a-select-option value="put">
                    PUT
                  </a-select-option>
                  <a-select-option value="delete">
                    DELETE
                  </a-select-option>
                  <a-select-option value="patch">
                    PATCH
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div class="editor-code-form-item">
              <label class="editor-code-form-item-label">
                URL
              </label>
              <div class="editor-code-form-item-content">
                <a-input
                  addon-before="/"
                  :default-value="data.url.mock.replace(/^\//, '')"
                />
              </div>
            </div>
            <div class="editor-code-form-item">
              <label class="editor-code-form-item-label">
                当前环境
              </label>
              <div class="editor-code-form-item-content">
                <a-select
                  :default-value="data.env"
                  style="width: 120px"
                >
                  <a-select-option value="mock">
                    MOCK
                  </a-select-option>
                  <a-select-option value="dev">
                    开发
                  </a-select-option>
                  <a-select-option value="daily">
                    日常
                  </a-select-option>
                  <a-select-option value="prepub">
                    预发
                  </a-select-option>
                  <a-select-option value="prod">
                    生产
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div class="editor-code-form-item">
              <label class="editor-code-form-item-label">
                描述
              </label>
              <div class="editor-code-form-item-content">
                <a-input :default-value="data.description" />
              </div>
            </div>
            <div class="editor-code-form-item">
              <label class="editor-code-form-item-label">
                开发环境 URL
              </label>
              <div class="editor-code-form-item-content">
                <a-input
                  addon-before="/"
                  :default-value="data.url['dev'].replace(/^\//, '')"
                />
              </div>
            </div>
            <div class="editor-code-form-item">
              <label class="editor-code-form-item-label">
                日常环境 URL
              </label>
              <div class="editor-code-form-item-content">
                <a-input
                  addon-before="/"
                  :default-value="data.url['daily'].replace(/^\//, '')"
                />
              </div>
            </div>
            <div class="editor-code-form-item">
              <label class="editor-code-form-item-label">
                预发环境 URL
              </label>
              <div class="editor-code-form-item-content">
                <a-input
                  addon-before="/"
                  :default-value="data.url['prepub'].replace(/^\//, '')"
                />
              </div>
            </div>
            <div class="editor-code-form-item">
              <label class="editor-code-form-item-label">
                生产环境 URL
              </label>
              <div class="editor-code-form-item-content">
                <a-input
                  addon-before="/"
                  :default-value="data.url['prod'].replace(/^\//, '')"
                />
              </div>
            </div>
            <div class="editor-code-form-item">
              <div class="editor-code-form-item-content">
                <a-button
                  block
                  type="primary"
                  @click="handleOk"
                >
                  保存
                </a-button>
              </div>
            </div>
            <div class="editor-code-form-item">
              <div class="editor-code-form-item-content">
                <a-button-group class="editor-code-button-group">
                  <a-button @click="handleCodeFormatter">
                    格式化
                  </a-button>
                  <a-button>
                    预览
                  </a-button>
                  <a-button @click="handleCancel">
                    关闭
                  </a-button>
                </a-button-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script src="./editor.js">
</script>
