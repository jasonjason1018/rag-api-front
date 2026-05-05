<script setup lang="ts">
import '../assets/login.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = '兩次密碼不一致'
    return
  }
  loading.value = true
  try {
    await register(username.value, email.value, password.value)
    router.push('/')
  } catch (err: any) {
    error.value = err?.response?.data?.detail ?? '註冊失敗，請稍後再試'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1>建立帳號</h1>

      <form @submit.prevent="handleSubmit">
        <div class="login-field">
          <label>帳號</label>
          <input
            v-model="username"
            type="text"
            placeholder="至少 2 個字元"
            autocomplete="username"
            required
            minlength="2"
            maxlength="64"
          />
        </div>

        <div class="login-field">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="login-field">
          <label>密碼</label>
          <input
            v-model="password"
            type="password"
            placeholder="至少 8 個字元"
            autocomplete="new-password"
            required
            minlength="8"
          />
        </div>

        <div class="login-field">
          <label>確認密碼</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="再輸入一次密碼"
            autocomplete="new-password"
            required
          />
        </div>

        <p class="login-error">{{ error }}</p>

        <button class="login-btn" type="submit" :disabled="loading">
          {{ loading ? '註冊中⋯' : '建立帳號' }}
        </button>
      </form>

      <p class="login-footer">
        已有帳號？
        <RouterLink to="/login">立即登入</RouterLink>
      </p>
    </div>
  </div>
</template>
