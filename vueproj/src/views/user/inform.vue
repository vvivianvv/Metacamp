<template>
  <div>
    <b-modal
      id="modal-user-inform"
      :title="`사용자 ${inputMode === 'insert' ? '등록' : '수정'}`"
      @ok="onSubmit"
      @cancel="onCancel"
    >
      {{ inputMode }}
      <b-form-group v-if="inputMode === 'update'" label-cols="3" label="ID" label-for="id">
        <b-form-input id="id" v-model="user.id" disabled></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="부서" label-for="departmentId">
        <b-form-select v-model="user.departmentId" :options="departmentList" value-field="id" text-field="name">
          <template #first>
            <b-form-select-option :value="null">-- 부서를 선택해 주세요 --</b-form-select-option>
          </template>
          <!-- select의 맨첫 화면에 부서 선택 문구를 띄워주기 위해 template추가했엉 -->
        </b-form-select>
      </b-form-group>
      <b-form-group label-cols="3" label="이름" label-for="name">
        <b-form-input id="name" v-model="user.name"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="아이디" label-for="userid">
        <b-form-input id="userid" v-model="user.userid"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="비밀번호" label-for="password">
        <b-form-input id="password" v-model="user.password" type="password"></b-form-input>
        <!-- password 별표?로 뜨게 하려면 type="password" 넣어주면 돼-->
      </b-form-group>
      <b-form-group label-cols="3" label="사용자권한" label-for="role">
        <b-form-radio-group v-model="user.role" :options="userRole.options"></b-form-radio-group>
      </b-form-group>
      <b-form-group label-cols="3" label="이메일" label-for="email">
        <b-form-input id="email" v-model="user.email"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="전화번호" label-for="phone">
        <b-form-input id="phone" v-model="user.phone"></b-form-input>
      </b-form-group>
      <b-form-group v-if="inputMode === 'update'" label-cols="3" label="등록일시" label-for="createdAt">
        <b-form-input id="createdAt" v-model="user.createdAt" disabled></b-form-input>
        <!-- disabled만 써두면 :disabled="true" 와 동일!!! 
      :disabled="user.role==='leader' ? false:true" 삼항연산자 사용하면 된다는데...-->
      </b-form-group>
    </b-modal>
    <!-- {{ infoData }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: null,
        departmentId: null,
        name: null,
        userid: null,
        password: null,
        role: null,
        email: null,
        phone: null,
        updatedPwDate: null,
        createdAt: null
      },
      userRole: {
        default: 'member',
        options: [
          { value: 'leader', text: '팀장' },
          { value: 'member', text: '팀원' }
        ] //options를 userRole 속에 넣었기 때문에 radio파트에서 options에 userRole.options를 넣어줘야 해! => undefine이라고 뜬 이유!
      }
      // DepartmentList: [
      //   { id: 1, name: '개발팀', code: 'dev', description: '개발팀 테스트', createdAt: '2021-12-01T00:00:00.000Z' },
      //   { id: 2, name: '영업팀', code: 'sales', description: '영업팀 테스트', createdAt: '2021-12-01T00:00:00.000Z' }
      // ]
    }
  },
  computed: {
    inputMode() {
      return this.$store.getters.UserInputMode
    },
    departmentList() {
      return this.$store.getters.DepartmentList
    },
    infoData() {
      //변경시점을 watch로 감지 가능..
      // watch에 같은 이름인 infoData로 변경값 감지하게 해주면
      // =>user에 값을 넣어주고... 뜨게 됨
      return this.$store.getters.User
    }
  },
  //value는 watch가 변화시점에 감지한 값!
  // 여기서는 computed의 infoData에 있는 getters.User
  watch: {
    infoData(value) {
      console.log('watch.infoData', value)
      this.user = { ...value }
      this.setDefaultValues()
    }
  },
  // created(){
  //   this.user.role='member' //사용자 권한 초기값 주기
  // }
  created() {
    // console.log('inform created')
    this.user = { ...this.infoData }
    this.setDefaultValues()
    this.$store.dispatch('actDepartmentList')
  },
  methods: {
    onSubmit() {
      // console.log('onSubmit') //('onSubmit',  { ...this.user }) 이렇게 콘솔에서 열기 귀찮으니까 전개연산자 써주는 것도 가능
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actUserInsert', this.user)
      }
      if (this.inputMode === 'update') {
        this.$store.dispatch('actUserUpdate', this.user)
      }
    },
    onCancel() {
      console.log('onCancel')
      // if (this.inputMode === 'insert') {
      //   this.$store.dispatch('actUserInsert', null)
      // }
      // if (this.inputMode === 'update') {
      //   this.$store.dispatch('actUserUpdate', null)
      // }
      // this.$store.dispatch('actUserInsert', null) //cancel시 실패메세지 띄우는거 해볼래!
      // insertedResult에 value=0으로 들어가게 하면 될 것 같아 !
    },
    setDefaultValues() {
      //초기값 세팅
      if (this.inputMode === 'insert') {
        this.user.role = this.userRole.default
      }
      // v-model은 선택된 값을 넘기기 위한 필드에 v-model로 맵핑해주는거야!!!
      // 그래서 맵핑 후 user.role이 바뀌어있고,
      // 그걸 다시 default값으로 바꿔주는 함수
    }
  }
}
</script>

<style lang="scss" scoped></style>
