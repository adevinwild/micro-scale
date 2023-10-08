import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export const CompareSlider = ({
  original,
  improved,
}: Record<string, string>) => (
  <ReactCompareSlider
    itemOne={<ReactCompareSliderImage src={original} />}
    itemTwo={<ReactCompareSliderImage src={improved} />}
    className="flex w-full rounded"
  />
);
