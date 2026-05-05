import http from './http'

interface ApiDefinition {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}

export const request = <TRes, TReq = undefined>(
  definition: ApiDefinition,
  data?: TReq,
) => http.request<TRes>({ url: definition.url, method: definition.method, data }).then((res) => res.data)
