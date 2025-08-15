export default function TitleSubtitle({ title, subtitle, textWite }) {
    return (
        <div className="text-center mb-8 mt-3">
            {/* Título */}
            <h1 className={`text-2xl md:text-4xl font-bold  mb-2 ${textWite ? "text-gray-100" : "text-gray-900"} `}>{title}</h1>
            {/* Subtítulo */}
            <p className={`text-sm md:text-lg ${textWite ? "text-gray-300" : "text-gray-900"} `}>{subtitle}</p>
        </div>
    );
}