import mongoose, {Types} from 'mongoose';

const userSchema = new mongoose.Schema<UserTypes>(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    role: {
      type: String,
      default: 'user',
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dnkc0hbix/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1673365394/pngegg_yqtset.jpg',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: '',
    },
    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<UserTypes>('User', userSchema);

export default User;

export interface UserTypes {
  id: string;
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: string;
  image?: string;
  emailVerified?: Boolean;
  defaultPaymentMethod?: string;
  address: [
    {
      firstName?: string;
      lastName?: {
        type: string;
      };
      phoneNumber?: {
        type: string;
      };
      address1?: {
        type: string;
      };
      address2?: {
        type: string;
      };
      city?: {
        type: string;
      };
      zipCode?: {
        type: string;
      };
      state?: {
        type: string;
      };
      country?: {
        type: string;
      };
      active?: {
        type: Boolean;
      };
    }
  ];
  createdAt: Date;
  updateAt: Date;
}
