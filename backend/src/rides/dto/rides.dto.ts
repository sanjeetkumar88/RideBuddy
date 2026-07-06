import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class RequestRideDto {
  @IsNumber()
  @IsNotEmpty()
  pickupLat!: number;

  @IsNumber()
  @IsNotEmpty()
  pickupLng!: number;

  @IsNumber()
  @IsNotEmpty()
  dropLat!: number;

  @IsNumber()
  @IsNotEmpty()
  dropLng!: number;
}

export class UpdateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  lat!: number;

  @IsNumber()
  @IsNotEmpty()
  lng!: number;
}
