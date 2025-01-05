import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MG } from 'mongoose';
import { Dict } from 'shtcut/core/shared';

export type LinkBioDocument = LinkBio & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class LinkBio {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
  })
  slug: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
  })
  template: string;

  @Prop({
    type: String,
  })
  profileImage: string;

  @Prop({
    type: [MG.Types.Mixed],
  })
  links: Dict[];

  @Prop({
    type: MG.Types.Mixed,
  })
  colors: Dict;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  deleted: boolean;
}

const LinkBioSchema = SchemaFactory.createForClass(LinkBio);

LinkBioSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

LinkBioSchema.statics.config = () => {
  return {
    idToken: 'lnk-bio',
    slugify: 'slug',
    uniques: ['name'],
    fillables: ['name', 'slug', 'description', 'template', 'profileImage', 'colors', 'links'],
    updateFillables: ['name', 'slug', 'description', 'template', 'profileImage', 'colors', 'links'],
    hiddenFields: ['deleted'],
  };
};

export { LinkBioSchema };