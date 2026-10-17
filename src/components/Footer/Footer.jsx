import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10  px-6 md:px-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 mb-20">
        <div className="max-w-sm">
          <h3 className="text-3xl font-extrabold tracking-tight mb-6">Arata</h3>
          <p className="text-slate-500 mb-8 text-lg">
            Ahmad Rizki Afridho Travel Adventure. Menyediakan pengalaman liburan
            terbaik dengan layanan profesional.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <FiInstagram className="text-xl" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <FiTwitter className="text-xl" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <FiFacebook className="text-xl" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-16 lg:gap-24">
          <div>
            <h4 className="font-bold mb-6 text-slate-900 text-lg">
              Perusahaan
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/about"
                  className="text-slate-500 hover:text-slate-900 font-medium"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-slate-500 hover:text-slate-900 font-medium"
                >
                  Karir
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-slate-500 hover:text-slate-900 font-medium"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-slate-900 text-lg">Bantuan</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/faq"
                  className="text-slate-500 hover:text-slate-900 font-medium"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-500 hover:text-slate-900 font-medium"
                >
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-500 hover:text-slate-900 font-medium"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 text-center md:text-left text-slate-400 text-sm flex flex-col md:flex-row justify-between font-medium">
        <p>
          &copy; {new Date().getFullYear()} Arata Travel Adventure. All rights
          reserved.
        </p>
        <p className="mt-2 md:mt-0">Design inspired by simplicity.</p>
      </div>
    </footer>
  );
}
