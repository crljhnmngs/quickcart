import { ReactNode } from 'react';

type FeatureCardProps = {
    icon: ReactNode;
    title: string;
    description: string;
    color?: 'blue' | 'green' | 'purple';
};

export const FeatureCard = ({
    icon,
    title,
    description,
    color = 'blue',
}: FeatureCardProps) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
    };

    return (
        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className={`p-3 ${colorClasses[color]} rounded-lg`}>
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-lg text-black">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
};
