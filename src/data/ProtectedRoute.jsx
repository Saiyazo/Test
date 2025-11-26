import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "./Auth.jsx";

/**
 * props:
 * - children: component to render
 * - allowedRoles: array of roles allowed to view this route (e.g. ['admin'])
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const auth = getAuth();
  if (!auth) {
    // ยังไม่ได้ล็อกอิน -> ไปหน้า login
    return <Navigate to="/" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    // ไม่มีสิทธิ์ -> ไปหน้า login หรือเพจ unauthorized (เราไป login)
    return <Navigate to="/" replace />;
  }
  return children;
}
