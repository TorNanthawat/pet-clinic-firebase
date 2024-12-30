"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { Pet } from "@/types/Pet"
import PetForm from "@/components/PetForm"
import Summary from "@/components/Summary"
import { uploadImage } from "@/lib/uploadImage"

type Props = {
    params: { id: string }
}

export default function EditPet({ params }: Props) {
    const [step, setStep] = useState(1)
    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [formData, setFormData] = useState<Pet>({
        id: "",
        petName: "",
        ownerName: "",
        ownerPhone: "",
        petAgeYears: 0,
        petAgeMonths: 0,
        petType: "",
        petImageUrl: "",
        vaccinationStatus: "",
        petDetails: "",
    })

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const docRef = doc(db, "pets", params.id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setFormData({ id: docSnap.id, ...docSnap.data() } as Pet)
                } else {
                    console.log("No such document!")
                    router.push("/")
                }
            } catch (error) {
                console.error("Error fetching pet data: ", error)
                router.push("/")
            }
        }

        if (params.id) {
            fetchPet()
        }
    }, [params.id, router])

    const validateStep1 = () => {
        if (!formData.petName || !formData.ownerName || !formData.ownerPhone) {
            alert("Please fill in all fields in Step 1")
            return false
        }
        return true
    }

    const validateStep2 = () => {
        if (formData.petAgeMonths === 0 || !formData.petType) {
            alert("Please fill in all fields in Step 2")
            return false
        }
        return true
    }

    const validateStep3 = () => {
        if (!formData.vaccinationStatus || !formData.petDetails) {
            alert("Please fill in all fields in Step 3")
            return false
        }
        return true
    }

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(step + 1)
        } else if (step === 2 && validateStep2()) {
            setStep(step + 1)
        } else if (step === 3 && validateStep3()) {
            setStep(step + 1)
        }
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
        }
    }

    const handleSave = async () => {
        try {
            let imageUrl = formData.petImageUrl

            if (selectedImage) {
                imageUrl = await uploadImage(selectedImage)
            }

            const petData = {
                ...formData,
                petImageUrl: imageUrl,
            }

            const petRef = doc(db, "pets", params.id)
            await updateDoc(petRef, petData)
            console.log("Document updated with ID: ", params.id)

            router.push("/")
        } catch (error) {
            console.error("Error updating pet data: ", error)
            alert("Error updating pet data. Please try again.")
        }
    }

    return (
        <div>
            {step <= 3 ? (
                <PetForm
                    step={step}
                    formData={formData}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleFileChange={handleFileChange}
                    selectedImage={selectedImage}
                />
            ) : (
                <Summary
                    formData={formData}
                    handleSave={handleSave}
                    handleBack={handleBack}
                    selectedImage={selectedImage}
                />
            )}
        </div>
    )
}
