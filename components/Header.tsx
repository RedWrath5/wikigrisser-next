import Image from 'next/image'
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-black text-white font-thin mb-2 text-2xl font-sans pt-2 pb-2 flex justify-between">
      <div className="pl-3 flex">
        <span className="w-10 mr-2">
          <Image src="/logo-big.jpg" width={100} height={100}></Image>
        </span>
        <span>
          <Link href="/">
            Wikigrisser Next
          </Link>
        </span>
      </div>

      <div className="pr-3">
          <Link href="/ainz/">
            Ainz
          </Link>
      </div>
    </header>
  );
}