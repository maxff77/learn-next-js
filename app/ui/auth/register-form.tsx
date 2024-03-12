'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import { useFormState, useFormStatus } from 'react-dom';
import { registerUser } from '@/app/lib/actions';
import LinkButton from './link-button';

export default function UserregisterUserForm() {
  const initialState = { message: null, errors: {} };
  const [errorMessages, dispatch] = useFormState(registerUser, initialState);
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please register to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                // required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errorMessages &&
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
            )}
          </div>
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
                name="email"
                placeholder="Enter your email address"
                // required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errorMessages &&
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
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                // required
                // minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errorMessages &&
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
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Enter password"
                // required
                // minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errorMessages &&
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
            )}
          </div>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessages && errorMessages.message ? (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessages.message}</p>
            </>
          ) : (
            ''
          )}
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        ></div>
        <LinkButton href="/login" text="¿Ya tienes cuenta?" />
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
