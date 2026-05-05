<script setup lang="ts">
import '../assets/login.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth'

const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await login(username.value, password.value)
    router.push('/')
  } catch {
    error.value = '帳號或密碼錯誤'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1>RAG Chat</h1>

      <form @submit.prevent="handleSubmit">
        <div class="login-field">
          <label>帳號</label>
          <input
            v-model="username"
            type="text"
            placeholder="username"
            autocomplete="username"
            required
          />
        </div>

        <div class="login-field">
          <label>密碼</label>
          <input
            v-model="password"
            type="password"
            placeholder="password"
            autocomplete="current-password"
            required
          />
        </div>

        <p class="login-error">{{ error }}</p>

        <button class="login-btn" type="submit" :disabled="loading">
          {{ loading ? '登入中⋯' : '登入' }}
        </button>
      </form>

      <p class="login-footer">
        還沒有帳號？
        <RouterLink to="/register">立即註冊</RouterLink>
      </p>
    </div>
  </div>
</template>
