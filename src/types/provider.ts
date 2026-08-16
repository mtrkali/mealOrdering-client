export interface Provider {
  id: string;
  userId: string;
  businessName: string;
  phone: string;
  address: string;
  status: "ACTIVE" | "PENDING" | "BLOCKED";
  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string;
    status: string;
    emailVerified: boolean;
  };
}