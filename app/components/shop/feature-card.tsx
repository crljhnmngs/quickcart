export const FeatureCard = ({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) => {
    return (
        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-black">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
};
