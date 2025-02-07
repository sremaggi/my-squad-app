'use client';
import React, { useState, useEffect } from "react";
import { collection, getDocs, limit, query, startAfter } from "firebase/firestore";
import { db } from "../../utils/firebase";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const JoinTeam = () => {
    const [teams, setTeams] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language, translations } = useContext(LanguageContext);
    const t = translations[language]["join-team"];

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                let q;
                if (lastVisible) {
                    q = query(collection(db, "teams"), startAfter(lastVisible), limit(5));
                } else {
                    q = query(collection(db, "teams"), limit(5));
                }
                const querySnapshot = await getDocs(q);
                const teamsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Filtrar duplicados
                setTeams((prevTeams) => {
                    const uniqueTeams = [...prevTeams, ...teamsData].filter(
                        (team, index, self) => index === self.findIndex((t) => t.id === team.id)
                    );
                    return uniqueTeams;
                });

                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            } catch (error) {
                console.error("Error al cargar equipos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    const loadMore = async () => {
        setLoading(true);
        const q = query(collection(db, "teams"), startAfter(lastVisible), limit(5));
        const querySnapshot = await getDocs(q);
        const teamsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Filtrar duplicados
        setTeams((prevTeams) => {
            const uniqueTeams = [...prevTeams, ...teamsData].filter(
                (team, index, self) => index === self.findIndex((t) => t.id === team.id)
            );
            return uniqueTeams;
        });

        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading(false);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-100/50">
            <div className="p-4 lg:w-3/4 max-w-screen-lg w-full">
                <h1 className="text-3xl font-bold text-center mb-8">{t.title}</h1>
                {teams.length === 0 ? (
                    <p className="text-center text-gray-600">{t.noTeamsAvailable}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((team) => (
                            <div key={team.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
                                    <p className="text-sm text-gray-600 mt-2">{t.adminLabel} {team.admin}</p>
                                    {team.photoUrl && (
                                        <img
                                            src={team.photoUrl}
                                            alt={team.name}
                                            className="w-full h-48 object-cover mt-4 rounded-md"
                                        />
                                    )}
                                    <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                                        {t.joinButton}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {lastVisible && (
                    <button
                        onClick={loadMore}
                        className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    >
                        {t.loadMoreButton}
                    </button>
                )}
            </div>
        </div>
    );
};

export default JoinTeam;