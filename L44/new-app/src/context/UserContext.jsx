import { createContext } from 'react';
const defaultUser = {name:"",vorname:"",role:"Guest"};

export const UserContext = createContext(defaultUser);