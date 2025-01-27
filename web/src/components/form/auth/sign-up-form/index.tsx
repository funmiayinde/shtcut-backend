'use client';

import { Dict, Form, FormControl, FormField, FormItem, FormMessage, Input, Label } from '@shtcut-ui/react';
import { AppButton, PasswordInput } from '@shtcut/components/_shared';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpValidationSchema } from './validation';
import { SocialLogin } from '../social-login';

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleSignUpSubmit: (payload: Dict) => void;
    onFailure: (type: string, response: Dict) => void;
    onSuccess: (type: string, response: Dict) => void;
    error?: Dict;
}

export const SignUpForm = (props: SignUpFormProps) => {
    const { isLoading, handleSignUpSubmit, onFailure, onSuccess } = props;


    const handleFormSubmit = (values: z.infer<typeof signUpValidationSchema>) => {
        handleSignUpSubmit(values);
    };

    const form = useForm<z.infer<typeof signUpValidationSchema>>({
        resolver: zodResolver(signUpValidationSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    return (
        <div className=" mt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="flex flex-col w-full gap-3">
                        <div className="flex items-center gap-3 w-full">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <Label>First name</Label>
                                        <FormControl>
                                            <Input placeholder="John" className="h-12" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <Label>Last name</Label>
                                        <FormControl>
                                            <Input placeholder="Doe" className="h-12" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="">
                                    <Label>Email</Label>
                                    <FormControl>
                                        <Input placeholder="Enter your email" className="h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="">
                                    <div className="flex mt-1 mb-2 items-center justify-between">
                                        <Label>Password</Label>
                                    </div>
                                    <FormControl>
                                        <PasswordInput className="h-12" placeholder="Must be 8 characters" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <p className="text-sm mt-1">
                                By clicking signing up you agree to Shtcut{' '}
                                <span className="text-primary-0">Terms and Conditions</span> and confirm you have read
                                our Privacy Notice. You may receive offers, news and updates from us.
                            </p>
                        </div>
                        <AppButton className="mt-2  " loading={isLoading}>
                            Sign Up
                        </AppButton>

                        <div className="relative my-4 mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
            <SocialLogin onFailure={onFailure} onSuccess={onSuccess} isLoading={isLoading} />
        </div>
    );
};
