<style rel="stylesheet/scss" lang="scss" scoped>
.layout {
  height: 100%;
  background: #ffffff;
  .layout-header {
    padding: 0 1rem;
    background: #24292d;
    .layout-header-bar {
      display: flex;
      align-items: center;
      .spacer {
        flex: 1;
      }
      .logo {
        display: flex;
        align-items: center;
        font-size: 1rem;
        color: #ffffff;
        span {
          padding: 0 0.1rem;
        }
      }
    }
  }
  .layout-content {
    flex: 1;
    background: #ffffff;
    color: #000000;
    .welcome-aera {
      padding: 0.5rem 1rem 2rem 1rem;
      background: #24292d;
      .title {
        color: #ffffff;
      }
      .sub-title {
        color: #999999;
      }
    }
    .form-aera {
      padding: 1.5rem 1rem;
      .interest-bar,
      .language-bar {
        padding-bottom: 1rem;
        h3 {
          font-size: 20px;
        }
        .description {
          font-size: 14px;
        }
      }
      // Style for third party component
      /deep/ .vue-tags-input {
        margin-top: 0.5rem;
        max-width: 100% !important;
        .ti-input {
          border: 1px solid #000000;
          border-radius: 6px;
          input::-webkit-input-placeholder {
            color: #000000;
          }
        }
      }
      // Style for third party component
      /deep/ .ivu-select {
        padding: 2px;
        margin-top: 0.5rem;
        color: #000000;
        font-size: 16px;
        border: 1px solid #000000;
        border-radius: 6px;
        input {
          color: #000000;
        }
        input::-webkit-input-placeholder {
          color: #000000;
        }
        .ivu-select-selection {
          border: none;
          input {
            font-size: 14px;
          }
          i {
            color: #000000;
          }
        }
        .ivu-select-item {
          color: #000000;
        }
      }
    }
    .button-aera {
      padding: 1.5rem 1rem;
      .button {
        border: 1px solid #5c6bc0;
        border-radius: 6px;
        color: #ffffff;
        background: #5c6bc0;
        padding: 0.5rem 0;
      }
    }
  }
}

.footer {
  padding: 1rem;
  color: #000000;
  text-align: center;
}

.menu-icon {
  color: #ffffff;
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
</style>

<template>
  <div style="height: 100%;">
    <i-layout class="layout">
      <i-header class="layout-header">
        <i-row type="flex" justify="center">
          <i-col :xs="24" :sm="24" :md="16" :lg="16" class="layout-header-bar">
            <div class="logo">
              <i-icon type="md-link" size="20" />
              <span>LinkChat</span>
            </div>
            <div class="spacer"></div>
            <i-icon @click.native="collapsedSider" :class="rotateIcon" type="md-menu" size="24" />
          </i-col>
        </i-row>
      </i-header>
      <i-content class="layout-content">
        <i-row type="flex" justify="center" class="welcome-aera">
          <i-col :xs="24" :sm="24" :md="16" :lg="16">
            <h2 class="title">Welcome here</h2>
            <h2 class="sub-title">
              LinkChat is a great way to meet new friends.
            </h2>
          </i-col>
        </i-row>
        <i-row type="flex" justify="center" class="form-aera">
          <i-col :xs="24" :sm="24" :md="16" :lg="16">
            <div class="interest-bar">
              <h3>What do you wanna talk about?</h3>
              <span class="description">It will find someone who’s had some interest of the same
                things</span>
              <vue-tags-input v-model="interestTag" :tags="interestTags" placeholder="Add your interest here (optional)" @tags-changed="setInterest" />
            </div>
            <div class="language-bar">
              <h3>Language*</h3>
              <span class="description">Select ‘English’ to chat in English</span>
              <i-select :value="selectedLanguage" filterable @on-change="setLanguage">
                <i-option v-for="item in languageList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
              </i-select>
            </div>
          </i-col>
        </i-row>
        <i-row type="flex" justify="center" class="button-aera">
          <i-col :xs="24" :sm="24" :md="16" :lg="16">
            <i-button class="button" long @click="handleChat">PRESS TO GO</i-button>
          </i-col>
        </i-row>
      </i-content>
    </i-layout>
    <div class="footer">
      <p>2019 &copy; Power by Jeffy</p>
      <p>Last update 23/2/2019</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import VueTagsInput from '@johmun/vue-tags-input'
import { listForSelect as languageList } from '@/utils/languageList'

export default {
  components: {
    VueTagsInput
  },
  data() {
    return {
      interestTag: '',
      isCollapsed: true,
      languageList
    };
  },
  computed: {
    ...mapGetters({
      selectedLanguage: 'language',
      interestTags: 'interest',
      status: 'status'
    }),
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? '' : 'rotate-icon']
    }
  },
  methods: {
    ...mapActions(['setLanguage', 'setInterest', 'setStatus', 'joinRandomRoom']),
    async handleChat() {
      const res = await this.joinRandomRoom()
      const { code, message } = res
      if (code) {
        this.$$Message.error(message)
        return
      }
      this.$router.push('/chat')
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse()
    }
  },
  mounted() {
    if (this.status !== 'disconnect') {
      // this.setStatus('disconnect') // Update match status to disconnect.
      this.$router.push('/chat')
    }
  }
};
</script>
