import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type TymlezUserDocument = TymlezUser & Document;

@Schema({ collection: 'tymlez_user' })
export class TymlezUser {
  @Prop({ required: false })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  iv: string;

  @Prop({ required: true })
  client: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: false, type: SchemaTypes.Mixed })
  data?: any;

  @Prop({ required: false, type: SchemaTypes.Mixed })
  profile?: any;

  @Prop({ required: false, type: SchemaTypes.Mixed })
  did?: string;
}

export const TymlezUserSchema = SchemaFactory.createForClass(TymlezUser);
