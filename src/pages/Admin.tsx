import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate, type NavigateFunction } from "react-router-dom";

type LocationState = {
  email?: string;
};

const fakeAuthenticate = async (
  email: string,
  password: string,
  navigate: NavigateFunction,
  setError: (value: string) => void,
  setLoading: (value: boolean) => void,
) => {
  setLoading(true);
  setError("");

  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!email || !password) {
    setError("メールアドレスとパスワードを入力してください。");
    setLoading(false);
    return;
  }

  navigate("/admin/dashboard", { replace: true, state: { email } as LocationState });
};

const AdminDashboard = ({ email }: { email: string }) => (
  <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
    <h2 className="text-2xl font-semibold text-gray-900">管理コンソール</h2>
    <p className="mt-3 text-gray-600">
      ようこそ、{email} さん。ここから最新のリード状況やコンテンツ公開ステータスを確認できます。
    </p>
    <div className="mt-6 grid gap-6 md:grid-cols-3">
      <div className="rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-medium text-gray-500">本日の新規リード</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">12件</p>
      </div>
      <div className="rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-medium text-gray-500">商談化率</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">32%</p>
      </div>
      <div className="rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-medium text-gray-500">未対応タスク</h3>
        <p className="mt-2 text-3xl font-bold text-orange-500">5件</p>
      </div>
    </div>
  </div>
);

export const AdminLoginPage = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void fakeAuthenticate(email, password, navigate, setError, setLoading);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900/90 px-4 py-10">
      <div className="w-full max-w-lg rounded-xl bg-white/95 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-bold text-slate-900">管理画面ログイン</h1>
        <p className="mt-2 text-sm text-slate-600">
          プロダクトの設定やリード管理を行うには、チームアカウントでログインしてください。
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              メールアドレス
            </label>
            <input
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              パスワード
            </label>
            <input
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-blue-300"
            disabled={loading}
            type="submit"
          >
            {loading ? "認証中..." : "ログイン"}
          </button>
        </form>

        <div className="mt-8 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          <h2 className="font-semibold text-slate-900">セキュリティ通知</h2>
          <p className="mt-2">
            社内の管理コンソールへアクセスする権限がない場合は、システム管理者に連絡してアカウントを発行してください。
          </p>
        </div>
      </div>
    </div>
  );
};

export const AdminDashboardPage = () => {
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? undefined;
  const email = state?.email;

  if (!email) {
    return <Navigate replace to="/admin" />;
  }

  return (
    <div className="min-h-screen bg-slate-900/5 px-4 py-10">
      <AdminDashboard email={email} />
    </div>
  );
};

export default AdminLoginPage;
