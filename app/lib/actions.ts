'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
const { v4: uuidv4 } = require('uuid');

// Esquema de los datos de una factura

const FormSchemaInvoice = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const FormSchemaUser = z.object({
  id: z.string(),
  name: z
    .string({
      invalid_type_error: 'Escribe un nombre valido',
    })
    .min(3, {
      message: 'Escribe un nombre mayor a 3 caracteres',
    }),
  email: z
    .string({
      invalid_type_error: 'Escribe un email valido',
    })
    .email({
      message: 'Escribe un email valido',
    }),
  password: z
    .string({
      invalid_type_error: 'Escribe una contraseña valida',
    })
    .min(6, {
      message: 'Escribe una contraseña mayor a 6',
    }),
  confirmPassword: z.string({
    invalid_type_error: 'Escribe una contraseña valida',
  }),
});

// Creamos los esquemas de cada acción

const CreateInvoice = FormSchemaInvoice.omit({ id: true, date: true });
const UpdateInvoice = FormSchemaInvoice.omit({ id: true, date: true });
const CreateUser = FormSchemaUser.omit({ id: true });

export type StateInvoice = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type StateUser = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function createInvoice(
  prevState: StateInvoice,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: StateInvoice,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
  revalidatePath('/dasboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  // try {
  //   await signIn('credentials', formData);
  // } catch (error) {
  //   if (error instanceof AuthError) {
  //     switch (error.type) {
  //       case 'CredentialsSignin':
  //         return 'Datos incorrectos.';
  //       default:
  //         return 'Ocurrio un error.';
  //     }
  //   }
  //   throw error;
  // }
}

export async function registerUser( prevState: StateUser, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hubo un error al crear el usuario',
    };
  }

  const { name, email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: ['Las contraseñas no coinciden'],
      },
      message: 'Las contraseñas no coinciden',
    };
  }

  const passwordHashed = await bcrypt.hash(password, 10);
  const createDate = new Date().toISOString().split('T')[0];
  const id = uuidv4();

  console.log({
    id,
    name,
    email,
    passwordHashed,
  });

  try {
    await sql`
      INSERT INTO users(id, name, email, password)
      VALUES(${id}, ${name}, ${email}, ${passwordHashed})    
    `;
  } catch (error) {
    return {
      message: 'Hubo un error en la base de datos',
    };
  }
  redirect('/login')
}
