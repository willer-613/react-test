import React, {
  forwardRef,
  useContext,
  useEffect,
  useState,
  useTransition
} from "react";
import { context } from "./index";

const CustomeInput = forwardRef(({ changeHandler, query }, refC) => {
  const refInput = React.useRef(null);

  React.useImperativeHandle(refC, () => {
    return {
      focus: () => refInput.current.focus()
    };
  });

  return (
    <input
      ref={(cur) => (refInput.current = cur)}
      onChange={changeHandler}
      value={query}
      type="text"
    />
  );
});

export function FilterList({ names }) {
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState("");
  const cuRef = React.useRef(null);
  const source = useContext(context);

  useEffect(() => {
    console.log(source, "sss");
    // cuRef.current.focus();
  }, [source]);

  const [isPending, startTransition] = useTransition();

  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
    // if (isPending) return;
    startTransition(() => setHighlight(value));
  };

  return (
    <div>
      <CustomeInput
        ref={(cur) => (cuRef.current = cur)}
        changeHandler={changeHandler}
        query={query}
      />
      {isPending ? (
        <div>正在加载中...</div>
      ) : (
        names.map((name, i) => (
          <ListItem idx={i} key={i} name={name} highlight={highlight} />
        ))
      )}
    </div>
  );
}

function ListItem({ name, highlight }) {
  const index = name.toLowerCase().indexOf(highlight.toLowerCase());
  if (!~index) {
    return <div>{name}</div>;
  }
  return (
    <>
      <div>
        {name.slice(0, index)}
        <span className="highlight">
          {name.slice(index, index + highlight.length)}
        </span>
        {name.slice(index + highlight.length)}
      </div>
    </>
  );
}
