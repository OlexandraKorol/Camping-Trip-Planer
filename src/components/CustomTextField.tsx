import { TextField } from "@mui/material"

interface ICustomTextField {
  error?: boolean;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string | number
  errorMessage?: string
  type?:string
  multiline?: boolean
  helperText?: string
}

export const CustomTextField: React.FC<ICustomTextField> = ({
  error,
  name,
  placeholder,
  onChange,
  required=false,
  value,
  type='text',
  multiline=false,
  helperText,
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus
      style={{ marginBottom: '5px' }}
      type={type}
      required={required}
      fullWidth
      error={error}
      name={name}
      multiline={multiline}
      variant="outlined"
      color={error ? 'error' : 'primary'}
      helperText={helperText}
      sx={{mb: 3}}
      rows={multiline ? 6 : 1}
    />
  )
}

