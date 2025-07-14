"use client"
import { useAtom } from "jotai";
import React, { use, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import useDirectus, { directus_user } from "@/app/hooks/directus";
import { createUser, login, readMe } from "@directus/sdk";
import { useRouter } from "next/navigation";
import IrInput from "@/components/formComponents/IrInput";
import IrCheckBox from "@/components/formComponents/IrCheckBox";

type Props = {};

function LoginForm({}: Props) {

  const [user,setUser] = useAtom(directus_user)
  const [showError,setShowError] = useState(false)
  const directus = useDirectus()
  const router = useRouter()

  const signupform = useForm({
    validateInputOnChange: true,
    initialValues:{
      email:"",
      password:"",
    },
    validate:{
      email: (value) => { 
        if (!value.includes("@")) {
          return "L'indirizzo email non è valido";
        }
      },
      password: (value) => {
        if (value.length < 6) {
          return "La password deve essere lunga almeno 6 caratteri";
        }
      },
    }
  })


  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <div>
          <h1 className="mt-10 text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Benvenuto su <br/>Impacting Rome
          </h1>
          <p className="mt-10 text-left text-2xl  leading-9 tracking-tight text-gray-900">
            Effettua l&apos;accesso
          </p>
        </div>
        <div className="space-y-6" >

        <IrInput
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                {...signupform.getInputProps("email")}
                />

        <IrInput
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                {...signupform.getInputProps("password")}
                />
       
       
          {showError && <p className="mt-10 text-left text-xl  leading-9 tracking-tight text-red-500">
            Credenziali errate.
          </p>}

        
          <div>
            <button
              onClick={async ()=>{
                try {
                  if(directus && !signupform.validate().hasErrors)
                  directus.login(signupform.values.email, signupform.values.password)
                  .then(async (res)=> await directus.request(readMe({fields: ['*']})))
                  .then(res=> {
                    console.log(res)
                    setUser(res)
                    console.log(res)
                    return res
                  })
                  .then(()=>{
                    router.push("/")
                  }).catch(r=>setShowError(true))
                } catch (error) {
                  console.log(error)
                }
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
