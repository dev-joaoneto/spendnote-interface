import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { firebaseAuth } from '../config/firebase';


export const api: AxiosInstance = axios.create({

    baseURL: "https://spendnote-spendnote-api.xgg4n8.easypanel.host",
    timeout: 10000,
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const user = firebaseAuth.currentUser;
        if (user) {
            try{
                const token = await user.getIdToken();
                config.headers.set("Authorization", `Bearer ${token}`)
            }catch(error){
                console.error("Erro ao obter token do usuário no firebase", error);
        }
    }  
        return config; 
  }
)