import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, FormControlLabel, Typography, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const [platforms, setPlatforms] = useState([
    { name: 'Twitter', accessToken: '', checked: false },
    { name: 'Instagram', accessToken: '', checked: false },
  ]);

  const handleCheckboxChange = (index) => (event) => {
    const newPlatforms = [...platforms];
    newPlatforms[index].checked = event.target.checked;
    setPlatforms(newPlatforms);
  };

  const handleAccessTokenChange = (index) => (event) => {
    const newPlatforms = [...platforms];
    newPlatforms[index].accessToken = event.target.value;
    setPlatforms(newPlatforms);
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ mt: 5 }}>
          Personal Information
        </Typography>

        <TextField fullWidth name="username" label="Username" />
        <TextField fullWidth name="email" label="Email address" />

      </Stack>

      <Stack spacing={3}>
        <Typography variant="h6" sx={{ mt: 5 }}>
          Social Media Accounts
        </Typography>
      
        {platforms.map((platform, index) => (
          <Stack direction="row" alignItems="center" justifyContent="space-between" key={platform.name}>
            <FormControlLabel
              control={<Checkbox checked={platform.checked} onChange={handleCheckboxChange(index)} />}
              label={`${platform.name}:`}
            />
            <TextField
              fullWidth
              label="Access Token"
              value={platform.accessToken}
              onChange={handleAccessTokenChange(index)}
              disabled={!platform.checked}
              variant="outlined"
              margin="normal"
            />
          </Stack>
        ))}

      </Stack>

      <Stack spacing={3} sx={{ mt: 5, mb: 10 }}>
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Signup
      </LoadingButton>
    </>
  );
}
