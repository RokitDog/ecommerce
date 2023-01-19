import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema<CategoryTypes>(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'must be atleast 2 charcters'],
      maxlength: [32, 'must be atleast 2 charcters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model<CategoryTypes>('Category', categorySchema);

export default Category;

export interface CategoryTypes {
  name: string;
  slug: {
    type: string;
    unique: Boolean;
    lowercase: Boolean;
    index: Boolean;
  };
  createdAt: Date;
  updateAt: Date;
}
