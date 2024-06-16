import type { FormError } from "#ui/types";
import type { Transecta } from "~/stores/transecta/types";

export const validateTransect = (state: Transecta): FormError[] => {
  const toast = useToast();
  const errors: FormError[] = [];

  if (state.covered && state.covered > 100) {
    toast.add({
      id: "InvalidEmail",
      title: "Покрытость не должно превышать больше 100",
      timeout: 5000,
      description: "Покрытость исчесляеться в процентах",
      color: "red",
    });
    errors.push({ path: "covered", message: " " });
  }

  return errors;
};
