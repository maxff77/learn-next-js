import prisma from '@/app/lib/database';
const { v4: uuidv4 } = require('uuid');
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    const emailFound = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (emailFound) {
      return Response.json(
        { message: 'Email Existente' },
        {
          status: 400,
        },
      );
    }
    const usernameFound = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (usernameFound) {
      return Response.json(
        { message: 'Usuario Existente' },
        {
          status: 400,
        },
      );
    }

    const passwordHashed = await bcrypt.hash(password, 10);
    const data = {
      id: uuidv4(),
      username: username,
      email: email,
      password: passwordHashed,
    };
    const newUser = await prisma.user.create({
      data,
    });
    const { password: _, ...user } = newUser;
    return Response.json(user);
  } catch (error) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      },
    );
  }
}
