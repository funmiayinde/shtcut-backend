'use client';

import { Card } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks/auth';
import { useRouter } from 'next/navigation';
import { get } from 'lodash';
import { AppAlert, Logo } from '@shtcut/components';
import { IconAlertCircle } from '@tabler/icons-react';

export const UpdatePasswordContainer = () => {
    const { push } = useRouter();
    const { updatePasswordResponse } = useAuth();
    const { isSuccess, error } = updatePasswordResponse;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');


    const ErrorAlert = ({ message }: { message: string }) => (
        <AppAlert
            variant="destructive"
            className="mx-auto mb-3 items-center"
            description={message}
            icon={<IconAlertCircle />}
        />
    );

    if (isSuccess) {
        push('/auth/sign-in');
    }

    return (
        <Card className="p-6">
            <div className="mb-4 flex items-center justify-center">
                <Logo />
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 border-bpx-4 py-6 pt-8 text-center sm:px-16">
                <h1 className="text-2xl flex items-center justify-center font-semibold tracking-tight">New Password</h1>
                <p className="text-sm w-52 mb-10 space-x-2 justify-center text-muted-foreground">
                    Set the new password for your account so you can sign in and access all features.
                </p>
            </div>
            <div className="mt-2">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
            {/* <UpdatePasswordForm
                handleUpdatePasswordSubmit={handleUpdatePasswordSubmit}
                isLoading={isLoading}
                error={error}
            /> */}
        </Card>
    );
};
