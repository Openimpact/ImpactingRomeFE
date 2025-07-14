import React from "react";
import BlockWrapper from "./BlockWrapper";
import BlockTitle from "./BlockTitle";

type Props = {};

function BlockText({}: Props) {
  return (
    <BlockWrapper>
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <BlockTitle>A Block Text</BlockTitle>
        <div className="grid max-w-xl grid-cols-1 gap-8 text-lg leading-6 text-gray-800 lg:max-w-none ">
          <div>
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas.
            </p>

            <p>
              Erat pellentesque dictumst ligula porttitor risus eget et eget.
              Ultricies tellus felis id dignissim eget. Est augue maecenas risus
              nulla ultrices congue nunc tortor.
            </p>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
}

export default BlockText;
