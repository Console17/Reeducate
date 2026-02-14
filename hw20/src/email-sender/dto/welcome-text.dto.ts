import { OmitType } from '@nestjs/mapped-types';
import { SendEmailDto } from './send-email.dto';

export class WelcomeTextDto extends OmitType(SendEmailDto, [
  'subject',
  'text',
] as const) {}
