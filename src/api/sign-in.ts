import { api } from '@/lib/axios'

export interface SignInRequest {
  email: string
}

export async function signIn({ email }: SignInRequest) {
  const response = await api.post('/authenticate', { email })
  if (response.data.link) {
    window.location.href = response.data.link
  }
}
