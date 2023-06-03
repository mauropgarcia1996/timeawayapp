import {create} from 'zustand';
interface AuthStore {
  session: object | null;
  setSession: (session: object | null) => void;
}
const useAuthStore = create<AuthStore>(set => ({
  session: null,
  setSession: (session: any) => set({session}),
}));

export {useAuthStore};
