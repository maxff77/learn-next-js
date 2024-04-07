'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import LinkButton from '@/app/auth/components/link-button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const router = useRouter();
  const [statusForm, setStatusForm] = useState(false);
  const [errorForm, setErrorForm] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setStatusForm(true);
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.error) {
      setStatusForm(false);
      setErrorForm(response.error);
    } else {
      router.push('/dashboard');
      router.refresh()
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Por favor iniciar sesión para continuar.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
                {...register('email', {
                  required: {
                    value: true,
                    message: 'El campo es requerido',
                  },
                })}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
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
                placeholder="Enter password"
                required
                minLength={6}
                {...register('password', {
                  required: {
                    value: true,
                    message: 'El campo es requerido',
                  },
                })}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.password && (
              <div className="block">
                <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
                <p className=" inline-block text-sm text-red-500">
                  {errors.password.message}
                </p>
              </div>
            )}
          </div>
        </div>
        <LoginButton status={statusForm} />

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
          {errorForm && (
            <div className="block">
              <ExclamationCircleIcon className=" inline-block h-5 w-5 text-red-500" />
              <p className=" inline-block text-sm text-red-500">{errorForm}</p>
            </div>
          )}
        </div>
        <LinkButton href="/auth/register" text="¿No tienes cuenta?" />
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
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
