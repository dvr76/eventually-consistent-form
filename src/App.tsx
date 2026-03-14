import { useState } from "react";
import { useSubmission } from "./useSubmission";
import { StatusBadge } from "./StatusBadge";

export default function App() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const { submissions, submit } = useSubmission();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !amount) return;
    submit(email, parseFloat(amount));
    setEmail("");
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Eventually Consistent Form
        </h1>

        {/* ---- Form ---- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              required
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100.00"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>

        {submissions.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Submissions
            </h2>
            {submissions.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-lg shadow px-4 py-3 flex items-center justify-between"
              >
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{s.email}</p>
                  <p className="text-gray-500">${s.amount.toFixed(2)}</p>
                </div>
                <StatusBadge status={s.status} attempt={s.attempt} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
