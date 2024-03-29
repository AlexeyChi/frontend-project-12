import { useContext } from 'react';

import { AuthContext, ApiContext } from '../contexts/index.jsx';

export const useAuth = () => useContext(AuthContext);

export const useChatApi = () => useContext(ApiContext);
