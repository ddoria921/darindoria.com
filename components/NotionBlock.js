const styles = {
  bold: "font-semibold",
  italic: "italic",
  strikethrough: "line-through",
  underline: "border-b border-gray-900",
};

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    const OuterTag = code ? "code" : "span";

    return (
      <OuterTag
        className={[
          bold ? styles.bold : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </OuterTag>
    );
  });
};

export default function NotionBlock({ block }) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p key={block.id}>
          <Text id={block.id} text={value.text} />
        </p>
      );
    case "heading_1":
      return (
        <h1 key={block.id}>
          <Text id={block.id} text={value.text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2
          className="text-xs uppercase tracking-wider font-bold text-gray-900 dark:text-gray-400"
          key={block.id}
        >
          <Text id={block.id} text={value.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={block.id}>
          <Text id={block.id} text={value.text} />
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li key={block.id}>
          <Text id={block.id} text={value.text} />
        </li>
      );
    case "numbered_list_item":
      return (
        <ol key={block.id}>
          <Text id={block.id} text={value.text} />
        </ol>
      );
    case "to_do":
      return (
        <div key={block.id}>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text id={block.id} text={value.text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details key={block.id}>
          <summary>
            <Text id={block.id} text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
}
