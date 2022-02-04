<template>
  <div>
    <h1>장비관리</h1>
    <div style="margin: 5px">
      <b-row>
        <b-col style="text-align: left">
          <b-input-group style="width: 300px">
            <b-form-input
              v-model="searchParams"
              placeholder="검색"
              size="sm"
              @keyup.ctrl.enter="searchDeviceList"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" size="sm" @click="searchDeviceList">검색</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col style="text-align: right">
          <b-button variant="success" size="sm" @click="onClickAddNew">신규 등록</b-button>
        </b-col>
      </b-row>
    </div>
    <b-table striped hover :items="deviceList" :fields="fields">
      <template #cell(updateBtn)="data">
        <b-button variant="success" size="sm" @click="onClickEdit(data.item.id)">수정</b-button>
      </template>
      <template #cell(deleteBtn)="data">
        <b-button variant="danger" size="sm" @click="onClickDelete(data.item.id)">삭제</b-button>
      </template>
    </b-table>
    <inform />
  </div>
</template>

<script>
import inform from './inform.vue'
export default {
  components: {
    inform: inform
  },
  data() {
    return {
      searchParams: '',
      fields: [
        { key: 'id', label: 'id' },
        { key: 'name', label: '장비이름' },
        { key: 'deviceModelName', label: '장비모델명' },
        { key: 'manufacturer', label: '모델명' },
        { key: 'location', label: '설치위치' },
        { key: 'edgeSerialNumber', label: '시리얼 넘버' },
        { key: 'networkInterface', label: '인터페이스' },
        { key: 'createdAt', label: '등록일' },
        { key: 'updateBtn', label: '수정' },
        { key: 'deleteBtn', label: '삭제' }
      ]
    }
  },
  computed: {
    deviceList() {
      return this.$store.getters.DeviceList
    },
    insertedResult() {
      return this.$store.getters.DeviceInsertedResult
    },
    updatedResult() {
      return this.$store.getters.DeviceUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.DeviceDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
          this.searchDeviceList()
        } else {
          this.$bvToast.toast('등록 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
          this.searchDeviceList()
        } else {
          this.$bvToast.toast('수정 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
          this.searchDeviceList()
        } else {
          this.$bvToast.toast('삭제 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchDeviceList()
  },
  methods: {
    searchDeviceList() {
      console.log('searchDeviceList', this.searchParams)
      this.$store.dispatch('actDeviceList', this.searchParams)
    },
    onClickAddNew() {
      this.$store.dispatch('actDeviceInputMode', 'insert')
      this.$store.dispatch('actDeviceInit')
      this.$bvModal.show('modal-User-inform')
    },
    onClickEdit(id) {
      this.$store.dispatch('actDeviceInputMode', 'update')
      this.$store.dispatch('actDeviceInfo', id)
      this.$bvModal.show('modal-User-inform')
    },
    onClickDelete(id) {
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actDeviceDelete', id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
