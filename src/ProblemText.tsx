import styled from "styled-components";

const word_kind = [
  {
    prefix: "ｍ",
    name: "名詞",
    color: "#7babc6",
  },
  {
    prefix: "ｔ",
    name: "他動詞",
    color: "#f34741",
  },
  {
    prefix: "ｊ",
    name: "自動詞",
    color: "#5dc25d",
  },
  {
    prefix: "ｆ",
    name: "副詞",
    color: "#e3b4f3",
  },
  {
    prefix: "ｋ",
    name: "形容詞",
    color: "#f5cd34",
  },
  {
    prefix: "ｚ",
    name: "前置詞",
    color: "#f387a0",
  },
  {
    prefix: "ｃ",
    name: "句",
    color: "#9891ee",
  },
  {
    prefix: "ｓ",
    name: "接続詞",
    color: "#dfad72",
  },
];

function getWordKindData(prefix: string) {
  for (let i = 0; i < word_kind.length; i++) {
    if (word_kind[i].prefix == prefix) return word_kind[i];
  }
  return undefined;
}

function ja_parse(text: string) {
  let output = [];

  while (true) {
    let match = text.match(
      /^([ｍｋｔｊｓｚｆｃ])(.*?)(?=[ｍｋｔｊｓｚｆｃ]|$)/
    );
    if (match) {
      let data = getWordKindData(match[1]);

      output.push({
        name: data?.name || "",
        color: data?.color || "",
        text: match[2] || "",
      });
      text = text.replace(match[0], "");
    } else if (text == "") {
      return output;
    } else {
      output.push({
        name: "",
        color: "gray",
        text: text,
      });
      return output;
    }
  }
}

const ProblemTextBase = styled.div<{
  badgeColor: string;
}>`
  font-size: 22px;
  font-weight: 600;
  display: flex;

  &::before {
    content: "";
    flex-shrink: 0;
    margin-right: 14px;
    width: 20px;
    height: 20px;
    background: ${(p) => p.badgeColor};
    border-radius: 12px;
    transform: translateY(1.4px);
  }
`;
const ProblemTextWrapper = styled.span`
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
`;
const NormalText = styled.span`
  white-space: nowrap;
`;
const SubText = styled.span`
  white-space: nowrap;
  color: #979797;
`;

const createLine = (text: string) => {
  let output = [];

  while (1) {
    let match = text.match(/^（.*?）/);
    if (match) {
      output.push(<SubText>{match[0]}</SubText>);
      text = text.replace(match[0], "");
    } else if (text.match(/（.*?）/)) {
      let consumeMatch = text.match(/^.+?(?=（|$)/);
      if (consumeMatch) {
        output.push(<NormalText>{consumeMatch[0]}</NormalText>);
        text = text.replace(consumeMatch[0], "");
      }
    } else {
      if (text != "") output.push(<NormalText>{text}</NormalText>);
      break;
    }
  }
  return output;
};

const ProblemText = (props: { text: string; color: string; name: string }) => {
  return (
    <ProblemTextBase badgeColor={props.color} title={props.name}>
      <ProblemTextWrapper>
        {createLine(props.text).map((line) => line)}
      </ProblemTextWrapper>
    </ProblemTextBase>
  );
};

const ProblemTexts = (props: { text: string }) => {
  return (
    <>
      {ja_parse(props.text).map((obj, i) => (
        <ProblemText
          key={i}
          text={obj.text}
          color={obj.color}
          name={obj.name}
        />
      ))}
    </>
  );
};

export default ProblemTexts;
export { ja_parse };
