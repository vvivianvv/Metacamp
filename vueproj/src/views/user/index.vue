<template>
  <div>
    <h1>사용자 관리</h1>
    <div style="margin: 5px">
      <b-row>
        <b-col style="text-align: left">
          <b-input-group style="width: 300px">
            <b-form-input
              v-model="searchParams"
              placeholder="ㅇvㅇ"
              size="sm"
              @keyup.ctrl.enter="searchUserList"
            ></b-form-input>
            <b-input-group-append>
              <b-button size="sm" text="Button" variant="primary" @click="searchUserList">검색</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <b-col style="text-align: right">
          <b-button variant="success" size="sm" @click="onClickAddNew">신규 등록</b-button>
        </b-col>
      </b-row>
    </div>
    <b-table striped hover :items="userList" :fields="fields">
      <template #cell(Department)="data">
        {{ data.item.Department && data.item.Department.name }}
        <!--만약 data.item.Department가 있으면 이라는 의미임...(없어도 에러나지 않게 하려고) -->
      </template>
      <template #cell(createdAt)="data">
        {{ data.item.createdAt.substring(0, 10) }}
      </template>
      <template #cell(updateBtn)="data">
        <b-button variant="success" size="sm" @click="onClickEdit(data.item.id)">수정</b-button>
      </template>
      <template #cell(deleteBtn)="data">
        <b-button variant="danger" size="sm" @click="onClickDelete(data.item.id)">삭제</b-button>
      </template>
    </b-table>
    <!--유저 리스트 출력 -->
    <!--입력 폼-->
    <inform />
  </div>
</template>

<script>
import Inform from './inform.vue'
export default {
  components: {
    Inform //이름을 동일하게 해줄 경우 Inform: Inform 을 Inform으로 쓰는 것 인정해줘... 둘이 다른거야 컴포넌트:import 임
    //컴포넌트->div안에 넣어줄 때 케밥케이스로 바뀜 ex)InformAbc=>inform-abc ,
    //컴포넌트에서 설정해줄 때 inform-abc로 해주려면 '' 안에 넣어줘야 해 왜인지는 몰겠음 규칙이겠지 뭐...
  },
  data() {
    return {
      searchParams: '',
      fields: [
        { key: 'id', label: 'id' },
        { key: 'name', label: '이름' },
        { key: 'Department', label: '부서' },
        { key: 'userid', label: '아이디' },
        { key: 'role', label: '권한' },
        { key: 'email', label: '이메일' },
        { key: 'createdAt', label: '생성일' },
        { key: 'updateBtn', label: '수정' },
        { key: 'deleteBtn', label: '삭제' }
      ]
    }
  },
  computed: {
    userList() {
      return this.$store.getters.UserList
    },
    insertedResult() {
      return this.$store.getters.UserInsertedResult
    },
    updatedResult() {
      return this.$store.getters.UserUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.UserDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchUserList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('등록이 실패하였습니다.', {
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
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchUserList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
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
          this.searchUserList()
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
    console.log('created') //component 최초 실행시 created가 실행되는 걸 확인하기 위해 써봤어~
    this.searchUserList()
  },
  methods: {
    searchUserList() {
      // console.log('searchUserList', this.searchParams)
      this.$store.dispatch('actUserList', this.searchParams)
      // this.searchParams를 payload로 날려서 백엔드로 보내줄 수 있어!!!
      // => restAPI 에서 api.get('./users', {payload}) 이런 식으로 .. 해서 검색 가능
      // searchParams:{name:null, id:null} 이런 식으로 만들어서 payload.name 뭐 이렇게 불러오는것도 가능!
    },
    // actUserInputMode 로 입력 모드 구별 insert/update =>actions의 payload로 날려줌
    onClickAddNew() {
      // 입력모드 설정!
      this.$store.dispatch('actUserInputMode', 'insert')
      // console.log('onClickAddNew')
      //신규등록 버튼 클릭시 값 초기화
      //이걸 안해주면 수정버튼 클릭 시 들어온 데이터가 그대로 떠있어...
      this.$store.dispatch('actUserInit')
      // 입력모달 띄우기!
      this.$bvModal.show('modal-user-inform')
    },
    onClickEdit(id) {
      //1. 입력모드 설정
      this.$store.dispatch('actUserInputMode', 'update')
      // console.log('onClickEdit', id)
      //2. 사용자 정보 조회
      this.$store.dispatch('actUserInfo', id)
      //3. 입력모달 띄우기
      this.$bvModal.show('modal-user-inform')
    },
    onClickDelete(id) {
      console.log('onClickDelete', id)
      this.$bvModal.msgBoxConfirm('삭제하시겠습니까?').then(value => {
        console.log('msgConfirm', value) //ok누르면 value=true로 넘어가...
        if (value) {
          this.$store.dispatch('actUserDelete', id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
