"use client";
import { useAtom } from "jotai";
import React, { use, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import useDirectus, { directus_user } from "@/app/hooks/directus";
import { createUser, login, readMe } from "@directus/sdk";
import { useRouter } from "next/navigation";
import IrInput from "@/components/formComponents/IrInput";
import IrCheckBox from "@/components/formComponents/IrCheckBox";
import { RegisterOperatoriStepperAtomsProps } from "../operatore/RegisterOperatore";

type Props = {};

function SignUpFormSpazi({}: Props) {
  const [, setNextStep] = useAtom(
    RegisterOperatoriStepperAtomsProps.nextStepAtom,
  );
  const [user, setUser] = useAtom(directus_user);
  const directus = useDirectus();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);

  const signupform = useForm({
    validateInputOnChange: true,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      privacy_consent: false,
    },
    validate: {
      first_name: (value: string) => {
        if (value.length < 2) {
          return "Il nome deve essere lungo almeno 2 caratteri";
        }
      },
      last_name: (value: string) => {
        if (value.length < 2) {
          return "Il cognome deve essere lungo almeno 2 caratteri";
        }
      },
      email: (value: string) => {
        if (!value.includes("@")) {
          return "L'indirizzo email non è valido";
        }
      },
      password: (value: string) => {
        if (value.length < 6) {
          return "La password deve essere lunga almeno 6 caratteri";
        }
      },
      password_confirmation: (value: string, values: any) => {
        if (value !== values.password) {
          return "Le password non coincidono";
        }
      },
      privacy_consent: (value: boolean) => {
        if (!value) {
          return "Devi acconsentire al trattamento dei dati personali";
        }
      },
    },
  });

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <div>
          <h1 className="mt-10 text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Impacting Rome
          </h1>
          <h2 className="mt-5 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crea il profilo del tuo spazio
          </h2>
        </div>
        <div className="space-y-6">
          <IrInput
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="first_name"
            required
            placeholder="Nome"
            {...signupform.getInputProps("first_name")}
          />
          <IrInput
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="last_name"
            required
            placeholder="Cognome"
            {...signupform.getInputProps("last_name")}
          />
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
          <IrInput
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            placeholder="Ripeti la password"
            {...signupform.getInputProps("password_confirmation")}
          />

          <IrCheckBox
            id="consent"
            name="consent"
            type="checkbox"
            required
            label="Acconsento al trattamento dei dati personali, ai sensi del D.Lgs. 196/2003 e del GDPR 679/2016."
            {...signupform.getInputProps("privacy_consent")}
          />

          <div>
            {/*  <button

              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >

            </button> */}
            <button
              type="button"
              onClick={async () => {
                try {
                  setShowLoader(true);
                  if (directus && !signupform.validate().hasErrors)
                    directus.logout();
                  directus
                    .request(
                      createUser({
                        ...signupform.values,
                        role: "e08beef7-21c7-4adb-934a-0fe10bcc4949",
                      }),
                    )
                    /* fetch("/api/operatori/register",{
                method: "POST",
                referrerPolicy:'unsafe-url',
                body: JSON.stringify({...signupform.values, role:'c5d635b9-8517-4d40-bc90-244ffec76ce8'})
              }) */
                    .then(() =>
                      directus.login(
                        signupform.values.email,
                        signupform.values.password,
                      ),
                    )
                    .then(
                      async (res) =>
                        await directus.request(readMe({ fields: ["*"] })),
                    )
                    .then((res) => {
                      setUser(res);
                      console.log(res);
                      return res;
                    })
                    .then(() => {
                      router.push("/register/spazio");
                    });
                } catch (error) {
                  console.log(error);
                }
              }}
              className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 "
            >
              Registrati
              {showLoader && (
                <svg
                  className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpFormSpazi;
