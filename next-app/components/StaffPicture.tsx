"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function StaffPicture() {
  const pathname = usePathname();
  const isViewPage = pathname.includes("viewmore");
  const isAddPage = pathname.includes("addstaff");
  const canUpload = isViewPage || isAddPage;

  const uploadRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(
    "/image/default-profile.png"
  );

  // Load from localStorage or fallback to default
  useEffect(() => {
    const saved = localStorage.getItem("staffProfileImg");
    if (saved) setImageSrc(saved);
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImageSrc(base64);
      localStorage.setItem("staffProfileImg", base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <Image
        src={imageSrc}
        alt="Employee Profile"
        width={180}
        height={180}
        className="rounded-full border border-gray-300 object-cover"
        onError={() => setImageSrc("/image/default-profile.png")}
      />
      {canUpload && (
        <input
          ref={uploadRef}
          type="file"
          accept="image/*"
          className="mt-4 text-sm"
          onChange={handleUpload}
        />
      )}
    </div>
  );
}
