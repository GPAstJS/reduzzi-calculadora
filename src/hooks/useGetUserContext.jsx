/** @format */

import { useContext } from 'react';

import { AuthContext } from '../contexts/authContext';

export const useGetUserContext = () => {
    const { userContext, setUserContext } = useContext(AuthContext);

    const getUserContext = async () => {
        try {
            const result = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/user/calculadora`,
                {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (result.status === 401) {
                return 'Unauthorized';
            }

            const payload = await result.json();

            setUserContext({ ...payload });
        } catch (error) {
            console.error('error', error);

            return;
        }
    };

    return { userContext, getUserContext };
};
