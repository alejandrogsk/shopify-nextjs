import Logout from "@/components/Auth/Logout";
import Wrapper from "@/components/layout/Wrapper";

const page = () => {
    return (
            <Wrapper>
            <div className="h-[90vh] flex flex-col items-center justify-center">
                <h1 className="">You need to go?</h1>
                <Logout />
            </div>
        </Wrapper>
    );
};

export default page;
