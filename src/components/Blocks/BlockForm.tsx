import React from "react";
import BlockWrapper from "./BlockWrapper";
import BlockTitle from "./BlockTitle";

type Props = {};

function BlockForm({}: Props) {
  return (
    <BlockWrapper>
      <BlockTitle>Form</BlockTitle>
      <form className="mt-10">
        <label
          htmlFor="Oggetto"
          className="block text-lg font-semibold leading-6 text-gray-900"
        >
          Oggetto
        </label>
        <div className="my-3">
          <input
            type="text"
            name="company"
            id="company"
            autoComplete="organization"
            className="block w-full rounded-md border-b border-black -0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          />
        </div>
        <label
          htmlFor="message"
          className="block text-lg font-semibold leading-6 text-gray-900"
        >
          Message
        </label>
        <div className="my-3">
          <textarea
            name="message"
            id="message"
            rows={4}
            className="block w-full rounded-md border-b border-black -0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            defaultValue={""}
          />
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-black px-3.5 py-2.5 text-center text-base font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Lets talk
            </button>
          </div>
        </div>
      </form>
    </BlockWrapper>
  );
}

export default BlockForm;
