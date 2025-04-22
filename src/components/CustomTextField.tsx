import { TextField } from "@mui/material"

interface ICustomTextField {
  error?: boolean;
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
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus
      style={{ marginBottom: '5px' }}
      type={name === 'password' ? 'password' : 'text'}
      required={required}
      fullWidth
      error={error}
      name={name}
      variant="standard"
      color={error ? 'error' : 'primary'}
    />
  )
}

