'use client';

import { cn } from '@shtcut-ui/react';
import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
    className?: string;
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
    whiteLogo?: boolean;
};

export const Logo = (props: LogoProps) => {
    return (
        <Link href={'/'} className={cn('flex items-center justify-between py-5 md:block', props.className)}>
            <Image
                src={props.whiteLogo ? '/images/whitelogo.png' : '/logo.svg'}
                width={props.width ?? 120}
                height={props.height ?? 50}
                alt="Shtcut Logo"
                className={props.className}
                unoptimized
            />
        </Link>
    );
};
