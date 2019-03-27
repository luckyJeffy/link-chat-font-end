<style rel="stylesheet/scss" lang="scss" scoped>
.match-modal-content {
  text-align: center;
  color: #24292d;
  .rate-page {
    .rate-page-wrap {
      padding: 10px 0;
      h3 {
        padding: 10px 0;
      }
      .p-wrap {
        padding: 10px 16px;
        font-size: 14px;
        p:not(:first-of-type) {
          margin-top: 5px;
        }
        span {
          text-decoration: underline;
        }
      }
    }
  }
  .edit-page {
    .icon-wrap {
      text-align: left;
      i {
        padding: 1rem;
      }
    }
    .edit-page-wrap {
      padding: 0 1rem;
      margin-bottom: 30px;
      // Style for third party component
      /deep/ .vue-tags-input {
        margin: 10px 0;
        max-width: 100% !important;
        font-size: 14px;
        .ti-input {
          border: 1px solid #24292d;
          border-radius: 6px;
          input::-webkit-input-placeholder {
            color: #24292d;
          }
        }
      }
      // Style for third party component
      /deep/ .ivu-select {
        padding: 2px;
        margin: 10px 0;
        color: #24292d;
        font-size: 14px;
        border: 1px solid #24292d;
        border-radius: 6px;
        input {
          color: #24292d;
        }
        input::-webkit-input-placeholder {
          color: #24292d;
        }
        .ivu-select-selection {
          border: none;
          input {
            font-size: 14px;
          }
          i {
            color: #24292d;
          }
        }
        .ivu-select-item {
          color: #24292d;
        }
      }
    }
  }
  .buttons-wrap {
    display: flex;
    flex: 0 1 auto;
    width: 100%;
    border-top: 1px solid #24292d;
    button {
      flex: 1;
      font-size: 14px;
      background: transparent;
      padding: 0;
      margin: 0;
      border: 0;
      cursor: pointer;
      box-sizing: border-box;
      line-height: 48px;
      height: 48px;
      outline: none;
    }
    .unavailable {
      color: #999999;
    }
    button:not(:first-of-type) {
      border-left: 1px solid #24292d;
    }
  }
}
</style>

<template>
  <div class="match-modal-content">
    <div
      class="rate-page"
      v-if="displayRatePage"
    >
      <div class="rate-page-wrap">
        <h3>Please rate the chat</h3>
        <i-rate
          v-model="rate"
          icon="ios-heart"
        />
        <div class="p-wrap">
          <p>You can tap “Save log ” button get a link to this chat history if you like.</p>
          <p>If you want to edit your interest thing, <span @click="changeDisplayStatus">please click here.</span></p>
        </div>
      </div>
      <div class="buttons-wrap">
        <button class="unavailable">Save log(unavailable)</button>
        <button>Next</button>
      </div>
    </div>
    <div
      class="edit-page"
      v-else
    >
      <div class="icon-wrap">
        <i-icon
          @click="changeDisplayStatus"
          type="md-arrow-back"
          size="24"
        />
      </div>
      <div class="edit-page-wrap">
        <h3>Language</h3>
        <i-select
          :value="selectedLanguage"
          filterable
          @on-change="setLanguage"
        >
          <i-option
            v-for="item in languageList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</i-option>
        </i-select>
        <h3>Edit your interests</h3>
        <vue-tags-input
          v-model="interestTag"
          :tags="interestTags"
          placeholder="Add your interest here (optional)"
          @tags-changed="setInterest"
        />
      </div>
      <div class="buttons-wrap">
        <button>Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueTagsInput from '@johmun/vue-tags-input';
import { listForSelect as languageList } from '@/utils/languageList'

export default {
  components: {
    VueTagsInput
  },
  data() {
    return {
      displayRatePage: true,
      rate: 0,
      interestTag: '',
      languageList
    }
  },
  computed: {
    ...mapGetters({
      'selectedLanguage': 'language',
      'interestTags': 'interest'
    }),
  },
  methods: {
    ...mapActions(['setLanguage', 'setInterest']),
    changeDisplayStatus() {
      this.displayRatePage = !this.displayRatePage
    }
  }
}
</script>
