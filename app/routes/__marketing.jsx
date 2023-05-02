import { Outlet } from '@remix-run/react';
import { getUserFromSession } from '~/data/auth.server';
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

export function loader({request}) {
    return getUserFromSession(request);
}

export function links() {
    return [{ rel: 'stylesheet', href: MarketingStyles }];
}