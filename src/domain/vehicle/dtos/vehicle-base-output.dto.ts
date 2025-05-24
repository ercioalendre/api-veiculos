import { Type } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { VehicleEntity } from 'src/shared/entities';

export abstract class VehicleBaseOutputDto extends PartialType(
  VehicleEntity as Type<VehicleEntity>,
) {}
