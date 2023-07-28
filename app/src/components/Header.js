import React, { useState } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { BiSearchAlt } from 'react-icons/bi';
import logo from '../highon.png';
import { setActiveScreen} from '../store/screenSlice';
import { useDispatch } from 'react-redux';

export default function Header() {
    const dispatch = useDispatch();
    return (
        <>
            <div className="flex justify-between items-center px-4 pb-4 pt-12 sticky top-0 bg-white z-10">
                <img src={logo} alt="logo" className="w-24" />
                <div className="flex items-center gap-2 text-3xl">
                    <FiPlusSquare 
                    onClick={() => dispatch(setActiveScreen('addPost'))}
                     className="cursor-pointer" />
                    <BiSearchAlt className="cursor-pointer" />
                </div>
            </div>

        </>
    );
}