<template>
  <div>
    {{ inputMode }}
    <b-modal id="modal-department-inform" :title="getTitle" @ok="onSubmit">
      <!-- <b-modal id="modal-department-inform" :title="inputMode === 'insert' ? '등록' : '수정'" @ok="onSubmit"> -->
      <!-- :속성='값 === 지정값 ? true : false  삼항연산자 -->
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="id" label-cols="3">
          <b-form-input id="id" v-model="department.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="부서이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="department.name"></b-form-input>
        </b-form-group>
        <b-form-group label="부서코드" label-for="code" label-cols="3" description="중복코드는 허용되지 않습니다.">
          <b-form-input id="code" v-model="department.code"></b-form-input>
        </b-form-group>
        <b-form-group label="상세설명" label-for="description" label-cols="3">
          <b-form-textarea id="description" v-model="department.description" rows="2" />
        </b-form-group>
        <b-form-group v-if="inputMode === 'update'" label="생성일" label-for="createdAt" label-cols="3">
          <b-form-input id="createdAt" :value="getCreatedAt" disabled></b-form-input>
          <!-- <b-form-input id="createdAt" v-model="department.createdAt" disabled></b-form-input> -->
          <!-- v-model은 변수만 입력 가능해서 substring 불가!! 하려면 :value="department.createdAt.substring(0,10)" 해줄 수 있음
          (다른 방법도 있어 보통은 변수 자체에 함수를 걸어서 전체를 통제하는 방식을 사용) 
          그런데 보통은 그렇게 안써... 여기서는 disabled를 걸어놔서 바뀌지 않기 때문에 value사용해도 되지만, 
          수정을 위해서는 v-model 사용해줘야한다구 ~!!!(데이터를 받기 위해서! 인듯?) 
          + 그리고 value를 썼을 때 error가 뜨는데(undefined.substring(0,10)으로 들어가게 돼서)
          department && department.created && department.createdAt.substring(0,10) 으로 넣어줘야 하는데
          지저분하니까 그냥 함수로 만들어서 넣어주자 -->
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: {
        id: null,
        name: null,
        code: null,
        description: null,
        createdAt: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Department
    },
    inputMode() {
      return this.$store.getters.DepartmentInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '부서정보 입력'
      } else if (this.inputMode === 'update') {
        title = '부서정보 수정'
      }
      return title
    },
    getCreatedAt() {
      return this.department.createdAt && this.department.createdAt.substring(0, 10)
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      console.log('infoData', value)
      this.department = { ...value }
    }
  },
  created() {
    console.log('created')
    // 모달이 최초 열릴때 감지됨
    this.department = { ...this.infoData }
  },
  methods: {
    onSubmit() {
      console.log('onSubmit', this.inputMode) //console1
      //1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actDepartmentInsert', this.department) // 부서입력 실행
      }
      //2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actDepartmentUpdate', this.department) //부서수정 실행
      }
    }
  }
}
</script>
