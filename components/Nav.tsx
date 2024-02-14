"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      console.log(response, "the providers reponse");
      setProviders(response);
    };

    setProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/home" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt=""
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* {alert(providers)} */}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                height={37}
                width={37}
                alt="Image"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers)?.map((pv: any) => (
                <button
                  className="black_btn"
                  type="button"
                  key={pv?.name}
                  onClick={() => signIn(pv?.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* MObile NAv */}
      <div className="sm:hidden flex relative ">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              height={37}
              width={37}
              alt="Image"
              className="rounded-full"
              onClick={() => settoggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create_prompt"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    settoggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers)?.map((pv: any) => (
                <button
                  className="black_btn"
                  type="button"
                  key={pv?.name}
                  onClick={() => {
                    signIn(pv.id);
                  }}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
