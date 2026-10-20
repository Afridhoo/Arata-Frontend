import { Link } from "react-router-dom";
import ArrowUpRight from "../ArrowUpRight";

import { socialMediaJumbotron } from "../SocialMedia/SocialMedia";
import { Button } from "../ui/button";
import { LucideArrowUpRightFromSquare } from "lucide-react";

export default function JumbotronHome({ img }) {
  return (
    <section className="md:relative md:h-[100vh]   flex items-end ">
      <div className="absolute inset-0 z-0">
        {img && <img src={img} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      {/* Hero Content */}
      <div className=" relative z-10 top-25 md:top-0 w-full max-w-5xl mx-auto px-6 sm:px-8 md:pb-40">
        <p className="text-2xl  md:text-6xl text-white/90 font-medium mb-5 max-w-3xl">
          Temukan wisata impian, pemandu profesional, dan pengalaman tak
          terlupakan dalam satu platform.
        </p>
        <div>
          <Link to="/tours">
            <Button variant="secondary" size="lg" className={"cursor-pointer"}>
              Jelajahi Tour
              <LucideArrowUpRightFromSquare />
            </Button>
          </Link>
          <div className="flex flex-4 gap-4 flex-wrap  items-center w-fit mt-5">
            {socialMediaJumbotron?.map((s) => (
              <Link to={s.url}>
                <Button
                  variant="secondary"
                  size="sm"
                  className={"cursor-pointer bg-white/40 "}
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
