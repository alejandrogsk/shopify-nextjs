"use client";

import { useForm } from "react-hook-form";

export const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data: any) => {
        console.log(data);
        const req = await fetch("/api/auth/sign-up", {
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName:"ale", userLastName: "some name"}),
        })
        const res = req;
        console.log("res: ", res)
    };

    console.log(watch("example"))
    return (
        <div>
            <form
                className="flex flex-col gap-4 "
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1>Create an account</h1>
                <div className="flex flex-col">
                    <label htmlFor="userName" className="text-gray-400 text-sm">
                        Name
                    </label>
                    <input
                        className="p-2 border-black border-2 bg-white placeholder:text-gray-400"
                        {...(register("userName",
                        {
                            required: true,
                            maxLength: 20,
                            
                        }))}
                        placeholder="John"
                        type="text"
                        id="userName"
                    />
                    {errors.userName?.type === 'required' && <p role="alert">First name is required</p>}
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="userLastName"
                        className="text-gray-400 text-sm"
                    >
                        Last Name
                    </label>
                    <input
                        className="p-2 border-black border-2 bg-white placeholder:text-gray-400"
                        {...(register("userLastName",
                        {
                            required: true,
                            maxLength: 20,
                            
                        }))}
                        placeholder="Smith"
                            type="text"
                            id="userLastName"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="userEmail"
                        className="text-gray-400 text-sm"
                    >
                        Email
                    </label>
                    <input
                        className="p-2 border-black border-2 bg-white placeholder:text-gray-400"
                        {...(register("userEmail",
                        {
                            required: true,
                            maxLength: 50,
                            
                        }))}
                        placeholder="johnsmith@gmail.com"
                            type="email"
                            id="userEmail"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="userPassword"
                        className="text-gray-400 text-sm"
                    >
                        Password
                    </label>
                    <input
                        className="p-2 border-black border-2 bg-white placeholder:text-gray-400"
                        {...(register("userPassword",
                        {
                            required: true,
                            maxLength: 30,
                        }))}
                        placeholder="Fe1453_1pf"
                        type="password"
                        id="userPassword"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="p-2 border-2 border-black text-black hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] uppercase w-full md:w-auto"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export const SignInForm = () => {
    return (
        <div>
            <form className="flex flex-col gap-4 ">
                <h2>Welcome Back</h2>
                <div className="flex flex-col">
                    <label
                        htmlFor="userEmail"
                        className="text-gray-400 text-sm"
                    >
                        Email
                    </label>
                    <input
                        className="p-2 border-black border-2 bg-white placeholder:text-gray-400"
                        name="userEmail"
                        id="userEmail"
                        type="text"
                        placeholder="johndoe@gmail.com"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="userPassword"
                        className="text-gray-400 text-sm"
                    >
                        Password
                    </label>
                    <input
                        className="p-2 border-black border-2 bg-white placeholder:text-gray-400"
                        name="userPassword"
                        id="userPassword"
                        type="password"
                        placeholder="!23OPE1sfrw2341s%"
                        required
                        min={8}
                        max={16}
                    />
                </div>

                <div className="pt-4">
                    <button className="p-2 border-2 border-black text-black hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] uppercase w-full md:w-auto">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};
