import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ErrorBoundary, Loader } from '@/components/common'
import { MainLayout, ProtectedLayout, UnauthorizedLayout } from '@/layouts'
import { EditProfile, Login, Main, Profile, Signup } from '@/pages'

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Main />} />
              <Route path="/users/:userId" element={<Profile />} />
              <Route path="/users/:userId/edit" element={<EditProfile />} />
            </Route>
          </Route>
          <Route element={<UnauthorizedLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
