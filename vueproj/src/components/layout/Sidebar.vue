<template>
  <div>
    <b-list-group>
      <b-list-group-item
        href="#"
        :disabled="this.$route.path === '/dashboard'"
        :style="this.$route.path === '/dashboard' ? 'background-color:#755cd6;color:white' : 'background-color:white '"
        @click="$router.push('/dashboard')"
        >대시보드</b-list-group-item
      >
      <!-- <b-list-group-item
        href="#"
        :disabled="this.$route.path === '/dashboard'"
        style="background-color: #755cd6; color: white"
        @click="$router.push('/dashboard')"
        >대시보드</b-list-group-item
      > -->
      <b-list-group-item
        href="#"
        :disabled="this.$route.path === '/department'"
        :style="this.$route.path === '/department' ? 'background-color:#755cd6;color:white' : 'background-color:white '"
        @click="$router.push('/department')"
        >부서 관리</b-list-group-item
      >
      <b-list-group-item
        href="#"
        :disabled="this.$route.path === '/user'"
        :style="this.$route.path === '/user' ? 'background-color:#755cd6;color:white' : 'background-color:white '"
        @click="$router.push('/user')"
        >사용자 관리</b-list-group-item
      >
      <b-list-group-item
        href="#"
        :disabled="this.$route.path === '/device'"
        :style="this.$route.path === '/device' ? 'background-color:#755cd6;color:white' : 'background-color:white '"
        @click="$router.push('/device')"
        >장비 관리</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
