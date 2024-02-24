import { api } from '@shtcut/_shared/api/app.api';
import {
    AuthResponseType,
    ForgotPasswordRequestType,
    SendVerificationRequestType,
    SignInRequestType,
    SignUpRequestType,
    UpdatePasswordRequestType,
    VerifyEmailRequestType
} from './auth';
import { ACL, POST } from '@shtcut/_shared/constant';

export const authApi = api?.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<AuthResponseType, SignInRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.signInUrl,
                    method: POST,
                    body: payload
                };
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // todo dispatch to go get current logged user
                } catch (_) {}
            }
        }),
        signUp: builder.mutation<AuthResponseType, SignUpRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.signUpUrl,
                    method: POST,
                    body: payload
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // todo dispatch to go get current logged user
                } catch (_) {}
            }
        }),
        verifyEmail: builder.mutation<AuthResponseType, VerifyEmailRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.verifyEmailUrl,
                    method: POST,
                    body: payload
                };
            }
        }),
        sendVerification: builder.mutation<AuthResponseType, SendVerificationRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.sendVerificationUrl,
                    method: POST,
                    body: payload
                };
            }
        }),
        forgotPassword: builder.mutation<AuthResponseType, ForgotPasswordRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.forgotPasswordUrl,
                    method: POST,
                    body: payload
                };
            }
        }),
        updatePassword: builder.mutation<AuthResponseType, UpdatePasswordRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.updatePasswordUrl,
                    method: POST,
                    body: payload
                };
            }
        }),
        changePassword: builder.mutation<AuthResponseType, UpdatePasswordRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.changePasswordUrl,
                    method: POST,
                    body: payload
                };
            }
        })
    })
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useVerifyEmailMutation,
    useSendVerificationMutation,
    useForgotPasswordMutation,
    useUpdatePasswordMutation,
    useChangePasswordMutation
} = authApi;
