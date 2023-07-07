"use client";
import { useRouter } from 'next/navigation'

import { useState } from "react";
import { useForm } from "react-hook-form";
export const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router  = useRouter()
    const onSubmit = async (data: any) => {
        const req = await fetch("/api/auth/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await req.json();
        if (res?.data?.ok) {
            router.push("/")
        } else {
            setErrorMessage(res.message??"Something went wrong, please try again latter");
        }
    };

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
                        {...register("userName", {
                            required: true,
                            maxLength: 20,
                        })}
                        placeholder="John"
                        type="text"
                        id="userName"
                    />
                    {errors.userName?.type === "required" && (
                        <p role="alert">First name is required</p>
                    )}
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
                        {...register("userLastName", {
                            required: true,
                            maxLength: 20,
                        })}
                        placeholder="Smith"
                        type="text"
                        id="userLastName"
                    />
                    {errors.userLastName?.type === "required" && (
                        <p role="alert">First name is required</p>
                    )}
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
                        {...register("userEmail", {
                            required: true,
                            maxLength: 50,
                        })}
                        placeholder="johnsmith@gmail.com"
                        type="email"
                        id="userEmail"
                    />
                    {errors.userEmail?.type === "required" && (
                        <p role="alert">Last name is required</p>
                    )}
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
                        {...register("userPassword", {
                            required: true,
                            maxLength: 30,
                        })}
                        placeholder="Fe1453_1pf"
                        type="password"
                        id="userPassword"
                    />
                    {errors.userPassword?.type === "required" && (
                        <p role="alert">Password is required</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <fieldset className="flex gap-2">
                        <input
                            className="p-2 border-black border-2 bg-white placeholder:text-gray-400"
                            {...register("userAcceptsMarketing")}
                            type="checkbox"
                            id="userAcceptsMarketing"
                            checked={true}
                        />

                        <label
                            htmlFor="userAcceptsMarketing"
                            className="text-gray-400 text-sm"
                        >
                            Accepts Marketing
                        </label>
                    </fieldset>
                </div>

                {errorMessage && (
                    <div>
                        <span className="text-red-500">{errorMessage}</span>
                    </div>
                )}

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router  = useRouter()
    const onSubmit = async (data: any) => {
        const req = await fetch("/api/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
            },
            body: JSON.stringify(data),
        });
        const res = await req.json();
        if (res?.data?.ok) {
            router.push("/")
        } else {
            setErrorMessage(res.message??"Something went wrong, please try again latter");
        }
    };
    return (
        <div>
            <form
                className="flex flex-col gap-4 "
                onSubmit={handleSubmit(onSubmit)}
            >
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
                        id="userEmail"
                        type="text"
                        placeholder="johndoe@gmail.com"
                        required
                        {...register("userEmail")}
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
                        id="userPassword"
                        type="password"
                        placeholder="!23OPE1sfrw2341s%"
                        required
                        min={8}
                        max={16}
                        {...register("userPassword")}
                    />
                </div>
                {errorMessage && (
                    <div>
                        <span className="text-red-500">{errorMessage}</span>
                    </div>
                )}
                <div className="pt-4">
                    <button className="p-2 border-2 border-black text-black hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] uppercase w-full md:w-auto">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};
