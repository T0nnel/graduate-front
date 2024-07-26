// src/types/types.ts

// Interface for a Product
export interface Product {
  _id: string;                   // Unique identifier for the product
  name: string;                  // Name of the product
  description: string;           // Detailed description of the product
  price: number;                 // Price of the product
  location: string;              // Location where the product is available
  shippingType: 'free' | 'priced'; // Shipping type: either 'free' or 'priced'
  shippingPrice?: number;        // Optional shipping price if shippingType is 'priced'
  image?: string;                // Optional image URL for the product
}

// Interface for a User
export interface User {
  firstName: string;             // User's first name
  lastName: string;              // User's last name
  profilePicture: string;        // URL of the user's profile picture
  bio: string;                   // User's biography
  email: string;                 // User's email address
  name: string;                  // Full name of the user
  token?: string;                // Optional authentication token
}

// Interface for Product Creation/Update
export interface ProductFormValues {
  name: string;                  // Name of the product
  description: string;           // Description of the product
  price: number;                 // Price of the product
  location: string;              // Location of the product
  shippingType: 'free' | 'priced'; // Shipping type
  shippingPrice?: number;        // Optional shipping price
  image?: File;                  // Optional image file for the product
}

// Interface for user login form values
export interface LoginFormValues {
  email: string;                 // User's email address
  password: string;              // User's password
}

// Interface for user registration form values
export interface RegistrationFormValues {
  firstName: string;             // User's first name
  lastName: string;              // User's last name
  email: string;                 // User's email address
  password: string;              // User's password
  confirmPassword: string;       // Confirmation of the user's password
}
