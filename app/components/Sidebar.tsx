"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Khai báo NavLink bên ngoài Sidebar
function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  const pathname = usePathname();
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`hover:text-yellow-400 ${
        pathname === href ? "text-yellow-400 font-bold" : ""
      }`}
    >
      {label}
    </Link>
  );
}

export default function Sidebar({
  isOpen,
  handleOpen,
}: {
  isOpen: boolean;
  handleOpen: () => void;
}) {
  const { data: session, status } = useSession();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 z-100 bg-gray-900 text-white flex flex-col p-6 border-r border-dashed border-yellow-300 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {isOpen && (
        <div className="flex justify-between items-center gap-3 mb-10">
          <h1 className="text-2xl font-bold text-yellow-300">Flashcard App</h1>
          <Image
            width={40}
            height={40}
            onClick={handleOpen}
            className="w-10 h-10 object-contain cursor-pointer"
            src="/images/wyn_rm.png"
            alt="logo"
          />
        </div>
      )}

      <nav className="flex flex-col gap-4 text-lg">
        <NavLink href="/" label="Trang chủ" onClick={handleOpen} />
        <NavLink href="/chua-hoc" label="Chưa học" onClick={handleOpen} />
        <NavLink href="/dang-hoc" label="Đang học" onClick={handleOpen} />
        <NavLink href="/can-on-lai" label="Cần ôn lại" onClick={handleOpen} />
        <NavLink
          href="/da-thuoc-long"
          label="Đã thuộc lòng"
          onClick={handleOpen}
        />
      </nav>

      <div className="mt-auto">
        {status === "authenticated" ? (
          <div>
            <p className="text-sm text-gray-400 mb-2">
              Xin chào, {session.user?.name}
            </p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-400 hover:text-red-300"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <a
            href="/auth/signin"
            className="text-green-400 hover:text-green-300"
          >
            Đăng nhập
          </a>
        )}
      </div>
    </aside>
  );
}
