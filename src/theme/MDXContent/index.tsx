import React, { type ReactNode } from 'react';
import MDXContent from '@theme-original/MDXContent';
import type MDXContentType from '@theme/MDXContent';
import type { WrapperProps } from '@docusaurus/types';
import PrismaProvider from '@site/src/components/Prisma/PrismaContext';
import PrismaSwitcherList from '@site/src/components/Prisma/PrismaSwitcherList';

type Props = WrapperProps<typeof MDXContentType>;

export default function MDXContentWrapper(props: Props): ReactNode {
    return (
        <>
            <PrismaProvider>
                <PrismaSwitcherList />
                <MDXContent {...props} />
            </PrismaProvider>
        </>
    );
}
