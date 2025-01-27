import { Card, Checkbox } from '@shtcut-ui/react';
import React from 'react';
import { Globe, Calendar } from 'lucide-react';
import DomainActions from '../domain-actions';
import { DomainNameSpace } from '@shtcut/_shared/namespace/domain';
import { formatDate } from '@shtcut/_shared';

const DomainsCard = ({
    edit,
    handleModalCn,
    domainsData
}: {
    handleModalCn: (open: boolean) => void;
    edit?: any;
    domainsData: DomainNameSpace.Domain;
}) => {
    return (
        <Card className=" cursor-pointer border border-gray-200 shadow-sm  rounded-[10px] p-4  ">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    {!edit && (
                        <div className="relative top-1">
                            <Checkbox id="terms" className="p-0 m-0 border shadow-none border-[#D2D5DA] " />
                        </div>
                    )}
                    <div className=" bg-[#fafafa] w-[50px] h-[50px] rounded-[10px] flex justify-center items-center">
                        <Globe size={18} />
                    </div>
                    <div className="">
                        <div>
                            <h1 className="font-semibold text-sm text-[#151314]">{domainsData?.name}</h1>
                            <p className="text-xs text-primary-0 font-normal">
                                {domainsData?.type === 'redirect' ? 'redirect' : 'No redirect configured'}
                            </p>
                        </div>
                        <div className="flex text-[#726C6C]  items-center gap-x-2 mt-2">
                            <Calendar size={16} />
                            <span className="text-[#726C6C] text-xs font-medium">
                                {' '}
                                {domainsData?.createdAt && formatDate(domainsData?.createdAt ?? '')}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <DomainActions handleModalCn={handleModalCn} domainsData={domainsData} />
                </div>
            </div>
        </Card>
    );
};

export default DomainsCard;
