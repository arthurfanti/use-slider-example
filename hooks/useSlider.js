import * as React from "react";
import useInterval from "./useInterval";

function useSlider({
  slides = [],
  enabled = false,
  useLoaded = false,
  speed = 1000,
  loop = true
}) {
  const [offset, setOffset] = React.useState(0);
  const [items, setItems] = React.useState(slides);

  const total = slides.length;
  const hookHash = "some-fixed-id";

  function incrementOffset() {
    if (offset === total - 1) {
      setOffset(loop ? 0 : offset);
    } else {
      setOffset(offset + 1);
    }
  }

  function addItem(ref) {
    setItems([...items, ref]);
  }

  const loaded = useLoaded ? items.length === total : true;

  const { pause, resume, isPaused } = useInterval(
    () => {
      if (loaded && enabled && offset < total) {
        incrementOffset();
      }
    },
    speed,
    hookHash
  );

  React.useEffect(() => {
    if (total) {
      resume();

      document.addEventListener("mouseover", (e) => {
        if (e.target && slides.some((slide) => slide.title === e.target.id)) {
          console.log(e.target.id, { isPaused });
          pause();
        }
      });

      window.addEventListener("mouseout", (e) => {
        if (e.target && slides.some((slide) => slide.title === e.target.id)) {
          console.log(e.target.id, { isPaused });
          resume();
        }
      });
    }
    // eslint-disable-next-line
  }, [total]);

  return { offset, addItem };
}

export default useSlider;
