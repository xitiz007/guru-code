type Props = {
  message: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <p className="text-red-500 text-sm font-normal">{message}</p>;
};

export default ErrorMessage;
