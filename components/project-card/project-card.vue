<style lang="scss" src="./project-card.scss" scoped>
</style>

<template>
  <div class="project-card">
    <a-card
      hoverable
      :title="name"
      @click="handleToEdit"
    >
      <template slot="actions">
        <a-icon
          type="link"
          title="复制项目地址"
          @click="handleCopyLink"
        />
        <a-icon
          type="copy"
          title="克隆项目"
        />
        <a-icon
          type="delete"
          title="删除项目"
          @click="openRemoveModal"
        />
      </template>
      <div class="project-card__item">
        <p class="project-card__item-description">
          运营平台相关接口
        </p>
      </div>
      <div class="project-card__item">
        <p class="project-card__item-url">
          /admin
        </p>
      </div>
    </a-card>

    <a-modal
      v-model="visible"
      title="删除项目"
      @ok="handleRemoveConfirm"
    >
      <p>出于某些原因，删除也许会失败。但如果你执意删除，必须知道此操作无法撤消，这将永久删除 1500622348744 / prime_copy</p>
      <p>请输入项目名称以进行确认。</p>
      <p>
        <a-input
          v-model="projectName"
          placeholder="项目名确认"
        />
      </p>

      <template slot="footer">
        <a-button
          key="back"
          @click="handleCancel"
        >
          取消
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleRemoveConfirm"
        >
          确定
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script src="./project-card.js">
</script>
