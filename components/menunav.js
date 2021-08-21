import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function MenuNav({ handleOpen, isOpen }) {
  if (!isOpen) return <div></div>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`${
        !isOpen ? `hidden` : `flex`
      } w-full h-screen absolute top-0 bg-gray-200 backdrop-blur-lg bg-opacity-30 place-items-center justify-center`}
    >
      <button onClick={handleOpen} className=" absolute top-0 right-0 m-5">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="text-center leading-loose flex place-items-center text-md text-cusblack w-52 h-56 bg-white rounded-2xl">
        <ul className="w-full">
          <Link href="/">
            <li className=" hover:underline mx-4 rounded-xl cursor-pointer">
              Home
            </li>
          </Link>
          <Link href="/shop">
            <li className=" hover:underline mx-4 rounded-xl cursor-pointer">
              Shop
            </li>
          </Link>
          <Link href="/about">
            <li className=" hover:underline mx-4 rounded-xl cursor-pointer">
              About
            </li>
          </Link>
          <Link href="/store">
            <li className=" hover:underline mx-4 rounded-xl cursor-pointer">
              Our Store
            </li>
          </Link>
        </ul>
      </div>
    </motion.div>
  );
}

export default MenuNav;