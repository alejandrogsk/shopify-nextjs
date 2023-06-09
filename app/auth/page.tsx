import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import  { SignInForm, SignUpForm } from '@/components/Auth/Forms'
import Wrapper from '@/components/layout/Wrapper'
const page = async () => {
  const cookieStore = cookies()
  const token = cookieStore.has("token")

  if(token){
    redirect('/')
  }

  return (
    <Wrapper >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 min-h-screen py-4 md:py-20'>
        <SignInForm />
        <SignUpForm />
      </div>
    </Wrapper>
  )
}
export default page