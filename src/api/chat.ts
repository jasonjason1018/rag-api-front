export interface QueryRequest {
  question: string
}

export interface QueryResponse {
  answer: string
}

export const queryApi = {
  url: '/query',
  method: 'POST' as const,
}
