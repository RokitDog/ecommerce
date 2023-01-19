import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const subSchema = new mongoose.Schema<SubCategoryTypes>({
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
  parent: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
});

const SubCategory =
  mongoose.models.SubCategory || mongoose.model<SubCategoryTypes>('SubCategory', subSchema);

export default SubCategory;

export interface SubCategoryTypes {
  name: string;
  slug: {
    type: string;
    unique: Boolean;
    lowercase: Boolean;
    index: Boolean;
  };
  parent: {
    type: typeof ObjectId;
    ref: string;
    required: true;
  };
}
