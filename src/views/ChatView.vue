<script setup lang="ts">
import '../assets/chat.css'
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '@/api/request'
import { queryApi } from '@/api/chat'
import type { QueryRequest, QueryResponse } from '@/api/chat'
import { logout } from '@/api/auth'

const router = useRouter()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

interface Message {
  role: 'user' | 'ai'
  content: string
}

const question = ref('')
const messages = ref<Message[]>([])
const isThinking = ref(false)
const messagesEl = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

const handleKey = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault()
    sendMessage()
  }
}

const sendMessage = async () => {
  const text = question.value.trim()
  if (!text || isThinking.value) return

  messages.value.push({ role: 'user', content: text })
  question.value = ''
  isThinking.value = true
  await scrollToBottom()

  const data = await request<QueryResponse, QueryRequest>(queryApi, { question: text })

  messages.value.push({ role: 'ai', content: data.answer })
  isThinking.value = false
  await scrollToBottom()
}
</script>

<template>
  <div class="chat-wrapper">
    <header class="chat-header">
      <h1>RAG Chat</h1>
      <button class="logout-btn" type="button" @click="handleLogout">登出</button>
    </header>

    <main ref="messagesEl" class="chat-messages">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        :class="['message', msg.role === 'user' ? 'message--user' : 'message--ai']"
      >
        <div class="message__bubble">{{ msg.content }}</div>
      </div>

      <div v-if="isThinking" class="message message--ai message--thinking">
        <div class="message__bubble">思考中⋯</div>
      </div>
    </main>

    <footer class="chat-input">
      <textarea
        @keydown="handleKey"
        v-model="question"
        rows="1"
        placeholder="輸入問題，按 Enter 送出"
      ></textarea>
      <button v-if="question" type="button" @click="sendMessage">送出</button>
    </footer>
  </div>
</template>
