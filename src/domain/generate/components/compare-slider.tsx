import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export const CompareSlider = ({
  original,
  improved,
}: Record<string, string>) => (
  <ReactCompareSlider
    itemOne={<ReactCompareSliderImage src={original} alt="Original image" />}
    itemTwo={<ReactCompareSliderImage src={improved} alt="Improved image" />}
    className="flex w-full rounded"
    aria-roledescription="Image comparison slider"
  />
);
