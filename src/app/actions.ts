"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { EnquiryKind } from "@/types/db";

export type EnquiryState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

const PHONE = /^(\+?91[\s-]?)?[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(v: FormDataEntryValue | null, max = 600) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot — bots fill every field they find.
  if (clean(formData.get("website"))) {
    return { ok: true, message: "Thank you. We will be in touch shortly." };
  }

  const kind = (clean(formData.get("kind")) || "franchise") as EnquiryKind;
  const full_name = clean(formData.get("full_name"), 120);
  const phone = clean(formData.get("phone"), 20);
  const email = clean(formData.get("email"), 160);

  const fieldErrors: Record<string, string> = {};
  if (full_name.length < 2) fieldErrors.full_name = "Please enter your name.";
  if (!PHONE.test(phone.replace(/\s|-/g, ""))) {
    fieldErrors.phone = "Enter a valid 10-digit Indian mobile number.";
  }
  if (email && !EMAIL.test(email)) fieldErrors.email = "That email doesn't look right.";

  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }

  const row = {
    kind,
    full_name,
    phone,
    email: email || null,
    city: clean(formData.get("city"), 80) || null,
    state: clean(formData.get("state"), 80) || null,
    company: clean(formData.get("company"), 140) || null,
    division: clean(formData.get("division"), 120) || null,
    product_name: clean(formData.get("product_name"), 140) || null,
    experience: clean(formData.get("experience"), 80) || null,
    message: clean(formData.get("message"), 2000) || null,
    source_path: clean(formData.get("source_path"), 200) || null,
  };

  try {
    const { error } = await createAdminClient().from("enquiries").insert(row);

    if (error) {
      // The table does not exist yet — don't punish the visitor for that.
      console.error("[enquiry] insert failed:", error.message);
      return {
        ok: false,
        message:
          "We couldn't save that just now. Please call or WhatsApp us and we'll pick it up straight away.",
      };
    }
  } catch (e) {
    console.error("[enquiry] unexpected:", e);
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }

  return {
    ok: true,
    message:
      kind === "franchise"
        ? "Application received. We'll confirm territory availability within one working day."
        : "Thank you. Our team will get back to you shortly.",
  };
}
