import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be 3 characters"),
  slug: z.string().min(3, "Slug must be 3 characters"),
  category: z.string().min(3, "Category must be 3 characters"),
  brand: z.string().min(3, "Brand must be 3 characters"),
  description: z.string().min(3, "Description must be 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string().min(1, "Product must be 1 image")),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters"),
});

// Schema for signup users in
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be 6 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

//cart schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is requied"),
  name: z.string().min(1, "Name is requied"),
  slug: z.string().min(1, "Slug is requied"),
  qty: z.number().int().nonnegative("Quantity must be a number"),
  image: z.string().min(1, "Image is requied"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session card is requied"),
  userId: z.string().optional().nullable(),
});
