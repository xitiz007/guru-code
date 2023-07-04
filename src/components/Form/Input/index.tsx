import { UseFormRegister } from "react-hook-form";

interface Props {
  type: "text" | "email" | "password";
  name: string;
  label: string;
  register: UseFormRegister<any>;
  errors: {
    [key: string]: {
      message?: string;
    };
  };
}

const Input: React.FC<Props> = ({ register, errors, label, name, type }) => {
  return (
    <div className="flex flex-col space-y-2 text-black">
      <label
        className="font-medium text-base md:text-lg tracking-wide"
        htmlFor="email"
      >
        {label}
      </label>
      <div className="space-y-1">
        <input className="input" type={type} id={name} {...register(name)} />
        {errors[name] && (
          <p className="text-sm text-red-500">{errors[name]?.message}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
