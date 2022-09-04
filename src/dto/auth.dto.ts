import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'email address cannot empty' })
  @IsEmail(undefined, { message: 'email address in not valid' })
  @IsString({ message: 'email type must string' })
  email: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  @MinLength(8, { message: 'minimum password is 8 letters ' })
  @IsString({ message: 'password type must be string' })
  password: string;

  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString({ message: 'name type must be string' })
  name: string;

  @IsOptional()
  @IsEnum(['male', 'female'], {
    message: 'only 2 option for gender, male or female',
  })
  gender?: 'male' | 'female';

  @IsOptional()
  @IsString({ message: 'phone type must be string' })
  phone?: string;

  @IsOptional()
  @IsUrl(undefined, { message: 'profile picture must be url' })
  @IsString({ message: 'profiel_picture type must be string' })
  profile_picture?: string;
}
