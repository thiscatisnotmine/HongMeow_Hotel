"use client";

interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

export default function Table({ headers, rows }: TableProps) {
  return (
    <div className="w-full flex justify-center">
      <table className="border-collapse w-full max-w-[1120px] bg-white rounded-xl shadow-md overflow-hidden table-fixed">
        <thead>
          <tr className="bg-[#F4F8F7] font-semibold">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 text-center text-base border border-[#e0e0e0] ${
                  idx === 0 ? "border-l-0" : ""
                } ${idx === headers.length - 1 ? "border-r-0" : ""}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`px-4 py-3 text-center text-base border border-[#e0e0e0] ${
                    cIdx === 0 ? "border-l-0" : ""
                  } ${cIdx === row.length - 1 ? "border-r-0" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
