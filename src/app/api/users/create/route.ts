import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/api/utils';
import { CreateUserDto } from '@/api/dtos';

const usersService = ServiceFactory.getUsersService();

export async function POST(req: NextRequest) {

      const { email, password, confirmPassword, expiresInUnit, expiresInValue } = await req.json();

      console.log('Received email:', email);
      console.log('Received password:', password);
      console.log('Received expiresInUnit:', expiresInUnit);
      console.log('Received expiresInValue:', expiresInValue);

      const createUserDto = new CreateUserDto({ email, password, confirmPassword, expiresInUnit, expiresInValue }).validate();

      const user = await usersService.create(createUserDto);

      return NextResponse.json(user);

}
