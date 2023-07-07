import { z } from "zod";
export const registerSchema = z.object({
    userName: z
        .string({
            required_error: "Your name is required",
            invalid_type_error: "Name must be a string",
        })
        .min(3, { message: "At least 3 characters" })
        .max(30, { message: "No more than 30 characters" }),
    userLastName: z
        .string({
            required_error: "Your last name is required",
            invalid_type_error: "Last name must be a string",
        })
        .min(3, { message: "At least 3 characters" })
        .max(30, { message: "No more than 30 characters" }),
    userEmail: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Provide a valid email",
        })
        .email(),
    userPassword: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
        .min(8, { message: "At least 3 characters" })
        .max(30, { message: "No more than 30 characters" }),
    userAcceptsMarketing: z.boolean({
        required_error: "You accept markeing or not?",
    }),
});

export const loginSchema = z.object({
    userEmail: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Provide a valid email",
        })
        .email(),
    userPassword: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
        .min(8, { message: "At least 3 characters" })
        .max(30, { message: "No more than 30 characters" }),
});
