
import SignUpFormSpazi from '@/app/register/spazio/SignUpFormSpazi';
import NavBar from '@/components/NavBar';
import React from 'react';

const Page = () => {
  return (
  <div className="relative bg-white">
        <div className="mx-auto max-w-7xl flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24  sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
            <SignUpFormSpazi />
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full h-[30vh] overflow-hidden"
              src="/space.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    );
};

export default Page;