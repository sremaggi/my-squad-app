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
import DatePicker from "react-datepicker"; // Date picker elegante
import "react-datepicker/dist/react-datepicker.css"; // Estilos para el date picker
import { HexColorPicker } from "react-colorful"; // Color picker elegante
import { FaCheck, FaCalendar, FaRegCalendar, FaCalendarDay } from 'react-icons/fa';

const CreateTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [teamPhoto, setTeamPhoto] = useState(null);
    const [creationDate, setCreationDate] = useState(new Date()); // Fecha de creación
    const [primaryColor, setPrimaryColor] = useState("#ffffff"); // Color principal
    const [secondaryColor, setSecondaryColor] = useState("#000000"); // Color secundario
    const [showPrimaryPicker, setShowPrimaryPicker] = useState(false); // Control del color picker primario
    const [showSecondaryPicker, setShowSecondaryPicker] = useState(false); // Control del color picker secundario
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();
    const { language, translations } = useContext(LanguageContext);
    const t = translations[language].createTeam;

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
            } else {
                alert("Photo is empty.");
                return;
            }
            const teamDocRef = await addDoc(collection(db, "teams"), {
                name: teamName,
                admin: user.email,
                photoUrl,
                creationDate: creationDate.toISOString(), // Guardamos la fecha en formato ISO
                primaryColor, // Guardamos el color principal
                secondaryColor, // Guardamos el color secundario
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
                                        <div className="flex flex-col items-center">
                                            {imageList.length > 0 ? (
                                                <div className="flex flex-col">
                                                    <div className="flex justify-center">
                                                        <FaCheck className="text-green-500" />
                                                    </div>

                                                    <p>{t.successImageMessage}</p>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={onImageUpload}
                                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                                                >
                                                    {t.uploadPhoto}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">{t.creationDate}</label>
                                <div className="flex justify-center items-center">
                                    <FaCalendarDay className="mr-3 text-sky-700 text-xl" />
                                    <DatePicker
                                        selected={creationDate}
                                        onChange={(date) => setCreationDate(date)}
                                        dateFormat="dd-MM-yyyy"
                                        className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                            </div>
                            {/* Colores en dos columnas */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {/* Color primario */}
                                <div className="flex flex-col items-center">
                                    <button
                                        onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                                        className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded mb-2 text-xs md:text-sm"
                                    >
                                        {t.primaryColor}
                                    </button>
                                    <div
                                        onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                                        style={{ backgroundColor: primaryColor }}
                                        className="w-8 h-8 rounded border border-gray-300 mb-2"
                                    ></div>
                                    {showPrimaryPicker && (
                                        <div className="flex flex-col items-center">
                                            <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                                            <input
                                                type="text"
                                                value={primaryColor}
                                                onChange={(e) => setPrimaryColor(e.target.value)}
                                                className="border border-gray-300 rounded p-2 w-full mt-2 focus:outline-none focus:border-blue-500 text-xs"
                                            />
                                        </div>
                                    )}
                                </div>
                                {/* Color secundario */}
                                <div className="flex flex-col items-center">
                                    <button
                                        onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
                                        className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded mb-2 text-xs md:text-sm"
                                    >
                                        {t.secondaryColor}
                                    </button>
                                    <div
                                        onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
                                        style={{ backgroundColor: secondaryColor }}
                                        className="w-8 h-8 rounded border border-gray-300 mb-2"
                                    ></div>
                                    {showSecondaryPicker && (
                                        <div className="flex flex-col items-center">
                                            <HexColorPicker color={secondaryColor} onChange={setSecondaryColor} />
                                            <input
                                                type="text"
                                                value={secondaryColor}
                                                onChange={(e) => setSecondaryColor(e.target.value)}
                                                className="border border-gray-300 rounded p-2 w-full mt-2 focus:outline-none focus:border-blue-500 text-xs"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
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