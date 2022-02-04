import api from '../apiUtil'

const stateInit = {
  Device: {
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

export default {
  state: {
    DeviceList: [],
    Device: { ...stateInit.Device },
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
    InputMode: null //입력모드 (등록 : insert, 수정 : update)
  },
  getters: {
    DeviceList: state => state.DeviceList,
    Device: state => state.Device,
    DeviceInsertedResult: state => state.InsertedResult,
    DeviceUpdatedResult: state => state.UpdatedResult,
    DeviceDeletedResult: state => state.DeletedResult,
    DeviceInputMode: state => state.InputMode
  },
  mutations: {
    setDeviceList(state, data) {
      state.DeviceList = data
    },
    setDevice(state, data) {
      state.Device = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    actDeviceList(context, payload) {
      // console.log('actDeviceList')
      const deviceList = [
        {
          id: 1,
          name: 'Edge1',
          deviceModelName: 'E001',
          manufacturer: 'UVA',
          location: 'Lab1',
          edgeSerialNumber: 'EU001A',
          networkInterface: '인터페이스1',
          networkConfig: 'AA',
          desctiption: '에지1테스트',
          createdAt: '2021-12-26'
        },
        {
          id: 2,
          name: 'Edge2',
          deviceModelName: 'E002',
          manufacturer: 'UVB',
          location: 'Lab2',
          edgeSerialNumber: 'EU002B',
          networkInterface: '인터페이스2',
          networkConfig: 'BB',
          desctiption: '에지2테스트',
          createdAt: '2021-12-26'
        },
        {
          id: 3,
          name: 'Edge3',
          deviceModelName: 'E003',
          manufacturer: 'UVC',
          location: 'Lab1',
          edgeSerialNumber: 'EU003C',
          networkInterface: '인터페이스3',
          networkConfig: 'CC',
          desctiption: '에지3테스트',
          createdAt: '2021-12-26'
        }
      ]
      context.commit('setDeviceList', deviceList)
    },
    actDeviceInsert(context, payload) {
      console.log('actDeviceInsert', payload)
      context.commit('setInsertedResult', null)
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      })
    },
    actDeviceInit(context, payload) {
      // console.log('actDeviceInit', payload)
      context.commit('setDevice', { ...stateInit.Device })
    },
    actDeviceInputMode(context, payload) {
      // console.log('actInputMode', payload)
      context.commit('setInputMode', payload)
    },
    actDeviceInfo(context, payload) {
      context.commit('setDevice', { ...stateInit.Device })
      setTimeout(() => {
        const deviceList = [
          {
            id: 1,
            name: 'Edge1',
            deviceModelName: 'E001',
            manufacturer: 'UVA',
            location: 'Lab1',
            edgeSerialNumber: 'EU001A',
            networkInterface: '인터페이스1',
            networkConfig: 'AA',
            desctiption: '에지1테스트',
            createdAt: '2021-12-26'
          },
          {
            id: 2,
            name: 'Edge2',
            deviceModelName: 'E002',
            manufacturer: 'UVB',
            location: 'Lab2',
            edgeSerialNumber: 'EU002B',
            networkInterface: '인터페이스2',
            networkConfig: 'BB',
            desctiption: '에지2테스트',
            createdAt: '2021-12-26'
          },
          {
            id: 3,
            name: 'Edge3',
            deviceModelName: 'E003',
            manufacturer: 'UVC',
            location: 'Lab1',
            edgeSerialNumber: 'EU003C',
            networkInterface: '인터페이스3',
            networkConfig: 'CC',
            desctiption: '에지3테스트',
            createdAt: '2021-12-26'
          }
        ]
        let device = { ...stateInit.device }
        for (let i = 0; i < deviceList.length; i += 1) {
          if (payload === deviceList[i].id) {
            device = { ...deviceList[i] }
          }
        }
        context.commit('setDevice', device)
      }, 300)
    },
    actDeviceUpdate(context, payload) {
      console.log('actDeviceUpdate', payload)
      context.commit('setUpdatedResult', null)
      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300)
    },
    actDeviceDelete(context, payload) {
      console.log('actDeviceDelete', payload)
      context.commit('setDeletedResult', null)
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300)
    }
  }
}
