export default function TitleSubtitle({ title, subtitle }) {
    return (
        <div className="text-center mb-8">
            {/* Título */}
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
            {/* Subtítulo */}
            <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
    );
}