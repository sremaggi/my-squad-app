"use client";
import React from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../../utils/firebase";

const PlayersTab = ({ team }) => {
    const [newPlayer, setNewPlayer] = React.useState("");

    const handleAddPlayer = async () => {
        if (!newPlayer.trim()) {
            alert("El nombre del jugador no puede estar vacío.");
            return;
        }
        try {
            const teamRef = doc(db, "teams", team.id);
            await updateDoc(teamRef, {
                players: arrayUnion(newPlayer),
            });
            setNewPlayer("");
        } catch (error) {
            console.error("Error al agregar jugador:", error);
        }
    };

    const handleEditPlayer = async (index, newName) => {
        const updatedPlayers = [...(team.players || [])];
        updatedPlayers[index] = newName;
        try {
            const teamRef = doc(db, "teams", team.id);
            await updateDoc(teamRef, {
                players: updatedPlayers,
            });
        } catch (error) {
            console.error("Error al editar jugador:", error);
        }
    };

    const handleDeletePlayer = async (index) => {
        const updatedPlayers = (team.players || []).filter((_, i) => i !== index);
        try {
            const teamRef = doc(db, "teams", team.id);
            await updateDoc(teamRef, {
                players: updatedPlayers,
            });
        } catch (error) {
            console.error("Error al eliminar jugador:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Jugadores</h2>
            <ul>
                {(team.players || []).map((player, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded-md"
                    >
                        <input
                            type="text"
                            defaultValue={player}
                            onBlur={(e) => handleEditPlayer(index, e.target.value)}
                            className="border border-gray-300 rounded-md p-1 w-full"
                        />
                        <button
                            onClick={() => handleDeletePlayer(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-4 flex items-center space-x-2">
                <input
                    type="text"
                    value={newPlayer}
                    onChange={(e) => setNewPlayer(e.target.value)}
                    placeholder="Nombre del jugador"
                    className="border border-gray-300 rounded-md p-1 flex-grow"
                />
                <button
                    onClick={handleAddPlayer}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default PlayersTab;