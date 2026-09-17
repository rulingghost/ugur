"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  LogIn,
  LogOut,
  Package,
  RefreshCw,
  ShieldCheck,
  Phone,
  MapPin,
} from "lucide-react";
import type { StoredOrder } from "@/lib/order-store";

type LoadState =
  | { status: "checking" }
  | { status: "login" }
  | { status: "ready"; configured: boolean; orders: StoredOrder[]; error?: string };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [state, setState] = useState<LoadState>({ status: "checking" });

  const loadOrders = useCallback(async () => {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });
    if (response.status === 401) {
      setState({ status: "login" });
      return;
    }

    const data = (await response.json()) as {
      configured?: boolean;
      orders?: StoredOrder[];
      error?: string;
    };

    setState({
      status: "ready",
      configured: Boolean(data.configured),
      orders: data.orders || [],
      error: data.error,
    });
  }, []);

  useEffect(() => {
    loadOrders().catch(() => setState({ status: "login" }));
  }, [loadOrders]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoggingIn(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      setLoginError(data.error || "Giriş başarısız");
      return;
    }

    setPassword("");
    await loadOrders();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setState({ status: "login" });
  };

  if (state.status === "checking") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">
        Panel yükleniyor...
      </div>
    );
  }

  if (state.status === "login") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-7 shadow-sm space-y-5"
        >
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#0B132B] text-white flex items-center justify-center text-xs font-bold">
              MB
            </div>
            <h1 className="text-xl font-extrabold text-[#0B132B] pt-2">Sipariş Paneli</h1>
            <p className="text-xs text-slate-500">
              Gelen siparişleri görmek için admin şifresini girin.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0284c7]"
              required
            />
          </div>

          {loginError ? <p className="text-xs text-red-600">{loginError}</p> : null}

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0B132B] text-white text-sm font-semibold disabled:opacity-60"
          >
            <LogIn className="w-4 h-4" />
            {loggingIn ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-extrabold text-[#0B132B]">Gelen Siparişler</h1>
            <p className="text-xs text-slate-500">Google Sheet üzerinden canlı liste</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadOrders()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Yenile
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
            >
              <LogOut className="w-3.5 h-3.5" />
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {!state.configured ? (
          <section className="bg-white border border-amber-200 rounded-3xl p-6 space-y-3 text-sm text-slate-700">
            <h2 className="font-bold text-[#0B132B]">Google Sheet henüz bağlı değil</h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs leading-relaxed">
              <li>Yeni bir Google Sheet açın.</li>
              <li>
                <strong>Uzantılar → Apps Script</strong> içine{" "}
                <code className="bg-slate-100 px-1 rounded">scripts/google-sheet-orders.gs</code>{" "}
                dosyasını yapıştırın.
              </li>
              <li>
                Script içindeki <code className="bg-slate-100 px-1 rounded">WEBHOOK_SECRET</code> ile
                Vercel <code className="bg-slate-100 px-1 rounded">ORDER_WEBHOOK_SECRET</code> değerini
                aynı yapın.
              </li>
              <li>
                <strong>Dağıt → Web uygulaması → Erişimi olanlar: Herkes</strong> seçip yayınlayın.
              </li>
              <li>
                Çıkan URL’yi Vercel’e <code className="bg-slate-100 px-1 rounded">ORDER_WEBHOOK_URL</code>{" "}
                olarak ekleyin. Panel şifresi için{" "}
                <code className="bg-slate-100 px-1 rounded">ADMIN_PASSWORD</code> da ekleyin.
              </li>
            </ol>
          </section>
        ) : null}

        {state.error ? (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {state.error}
          </p>
        ) : null}

        {state.configured && state.orders.length === 0 && !state.error ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-sm text-slate-500">
            Henüz sipariş yok. Test siparişi verdikten sonra Yenile’ye basın.
          </div>
        ) : null}

        <div className="space-y-3">
          {state.orders.map((order) => (
            <article
              key={`${order.siparisNo}-${order.tarih}`}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#0284c7]" />
                    <span className="font-mono text-xs font-bold text-slate-600">
                      {order.siparisNo || "Numarasız"}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-sky-50 text-[#0284c7] border border-sky-100">
                      {order.tur || "Sipariş"}
                    </span>
                  </div>
                  <h2 className="text-base font-extrabold text-[#0B132B] mt-1">{order.adSoyad}</h2>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-[#0B132B]">{order.tutar || "-"}</div>
                  <div className="text-[11px] text-slate-400">{order.tarih}</div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {order.telefon || "-"}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {[order.konum, order.adres].filter(Boolean).join(" — ") || "-"}
                </p>
                <p>
                  <span className="text-slate-400">Ödeme:</span> {order.odeme || "-"}
                </p>
                <p>
                  <span className="text-slate-400">E-posta:</span> {order.email || "-"}
                </p>
              </div>

              {order.urunler ? (
                <p className="mt-3 text-xs bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-slate-700">
                  {order.urunler}
                </p>
              ) : null}

              {order.not ? (
                <p className="mt-2 text-[11px] text-slate-500">Not: {order.not}</p>
              ) : null}
            </article>
          ))}
        </div>

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Bu sayfa arama motorlarına kapalıdır.
        </p>
      </main>
    </div>
  );
}
