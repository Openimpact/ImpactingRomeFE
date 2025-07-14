import React, { createElement } from "react";
import { Button, Step, Stepper } from "@material-tailwind/react";
import { atom, Atom, useAtom, WritableAtom } from "jotai";
import { UseFormReturnType } from "@mantine/form";

export type stepperAtomsType = {
  currentStepAtom: ReturnType<typeof atom<number>>;
  nextStepAtom: WritableAtom<null, UseFormReturnType<any>[], any>;
  previousStepAtom: WritableAtom<null, UseFormReturnType<any>[], any>;
  lastStepAtom: Atom<boolean>;
  submitStepAtom: Atom<boolean>;
};

export const createStepperFormAtoms = (
  initialStep: number,
  totalStepCount: number
): stepperAtomsType => {
  const currentStepAtom = atom(initialStep ?? 0);

  const nextStepAtom = atom(null, (get, set, form?: UseFormReturnType<any>) => {
    return set(currentStepAtom, (c) => {
      if (form) {
        form.clearErrors();
        form.validate();
        if (form.validate().hasErrors && c === totalStepCount - 2) {
          return c;
        }
      }
      const nv = c === totalStepCount - 1 ? c : c + 1;
      console.log(nv);
      return nv;
    });
  });
  const previousStepAtom = atom(
    null,
    (get, set, form: UseFormReturnType<any>) => {
      return set(currentStepAtom, (c: number) => (c === 0 ? 0 : c - 1));
    }
  );

  const lastStepAtom = atom(
    (get, set) => get(currentStepAtom) === totalStepCount - 1
  );

  const submitStepAtom = atom(
    (get, set) => get(currentStepAtom) === totalStepCount - 2
  );

  return {
    currentStepAtom,
    nextStepAtom,
    previousStepAtom,
    lastStepAtom,
    submitStepAtom
  };
};

type Props = {
  children: React.ReactNode[];
  stepperAtoms: stepperAtomsType;
  form: UseFormReturnType<any>;
  validateStep?: (stepIdx:number) => boolean
};

export default function StepperFormSection({
  children,
  form,
  validateStep,
  stepperAtoms: {
    currentStepAtom,
    nextStepAtom,
    previousStepAtom,
    lastStepAtom,
    submitStepAtom,
  },
}: Props) {
  const [activeStep, setActiveStep] = useAtom<number>(currentStepAtom);
  const [isLastStep] = useAtom<boolean>(lastStepAtom);
  const [isSubmitStep] = useAtom<boolean>(submitStepAtom);
  const [, handleNext] = useAtom(nextStepAtom);
  const [, handlePrev] = useAtom(previousStepAtom);

  return (
    <div className="pt-4 md:pt-12">
      <Stepper
        activeStep={activeStep!}
        /* isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}  */
      >
        {children.map((c, i: number) => (
          <Step key={"step" + i} className="cursor-pointer">
            {i + 1}
          </Step>
        ))}
      </Stepper>
      {children.map((c, i) => {
        return activeStep === i ? c : null;
      })}
      <div className="mt-16">
        <div className="my-16 flex justify-between">
          {activeStep == 0 || isLastStep ? <div></div> : <Button onClick={() => handlePrev(form)} disabled={activeStep == 0}>
            Indietro
          </Button>}
          {isSubmitStep ? (
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salva
            </Button>
          ) : <div></div>}
          {!isLastStep && !isSubmitStep && (
            <Button onClick={() => {
              if(validateStep){
                if(validateStep(activeStep)){
                  handleNext(form)
                }
                return
              }
              handleNext(form)
            }}>Avanti</Button>
          )}
        </div>
      </div>
    </div>
  );
}
