"use client";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

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
        <div className="p-4 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Mis Equipos</h1>
            {teams.length === 0 ? (
                <p>No tienes equipos creados.</p>
            ) : (
                <ul>
                    {teams.map((team) => (
                        <li key={team.id} className="mb-4 p-4 border rounded-lg">
                            <h2 className="text-xl font-bold">{team.name}</h2>
                            <p>Administrador: {team.admin}</p>
                            {team.photoUrl && (
                                <img src={team.photoUrl} alt={team.name} className="w-32 h-32 object-cover mt-2" />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyTeams;