"use client";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";

const MyTeams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                if (!user) {
                    alert("Debes iniciar sesión para ver tus equipos.");
                    router.push("/user");
                    return;
                }
                const teamsRef = collection(db, "teams");
                const q = query(teamsRef, where("admin", "==", user.email));
                const querySnapshot = await getDocs(q);
                const teamsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTeams(teamsData);
            } catch (error) {
                console.error("Error al cargar tus equipos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, [user]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Mis Equipos</h1>
            {teams.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-lg text-gray-600">No tienes equipos creados.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <Link href={`/my-teams/team/${team.id}`} key={team.id}>
                            <div
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                            >
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
                                    <p className="text-sm text-gray-600 mt-2">Administrador: {team.admin}</p>
                                    {team.photoUrl && (
                                        <img
                                            src={team.photoUrl}
                                            alt={team.name}
                                            className="w-full h-48 object-cover mt-4 rounded-md"
                                        />
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTeams;