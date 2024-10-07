import { useAuthStore } from '@/context/useAuthStore';
import { Link, Outlet, useParams } from 'react-router-dom';
import { CustomLoader } from '../shared/custom-loader';
import TopBar from '@/features/my-info/components/TopBar';
import { ArrowLeft } from 'lucide-react';

export const MemberInfoLayout = () => {
    const { memberId } = useParams();
    const { loading, employee } = useAuthStore();

    if (loading) return <CustomLoader />;

    if (!memberId) {
        return (
            <div className="text-center text-red-500">
                Member not found. Please go back and select a member.
            </div>
        );
    }

    const managerRoutes = [
        {
            label: 'Raised Issues',
            href: `/members/${memberId}`,
        },
        {
            label: 'Feedbacks',
            href: `/members/${memberId}/feedbacks`,
        }, {
            label: "Assessments",
            href: `/members/${memberId}/assessments`,
        }
    ]

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


    const routes = employee?.role === 'manager' ? managerRoutes : topBarRoutes



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
            <TopBar routes={routes} />

            {/* Content */}
            <div className="mt-4">
                <Outlet />
            </div>
        </div>
    );
};
