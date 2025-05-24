import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export abstract class VehicleBaseInputDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/, {
    message:
      'licensePlate must follow the Mercosul plate pattern (e.g. ABC1D23).',
  })
  @ApiProperty({
    description: 'Vehicle license plate in Mercosul pattern.',
    example: 'ABC1D23',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  public licensePlate: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {
    message:
      'chassi must be 17 characters long, using letters (except I, O, Q) and numbers.',
  })
  @ApiProperty({
    description: 'Vehicle chassis number, 17 characters without I, O, Q.',
    example: '9BWZZZ377VT004251',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  public chassi: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{1,11}$/, {
    message: 'Vehicle renavam must be between 1 and 11 numeric digits.',
  })
  @ApiProperty({
    description: 'Vehicle renavam number with 1 to 11 numeric digits.',
    example: '12345678901',
  })
  public renavam: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Vehicle manufacturer.',
    example: 'Toyota',
  })
  public manufacturer: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Vehicle model.',
    example: 'Corolla Altis Hybrid Premium',
  })
  public model: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(19|20)\d{2}$/, {
    message: 'productionYear must be a valid year between 1900 and 2099.',
  })
  @ApiProperty({
    description: 'Vehicle production year (4 digits).',
    example: '2023',
  })
  public productionYear: string;
}
