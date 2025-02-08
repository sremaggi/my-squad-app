"use client";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import PlayersTab from "./components/PlayersTab";

const TeamDetails = ({ params }) => {
    const { teamId } = params;
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("players"); // Estado para la pestaña activa
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                if (!user) {
                    alert("Debes iniciar sesión para ver los detalles del equipo.");
                    router.push("/user");
                    return;
                }
                const teamRef = doc(db, "teams", teamId);
                const teamSnapshot = await getDoc(teamRef);
                if (teamSnapshot.exists()) {
                    setTeam({ id: teamSnapshot.id, ...teamSnapshot.data() });
                } else {
                    alert("Equipo no encontrado.");
                    router.push("/my-teams");
                }
            } catch (error) {
                console.error("Error al cargar el equipo:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, [teamId, user]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">{team?.name}</h1>

            {/* Navegación de pestañas */}
            <div className="flex justify-center space-x-1 mb-6 text-xs md:text-md">
                <button
                    onClick={() => setActiveTab("players")}
                    className={`px-1 py-1 rounded-md ${activeTab === "players"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Jugadores
                </button>
                <button
                    onClick={() => setActiveTab("stats")}
                    className={`px-4 py-2 rounded-md ${activeTab === "stats"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Estadísticas
                </button>
                <button
                    onClick={() => setActiveTab("settings")}
                    className={`px-4 py-2 rounded-md ${activeTab === "settings"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Configuración
                </button>
            </div>

            {/* Contenido de la pestaña activa */}
            {activeTab === "players" && <PlayersTab team={team} />}
            {activeTab === "stats" && <StatsTab team={team} />}
            {activeTab === "settings" && <SettingsTab team={team} />}
        </div>
    );
};

export default TeamDetails;