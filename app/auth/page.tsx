import Forms from '@/components/Auth/Forms'
import SignInImage from '@/components/Auth/SignInImage'
const page = async () => {
  return (
    <div className='text-black'>
      <div className='grid grid-cols-[300px_1fr] max-h-[28.125rem]'>
        <SignInImage />
        <Forms />
      </div>
    </div>
  )
}
export default page