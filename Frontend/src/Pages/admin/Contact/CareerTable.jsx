import { Briefcase, Edit, Mail, Phone, Trash2 } from "lucide-react";
import { Card } from "../../../Components/ui/card";
import { Badge } from "../../../Components/ui/badge";

export default function CareerTable({ careers, loading, onEdit, onDelete }) {
  const handleDownload = (url, applicantName) => {
    if (!url) return;

    let downloadUrl = url;
    const isRaw = url.includes("/raw/upload/");

    if (!isRaw) {
      // Convert document format (e.g. .docx, .doc) to .pdf on the fly using Cloudinary's format conversion
      const urlWithoutQuery = url.split("?")[0];
      const query = url.split("?")[1] || "";
      const urlParts = urlWithoutQuery.split(".");
      if (urlParts.length > 1) {
        urlParts[urlParts.length - 1] = "pdf";
        downloadUrl = urlParts.join(".") + (query ? `?${query}` : "");
      }

      // Insert Cloudinary fl_attachment flag to force browser direct download
      if (downloadUrl.includes("/upload/")) {
        downloadUrl = downloadUrl.replace("/upload/", "/upload/fl_attachment/");
      }
    }

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const extension = isRaw ? url.split(".").pop().split("?")[0] : "pdf";
    const sanitizedName = (applicantName || "Resume").replace(/[^a-zA-Z0-9]/g, "_");
    link.download = `${sanitizedName}_Resume.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden">
      {loading ? (
        <div className="animate-pulse py-16 text-center text-sm font-semibold text-slate-400">
          Loading applications...
        </div>
      ) : careers.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Briefcase size={30} />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No applications found</h3>
          <p className="max-w-sm text-sm text-slate-500">
            There are currently no career applications available.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Date</th>
                <th>Resume</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="adm-stagger">
              {careers.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-500 text-sm font-bold text-white shadow-sm">
                        {item.name ? item.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-tight text-slate-800">
                          {item.name}
                        </p>
                        <p className="text-xs font-medium text-slate-400">Applicant</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Mail size={14} className="text-slate-400" />
                      <span>{item.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Phone size={14} className="text-slate-400" />
                      <span>{item.phone || "—"}</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant="default" className="bg-purple-50 text-purple-600">
                      {item.position || "General"}
                    </Badge>
                  </td>
                  <td className="font-medium text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    {item.resume ? (
                      <button
                        type="button"
                        onClick={() => handleDownload(item.resume, item.name)}
                        className="text-blue-600 hover:text-blue-700 font-semibold hover:underline text-xs bg-transparent border-0 cursor-pointer p-0"
                      >
                        Download Resume
                      </button>
                    ) : (
                      <span className="text-slate-400 text-xs font-medium">No Resume</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        title="Edit"
                        className="adm-icon-btn"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item._id)}
                        title="Delete"
                        className="adm-icon-btn danger"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
