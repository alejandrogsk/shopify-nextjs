import  { SignInForm, SignUpForm } from '@/components/Auth/Forms'
import Wrapper from '@/components/layout/Wrapper'
const page = async () => {
  return (
    <main className='min-h-screen'>
      <Wrapper >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 py-4 md:py-20'>
        <SignInForm />
        <SignUpForm />
      </div>
    </Wrapper>
    </main>
  )
}
export default page