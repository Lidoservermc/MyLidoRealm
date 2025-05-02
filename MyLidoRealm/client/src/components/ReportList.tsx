import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Report } from "@shared/schema";

interface ReportListProps {
  reports: Report[];
}

const ReportList: React.FC<ReportListProps> = ({ reports }) => {
  if (reports.length === 0) {
    return (
      <Card className="minecraft-container bg-[#1D1C1A]/90 p-4 rounded">
        <CardContent className="p-0">
          <p className="text-[#E9E0D4] text-center py-4">
            You haven't submitted any reports yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="minecraft-container bg-[#1D1C1A]/90 p-4 rounded">
      <CardContent className="p-0 space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border-b border-[#593D29] pb-3">
            <div className="flex justify-between">
              <span className="font-minecraft text-[#3B96D2]">Report #{report.id}</span>
              <span className={`text-sm ${
                report.status === "Resolved" 
                  ? "text-[#5EC43B]" 
                  : report.status === "Under Review" 
                    ? "text-[#F2B01E]" 
                    : "text-[#E9E0D4]"
              }`}>
                {report.status}
              </span>
            </div>
            <p className="text-[#E9E0D4] mt-2 text-sm">
              {report.type} report: {report.description}
            </p>
            <span className="text-[#E9E0D4]/50 text-xs">Submitted: {report.submittedDate}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReportList;
