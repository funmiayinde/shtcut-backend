'use client';

import { CommonProps, Skeleton, cn } from '@shtcut-ui/react';
import { Activity } from 'lucide-react';
import { UserNav } from '@shtcut/components/_shared/UserNav';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode, Suspense, useState } from 'react';
import { sideLinks } from '@shtcut/_shared/data/side-links';
import { SideBar } from '@shtcut/components/dashboard';
import { useMediaQuery } from 'react-responsive';
import { useSidebar } from '@shtcut/components/dashboard/side-bar-context';
import { Bell } from 'lucide-react';
import { LogoNavBar, SearchInput } from '@shtcut/components/dashboard/nav-component';

interface WorkspaceLayoutProps extends CommonProps {
    header?: ReactNode | ReactNode[];
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
    const params = useParams();
    const pathname = usePathname();
    const { isSideBarOpen } = useSidebar();
    const { module, workspace } = params;
    let isTab = useMediaQuery({ query: '(max-width:768px)' });
    const [isOpen, setIsOpen] = useState(isTab ? false : true);
    const navigationOptions = sideLinks(module as string, workspace as string);
    const navigationOptionsSliced = navigationOptions.slice(0, -3);

    return (
        <body className="bg-[#edf2f98a] w-full  ">
            <section className="w-full  bg-white">
                <section className="fixed  h-16 z-50 shadow-sm  top-0 w-full">
                    <section className={`bg-white px-4  w-full`}>
                        <div className="flex items-center justify-between ">
                            <div>
                                <LogoNavBar />
                            </div>

                            <div className="flex items-center gap-5">
                                <SearchInput />
                                <Activity />
                                <Bell />
                                <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
                                    <UserNav />
                                </Suspense>
                            </div>
                        </div>
                    </section>
                    {!isSideBarOpen && (
                        <div className="border-b  z-30 bg-white mb-0">
                            <div className="items-stretch justify-center flex gap-10 overflow-x-scroll  md:mt:0">
                                {navigationOptionsSliced.map(({ href, title, icon }, index) => (
                                    <Link
                                        href={href}
                                        className={cn(
                                            'h-8 flex items-center gap-x-2 hover:text-primary-0 transition-colors text-sm',
                                            href === `${pathname}`
                                                ? 'border-b-2 border-primary-0 text-primary-0 '
                                                : 'text-foreground/50'
                                        )}
                                        key={index}
                                    >
                                        <div className="">{icon}</div>
                                        {title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </section>

            <section className="  w-full flex">
                {isSideBarOpen && <SideBar setIsOpen={setIsOpen} isOpen={isOpen} isTab={isTab} />}

                <div
                    className={`w-full ${
                        isSideBarOpen && `${isOpen ? 'md:ml-[17rem]' : 'md:ml-[4rem]'} `
                    } px-4 md:px-20  ${isSideBarOpen ? 'py-16 ' : 'py-32'} `}
                >
                    {children}
                </div>
            </section>
        </body>
    );
};

export default WorkspaceLayout;
