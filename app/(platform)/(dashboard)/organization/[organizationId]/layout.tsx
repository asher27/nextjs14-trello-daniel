import { auth } from '@clerk/nextjs';
import { startCase } from 'lodash';
import { PropsWithChildren } from 'react';
import OrgControl from './_components/org-control';

export async function generateMetadata() {
    const { orgSlug } = auth();

    return {
        title: startCase(orgSlug || 'organization'),
    };
}

const OrganizationIdLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    );
};

export default OrganizationIdLayout;
