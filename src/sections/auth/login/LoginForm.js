import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from "react-hook-form";
import { Toaster } from 'react-hot-toast';
import { login, setWithExpiry } from '../../../utils/user.service';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async data => {
    try {
      const result = await login(data);
      if (result) {
        result.token = "fake-jwt-token"
        localStorage.removeItem('muiUser');
        // if user checked rememebr me it expires in 4 minutes otherwise it expires in 24hours
        // eslint-disable-next-line no-unused-expressions
        data.remember ? setWithExpiry('muiUser', result, 4) : setWithExpiry('muiUser', result, 1440);
        navigate('/dashboard/app', { replace: true });
      }
      // eslint-disable-next-line no-empty
    } catch (error) { }

  };

  const handleClick = () => {
  };



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField name="email" label="Email address" {...register("email", { required: true })} />
          {errors.email && <span className="text-red">Email is Required</span>}
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
            {...register("password", { required: true })}
          />
        </Stack>
        {errors.password && <span className="text-red">Password is Required</span>}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" {...register("remember")} />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Login
        </LoadingButton>
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </>
  );
}
