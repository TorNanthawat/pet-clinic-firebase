"use client"

import { useState } from "react"
import PetForm from "../../components/PetForm"
import Summary from "../../components/Summary"
import { db } from "../../lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { Pet } from "../../types/Pet"
import { useRouter } from "next/navigation"
import { uploadImage } from "../../lib/uploadImage"

const AddPet = () => {
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
        if (!selectedImage) {
            alert("Please select an image file")
            return false
        }
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
            let imageUrl = ""
            if (selectedImage) {
                // อัพโหลดรูปภาพไปยัง Cloudinary
                imageUrl = await uploadImage(selectedImage)
            }

            const petData = {
                ...formData,
                petImageUrl: imageUrl,
            }

            // เพิ่มข้อมูลลงใน Firebase
            const docRef = await addDoc(collection(db, "pets"), petData)
            console.log("Document written with ID: ", docRef.id)

            // รีเซ็ตฟอร์มและนำทางกลับไปหน้าแรก
            setFormData({
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
            setSelectedImage(null)
            router.push("/")
        } catch (error) {
            console.error("Error saving pet data: ", error)
            alert("Error saving pet data. Please try again.")
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

export default AddPet
