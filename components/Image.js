export default function Image({ alt, caption, src }) {
  const altText = alt || caption;
  return (
    <figure>
      <img src={src} alt={altText} />
      {caption && <figcaption className="text-center">{caption}</figcaption>}
    </figure>
  );
}
