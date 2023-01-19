import mongoose, {Types} from 'mongoose';
import {CategoryTypes} from './Category';
import {SubCategoryTypes} from './SubCategory';

const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema<ReviewTypes>({
  reviewBy: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  style: {
    color: String,
    image: String,
  },
  fit: {
    type: String,
  },
  images: [],
  likes: [],
});
const productSchema = new mongoose.Schema<ProductTypes>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      //lowercase: true,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: 'Category',
    },
    subCategories: [
      {
        type: ObjectId,
        ref: 'subCategory',
      },
    ],
    details: [
      {
        name: String,
        value: String,
      },
    ],
    questions: [
      {
        question: String,
        answer: String,
      },
    ],
    reviews: [reviewSchema],
    refundPolicy: {
      type: String,
      default: '30 days',
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    subProducts: [
      {
        sku: String,
        images: [],
        description_images: [],
        color: {
          color: {
            type: String,
          },
          image: {
            type: String,
          },
        },
        sizes: [
          {
            size: String,
            qty: Number,
            price: Number,
          },
        ],
        discount: {
          type: Number,
          default: 0,
        },
        sold: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.models.Product || mongoose.model<ProductTypes>('Product', productSchema);

export default Product;

export interface ProductTypes {
  _id: typeof ObjectId;
  name: string;
  description: string;
  brand?: string;
  slug: string;
  category: CategoryTypes;
  subCategories?: SubCategoryTypes[];
  details?: [
    {
      name: string;
      value: string;
    }
  ];
  questions?: [
    {
      question: string;
      answer: string;
    }
  ];
  reviews?: [];
  refundPolicy?: {
    type: string;
    default: string;
  };
  rating: {
    type: Number;
    required: Boolean;
    default: Number;
  };
  numReviews: {
    type: Number;
    required: Boolean;
    default: Number;
  };
  shipping: {
    type: Number;
    required: Boolean;
    default: 0;
  };
  subProducts: [
    {
      sku: string;
      images: {
        url: string;
        public_url: string;
      }[];
      description_images: Array<string>;
      color: {
        color: string;
        image: string;
      };
      sizes: [
        {
          size: string;
          qty: Number;
          price: Number;
        }
      ];
      discount: Number;
      sold: {
        type: Number;
        default: Number;
      };
    }
  ];
  createdAt: Date;
  updateAt: Date;
}

export interface ReviewTypes {
  reviewBy: {
    type: Types.ObjectId;
    ref: string;
    required: Boolean;
  };
  rating: {
    type: Number;
    required: Boolean;
    default: Number;
  };
  review: {
    type: string;
    required: Boolean;
  };
  size?: {
    type: string;
  };
  style?: {
    color: string;
    image: string;
  };
  fit?: {
    type: string;
  };
  images: Array<string>;
  likes: Array<string>;
}
