import { NavigateFunction } from 'react-router-dom'

export type LoginPayload = {
  username: string
  password: string
  navigate: NavigateFunction
}

export type LoginSuccessPayload = {
  username: string
}

export type User = {
  username: string
}
