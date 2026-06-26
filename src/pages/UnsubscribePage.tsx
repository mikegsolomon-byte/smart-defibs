import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "invalid" | "used" | "submitting" | "done" | "error";

const UnsubscribePage = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setState(data?.reason === "used" ? "used" : "invalid");
          return;
        }
        if (data?.alreadyUnsubscribed || data?.used) {
          setState("used");
          return;
        }
        setState("valid");
      } catch {
        setState("invalid");
      }
    })();
  }, [token]);

  const confirm = async () => {
    setState("submitting");
    try {
      const { error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      setState(error ? "error" : "done");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="clinical-card max-w-md w-full text-center p-8">
          {state === "loading" && <p className="text-muted-foreground">Checking your link…</p>}

          {state === "valid" && (
            <>
              <h1 className="text-2xl font-extrabold mb-2">Unsubscribe</h1>
              <p className="text-muted-foreground mb-6">
                Click below to stop receiving emails from Smart Defibs Ltd.
              </p>
              <Button onClick={confirm} className="w-full">Confirm unsubscribe</Button>
            </>
          )}

          {state === "submitting" && <p className="text-muted-foreground">Processing…</p>}

          {state === "done" && (
            <>
              <h1 className="text-2xl font-extrabold mb-2">You're unsubscribed</h1>
              <p className="text-muted-foreground">You won't receive further emails from us.</p>
            </>
          )}

          {state === "used" && (
            <>
              <h1 className="text-2xl font-extrabold mb-2">Already unsubscribed</h1>
              <p className="text-muted-foreground">This email is already opted out.</p>
            </>
          )}

          {(state === "invalid" || state === "error") && (
            <>
              <h1 className="text-2xl font-extrabold mb-2">Link not valid</h1>
              <p className="text-muted-foreground">
                This unsubscribe link is invalid or has expired.
              </p>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default UnsubscribePage;
