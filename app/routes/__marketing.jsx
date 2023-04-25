import { Outlet } from '@remix-run/react';

import MarketingStyles from '~/styles/marketing.css';
import MainHeader from '~/components/navigation/MainHeader';

export default function MarketingLayout() {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    );
}

export function links() {
    return [{ rel: 'stylesheet', href: MarketingStyles }];
}