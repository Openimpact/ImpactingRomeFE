"use client";
import React from "react";
import Image from "next/image";
import plus from "../../../public/icons/plus.svg";
import photoUp from "../../../public/icons/photoUp.svg";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import BlockModalListBox from "./BlockModalListBox";
import UploadForm from "../Form/UploadForm";
import Editor from "../Editor";

function BlockModal() {
  let [isOpen, setIsOpen] = useState(false);
  let [blockType, setBlockType] = useState({ name: "" });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setBlockType({ name: "" });
    setIsOpen(true);
  }

  return (
    <div className="rounded-lg py-6">
      <div className="my-10 flex items-center justify-center">
        <Image
          src={plus}
          alt="/"
          width={52}
          onClick={openModal}
          className="cursor-pointer opacity-20 hover:opacity-50"
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all w-full max-w-7xl h-[80vh] overflow-y-scroll flex flex-col justify-between gap-4">
                  <Dialog.Title
                    as="h1"
                    className="text-xl md:text-2xl font-medium leading-6 text-gray-900 border-b border-black inline-block"
                  >
                    Cosa vuoi inserire?
                  </Dialog.Title>
                  <div className="flex justify-center items-center text-black">
                    {blockType.name == "" && (
                      <BlockModalListBox
                        selected={blockType}
                        setSelected={setBlockType}
                      />
                    )}

                    {blockType.name == "Upload" && <UploadForm onChange={()=>{}}/>}
                    {blockType.name == "Video" && "Video"}
                    {blockType.name == "Testo" && <Editor />}
                    {blockType.name == "Gallery" && "Gallery"}
                  </div>
                  <div className="mt-2 justify-center items-center flex">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default BlockModal;
