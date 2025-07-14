import React from "react";
import Hero from "./Hero.json";
import HeroCard from "./HeroCard";

type Props = {};

function MainHero({}: Props) {
  return (
    <div className="w-full h-[80vh] bg-black ">
      <div className="flex flex-col md:grid md:grid-cols-3 h-full">
        {Hero.data.map((card, idx) => {
          return (
            <HeroCard
              key={idx}
              image={card.imagerUrl}
              title={card.title}
              link={card.linkUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MainHero;
