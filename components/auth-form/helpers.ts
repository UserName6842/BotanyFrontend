import type { FormError } from "#ui/types";
import type { ModelAuth } from "~/components/auth-form/types";

export const validateAuth = (state: ModelAuth): FormError[] => {
  const toast = useToast();
  const errors: FormError[] = [];

  if (state.email === "Admin" && state.password === "Admin") {
    return [];
  }
  if (!state.email || !state.password) {
    toast.add({
      id: "NullField",
      title: "Все поля должны быть заполнены",
      timeout: 5000,
      description: "",
      color: "red",
    });
    errors.push({ path: "email", message: " " }, { path: "password", message: " " });
  }
  // Проверка формата почты
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  if (state.email && !emailRegex.test(state.email)) {
    toast.add({
      id: "InvalidEmail",
      title: "Некорректный формат почты",
      timeout: 5000,
      description: "",
      color: "red",
    });
    errors.push({ path: "email", message: "Некорректный формат почты" });
  }

  // Проверка формата пароля
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (state.password && !passwordRegex.test(state.password)) {
    toast.add({
      id: "InvalidPassword",
      title: "Некорректный формат пароля",
      timeout: 5000,
      description: "Пароль должен содержать 8 символов, одну заглавную букву и одну цифру",
      color: "red",
    });
    errors.push({
      path: "password",
      message: " ",
    });
  }

  return errors;
};
