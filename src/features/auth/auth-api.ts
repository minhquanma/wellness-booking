import axiosInstance from 'utils/api-service'
import { LoginPayload } from './auth-types'

const LOGIN_API_URL =
  'https://dfljauq3a1.execute-api.ap-southeast-1.amazonaws.com/default/DeveloperTest_Login'

export async function loginApi(payload: LoginPayload) {
  return await axiosInstance.post(LOGIN_API_URL, payload)
}
