import AppContainer from 'components/AppContainer/AppContainer'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from 'redux/store'
import { login } from 'features/auth/auth-slice'
import classNames from 'classnames'
import Spinner from 'components/Spinner/Spinner'

type LoginProps = {}

type FormInputs = {
  username: string
  password: string
}

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

const Login = (props: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  })

  const auth = useSelector((state: RootState) => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function onSubmit(data: FormInputs) {
    const loginPayload = {
      ...data,
      navigate,
    }
    dispatch(login(loginPayload))
  }

  const loginButtonClasses = useMemo(() => {
    return classNames('mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md', {
      'opacity-50 cursor-not-allowed': auth.isLoading,
    })
  }, [auth.isLoading])

  const spinner = auth.isLoading && <Spinner/>

  return (
    <AppContainer>
      <div className="relative py-3 sm:max-w-xl mx-auto text-center">
        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
          <div className="h-2 bg-indigo-400 rounded-t-md"></div>
          <div className="py-10 px-8">
            <h5 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">
              Sign in to our platform
            </h5>
            <label className="block text-md font-medium text-gray-900">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              {...register('username')}
            />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.username?.message}
            </p>
            <label className="block mt-3 block text-md font-medium text-gray-900">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              {...register('password')}
            />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.password?.message}
            </p>
            <div className="flex justify-between items-baseline">
              <button
                className={loginButtonClasses}
                onClick={handleSubmit(onSubmit)}
              >
                Login {spinner}
              </button>
              <Link to="/" className="text-sm hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  )
}

export default Login
