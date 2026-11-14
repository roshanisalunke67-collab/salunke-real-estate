export type Property = {
  id: number;
  title: string;
  location: string;
  construction: "New Construction" | "Resale Construction" | "To Be Confirmed";
  type: "Flat" | "Shop" | "Plot";
  purpose: "Sale" | "Rent";
  price: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  tag: string;
  description?: string;
  features?: string[];
};
