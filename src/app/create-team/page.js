"use client";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
import ImageUploading from "react-images-uploading";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import TitleSubtitle from "@/components/TitleSubtitle";
import LoadingSpinner from "@/components/LoadingSpinner";

const CreateTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [players, setPlayers] = useState([{ id: Date.now(), name: "", number: "" }]);
    const [teamPhoto, setTeamPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();
    const { language, translations } = useContext(LanguageContext);
    const t = translations[language].createTeam;

    const addPlayer = () => {
        setPlayers([...players, { id: Date.now(), name: "", number: "" }]);
    };

    const updatePlayer = (id, field, value) => {
        setPlayers(
            players.map((player) => (player.id === id ? { ...player, [field]: value } : player))
        );
    };

    const createTeam = async () => {
        try {
            setLoading(true);
            if (!user) {
                alert(t.errorMessageUser);
                router.push("/user");
                return;
            }
            const teamsRef = collection(db, "teams");
            const q = query(teamsRef, where("name", "==", teamName));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                alert("Team name already exists.");
                return;
            }
            if (teamName === "") {
                alert("Team name is empty.");
                return;
            }
            let photoUrl = null;
            if (teamPhoto) {
                const response = await fetch(teamPhoto);
                const blob = await response.blob();
                const storageRef = ref(storage, `teamPhotos/${Date.now()}`);
                await uploadBytes(storageRef, blob);
                photoUrl = await getDownloadURL(storageRef);
            }
            const teamDocRef = await addDoc(collection(db, "teams"), {
                id: Date.now().toString(),
                name: teamName,
                admin: user.email,
                players: players.map(({ name, number }) => ({ name, number })),
                photoUrl,
            });
            const teamId = teamDocRef.id;
            players.forEach(async (player) => {
                await addDoc(collection(db, "players"), {
                    id: player.id.toString(),
                    team_id: [teamId],
                    name: player.name,
                    number: player.number,
                    matches_played: [],
                    photo: null,
                    preferred_positions: [],
                });
            });
            alert(t.successMessage);
            router.push("/my-teams");
        } catch (error) {
            console.error("Error creating team:", error);
            alert(t.errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full">
            {/* Columna izquierda: Imagen decorativa */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1599158150601-1417ebbaafdd')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-30"></div> {/* Capa oscura */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 z-10">
                        <h1 className="text-4xl font-bold mb-4 text-center">{t.createYourTeam}</h1>
                        <p className="text-lg text-center">{t.description}</p>
                    </div>
                </div>
            </div>
            {/* Columna derecha: Formulario */}
            <div className="lg:w-1/2 w-full flex items-center justify-center p-8">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-auto">
                    <TitleSubtitle title={t.title} />
                    {loading ? (
                        <div className="flex justify-center items-center h-[calc(100vh-164px)]">
                            <LoadingSpinner size={60} />
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">{t.teamName}</label>
                                <input
                                    type="text"
                                    placeholder={t.teamName}
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">{t.teamPhoto}</label>
                                <ImageUploading
                                    value={teamPhoto ? [teamPhoto] : []}
                                    onChange={(imageList) => setTeamPhoto(imageList[0]?.dataURL || null)}
                                    maxNumber={1}
                                >
                                    {({ imageList, onImageUpload }) => (
                                        <div>
                                            {imageList.length > 0 ? (
                                                <img src={imageList[0].dataURL} alt="Team" className="w-40 h-40 object-cover rounded mx-auto" />
                                            ) : (
                                                <button
                                                    onClick={onImageUpload}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                                                >
                                                    {t.uploadPhoto}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-bold mb-2">{t.players}</h3>
                                {players.map((player, index) => (
                                    <div key={player.id} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            placeholder={t.playerName}
                                            value={player.name}
                                            onChange={(e) => updatePlayer(player.id, "name", e.target.value)}
                                            className="flex-1 border border-gray-300 rounded p-2 mr-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder={t.playerNumber}
                                            value={player.number}
                                            onChange={(e) => updatePlayer(player.id, "number", e.target.value)}
                                            className="w-20 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addPlayer}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 w-full"
                            >
                                {t.addPlayer}
                            </button>
                            <button
                                onClick={createTeam}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mt-4"
                            >
                                {t.createTeamButton}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateTeam;