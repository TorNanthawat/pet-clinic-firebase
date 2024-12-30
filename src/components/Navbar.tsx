import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="sticky top-0 flex justify-between items-center bg-white py-5 px-6 md:px-28 lg:px-40 shadow-sm z-10">
            <div className="flex items-center">
                <Link className="text-xl text-sky-500 font-bold duration-300 hover:scale-105" href="/">
                    Pet Clinic
                </Link>
            </div>
            <div className="flex items-center">
                <Link className="btn-primary" href="/add-pet">
                    Add Pet
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
