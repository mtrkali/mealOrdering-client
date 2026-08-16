"use client";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }: any) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading ....</p>;
  if (!user) return <p>Please login</p>;

  if (role && user.role !== role) {
    return <p>Access Denied</p>;
  }
  return children;
}
