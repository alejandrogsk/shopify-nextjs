const SubmitButton = ({label="Sign In", isSubmitting}: {label?: string, isSubmitting: boolean})=> {
    return(
        <div className="pt-4">
            <button 
                className="min-w-[4.5rem] h-[2.75rem] p-2 border-2 border-black text-black hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] uppercase w-full md:w-auto flex items-center justify-center" 
                type='submit'
            >       
                {
                    isSubmitting ? 'Wait...' : label
                }
            </button>
        </div>
    )
}
export default SubmitButton;