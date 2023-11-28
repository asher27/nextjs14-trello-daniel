'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

interface FormSubmitProps {
    children: ReactNode;
    disabled?: boolean;
    className?: string;
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link'
        | 'primary';
}

const FormSubmit = ({
    children,
    disabled,
    className,
    variant = 'primary',
}: FormSubmitProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending || disabled}
            type='submit'
            variant={variant}
            size={'sm'}
            className={cn(className)}
        >
            {children}
        </Button>
    );
};

export default FormSubmit;
