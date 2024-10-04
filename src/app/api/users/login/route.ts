// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/api/utils';
import { LoginUserDto } from '@/api/dtos';

const usersService = ServiceFactory.getUsersService();

export async function POST(req: NextRequest) {

      const { email, password } = await req.json();

      console.log('Received email:', email);
      console.log('Received password:', password);

      const loginUserDto = new LoginUserDto({ email, password }).validate();

      const user = await usersService.login(loginUserDto);

      return NextResponse.json(user);

}
