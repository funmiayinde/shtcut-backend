import { Card } from '@shtcut-ui/react';
import BlurIn from '@shtcut/components/_shared/animations/blur-animation';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import { SolutionType } from '@shtcut/types/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const ToolsUi = ({ handleSelectTools, toolsValues }: SolutionType) => {
    const tools = [
        {
            title: 'URL Shortener',
            others: [
                {
                    key: '',
                    img: '/workspace/bit.png',
                    name: 'Bitly'
                },
                {
                    key: '',
                    img: '/workspace/dub.png',
                    name: 'Dub'
                },
                {
                    key: '',
                    img: '/workspace/short.png',
                    name: 'Short.io'
                }
            ]
        },
        {
            title: 'Email Marketing',
            others: [
                {
                    key: '',
                    img: '/workspace/mailchimp.png',
                    name: 'Mailchimp'
                },
                {
                    key: '',
                    img: '/workspace/contact.png',
                    name: 'Constant Contact'
                }
            ]
        },
        {
            title: 'Social Media',
            others: [
                {
                    key: '',
                    img: '/workspace/insta.png',
                    name: 'Instagram'
                },
                {
                    key: '',
                    img: '/workspace/twitter.png',
                    name: 'Twitter'
                },
                {
                    key: '',
                    img: '/workspace/fb.png',
                    name: 'Facebook'
                },
                {
                    key: '',
                    img: '/workspace/tiktok.png',
                    name: 'Tiktok'
                }
            ]
        }
    ];

    return (
        <div>
            <section className="flex gap-y-4 flex-col cursor-pointer items-center">
                {tools.map((tool, index) => (
                    <div className="flex flex-col gap-y-2" key={index}>
                        <BlurIn
                            word={<h1 className={`text-[#433E3F] font-semibold text-sm text-center `}>{tool.title}</h1>}
                        />
                        <div className="flex items-center flex-wrap justify-center gap-3">
                            {tool.others.map((tol, idx) => (
                                <section className="relative" onClick={() => handleSelectTools?.(tol.name)} key={idx}>
                                    <AnimatedContainer
                                        className={`flex gap-4 flex-col cursor-pointer ${toolsValues?.includes(tol.name) ? 'border-primary-0' : ''}  justify-center px-4 h-28 w-40 shadow-sm rounded-md items-center gap-x-2 border `}
                                        key={idx}
                                    >
                                        <Image src={tol.img} width={24} height={24} alt={tol.name} />
                                        <p className="text-center text-sm">{tol.name}</p>
                                    </AnimatedContainer>
                                    {toolsValues?.includes(tol.name) && (
                                        <div className="text-primary-0 absolute top-2 right-2">
                                            <IoIosCheckmarkCircle />
                                        </div>
                                    )}
                                </section>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
            <style>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-200%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-fall {
                    animation: fall 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ToolsUi;
