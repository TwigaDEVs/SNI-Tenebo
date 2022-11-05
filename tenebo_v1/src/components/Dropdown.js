import React from "react"
import { Link } from "react-router-dom"

const Dropdown = () => {
	return (
		<div
			className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabIndex="-1"
		>
			<div className="py-1" role="none">
				<Link
					to="/boma"
					href="#"
					className="text-gray-700 block px-4 py-2 text-sm"
					role="menuitem"
					tabIndex="-1"
					id="menu-item-0"
				>
					Boma
				</Link>
			</div>
			<div className="py-1" role="none">
				<Link
					to="/lionGuardian"
					href="#"
					className="text-gray-700 block px-4 p-2 py-2 text-sm"
					role="menuitem"
					tabIndex="-1"
					id="menu-item-2"
				>
					Lion Guardians
				</Link>
			</div>
		</div>
	)
}

export default Dropdown
