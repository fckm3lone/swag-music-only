import {z} from "zod";

export const passwordSchema = z.string().min(3, 'Password must be at least 3 characters')

export const formLoginSchema = z.object({
    email: z.string().email({message: 'Email is required'}),
    password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema.merge(z.object({
    fullName: z.string().min(2, 'Insert your full name'),
    confirmPassword: passwordSchema,
})).refine(data => data.password === data.confirmPassword, {
    error: "Password is not equal",
    path: ["confirmPassword"]
})

export const formProfileSchema = z
    .object({
        fullName: z.string().min(2, 'Insert your full name'),
        email: z.string().email({ message: 'Email is required' }),
        password: z.string().optional(),
        confirmPassword: z.string().optional(),
    })
    .refine(
        (data) => {
            // если оба поля пароля пустые — всё ок
            if (!data.password && !data.confirmPassword) return true;

            // если введён пароль — проверяем длину
            if (data.password && data.password.length < 3) return false;

            // если введён confirmPassword, но нет совпадения
            return data.password === data.confirmPassword;
        },
        {
            message: 'Passwords must match and be at least 3 characters',
            path: ['confirmPassword'],
        }
    );

export type TFormProfileValues = z.infer<typeof formProfileSchema>;


export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;