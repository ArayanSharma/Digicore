export const authInputClass =
  "w-full h-[54px] bg-white/[0.03] border-[1.5px] border-[#7c3aed]/25 rounded-xl px-[18px] text-[15px] text-white outline-none transition duration-300 placeholder:text-[#6b7280] focus:border-[#a855f7] focus:ring-4 focus:ring-[#a855f7]/20";

export const authButtonClass =
  "w-full h-[54px] rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white font-semibold text-base transition duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_15px_32px_rgba(168,85,247,0.4)] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed disabled:shadow-none";

export const authErrorClass =
  "text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5";

export const authSuccessClass =
  "text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5";

export const authLinkClass = "text-[#c084fc] hover:text-[#a855f7] transition-colors font-medium";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden font-['Inter',sans-serif]">
      {/* LEFT */}
      <div className="relative flex-1 min-h-[260px] lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-[#09090b] via-[#111827] to-[#09090b] overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full -top-40 -right-24 bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_70%)]" />
        <div className="absolute w-[500px] h-[500px] rounded-full -bottom-40 -left-24 bg-[radial-gradient(circle,rgba(168,85,247,0.28),transparent_70%)]" />
        <div className="absolute inset-0 backdrop-blur-2xl" />

        <div className="relative z-10 max-w-[550px] text-white p-8 sm:p-10 lg:p-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] shadow-[0_10px_30px_rgba(124,58,237,0.45)] flex items-center justify-center text-2xl font-bold shrink-0">
              D
            </div>
            <div>
              <h1 className="text-2xl font-bold">Digicore</h1>
              <p className="text-gray-300">Digital Marketing Agency</p>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold mb-5">
            {title}
          </h2>
          <p className="text-gray-300 leading-relaxed">{subtitle}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-[500px] bg-[#09090b] flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-[400px] bg-[#18181b]/70 backdrop-blur-xl border border-[#7c3aed]/25 rounded-2xl p-7 sm:p-9">
          {children}
        </div>
      </div>
    </div>
  );
}
