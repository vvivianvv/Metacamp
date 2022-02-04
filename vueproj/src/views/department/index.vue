<template>
  <div>
    <h1>부서관리</h1>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col style="text-align: left">
          <b-button variant="primary" size="sm" @click="searchDepartmentList">검색</b-button>
        </b-col>
        <b-col style="text-align: right"
          ><b-button variant="success" size="sm" @click="onClickAddNew">신규등록</b-button></b-col
        >
      </b-row>
    </div>
    <div>
      <!-- {{ departmentList }}  //departmentList 객체 보여줘 -->
      <b-table small hover striped :items="departmentList" :fields="fields">
        <!-- small hover striped는 속성!!! small=== :small="true" 동일함!!! 
        기본값 외에 추가옵션(?)을 넣고싶을때는 후자와 같이 써서 바꿔준다-->
        <!-- :striped="isStriped" -->
        <template #cell(createdAt)="row">
          {{ row.item.createdAt.substring(0, 10) }}
          <!-- template 속의 것은 createdAt의 단위를 연 월 일 까지로 자르라는 소리 
          substring(0, 10)은 string을 0부터 10까지 잡아라-->
        </template>
        <template #cell(updateBtn)="row">
          <b-button size="sm" variant="success" @click="onClickEdit(row.item.id)">수정</b-button>
        </template>
        <template #cell(deleteBtn)="row">
          <!-- {{ row }} -->
          <!-- {{ row.item.id }} -->
          <b-button size="sm" variant="danger" @click="onClickDelete(row.item.id)">삭제</b-button>
        </template>
      </b-table>
    </div>
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
      // bootstrap table에 field를 넣어주기 위한 것!
      // key값은 b-table에 설정된 item(여기서는 departmentList객체 의 key값(key:value))의 key값
      // key값이 같은 것을 매칭시켜서 보여줌! 없는 data값의 필드를 만들면 공란으로 뜨고,
      // 데이터가 있지만 field를 만들어주지 않으면 보여주지 않음
      // 데이터가 없는 필드는 template으로 잡아서 ex)수정 버튼 만든것처럼! 할 수 있어!!!
      fields: [
        { key: 'id', label: 'id' },
        { key: 'name', label: '부서명' },
        { key: 'code', label: '부서코드' },
        { key: 'createdAt', label: '생성일' },
        { key: 'updateBtn', label: '수정' },
        { key: 'deleteBtn', label: '삭제' }
      ]
      // isStriped: true
    }
  },
  computed: {
    departmentList() {
      return this.$store.getters.DepartmentList
    },
    insertedResult() {
      return this.$store.getters.DepartmentInsertedResult
    },
    updatedResult() {
      return this.$store.getters.DepartmentUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.DepartmentDeletedResult
    }
  },
  // insertedResult 가 null->1 되는 순간 watch가 감지, value에 1이 들어가고 메세지를 띄우거나/안띄우거나 결정됨
  watch: {
    insertedResult(value) {
      // 등록 후 처리
      // null이 아닌 경우만을 취급함
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
          this.searchDepartmentList()
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
    // 현재상태에서는 수정 실패 메세지는 볼 수 없어!!!
    // why? 지금 ok로 onsubmit 할경우 actions의 actUpdatedResult로 들어가게 되고,
    // 그 속의 setTimeout에서 updatedResult 값을 1로 반환하게 설정해놨기 때문에
    // value가 무조건 >0 이 됨!!!
    // 실패 메세지를 보고싶으면 const updatedResult= -1 같이 0보다 작은 값을 설정해보면 됨!!!
    updatedResult(value) {
      // 등록 후 처리
      // null이 아닌 경우만을 취급함
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
          this.searchDepartmentList()
        } else {
          // 등록이 실패한 경우
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
          this.searchDepartmentList()
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
    this.searchDepartmentList()
  },
  methods: {
    searchDepartmentList() {
      // this.isStriped = !this.isStriped
      this.$store.dispatch('actDepartmentList')
    },
    onClickAddNew() {
      // 신규등록
      // this.$bvModal.show('modal-department-inform')
      // 모달을 띄움!!!
      // 1. 입력모드 설정
      this.$store.dispatch('actDepartmentInputMode', 'insert')
      // 2. 상세정보 초기화
      this.$store.dispatch('actDepartmentInit')
      //3. 모달 출력
      this.$bvModal.show('modal-department-inform')
    },
    onClickEdit(id) {
      //(수정을 위한)상세정보
      // console.log('onClickEdit', id)
      //1. 입력모드 설정
      this.$store.dispatch('actDepartmentInputMode', 'update')
      //2. 상세정보 호출
      this.$store.dispatch('actDepartmentInfo', id)
      //3. 모달 출력
      this.$bvModal.show('modal-department-inform')
    },
    onClickDelete(id) {
      console.log('onClickDelete', id)
      this.$bvModal.msgBoxConfirm('삭제하시겠습니까?').then(value => {
        // console.log('msgConfirm', value)
        if (value) {
          this.$store.dispatch('actDepartmentDelete', id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
