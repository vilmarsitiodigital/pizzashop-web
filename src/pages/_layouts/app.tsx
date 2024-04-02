import { isAxiosError } from 'axios'
import { useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

// import { Header } from '@/components/header'
import Sidebar from '@/components/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { api } from '@/lib/axios'

export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', {
              replace: true,
            })
          } else {
            throw error
          }
        }

        return Promise.reject(error)
      },
    )

    // Clean up the side effect when the component unmounts
    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? 'md:ml-14' : 'md:ml-64'
        } h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}
