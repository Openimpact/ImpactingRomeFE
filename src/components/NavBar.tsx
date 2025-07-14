"use client";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import NavBarData from "./NavBarData.json";
import ActiveLink from "./ActiveLink";
import profile from "../../public/icons/profile.svg";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import useDirectus, { directus_user } from "@/app/hooks/directus";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { readMe } from "@directus/sdk";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [logged,setLogged] = useState(false)
  const directus = useDirectus()
  const router = useRouter()

  useEffect(()=>{
    directus.request(readMe({fields: ['*']})).then(res=> setLogged(!!res))
  },[])

  return (
    <div className="w-full md:max-w-[80rem] mx-auto z-30 px-6">

      <Disclosure>
            <div className="fixed z-50 top-4 right-4 h-12 inset-y-0 right-0 flex items-center pr-2  sm:ml-6 sm:pr-0 block md:hidden">
              {/* Profile dropdown */}
              <Menu as="div" className="">
                <div>
                  <Menu.Button className=" flex rounded-full  text-sm focus:outline-none ">
                    <span className="absolute -inset-1.5 " />
                    <span className="sr-only">Open user menu</span>

                    <Bars3Icon
                      className="h-12 w-12 p-2 rounded-full md:hidden block bg-black/40 backdrop-blur-md text-white"
                      width={23}
                      height={23}
                      />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                  >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {NavBarData.data.map((link, idx) => {
                    return (
                    <Menu.Item key={idx}>
                      {({ active }) => (
                        <Link
                        href={link.path}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 md:hidden"
                          )}
                          >
                            {link.title}
                        </Link>
                      )}
                    </Menu.Item>
                    );
                  })}
                    {/* <Menu.Item>
                      {({ active }) => (
                        <Link
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                          )}
                          >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                          )}
                          >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                          )}
                          >
                          Sign out
                        </a>
                      )}
                    </Menu.Item> */}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            </Disclosure>
    <div className="flex  bg-black/40 backdrop-blur-md fixed top-0 z-30 rounded-full mt-4 ">
        <div className="mx-auto  px-2 sm:px-6 lg:px-8">
              <div className="flex flex-shrink-0 items-center hidden md:block">
                <div className="flex space-x-8">
                  {NavBarData.data.map((link, idx) => {
                    return (
                      <div key={idx}>
                        <div className="sm:ml-6 sm:flex sm:space-x-8 ">
                          <ActiveLink
                            href={link.path}
                            className="inline-flex items-center cursor-pointer px-1 py-4 text-lg font-medium text-white"
                            >
                            {link.title}
                          </ActiveLink>
                        </div>
                      </div>
                    );
                  })}
                  <div>
{                    <div className="sm:ml-6 sm:flex sm:space-x-8 ">
                      {logged ? <span
                        onClick={async ()=>{
                          /* directus.logout().then((res)=>{
                            setLogged(false)
                          }) */
                        }}
                        className="inline-flex items-center cursor-pointer px-1 py-4 text-lg font-medium text-white"
                        >
                        Logout
                      </span> : <ActiveLink
                        href="/login"
                        className="inline-flex items-center cursor-pointer px-1 py-4 text-lg font-medium text-white"
                        >
                        Login
                      </ActiveLink>}
                    </div>}
                  </div>
                </div>
              </div>
          </div>

    </div>
  </div>
  );
}
