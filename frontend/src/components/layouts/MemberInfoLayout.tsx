import { useAuthStore } from '@/context/useAuthStore';
import { Link, Outlet, useParams } from 'react-router-dom';
import { CustomLoader } from '../shared/custom-loader';
import TopBar from '@/features/my-info/components/TopBar';
import { ArrowLeft } from 'lucide-react';

export const MemberInfoLayout = () => {
    const { memberId } = useParams();
    const { loading } = useAuthStore();

    // Return the loader while loading the auth state
    if (loading) return <CustomLoader />;

    // Fallback in case memberId is missing
    if (!memberId) {
        return (
            <div className="text-center text-red-500">
                Member not found. Please go back and select a member.
            </div>
        );
    }

    // TopBar route configuration
    const topBarRoutes = [
        {
            label: 'Raised Issues',
            href: `/members/${memberId}`,
        },
        {
            label: 'Feedbacks',
            href: `/members/${memberId}/feedbacks`,
        },
    ];

    return (
        <div className="p-4">
            {/* Back Button */}
            <Link
                to="/members"
                className="flex items-center gap-1 font-medium hover:text-slate-700"
                aria-label="Go back to members list" // Accessibility improvement
            >
                <ArrowLeft className="h-4 w-4" />
                Go Back
            </Link>

            {/* TopBar Navigation */}
            <TopBar routes={topBarRoutes} />

            {/* Content */}
            <div className="mt-4">
                <Outlet />
            </div>
        </div>
    );
};
