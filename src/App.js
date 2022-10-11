import "./styles.css";
import useSlider from "./hooks/useSlider";

const slides = [
  {
    title: "Slide 1",
    color: "#56777A"
  },
  {
    title: "Slide 2",
    color: "#84ACAC"
  },
  {
    title: "Slide 3",
    color: "#FBA434"
  }
];

export default function App() {
  const { offset } = useSlider({
    slides: slides,
    enabled: true,
    useLoaded: false,
    speed: 8000
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div className="container">
        <div
          className="scroller"
          style={{
            transform: `translate3d(-${offset * 300}px,0,0)`,
            width: `${slides.length * 300}px`
          }}
        >
          {slides.map((slide, index) => (
            <div
              id={slide.title}
              key={slide.title}
              className="slide"
              style={{ backgroundColor: slide.color }}
            >
              {slide.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
