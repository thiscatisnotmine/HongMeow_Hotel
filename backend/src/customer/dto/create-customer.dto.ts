// backend/src/customer/dto/create-customer.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsString() CusCID: string;
  @IsString() CusFname: string;
  @IsString() CusLname: string;
  @IsString() CusPhone: string;
  @IsEmail() CusEmail: string;
}
