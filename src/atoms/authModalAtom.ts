import { atom } from "recoil";
import Login from "@/components/Modals/AuthModals/Login";
import Register from "@/components/Modals/AuthModals/Register";
import ForgotPassword from "@/components/Modals/AuthModals/ForgotPassword";

export const modals = {
  login: Login,
  register: Register,
  forgotPassword: ForgotPassword,
};

export type ModalType = keyof typeof modals;

export interface StateType {
  isOpen: boolean;
  type: ModalType;
}

export const initialAuthModalState: StateType = {
  isOpen: false,
  type: "login",
};

export const authModalState = atom({
  key: "authModal",
  default: initialAuthModalState,
});
