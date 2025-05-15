"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface StaffInfoProps {
  mode?: "view" | "edit" | "add";
  defaultValues?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    tel?: string;
    email?: string;
    birth?: string;
    age?: number;
    address?: string;
    username?: string;
    password?: string;
  };
}

export default function StaffInfo({
  mode,
  defaultValues = {},
}: StaffInfoProps) {
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);

  const pageMode: "view" | "edit" | "add" =
    mode ||
    (pathname.includes("addstaff")
      ? "add"
      : pathname.includes("viewmore")
        ? "edit"
        : "view");

  const isEditable = pageMode === "edit" || pageMode === "add";

  return (
    <form className="space-y-4 text-sm text-gray-800 max-w-xl">
      <div>
        <label className="block font-bold">ID:</label>
        <input
          type="text"
          defaultValue={
            pageMode === "add" ? "" : defaultValues.id || "12345678"
          }
          readOnly={pageMode !== "add"}
          className="w-full border px-3 py-1 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold">First Name:</label>
          <input
            type="text"
            defaultValue={
              pageMode === "add" ? "" : defaultValues.firstName || "Bob"
            }
            readOnly={!isEditable}
            className="w-full border px-3 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-bold">Last Name:</label>
          <input
            type="text"
            defaultValue={
              pageMode === "add" ? "" : defaultValues.lastName || "Allen"
            }
            readOnly={!isEditable}
            className="w-full border px-3 py-1 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold">Tel.:</label>
          <input
            type="tel"
            defaultValue={
              pageMode === "add" ? "" : defaultValues.tel || "0123456789"
            }
            readOnly={!isEditable}
            className="w-full border px-3 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-bold">Email:</label>
          <input
            type="email"
            defaultValue={
              pageMode === "add"
                ? ""
                : defaultValues.email || "bob.all@hongmoew.com"
            }
            readOnly={!isEditable}
            className="w-full border px-3 py-1 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold">Birth Date:</label>
          <input
            type="date"
            defaultValue={
              pageMode === "add" ? "" : defaultValues.birth || "2002-01-01"
            }
            readOnly={!isEditable}
            className="w-full border px-3 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-bold">Age:</label>
          <input
            type="number"
            defaultValue={pageMode === "add" ? "" : defaultValues.age || 23}
            readOnly
            className="w-full border px-3 py-1 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-bold">Address:</label>
        <input
          type="text"
          defaultValue={
            pageMode === "add"
              ? ""
              : defaultValues.address || "525 Soi Abc, Bangkok 10450"
          }
          readOnly={!isEditable}
          className="w-full border px-3 py-1 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block font-bold">Username:</label>
          <input
            type="text"
            defaultValue={
              pageMode === "add" ? "" : defaultValues.username || "HM485"
            }
            readOnly={!isEditable}
            className="w-full border px-3 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-bold">Password:</label>
          <div className="flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              defaultValue={
                pageMode === "add"
                  ? ""
                  : defaultValues.password || "mySecret123"
              }
              readOnly={!isEditable}
              className="w-full border px-3 py-1 rounded"
            />
            {isEditable && (
              <Image
                src={
                  showPassword ? "/image/eye-open.png" : "/image/eye-closed.png"
                }
                alt="Toggle Password"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
      </div>

      {isEditable && (
        <div className="flex gap-4 mt-4">
          {pageMode === "edit" && (
            <>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}
