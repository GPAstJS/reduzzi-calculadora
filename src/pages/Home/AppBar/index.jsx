/** @format */

import logo from '../../../assets/reduzziLogo1.svg';
import facebook from '../../../assets/facebook.svg';
import insta from '../../../assets/insta.svg';
import linkedin from '../../../assets/linkedin.svg';
import whats from '../../../assets/whats.svg';
import youtube from '../../../assets/youtube.svg';

import { useContext } from 'react';

import { AuthContext } from '../../../contexts/authContext';

const ContextUserInfo = ({ context }) => (
    <div className="flex items-center gap-6">
        <div className="flex items-center gap-6">
            <div className="flex flex-col items-start">
                <p className="text-white text-[15rem] font-bold">
                    {context?.user?.name} - {context?.user?.occupation}
                </p>
                <p className="text-white text-[15rem] font-bold">
                    Franquia: {context?.franquia?.nome}
                </p>
            </div>

            <a href={`${import.meta.env.VITE_DASHBOARD_URL}`}>
                <button className="bg-white text-[var(--main-blue)] rounded-[10rem] text-xl py-2 px-6 hidden sm:block">
                    Ir para o Sistema
                </button>
            </a>
        </div>
    </div>
);

const AppBar = () => {
    const { userContext } = useContext(AuthContext);

    // console.log('userContext', userContext);

    /* const handleChangeBtn = () => {
        if (userContext) {
            return (
                <button
                    className="bg-white text-[var(--main-blue)] rounded-[10rem] text-xl py-4 px-14 hidden sm:block"
                    onClick={() => {
                        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`;
                    }}
                >
                    Sign out
                </button>
            );
        }

        return (
            <button
                className="bg-white text-[var(--main-blue)] rounded-[10rem] text-xl py-4 px-14 hidden sm:block"
                onClick={() => {
                    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
                }}
            >
                Login
            </button>
        );
    }; */

    return (
        <>
            <nav className="bg-[var(--main-blue)] w-full">
                <div className="max-w-[1440rem] m-auto w-full flex items-center justify-between px-14 h-[110rem] scale-90">
                    <a href="/">
                        <img
                            src={logo}
                            alt="Reduzzi Logo"
                            className="max-h-[70rem] cursor-pointer"
                        />
                    </a>

                    {userContext?.user?.franquiaId &&
                        userContext?.user?.franquiaId !== '0' && (
                            <ContextUserInfo context={userContext} />
                        )}

                    <div className="flex gap-6 ">
                        <img
                            src={facebook}
                            alt="facebook"
                            className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
                        />
                        <img
                            src={insta}
                            alt="insta"
                            className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
                        />
                        <img
                            src={whats}
                            alt="whats"
                            className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
                        />
                        <img
                            src={youtube}
                            alt="youtube"
                            className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
                        />
                        <img
                            src={linkedin}
                            alt="linkedin"
                            className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
                        />

                        {/* handleChangeBtn() */}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AppBar;
