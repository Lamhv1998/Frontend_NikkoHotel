<template>
  <div class="col-sm-container">
    <!-- Đổi mật khẩu -->
    <ChangePwd v-if="user" class="xl:col-span-5" :user="user" />

    <!-- Thông tin cơ bản -->
    <changeInfo v-if="user" class="xl:col-span-7" :user="user" @get-user-refresh="getUserRefresh" />

    <MemberStatus v-if="user" class="xl:col-span-12" :user="user" />
  </div>
</template>

<script lang="ts" setup>
import ChangePwd from './components/changePwd.vue'
import changeInfo from './components/changeInfo.vue'
import type { UserResponse } from '@/types'
import MemberStatus from './components/MemberStatus.vue'

/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

/* api */
const { getUserApi } = useApi()

// api: Lấy thông tin thành viên
const { data: user, refresh: getUserRefresh } = await getUserApi({
  server: false,
  transform(res: any): UserResponse {
    return res.result
  }
})
</script>
