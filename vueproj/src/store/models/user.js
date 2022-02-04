import api from '../apiUtil'

//초기값 선언
const stateInit = {
  User: {
    id: null,
    departmentId: null,
    name: null,
    userid: null,
    password: null,
    role: null,
    email: null,
    phone: null,
    updatedPwDate: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    UserList: [],
    User: { ...stateInit.User },
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
    InputMode: null //입력모드 (등록: insert, 수정: update)
  },
  getters: {
    UserList: state => state.UserList,
    User: state => state.User,
    UserInsertedResult: state => state.InsertedResult,
    UserUpdatedResult: state => state.UpdatedResult,
    UserDeletedResult: state => state.DeletedResult,
    UserInputMode: state => state.InputMode
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
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
    actUserList(context, payload) {
      //사용자 리스트
      // console.log('actUserList', payload)
      // const UserList = [
      //   {
      //     id: 1,
      //     departmentId: 1,
      //     name: '홍길동',
      //     userid: 'hong',
      //     role: 'leader',
      //     email: 'hong@email.com',
      //     phone: '010-1234-5678',
      //     createdAt: '2021-12-01T00:00:00.000Z',
      //     Department: { id: 1, name: '개발팀', code: 'dev', createdAt: '2021-12-01T00:00:00.000Z' }
      //   },
      //   {
      //     id: 2,
      //     departmentId: 2,
      //     name: '김길동',
      //     userid: 'kim',
      //     role: 'member',
      //     email: 'kim@email.com',
      //     phone: '010-9876-5432',
      //     createdAt: '2021-12-01T00:00:00.000Z',
      //     Department: { id: 2, name: '영업팀', code: 'sales', createdAt: '2021-12-01T00:00:00.000Z' }
      //   }
      // ]
      // context.commit('setUserList', UserList)
      // payload(검색어)를 받은 후에 UserList를 날려줌
      api
        .get('/serverApi/users')
        .then(response => {
          const userList = response && response.data
          context.commit('setUserList', userList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserList.error', error)
          context.commit('setUserList', [])
        })
    },
    actUserInsert(context, payload) {
      // console.log('actUserInsert', payload)
      //결과값 초기화
      context.commit('setInsertedResult', null)
      //백엔드 호출(결과값 수신)=>watch를 통해 감시하려면 null->1로 감지가 되어야 해!
      // 그래서 테스트용으로 시간을 delay 시켜서 확인
      // if (payload === null) {
      //   setTimeout(() => {
      //     const insertedResult = 0
      //     context.commit('setInsertedResult', insertedResult)
      //   }, 300)
      // } else {
      // setTimeout(() => {
      //   const insertedResult = 1
      //   context.commit('setInsertedResult', insertedResult)
      // }, 300)
      // // }
      //결과값 세팅
      api
        .post('/serverApi/users', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    //초기화
    actUserInit(context, payload) {
      context.commit('setUser', { ...stateInit.User })
      // context.commit('setUser', stateInit.User)
      // 같은 내용인데 왜 전개연산자를 써줄까?
      // 사실은 같지 않아 ~!!!
      // 전개시 값 만 복사 , 아래와 같이 쓰면 메모리 주소 복사
    },
    actUserInputMode(context, payload) {
      //입력모드 설정
      // console.log('actUserInputMode')
      context.commit('setInputMode', payload)
    },
    //사용자 정보 조회
    actUserInfo(context, payload) {
      // 상태값 초기화
      context.commit('setUser', { ...stateInit.User })

      /* 테스트 데이터 세팅 */
      // setTimeout(() => {
      //   const UserList = [
      //     {
      //       id: 1,
      //       departmentId: 1,
      //       name: '홍길동',
      //       userid: 'hong',
      //       role: 'leader',
      //       email: 'hong@email.com',
      //       phone: '010-1234-5678',
      //       updatedPwDate: '2021-12-01T00:00:00.000Z',
      //       createdAt: '2021-12-01T00:00:00.000Z',
      //       Department: { id: 1, name: '개발팀', code: 'dev', createdAt: '2021-12-01T00:00:00.000Z' }
      //     },
      //     {
      //       id: 2,
      //       departmentId: 2,
      //       name: '김길동',
      //       userid: 'kim',
      //       role: 'member',
      //       email: 'kim@email.com',
      //       phone: '010-9876-5432',
      //       updatedPwDate: '2021-12-01T00:00:00.000Z',
      //       createdAt: '2021-12-01T00:00:00.000Z',
      //       Department: { id: 2, name: '영업팀', code: 'sales', createdAt: '2021-12-01T00:00:00.000Z' }
      //     }
      //   ]

      //   let User = { ...stateInit.User }
      //   for (let i = 0; i < UserList.length; i += 1) {
      //     if (payload === UserList[i].id) {
      //       User = { ...UserList[i] }
      //     }
      //   }
      //   context.commit('setUser', User) //setTimeout을 하는 이유는 초기화를통해 이전 데이터를 초기화해주고 띄우려고... 아니면 재수없음 네트워크가 끊길수도 있대
      // }, 300)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/users/${payload}').then(response => {
        const User = response && response.user
        context.commit('setUser', User)
      })
      */
      api
        .get(`/serverApi/users/${payload}`)
        .then(response => {
          const user = response && response.data
          context.commit('setUser', user)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInfo.error', error)
          context.commit('setUser', -1)
        })
    },
    actUserUpdate(context, payload) {
      // console.log('actUserUpdate', payload)
      //결과값 초기화
      context.commit('setUpdatedResult', null)
      //백엔드 호출(결과값 수신)=>watch를 통해 감시하려면 null->1로 감지가 되어야 해!
      // 그래서 테스트용으로 시간을 delay 시켜서 확인
      // if (payload === null) {
      //   setTimeout(() => {
      //     const updatedResult = 0
      //     context.commit('setUpdatedResult', updatedResult)
      //   }, 300)
      // } else {
      // setTimeout(() => {
      //   const updatedResult = 1
      //   context.commit('setUpdatedResult', updatedResult)
      // }, 300)
      // }
      api
        .put(`/serverApi/users/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.length > 0 && response.data[0]
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    actUserDelete(context, payload) {
      // console.log('actUserDelete', payload)
      context.commit('setDeletedResult', null)
      // setTimeout(() => {
      //   const deletedResult = 1
      //   context.commit('setDeletedResult', deletedResult)
      // }, 300)
      /* RestAPI 호출 */
      api
        .delete(`/serverApi/users/${payload}`)
        .then(response => {
          const deletedResult = response && response.data
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
