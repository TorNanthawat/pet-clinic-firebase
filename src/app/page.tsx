"use client"

import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import Link from "next/link"
import { Pet } from "../types/Pet"
import Image from "next/image"

const Home = () => {
    const [pets, setPets] = useState<Pet[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchPets = async () => {
        try {
            const petsCollection = collection(db, "pets")
            const petSnapshot = await getDocs(petsCollection)
            const petList = petSnapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                    ...data,
                    id: doc.id,
                } as Pet
            })
            console.log("Fetched pets:", petList)
            setPets(petList)
        } catch (error) {
            console.error("Error fetching pets:", error)
            setPets([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPets()
    }, [])

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this pet?")
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "pets", id))
                setPets(pets.filter((pet) => pet.id !== id))
                console.log("Document deleted with ID: ", id)
            } catch (e) {
                console.error("Error deleting document: ", e)
            }
        } else {
            console.log("Delete action was canceled.")
        }
    }

    return (
        <div>
            <div className="py-10 px-6 md:px-28 lg:px-[30%]">
                <div className="flex flex-col gap-3 justify-center items-center mb-10">
                    <h1 className="text-2xl text-gray-700 font-bold cursor-default">Add pet information</h1>
                    <Link href="/add-pet" className="btn-primary">
                        Add Pet
                    </Link>
                </div>
                <ul className="flex flex-col gap-3 bg-white p-4 md:p-6 lg:p-8 rounded-2xl shadow-md">
                    <h1 className="font-bold text-gray-700">Pets List</h1>
                    {loading ? (
                        <li className="text-center text-gray-500 animate-bounce py-4">Loading...</li>
                    ) : pets.length === 0 ? (
                        <li className="text-center text-gray-500 py-4 border rounded-lg">No pet information</li>
                    ) : (
                        pets.map((pet) => {
                            console.log("pet", pet.id)
                            return (
                                <li
                                    key={pet.id}
                                    className="flex flex-col gap-6 justify-between shadow-md rounded-xl 
                                    border p-4 lg:p-8 text-gray-700 border-gray-200 duration-500 hover:scale-105 
                                    cursor-default"
                                >
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1 text-sm lg:text-base">
                                            <p>
                                                <strong>Pet Name : </strong>
                                                {pet.petName}
                                            </p>
                                            <p>
                                                <strong>Type : </strong>
                                                {pet.petType}
                                            </p>
                                            <p>
                                                <strong>Owner Name : </strong>
                                                {pet.ownerName}
                                            </p>
                                            <p>
                                                <strong>Owner Phone : </strong>
                                                {pet.ownerPhone}
                                            </p>
                                        </div>
                                        <Image
                                            src={pet.petImageUrl}
                                            alt="pet"
                                            width={500}
                                            height={300}
                                            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-lg object-cover"
                                        />
                                    </div>

                                    <div className="flex w-full text-white items-center justify-center text-center">
                                        <Link
                                            className="w-full duration-300 py-1 rounded-l-xl bg-sky-500 hover:bg-sky-600"
                                            href={`/edit-pet/${pet.id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="w-full duration-300 py-1 rounded-r-xl bg-red-500 hover:bg-red-600 "
                                            onClick={() => handleDelete(pet.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Home
