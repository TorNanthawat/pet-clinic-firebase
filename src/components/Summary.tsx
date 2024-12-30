import React from "react"
import { Pet } from "../types/Pet"

interface SummaryProps {
    formData: Pet
    handleSave: () => Promise<void>
    handleBack: () => void
    selectedImage: File | null
    isEdit?: boolean
}

const Summary: React.FC<SummaryProps> = ({ formData, handleSave, handleBack }) => {
    return (
        <div className="m-5 p-5 md:mx-28 lg:mx-[32%] bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <p className="text-base mb-2 border-b pb-2">
                <strong>Pet Name : </strong> {formData.petName}
            </p>
            <p className="text-base mb-2 border-b pb-2">
                <strong>Owner Name : </strong> {formData.ownerName}
            </p>
            <p className="text-base mb-2 border-b pb-2">
                <strong>Owner Phone : </strong> {formData.ownerPhone}
            </p>
            <p className="text-base mb-2 border-b pb-2">
                <strong>Age : </strong> {formData.petAgeYears} years, {formData.petAgeMonths} months
            </p>
            <p className="text-base mb-2 border-b pb-2">
                <strong>Type : </strong> {formData.petType}
            </p>
            <p className="text-base mb-2 border-b pb-2">
                <strong>Vaccination Status : </strong> {formData.vaccinationStatus}
            </p>
            <p className="text-base mb-4 border-b pb-2">
                <strong>Details : </strong> {formData.petDetails}
            </p>
            <div className="flex justify-between">
                <button onClick={handleBack} className="btn-back">
                    Back
                </button>
                <button onClick={handleSave} className="btn-next">
                    Save
                </button>
            </div>
        </div>
    )
}

export default Summary
