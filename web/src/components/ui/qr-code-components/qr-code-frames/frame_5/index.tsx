import { qrCodeSelectors } from '@shtcut/redux/slices/qr-code';
import { EyeRadiusType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useSelector } from 'react-redux';

const Frame_5 = () => {
    const selectedColor = useSelector(qrCodeSelectors.selectSelectedColor);
    const qrCodeLogo = useSelector(qrCodeSelectors.selectQrCodeLogo);
    const qrCodeShape = useSelector(qrCodeSelectors.selectQrCodeShape);
    const bgColor = useSelector(qrCodeSelectors.selectBgColor);
    const btnColor = useSelector(qrCodeSelectors.selectBtnColor);
    const qrCodeName = useSelector(qrCodeSelectors.selectQrCodeName);
    const eyeRadius = useSelector(qrCodeSelectors.selectEyeRadius);

    return (
        <div className="h-full flex flex-col justify-center">
            <div className={` border-[3.2px]   w-fit rounded-t-[6px]`} style={{ borderColor: String(bgColor) }}>
                <QRCode
                    id="shtcut-qrcode"
                    value={''}
                    removeQrCodeBehindLogo={true}
                    ecLevel="L"
                    fgColor={String(selectedColor)}
                    size={90}
                    logoWidth={30}
                    logoHeight={30}
                    logoImage={String(qrCodeLogo)}
                    qrStyle={qrCodeShape as 'squares' | 'dots' | 'fluid'}
                    eyeRadius={eyeRadius as EyeRadiusType}
                />
            </div>
            <div
                className=" h-10 flex rounded-b-[3px] justify-center items-center w-full"
                style={{ backgroundColor: String(bgColor) }}
            >
                <p
                    style={{ color: bgColor === '#000000' ? 'white' : String(btnColor) }}
                    className={`text-sm uppercase`}
                >
                    {qrCodeName ? String(qrCodeName) : 'My qrcode'}
                </p>
            </div>
        </div>
    );
};

export default Frame_5;