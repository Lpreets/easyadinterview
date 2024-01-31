import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

type AuthProps = {
    middleware?: string;
    redirectIfAuthenticated?: string;
  };
  
  type User = {
    email_verified_at?: string;
  };
  
  type Error = {
    response: {
      status: number;
      data: {
        errors: string[];
      };
    };
  };
  
  type ActionProps = {
    email?: string;
    [key: string]: any;
  };
  
  export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps = {}) => {
    const router = useRouter()
    const params = useParams()
  
    const { data: user, error, mutate } = useSWR<User, Error>('/api/user', () =>
      axios
        .get('/api/user')
        .then(res => res.data)
        .catch(error => {
          if (error.response.status !== 409) throw error
  
          router.push('/verify-email')
        }),
    )
  
    const csrf = () => axios.get('/sanctum/csrf-cookie')
  
    const register = async ({ setErrors, ...props }: ActionProps) => {
      await csrf()
  
      axios
        .post('/register', props)
        .then(() => mutate())
        .catch(error => {
          if (error.response.status !== 422) throw error
        })
    }
  
    const login = async ({ setErrors, setStatus, ...props }: ActionProps) => {
      await csrf()
  
      axios
        .post('/login', props)
        .then(() => mutate())
        .catch(error => {
          if (error.response.status !== 422) throw error
  
          setErrors(error.response.data.errors)
        })
    }
  
    const forgotPassword = async ({ setErrors, setStatus, email }: ActionProps) => {
      await csrf()
  
      setErrors([])
      setStatus(null)
  
      axios
        .post('/forgot-password', { email })
        .then(response => setStatus(response.data.status))
        .catch(error => {
          if (error.response.status !== 422) throw error
  
          setErrors(error.response.data.errors)
        })
    }
  
    const resetPassword = async ({ setErrors, setStatus, ...props }: ActionProps) => {
      await csrf()
  
      setErrors([])
      setStatus(null)
  
      axios
        .post('/reset-password', { token: params.token, ...props })
        .then(response =>
          router.push('/login?reset=' + btoa(response.data.status)),
        )
        .catch(error => {
          if (error.response.status !== 422) throw error
  
          setErrors(error.response.data.errors)
        })
    }
  
    const resendEmailVerification = ({ setStatus }: { setStatus: (status: string) => void }) => {
      axios
        .post('/email/verification-notification')
        .then(response => setStatus(response.data.status))
    }
  
    const logout = async () => {
      if (!error) {
        await axios.post('/logout').then(() => mutate())
      }
  
      window.location.pathname = '/'
    }
  
    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
          redirectIfAuthenticated && router.push(redirectIfAuthenticated)
        if (
          window.location.pathname === '/verify-email' &&
          user?.email_verified_at
        )
          redirectIfAuthenticated && router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
      }, [user, error])
  
    return {
      user,
      register,
      login,
      forgotPassword,
      resetPassword,
      resendEmailVerification,
      logout,
    }
  }