import Link from "next/link";
import MagneticButton from "@/components/motion/MagneticButton";

export default function NotFound() {
  return (
    <section className="grain flex min-h-svh items-center bg-bone pt-[72px]">
      <div className="container-x">
        <div className="border-t border-rule pt-6">
          <span className="label text-leaf">Error 404</span>
        </div>

        <h1 className="display mt-10 max-w-[14ch] text-[clamp(2.6rem,8vw,7rem)] text-ink">
          That page is not in the catalogue.
        </h1>

        <p className="mt-8 max-w-[46ch] text-[1rem] leading-[1.75] text-ink/60">
          The link may be out of date, or the brand may have been renamed. Try the product list, or
          tell us what you were looking for and we will send it across.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <MagneticButton href="/products">Product list</MagneticButton>
          <Link href="/contact" className="label link-draw text-ink">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
