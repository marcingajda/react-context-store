import * as React from "react";
import { useStore } from "../../../lib";
import { flagsContextStore } from "../store/flags.store";
import classNames from 'classnames';

export const Flag: React.FC<any> = () => {
  const [flagsState] = useStore(flagsContextStore);

  return (
    <section className="terminal">
      <strong>Flag: </strong>
      <span className={classNames('flag', {
        'flag--active': flagsState.working
      })} />
    </section>
  );
};
