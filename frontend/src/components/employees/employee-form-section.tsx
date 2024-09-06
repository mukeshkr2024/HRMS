import React from "react";

interface EmployeeFormSectionProps {
    title: string;
    icon: string;
    children: React.ReactNode;
}

export const EmployeeFormSection: React.FC<EmployeeFormSectionProps> = ({ title, icon, children }) => {
    return (
        <div className="mt-8">
            <div className="flex gap-x-2 mb-2.5">
                <img src={icon} alt={title} />
                <p className="text-[#333333] font-semibold">{title}</p>
            </div>
            {children}
        </div>
    );
};
