'use client';

import CardModal from '@/components/modal/card-modal';
import ProModal from '@/components/modal/pro-modal';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <CardModal />
            <ProModal />
        </>
    );
};
