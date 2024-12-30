import Link from "next/link"

const Footer = () => {
    return (
        <footer className="sticky bottom-0 bg-white py-4 px-6 md:px-28 lg:px-40 shadow-sm">
            <div className="flex items-center justify-center">
                <p className="text-sm text-gray-800">
                    &copy; 2024 Pet Clinic by{" "}
                    <Link className="text-sky-500" target="_blank" href={"https://portfolio-tordev.netlify.app/"}>
                        TorDev.
                    </Link>{" "}
                    All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
