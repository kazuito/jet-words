import { ja_parse } from "../components/Problem/ProblemText";

test("ja-parser", () => {
  expect(
    ja_parse("ｍ眺め・景色・意見ｔ～を（...と）みなす・考える（as ...）")
  ).toEqual([
    {
      color: "#7babc6",
      name: "名詞",
      text: "眺め・景色・意見",
    },
    {
      color: "#f34741",
      name: "他動詞",
      text: "～を（...と）みなす・考える（as ...）",
    },
  ]);
});
