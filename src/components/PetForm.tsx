import { Pet } from "../types/Pet"

interface PetFormProps {
    step: number
    formData: Pet
    setFormData: (data: Pet) => void
    handleNext: () => void
    handleBack: () => void
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    selectedImage: File | null
    isEdit?: boolean
}

const PetForm: React.FC<PetFormProps> = ({
    step,
    formData,
    setFormData,
    handleNext,
    handleBack,
    handleFileChange,
    selectedImage,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className="max-w-xl md:max-w-md mx-auto p-5">
            {step === 1 && (
                <div className="space-y-4 text-gray-700">
                    <h2 className="text-2xl font-bold">Step 1: Pet Information</h2>
                    <div>
                        <label className="font-medium">Pet Name</label>
                        <input
                            type="text"
                            name="petName"
                            placeholder="Pet Name"
                            value={formData.petName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Owner Name</label>
                        <input
                            type="text"
                            name="ownerName"
                            placeholder="Owner Name"
                            value={formData.ownerName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Owner Phone</label>
                        <input
                            type="text"
                            name="ownerPhone"
                            placeholder="Owner Phone"
                            value={formData.ownerPhone}
                            onChange={(e) => {
                                const value = e.target.value
                                if (/^\d{0,10}$/.test(value)) {
                                    setFormData({ ...formData, ownerPhone: value })
                                }
                            }}
                            className="w-full p-2 border rounded-lg"
                        />
                        {formData.ownerPhone.length === 10 && (
                            <p className="text-sm text-green-500">Phone number is valid</p>
                        )}
                        {formData.ownerPhone.length < 10 && (
                            <p className="text-sm text-red-500">Phone number must have 10 digits.</p>
                        )}
                        {formData.ownerPhone.length > 10 && (
                            <p className="text-sm text-red-500">Phone number cannot exceed 10 digits</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button onClick={handleNext} className="btn-next ">
                            Next
                        </button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="space-y-4 text-gray-700">
                    <h2 className="text-2xl font-bold">Step 2: Pet Age and Type</h2>

                    <div>
                        <label className="font-medium">Pet Age Years</label>
                        <input
                            type="number"
                            name="petAgeYears"
                            placeholder="Age (Years)"
                            value={formData.petAgeYears}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Pet Age Months</label>
                        <input
                            type="number"
                            name="petAgeMonths"
                            placeholder="Age (Months)"
                            value={formData.petAgeMonths}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            min="0"
                            max="11"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Pet Type</label>
                        <select
                            name="petType"
                            value={formData.petType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select Pet Type</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={handleBack} className="btn-back">
                            Back
                        </button>
                        <button onClick={handleNext} className="btn-next">
                            Next
                        </button>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="space-y-4 text-gray-700">
                    <h2 className="text-2xl font-bold">Step 3: Upload Image and Details</h2>
                    <div className="space-y-2">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-full bg-white p-2 border rounded-lg"
                        />
                        {selectedImage && (
                            <p className="px-2 text-sm text-gray-600">Selected file: {selectedImage.name}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium">Vaccination Status</p>
                        <div className="flex items-center justify-between px-16">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="vaccinationStatus"
                                    value="Vaccinated"
                                    checked={formData.vaccinationStatus === "Vaccinated"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Vaccinated
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="vaccinationStatus"
                                    value="Not Vaccinated"
                                    checked={formData.vaccinationStatus === "Not Vaccinated"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Not Vaccinated
                            </label>
                        </div>
                    </div>
                    <textarea
                        name="petDetails"
                        placeholder="Pet Details"
                        value={formData.petDetails}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg h-32"
                    />
                    <div className="flex justify-between">
                        <button onClick={handleBack} className="btn-back">
                            Back
                        </button>
                        <button onClick={handleNext} className="btn-next">
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PetForm
