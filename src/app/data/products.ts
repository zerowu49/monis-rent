import { Product } from "./types";

export const products: Product[] = [
  // Desks
  {
    id: "desk-modern",
    name: "Modern Standing Desk",
    category: "desk",
    price: 6,
    description: "Adjustable height, electric, spacious surface",
    icon: "/images/product/electric-desk.png",
    color: "#8B4513",
  },
  {
    id: "desk-mechanical",
    name: "Mechanical Desk",
    category: "desk",
    price: 7,
    description: "Traditional design, solid oak, timeless",
    icon: "/images/product/mechanical-desk.png",
    color: "#D2691E",
  },

  // Chairs
  {
    id: "chair-ergonomic",
    name: "Ergonomic Office Chair",
    category: "chair",
    price: 6,
    description: "Lumbar support, adjustable arms",
    icon: "/images/product/ergonomic-chair.png",
    color: "#2C3E50",
  },
  {
    id: "chair-normal",
    name: "Normal Chair",
    category: "chair",
    price: 4.5,
    description: "Normal chair, simple",
    icon: "/images/product/normal-chair.png",
    color: "#654321",
  },

  // Accessories
  {
    id: "monitor-stand",
    name: "Adjustable Monitor Stand",
    category: "accessory",
    price: 2,
    description: "Adjustable height of 11-18cm, up to 15kg load bearing",
    icon: "/images/product/monitor-stand.png",
    color: "#34495E",
  },
  {
    id: "keyboard-mx",
    name: "Logitech MX Keyboard",
    category: "accessory",
    price: 6,
    description:
      "Up to 10 meters wireless range, Easy-Switch™ keys to work on up to 3 computers",
    icon: "/images/product/logitech-keyboard.png",
    color: "#F39C12",
  },
  {
    id: "logitech-webcam",
    name: "Logitech 4K Webcam",
    category: "accessory",
    price: 6,
    description: "Logitech Brio 4K 5x HD zoom, Integrated microphone",
    icon: "/images/product/logitech-webcam.png",
    color: "#27AE60",
  },
  {
    id: "coffee-mug",
    name: "Bosch Smart Coffee Maker",
    category: "accessory",
    price: 3,
    description:
      "Filter coffee maker, 1200 W power, 1.4 L water tank (10–15 cups)",
    icon: "/images/product/bosch-coffe-maker.png",
    color: "#8B4513",
  },
];

export const getDeskOptions = () =>
  products.filter((p) => p.category === "desk");
export const getChairOptions = () =>
  products.filter((p) => p.category === "chair");
export const getAccessoryOptions = () =>
  products.filter((p) => p.category === "accessory");
