import { TextField } from "@mui/material"

interface ICustomTextField {
  error: boolean;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  value: string | number
  errorMessage?: string
}

export const CustomTextField: React.FC<ICustomTextField> = ({
  error,
  name,
  placeholder,
  onChange,
  required,
  value,
  errorMessage
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus
      required={required}
      fullWidth
      error={error}
      name={name}
      aria-errormessage={errorMessage}
      variant="standard"
      color={error ? 'error' : 'primary'}
    />
  )
}

