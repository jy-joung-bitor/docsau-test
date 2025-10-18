import React, { type ReactNode } from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type { WrapperProps } from '@docusaurus/types';
import PrismaProvider from '@site/src/components/Prisma/PrismaContext';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
    return (
        <>
            <PrismaProvider>
                <Layout {...props} />
            </PrismaProvider>
        </>
    );
}
