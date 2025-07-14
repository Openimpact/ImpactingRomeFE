"use client";
import React, { useState } from "react";
import Image from "next/image";
import image1 from "../../../public/icons/photoUp.svg";
import { uploadImage } from "@/repos";
import ErrorLabel from "../formComponents/ErrorLabel";

type Props = {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
};

function UploadForm({ className, value, onChange, error }: Props) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        setImage(e.target?.result as string);
        const formData = new FormData();
        formData.append("file", event!.target!.files![0]);
        const newImageFileData = await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
        onChange(newImageFileData?.id!);
        console.log(newImageFileData.id);
      };
    }
  };

  return (
    <div
      className={"h-fit  flex flex-col justify-center items-center" + className + (error ? " ring-red-400 " : null)}
    >
      {image ? (
        <Image
          src={image}
          alt="Uploaded"
          height={300}
          width={300}
          style={{
            maxWidth: "300px",
            maxHeight: "300px",
          }}
        />
      ) : (
        <div className="text-center">
          <div className="flex justify-center items-center h-fit">
            <Image src={image1} alt="photoUp" height={42} width={42} />
          </div>
          <div className="mt-2 text-sm leading-6 text-gray-600 w-full">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Seleziona una immagine del profilo <span style={{color:"red"}}>*</span></span>
              <input
                required
                id="file-upload"
                name="file-upload"
                accept="image/*"
                type="file"
                //className="invisible"
                onChange={handleImageUpload}
              />
            </label>
            <p className="pl-1">oppure trascinala e rilasciala qui</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF fino a 10MB
          </p>
          <ErrorLabel error={error} />
        </div>
      )}
    </div>
  );
}

export default UploadForm;
