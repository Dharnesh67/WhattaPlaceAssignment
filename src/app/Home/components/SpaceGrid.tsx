import React from "react";
import SpaceCard, { Space } from "./SpaceCard";

type Props = {
  spaces: Space[];
};

const SpaceGrid: React.FC<Props> = ({ spaces }) => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {spaces.map((s) => (
          <SpaceCard key={s.id} space={s} />
        ))}
      </div>
    </section>
  );
};

export default SpaceGrid;


