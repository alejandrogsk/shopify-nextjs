import Logout from "@/components/Auth/Logout";
import Wrapper from "@/components/layout/Wrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = () => {
    const cookieStore = cookies();
    const token = cookieStore.has("token");
    if (!token) {
        redirect("/auth");
    }
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
