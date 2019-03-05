<template>
  <div>
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
          icon="plus"
        >
          创建项目
        </a-button>
      </a-col>
    </a-row>

    <a-tabs
      type="card"
      @change="callback"
    >
      <a-tab-pane
        key="1"
        tab="全部项目"
      >
        <a-row :gutter="16">
          <a-col :span="8">
            <project-card name="Prime" />
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane
        key="2"
        tab="我创建的"
      >
        <a-row :gutter="16">
          <a-col :span="8">
            <project-card />
          </a-col>
          <a-col :span="8">
            <project-card />
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane
        key="3"
        tab="我加入的"
      >
        <a-row :gutter="16">
          <a-col :span="8">
            <project-card />
          </a-col>
          <a-col :span="8">
            <project-card />
          </a-col>
          <a-col :span="8">
            <project-card />
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import ProjectCard from '~/components/project-card'

export default {
  components: {
    ProjectCard
  },
  methods: {
    callback() {}
  }
}
</script>
