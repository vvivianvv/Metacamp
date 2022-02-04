<template>
  <div>
    <b-modal id="modal-User-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="ID" label-for="id" label-cols="3">
          <b-form-input id="id" v-model="device.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="장비 이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="device.name"></b-form-input>
        </b-form-group>
        <b-form-group label="장비 모델명" label-for="deviceModelName" label-cols="3">
          <b-form-input id="deviceModelName" v-model="device.deviceModelName"></b-form-input>
        </b-form-group>
        <b-form-group label="모델명" label-for="manufacturer" label-cols="3">
          <b-form-input id="manufacturer" v-model="device.manufacturer"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="3" label="설치 위치" label-for="location">
          <b-form-select v-model="device.location" :options="locationList.options">
            <template #first>
              <b-form-select-option :value="null">-- 위치를 선택해 주세요 --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <!-- <b-form-group label="설치 위치" label-for="location" label-cols="3">
          <b-form-input id="location" v-model="device.location"></b-form-input>
        </b-form-group> -->
        <b-form-group label="시리얼 넘버" label-for="edgeSerialNumber" label-cols="3">
          <b-form-input id="edgeSerialNumber" v-model="device.edgeSerialNumber"></b-form-input>
        </b-form-group>
        <b-form-group label="인터페이스" label-for="networkInterface" label-cols="3">
          <b-form-input id="networkInterface" v-model="device.networkInterface"></b-form-input>
        </b-form-group>
        <b-form-group label="통신설정정보" label-for="networkConfig" label-cols="3">
          <b-form-input id="networkConfig" v-model="device.networkConfig"></b-form-input>
        </b-form-group>
        <b-form-group label="상세설명" label-for="description" label-cols="3">
          <b-form-textarea id="description" v-model="device.description" rows="2" />
        </b-form-group>
        <b-form-group v-if="inputMode === 'update'" label="등록일" label-for="createdAt" label-cols="3">
          <b-form-input id="createdAt" v-model="device.createdAt" disabled></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locationList: {
        options: [
          { value: 'Lab1', text: 'Lab1' },
          { value: 'Lab2', text: 'Lab2' }
        ]
      },
      device: {
        id: null,
        name: null,
        deviceModelName: null,
        manufacturer: null,
        location: null,
        edgeSerialNumber: null,
        networkInterface: null,
        networkConfig: null,
        desctiption: null,
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      }
    }
  },
  computed: {
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '장비 정보 등록'
      }
      if (this.inputMode === 'update') {
        title = '장비 정보 수정'
      }
      return title
    },
    infoData() {
      return this.$store.getters.Device
    },
    inputMode() {
      return this.$store.getters.DeviceInputMode
    }
  },
  watch: {
    infoData(value) {
      this.device = { ...value }
    }
  },
  created() {
    this.device = { ...this.infoData }
  },

  methods: {
    onSubmit() {
      // console.log('onSubmit', this.device)
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actDeviceInsert', this.device)
      }
      if (this.inputMode === 'update') {
        this.$store.dispatch('actDeviceUpdate', this.device)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
