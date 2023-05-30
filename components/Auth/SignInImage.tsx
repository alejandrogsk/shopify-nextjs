import Image from "next/image"
import SignInImageURL from "../../public/sign-in.jpg"
const SignInImage = () => {
    return(
  <div className='w-full h-auto max-h-[28.125rem]'>
            <Image src={SignInImageURL} width={300} height={600} alt="Sign In"
              className='w-full h-auto'
            />
          </div>
    )
  }
  export default SignInImage;