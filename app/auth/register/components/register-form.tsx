'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import LinkButton from '@/app/auth/components/link-button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { set } from 'zod';

export default function UserregisterUserForm() {
  const router = useRouter();
  const [statusForm, setStatusForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setStatusForm(true);
    if (data.password != data.confirmPassword) {
      return alert('Las contraseñas no coinciden');
    }

    const { username, email, password } = data;
    const response = await fetch('/auth/register/lib', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        'Content-type': 'aplication/json',
      },
    });
    if (response.ok) {
      router.push('/auth/login');
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Por favor registrate para continuar.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Nombre
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                // name="name"
                placeholder="Ingresa tu nombre"
                required
                {...register('username', {
                  required: { value: true, message: 'Este campo es requerido' },
                })}
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* {errorMessages &&
            errorMessages.errors &&
            errorMessages.errors.name ? (
              <div className="block">
                <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
                {errorMessages.errors.name?.map((error, index) => (
                  <p key={index} className=" inline-block text-sm text-red-500">
                    {error}
                  </p>
                ))}
              </div>
            ) : (
              ''
            )} */}
            {errors.username && (
              <div className="block">
                <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
                <p className=" inline-block text-sm text-red-500">
                  {errors.username.message}
                </p>
              </div>
            )}
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Correo
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                // name="email"
                placeholder="Ingresa tu correo electronico"
                required
                {...register('email', {
                  required: { value: true, message: 'Este campo es requerido' },
                })}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* {errorMessages &&
            errorMessages.errors &&
            errorMessages.errors.email ? (
              <div className="block">
                <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
                {errorMessages.errors.email?.map((error, index) => (
                  <p key={index} className=" inline-block text-sm text-red-500">
                    {error}
                  </p>
                ))}
              </div>
            ) : (
              ''
            )} */}
            {errors.email && (
              <div className="block">
                <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
                <p className=" inline-block text-sm text-red-500">
                  {errors.email.message}
                </p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                // name="password"
                placeholder="Ingresa tu contraseña"
                required
                minLength={6}
                {...register('password', {
                  required: { value: true, message: 'Este campo es requerido' },
                })}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* {errorMessages &&
            errorMessages.errors &&
            errorMessages.errors.password ? (
              <div className="block">
                <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
                {errorMessages.errors.password?.map((error, index) => (
                  <p key={index} className=" inline-block text-sm text-red-500">
                    {error}
                  </p>
                ))}
              </div>
            ) : (
              ''
            )} */}
            {errors.password && (
              <div className="block">
                <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
                <p className=" inline-block text-sm text-red-500">
                  {errors.password.message}
                </p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="confirmPassword"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirmPassword"
                type="password"
                // name="confirmPassword"
                placeholder="Ingresa la confirmación de contraseña"
                required
                minLength={6}
                {...register('confirmPassword', {
                  required: { value: true, message: 'Este campo es requerido' },
                })}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* {errorMessages &&
            errorMessages.errors &&
            errorMessages.errors.confirmPassword ? (
              <div className="block">
                <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
                {errorMessages.errors.confirmPassword?.map((error, index) => (
                  <p key={index} className=" inline-block text-sm text-red-500">
                    {error}
                  </p>
                ))}
              </div>
            ) : (
              ''
            )} */}
            {errors.confirmPassword && (
              <div className="block">
                <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
                <p className=" inline-block text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* {errorMessages && errorMessages.message ? (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessages.message}</p>
            </>
          ) : (
            ''
          )} */}
        </div>
        <LoginButton status={statusForm} />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        ></div>
        <LinkButton href="/auth/login" text="¿Ya tienes cuenta?" />
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </div>
    </form>
  );
}

function LoginButton({ status }: { status: boolean }) {
  return (
    <Button className="mt-4 w-full" aria-disabled={status}>
      Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
