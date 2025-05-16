"use client";

import { useRouter } from "next/navigation";

interface StaffCardProps {
  staffId: string;
  staffName: string;
  onDelete?: () => void; // optional callback if you want to hook this
}

export default function StaffCard({
  staffId,
  staffName,
  onDelete,
}: StaffCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/view-more"); // Replace with actual route if needed
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      if (onDelete) onDelete();
    }
  };

  return (
    <div className="bg-[#F4F8F7] text-black rounded-2xl px-6 py-4 mb-5 w-full">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex flex-col items-center text-center text-base font-medium">
          ID:<span className="font-normal mt-1 break-words">{staffId}</span>
        </div>
        <div className="text-[#939796]">|</div>
        <div className="flex-1 flex flex-col items-center text-center text-base font-medium">
          Name:<span className="font-normal mt-1 break-words">{staffName}</span>
        </div>
        <div className="text-[#939796]">|</div>
        <div className="flex-1 flex flex-col items-center">
          <button
            onClick={handleEdit}
            className="text-black font-medium text-base hover:underline hover:scale-105 transition"
          >
            View More & Edit
          </button>
        </div>
        <div className="text-[#939796]">|</div>
        <div className="flex-1 flex flex-col items-center">
          <button
            onClick={handleDelete}
            className="text-red-600 font-medium text-base hover:underline hover:scale-105 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
