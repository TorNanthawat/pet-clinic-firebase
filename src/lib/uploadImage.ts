const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "pet-img")

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dhtvk0rry/image/upload", {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data.secure_url
    } catch (error) {
        console.error("Error uploading image:", error)
        throw error
    }
}

export { uploadImage }
