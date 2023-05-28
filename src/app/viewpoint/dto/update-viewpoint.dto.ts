import { PartialType } from '@nestjs/mapped-types';
import { CreateViewpointDto } from './create-viewpoint.dto';

export class UpdateViewpointDto extends PartialType(CreateViewpointDto) {}
