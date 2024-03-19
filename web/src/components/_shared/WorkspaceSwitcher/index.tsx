'use client';

import {
    Avatar,
    AvatarImage,
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    Dialog,
    DialogTrigger,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    Modal,
    Popover,
    PopoverContent,
    PopoverTrigger,
    cn
} from '@shtcut-ui/react';
import { WorkspaceContainer } from '@shtcut/containers';
import { useWorkspace } from '@shtcut/hooks/workspace';
import { IconChevronDown, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

type WorkspaceSwitcherProps = PopoverTriggerProps;

export const WorkspaceSwitcher = ({ className }: WorkspaceSwitcherProps) => {
    const [name, setName] = useState('');
    const [openCreateWorkspace, setOpenCreateWorkspace] = useState(false);
    const [showNewWorkspaceDialog, setShowNewDialog] = useState(false);
    const [isSettingWorkspace, setIsSettingWorkspace] = useState(false);

    const pathname = usePathname();
    const path = pathname.split('/')[pathname.split('/').length - 1];

    const { findAllWorkspacesResponse: data } = useWorkspace({ key: 'findAllWorkspaces', callWorkspaces: true });

    const params = useParams();

    useEffect(() => {
        if (data?.length) {
            const index = data.findIndex((w) => w.slug.toLowerCase() === String(params.workspace).toLowerCase());
            if (data.length === 0) {
                setName('Loading....');
            } else if (data.length !== 0 && index !== -1) {
                setName(data[index].name);
            }
        }
        console.log('name', name);
        if (data?.length === 0) {
            setOpenCreateWorkspace(true);
        }
    }, [data]);

    const handleVisibility = (open: boolean) => {
        setOpenCreateWorkspace(open);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border p-2 rounded-md px-4 text-sm">
                <div className="flex items-center">
                    <span>{name}</span>
                    <IconChevronDown className="w-4 h-4 ml-3" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <>
                    {data?.map(({ slug, _id }) => (
                        <DropdownMenuCheckboxItem
                            key={`${_id}-${name}`}
                            checked={slug.toLowerCase() === String(params.workspace).toLowerCase()}
                        >
                            <Link href={`/${params.module}/${slug}/${path}`}>{slug}</Link>
                        </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuLabel>Other</DropdownMenuLabel>
                    <Button variant="ghost" className="w-full" onClick={() => handleVisibility(true)}>
                        Create Workspace
                    </Button>
                    <Modal
                        showModel={openCreateWorkspace}
                        setShowModal={setOpenCreateWorkspace}
                        showCloseIcon={true}
                        onClose={() => handleVisibility(false)}
                        className="px-10 bg-gray-50"
                    >
                        <WorkspaceContainer type={'team'} />
                    </Modal>
                </>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
